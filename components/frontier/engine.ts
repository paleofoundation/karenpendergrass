import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { DynamicRayCastVehicleController, RigidBody, World } from "@dimforge/rapier3d-compat";
import { articleSignals, expeditionZones, oracleBlocks, socialLinks, type ExpeditionZone } from "./zones";
import type { DriveAction, ExperienceCallbacks, ExperienceHandle, FieldObjectEvent } from "./types";

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);
const FORWARD = new THREE.Vector3(1, 0, 0);
const SPAWN = new THREE.Vector3(-7, 2.6, 17);
const SUN_OFFSET = new THREE.Vector3(58, 50, -32);
const SUN_VISUAL_DIRECTION = new THREE.Vector3(80, -3, 0);

type WheelVisual = {
  container: THREE.Group;
  roll: THREE.Group;
  strut: THREE.Mesh;
};

type RovalizerVisual = {
  root: THREE.Group;
  wheels: WheelVisual[];
  lidar: THREE.Group;
  armJoint: THREE.Group;
  scanRing: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  dust: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
};

type OracleVisual = {
  id: string;
  group: THREE.Group;
  baseY: number;
  hit: boolean;
};

type KnockableVisual = {
  body: RigidBody;
  group: THREE.Group;
  startPosition: THREE.Vector3;
  startQuaternion: THREE.Quaternion;
  event: FieldObjectEvent;
  hit: boolean;
};

type CatVisual = {
  id: string;
  group: THREE.Group;
  position: THREE.Vector3;
  hit: boolean;
};

type WindStreakVisual = {
  sprites: THREE.Sprite[];
  speeds: number[];
};

function material(color: string, roughness = 0.58, metalness = 0.08) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function mesh(
  geometry: THREE.BufferGeometry,
  meshMaterial: THREE.Material,
  castShadow = true,
  receiveShadow = true,
) {
  const object = new THREE.Mesh(geometry, meshMaterial);
  object.castShadow = castShadow;
  object.receiveShadow = receiveShadow;
  return object;
}

function createTextTexture(
  title: string,
  subtitle: string,
  foreground = "#eff9e9",
  accent = "#d4ff4f",
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(34, 29, 48, .94)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = accent;
  context.lineWidth = 8;
  context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  context.fillStyle = accent;
  context.font = "700 34px Arial";
  context.letterSpacing = "8px";
  context.fillText(subtitle, 44, 64, 920);
  context.fillStyle = foreground;
  context.font = "900 82px Arial";
  context.letterSpacing = "-3px";
  context.fillText(title.toUpperCase(), 42, 167, 930);
  context.fillStyle = "rgba(239,249,233,.55)";
  context.font = "600 22px monospace";
  context.letterSpacing = "4px";
  context.fillText("DRIVE CLOSER TO SCAN", 46, 218);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createBrandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, 512, 128);
  context.fillStyle = "#29243a";
  context.fillRect(0, 0, 512, 128);
  context.fillStyle = "#d5ff50";
  context.font = "900 76px Arial";
  context.letterSpacing = "10px";
  context.fillText("SWOVEE", 24, 86);
  context.fillStyle = "rgba(213,255,80,.65)";
  context.font = "700 16px monospace";
  context.letterSpacing = "7px";
  context.fillText("ROVALIZER R-01", 28, 113);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createPointsSprite(points: number, color: string, label = "POTENTIAL") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(35, 29, 49, .9)";
  context.fillRect(8, 8, 496, 144);
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.strokeRect(9, 9, 494, 142);
  context.fillStyle = color;
  context.font = "800 72px monospace";
  context.textAlign = "center";
  context.fillText(`${points > 0 ? "+" : ""}${points}`, 256, 86);
  context.fillStyle = "rgba(238, 247, 233, .72)";
  context.font = "700 24px monospace";
  context.letterSpacing = "7px";
  context.fillText(label, 256, 126);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(3.6, 1.12, 1);
  return sprite;
}

function addRoad(scene: THREE.Scene, from: THREE.Vector2, to: THREE.Vector2, width = 4.2) {
  const dx = to.x - from.x;
  const dz = to.y - from.y;
  const length = Math.hypot(dx, dz);
  const road = mesh(
    new THREE.BoxGeometry(length, 0.08, width),
    new THREE.MeshStandardMaterial({ color: "#4b505c", roughness: 1, metalness: 0 }),
    false,
    true,
  );
  road.position.set((from.x + to.x) * 0.5, 0.035, (from.y + to.y) * 0.5);
  road.rotation.y = -Math.atan2(dz, dx);
  scene.add(road);

  const marks = mesh(
    new THREE.BoxGeometry(length * 0.94, 0.015, 0.09),
    new THREE.MeshBasicMaterial({ color: "#edf0e6" }),
    false,
    false,
  );
  marks.position.copy(road.position).setY(0.088);
  marks.rotation.y = road.rotation.y;
  scene.add(marks);
}

function addSign(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0, zone.z);
  const postMaterial = material("#5d5969", 0.45, 0.5);
  const leftPost = mesh(new THREE.CylinderGeometry(0.12, 0.15, 3.3, 8), postMaterial);
  const rightPost = leftPost.clone();
  leftPost.position.set(-2.35, 1.55, 0);
  rightPost.position.set(2.35, 1.55, 0);
  group.add(leftPost, rightPost);

  const signTexture = createTextTexture(
    zone.title,
    zone.founder ?? `${zone.index} / ${zone.label}`,
    "#eff9e9",
    zone.color,
  );
  const sign = mesh(
    new THREE.PlaneGeometry(5.4, 1.35),
    new THREE.MeshBasicMaterial({ map: signTexture, transparent: true, side: THREE.DoubleSide }),
    false,
    false,
  );
  sign.position.set(0, 2.7, 0);
  group.add(sign);
  scene.add(group);
  return group;
}

function addAreaMarker(scene: THREE.Scene, title: string, subtitle: string, x: number, z: number, color: string, rotation = 0) {
  const texture = createTextTexture(title, subtitle, "#eff9e9", color);
  const marker = mesh(
    new THREE.PlaneGeometry(7.2, 1.8),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide }),
    false,
    false,
  );
  marker.position.set(x, 3.4, z);
  marker.rotation.y = rotation;
  scene.add(marker);
  const postMaterial = material("#5d5969", 0.45, 0.55);
  [-3.15, 3.15].forEach((offset) => {
    const post = mesh(new THREE.CylinderGeometry(0.1, 0.14, 3.6, 8), postMaterial);
    post.position.set(x + Math.cos(rotation) * offset, 1.65, z - Math.sin(rotation) * offset);
    scene.add(post);
  });
}

function createKnockableVisual(event: FieldObjectEvent, width: number, height: number, depth: number) {
  const group = new THREE.Group();
  const shell = mesh(
    new RoundedBoxGeometry(width, height, depth, 4, Math.min(0.18, depth * 0.1)),
    new THREE.MeshStandardMaterial({
      color: "#393545",
      emissive: event.color,
      emissiveIntensity: 0.09,
      roughness: 0.44,
      metalness: 0.46,
    }),
  );
  group.add(shell);
  const texture = createTextTexture(event.label, event.eyebrow, "#eff9e9", event.color);
  [-1, 1].forEach((side) => {
    const label = mesh(
      new THREE.PlaneGeometry(width * 0.88, Math.min(height * 0.68, 1.5)),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
      false,
      false,
    );
    label.position.z = side * (depth * 0.5 + 0.012);
    label.rotation.y = side < 0 ? Math.PI : 0;
    group.add(label);
  });
  const top = mesh(
    new THREE.BoxGeometry(width * 0.82, 0.055, depth * 0.82),
    new THREE.MeshBasicMaterial({ color: event.color }),
    false,
    false,
  );
  top.position.y = height * 0.5 + 0.025;
  group.add(top);
  const points = createPointsSprite(event.points, event.color, event.kind === "demolition" ? "IMPACT" : "SIGNAL");
  points.position.y = height * 0.5 + 1.15;
  group.add(points);
  return group;
}

function addZonePad(scene: THREE.Scene, zone: ExpeditionZone) {
  const pad = mesh(
    new THREE.CylinderGeometry(zone.radius * 0.75, zone.radius * 0.86, 0.28, 32),
    new THREE.MeshStandardMaterial({ color: "#5d645d", roughness: 0.88, metalness: 0.08 }),
  );
  pad.position.set(zone.x, 0.06, zone.z);
  scene.add(pad);

  const ring = mesh(
    new THREE.TorusGeometry(zone.radius * 0.78, 0.08, 8, 64),
    new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.55 }),
    false,
    false,
  );
  ring.position.set(zone.x, 0.23, zone.z);
  ring.rotation.x = Math.PI * 0.5;
  scene.add(ring);

  if (zone.id !== "finish") {
    const points = createPointsSprite(zone.secret ? 400 : 65, zone.color, zone.secret ? "SECRET" : "SCAN");
    points.position.set(zone.x, 3.05, zone.z + zone.radius * 0.46);
    scene.add(points);
  }
}

function createFoundry(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z - 3);
  const dark = material("#17231f", 0.55, 0.65);
  const copper = material("#9c5c2e", 0.55, 0.6);
  [-2.5, 0, 2.4].forEach((x, index) => {
    const silo = mesh(new THREE.CylinderGeometry(0.8, 1, 3.1 + index * 0.35, 12), index === 1 ? copper : dark);
    silo.position.set(x, 1.55 + index * 0.18, -0.2 * index);
    group.add(silo);
    const band = mesh(new THREE.TorusGeometry(0.92, 0.09, 6, 16), material(zone.color, 0.45, 0.35));
    band.position.set(x, 2.2 + index * 0.18, -0.2 * index);
    band.rotation.x = Math.PI * 0.5;
    group.add(band);
  });
  const conveyor = mesh(new THREE.BoxGeometry(6.8, 0.28, 1.1), dark);
  conveyor.position.set(0, 0.75, 1.25);
  conveyor.rotation.z = -0.08;
  group.add(conveyor);
  for (let index = 0; index < 7; index += 1) {
    const sample = mesh(new THREE.IcosahedronGeometry(0.27 + (index % 2) * 0.08, 0), material(index % 2 ? "#d7a45a" : "#77807b"));
    sample.position.set(-2.5 + index * 0.82, 1.1 + index * 0.065, 1.25);
    group.add(sample);
  }
  scene.add(group);
}

function createWetlands(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z - 1.2);
  const waterMaterial = new THREE.MeshPhysicalMaterial({ color: "#194f4d", roughness: 0.18, metalness: 0.12, transmission: 0.18, transparent: true, opacity: 0.85 });
  [[-2.2, -1.1, 2.7], [1.7, -0.3, 2.2], [0.1, 2.1, 1.7]].forEach(([x, z, size]) => {
    const pool = mesh(new THREE.CylinderGeometry(size, size * 1.1, 0.16, 32), waterMaterial, false, true);
    pool.position.set(x, 0.05, z);
    group.add(pool);
  });
  const microbes = ["#f1d468", "#ff846d", "#b98cff", zone.color];
  for (let index = 0; index < 18; index += 1) {
    const microbe = mesh(new THREE.CapsuleGeometry(0.17, 0.55, 4, 8), material(microbes[index % microbes.length], 0.48, 0.08));
    const angle = (index / 18) * TAU;
    const radius = 1.5 + (index % 5) * 0.7;
    microbe.position.set(Math.cos(angle) * radius, 0.4 + (index % 3) * 0.28, Math.sin(angle) * radius);
    microbe.rotation.set(angle * 0.4, angle, Math.PI * 0.5);
    microbe.scale.setScalar(0.7 + (index % 4) * 0.12);
    group.add(microbe);
  }
  scene.add(group);
}

function createBrain(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z - 1.5);
  const base = mesh(new THREE.CylinderGeometry(3.7, 4.2, 1, 20), material("#1c2430", 0.35, 0.72));
  base.position.y = 0.5;
  group.add(base);
  const glass = mesh(
    new THREE.SphereGeometry(2.5, 32, 20, 0, TAU, 0, Math.PI * 0.5),
    new THREE.MeshPhysicalMaterial({ color: "#7654a5", metalness: 0.2, roughness: 0.12, transmission: 0.48, transparent: true, opacity: 0.78, side: THREE.DoubleSide }),
  );
  glass.position.y = 1.05;
  group.add(glass);
  const core = mesh(new THREE.IcosahedronGeometry(1.15, 2), new THREE.MeshStandardMaterial({ color: zone.color, emissive: zone.color, emissiveIntensity: 2.2, roughness: 0.3 }));
  core.position.y = 2.15;
  core.userData.animate = "brainCore";
  group.add(core);
  [2.3, 3.1, 3.8].forEach((radius, index) => {
    const orbit = mesh(new THREE.TorusGeometry(radius, 0.045, 6, 72), new THREE.MeshBasicMaterial({ color: index === 1 ? "#5de5d6" : zone.color, transparent: true, opacity: 0.72 }), false, false);
    orbit.position.y = 2.1;
    orbit.rotation.set(Math.PI * (0.25 + index * 0.15), index * 0.8, 0.3 * index);
    orbit.userData.animate = "brainOrbit";
    orbit.userData.speed = 0.14 + index * 0.09;
    group.add(orbit);
  });
  scene.add(group);
}

function createObservatory(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z - 1.5);
  const tower = mesh(new THREE.CylinderGeometry(1.5, 2.15, 4.8, 12), material("#182820", 0.5, 0.62));
  tower.position.y = 2.4;
  group.add(tower);
  const deck = mesh(new THREE.CylinderGeometry(2.8, 2.8, 0.35, 16), material("#29372f", 0.4, 0.72));
  deck.position.y = 4.65;
  group.add(deck);
  const dish = mesh(new THREE.SphereGeometry(2.4, 24, 12, 0, TAU, 0, Math.PI * 0.38), material("#59625d", 0.32, 0.78));
  dish.scale.y = 0.55;
  dish.rotation.z = -0.62;
  dish.position.set(0.3, 6.05, 0);
  dish.userData.animate = "dish";
  group.add(dish);
  const beam = mesh(new THREE.CylinderGeometry(0.035, 0.32, 11, 16, 1, true), new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.17, side: THREE.DoubleSide }), false, false);
  beam.position.set(3.2, 10.4, 0);
  beam.rotation.z = -0.62;
  group.add(beam);
  scene.add(group);
}

function createCat(color: string) {
  const group = new THREE.Group();
  const fur = material(color, 0.9, 0);
  const body = mesh(new THREE.SphereGeometry(0.32, 10, 8), fur);
  body.scale.set(1.15, 0.8, 0.72);
  body.position.y = 0.32;
  const head = mesh(new THREE.SphereGeometry(0.22, 10, 8), fur);
  head.position.set(0.28, 0.52, 0);
  const earGeometry = new THREE.ConeGeometry(0.1, 0.2, 3);
  const earA = mesh(earGeometry, fur);
  const earB = earA.clone();
  earA.position.set(0.3, 0.77, 0.12);
  earB.position.set(0.3, 0.77, -0.12);
  const tail = mesh(new THREE.TorusGeometry(0.28, 0.045, 6, 15, Math.PI * 1.2), fur);
  tail.position.set(-0.35, 0.48, 0);
  tail.rotation.x = Math.PI * 0.5;
  group.add(body, head, earA, earB, tail);
  return group;
}

function createSanctuary(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z - 1.5);
  const cats: CatVisual[] = [];
  const wall = material("#d2c7aa", 0.94, 0);
  const roofMaterial = material("#9d5a40", 0.9, 0.02);
  const house = mesh(new THREE.BoxGeometry(5.5, 2.8, 3.8), wall);
  house.position.y = 1.4;
  group.add(house);
  const roof = mesh(new THREE.ConeGeometry(4.1, 1.8, 4), roofMaterial);
  roof.position.y = 3.55;
  roof.rotation.y = Math.PI * 0.25;
  roof.scale.z = 0.72;
  group.add(roof);
  const door = mesh(new THREE.BoxGeometry(0.95, 1.8, 0.08), material("#27453a", 0.7, 0.2));
  door.position.set(1.2, 0.9, 1.94);
  group.add(door);
  const catColors = ["#efe6d2", "#282a28", "#d98242", "#a99b83", "#e8d4b9", "#47433c", "#d9d5c8", "#8c5b3f"];
  for (let index = 0; index < 48; index += 1) {
    const cat = createCat(catColors[index % catColors.length]);
    const angle = index * 2.399963;
    const radius = 3.2 + (index % 7) * 0.72;
    cat.position.set(Math.cos(angle) * radius, 0, 1.5 + Math.sin(angle) * radius * 0.72);
    cat.rotation.y = -angle + (index % 2 ? 0.45 : -0.18);
    cat.scale.setScalar(1.35 + (index % 5) * 0.12);
    cat.userData.animate = "sanctuaryCat";
    cat.userData.offset = index * 0.73;
    cat.userData.baseY = cat.position.y;
    cat.userData.startleUntil = 0;
    group.add(cat);
    cats.push({
      id: `sanctuary-cat-${index + 1}`,
      group: cat,
      position: new THREE.Vector3(zone.x + cat.position.x, 0.7, zone.z + cat.position.z - 1.5),
      hit: false,
    });
  }
  scene.add(group);
  addAreaMarker(scene, "CAT SAFETY ZONE", "-150 PER STRIKE · DRIVE SLOW", zone.x + 9, zone.z + 3, "#ff9cae", -Math.PI * 0.5);
  return cats;
}

function createPhage() {
  const group = new THREE.Group();
  const shell = mesh(new THREE.IcosahedronGeometry(0.42, 1), material("#d5ff50", 0.45, 0.16));
  group.add(shell);
  for (let index = 0; index < 9; index += 1) {
    const spike = mesh(new THREE.ConeGeometry(0.055, 0.5, 5), material("#d5ff50", 0.55, 0.1));
    const direction = new THREE.Vector3(
      Math.sin(index * 2.41) * Math.cos(index),
      Math.cos(index * 1.73),
      Math.sin(index * 1.31),
    ).normalize();
    spike.position.copy(direction).multiplyScalar(0.58);
    spike.quaternion.setFromUnitVectors(UP, direction);
    group.add(spike);
  }
  const tail = mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.75, 7), material("#6f8c39", 0.65, 0.18));
  tail.position.y = -0.7;
  group.add(tail);
  return group;
}

function createHarbor(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z - 1.5);
  const water = mesh(new THREE.CylinderGeometry(5.2, 5.5, 0.2, 32), new THREE.MeshPhysicalMaterial({ color: "#173f46", roughness: 0.16, metalness: 0.25, transparent: true, opacity: 0.9 }), false, true);
  group.add(water);
  const dock = mesh(new THREE.BoxGeometry(7, 0.28, 1.4), material("#5c4d33", 0.95, 0));
  dock.position.set(0, 0.3, 0.7);
  dock.rotation.y = 0.35;
  group.add(dock);
  for (let index = 0; index < 7; index += 1) {
    const phage = createPhage();
    const angle = (index / 7) * TAU;
    phage.position.set(Math.cos(angle) * (2.4 + (index % 2)), 1.3 + (index % 3) * 0.65, Math.sin(angle) * (2.1 + (index % 2)));
    phage.rotation.set(angle, angle * 0.5, 0);
    phage.userData.animate = "phage";
    phage.userData.offset = index;
    group.add(phage);
  }
  scene.add(group);
}

function createLab(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z - 1.5);
  const shell = mesh(new THREE.BoxGeometry(8, 4, 6), material("#18242a", 0.38, 0.74));
  shell.position.y = 2;
  group.add(shell);
  const roof = mesh(new THREE.CylinderGeometry(4.15, 4.15, 6, 16, 1, false, 0, Math.PI), material("#24343a", 0.32, 0.8));
  roof.rotation.set(0, 0, Math.PI * 0.5);
  roof.position.y = 4;
  group.add(roof);
  const door = mesh(new THREE.PlaneGeometry(4.4, 3.15), new THREE.MeshStandardMaterial({ color: "#0b1519", emissive: zone.color, emissiveIntensity: 0.16, roughness: 0.28 }));
  door.position.set(0, 1.65, 3.01);
  group.add(door);
  for (let index = 0; index < 4; index += 1) {
    const strip = mesh(new THREE.BoxGeometry(0.12, 3.2, 0.08), new THREE.MeshBasicMaterial({ color: zone.color }), false, false);
    strip.position.set(-2.1 + index * 1.4, 1.65, 3.08);
    group.add(strip);
  }
  const beacon = mesh(new THREE.CylinderGeometry(0.09, 0.4, 9, 14, 1, true), new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.14, side: THREE.DoubleSide }), false, false);
  beacon.position.set(0, 8.5, 0);
  group.add(beacon);
  scene.add(group);
}

function createFinish(scene: THREE.Scene, zone: ExpeditionZone) {
  const group = new THREE.Group();
  group.position.set(zone.x, 0.2, zone.z);
  const beamMaterial = material("#dfe8dc", 0.28, 0.72);
  const left = mesh(new THREE.BoxGeometry(0.65, 6.4, 0.9), beamMaterial);
  const right = left.clone();
  left.position.set(-4.2, 3.2, 0);
  right.position.set(4.2, 3.2, 0);
  const top = mesh(new THREE.BoxGeometry(9, 0.75, 1), beamMaterial);
  top.position.y = 6.2;
  group.add(left, right, top);
  for (let index = 0; index < 10; index += 1) {
    const stripe = mesh(new THREE.BoxGeometry(0.62, 0.79, 1.03), material(index % 2 ? "#0a1712" : "#d5ff50", 0.6, 0.18));
    stripe.position.set(-4 + index * 0.9, 6.22, 0);
    stripe.rotation.z = index % 2 ? 0.22 : -0.22;
    group.add(stripe);
  }
  scene.add(group);
}

function createZoneWorld(scene: THREE.Scene, zone: ExpeditionZone): CatVisual[] {
  addZonePad(scene, zone);
  const sign = addSign(scene, zone);
  sign.position.z += zone.kind === "finish" ? -2.1 : 5.1;
  sign.rotation.y = zone.kind === "finish" ? Math.PI : 0;
  if (zone.kind === "foundry") createFoundry(scene, zone);
  if (zone.kind === "wetlands") createWetlands(scene, zone);
  if (zone.kind === "brain") createBrain(scene, zone);
  if (zone.kind === "observatory") createObservatory(scene, zone);
  const cats = zone.kind === "sanctuary" ? createSanctuary(scene, zone) : [];
  if (zone.kind === "harbor") createHarbor(scene, zone);
  if (zone.kind === "lab") createLab(scene, zone);
  if (zone.kind === "finish") createFinish(scene, zone);
  return cats;
}

function createRovalizer(scene: THREE.Scene): RovalizerVisual {
  const root = new THREE.Group();
  const lime = material("#d2f04f", 0.3, 0.5);
  const limeDark = material("#819e28", 0.46, 0.5);
  const graphite = material("#343541", 0.3, 0.82);
  const steel = material("#9b9ca5", 0.22, 0.9);
  const glass = new THREE.MeshPhysicalMaterial({ color: "#5b8491", roughness: 0.07, metalness: 0.12, transmission: 0.7, transparent: true, opacity: 0.82 });
  const cyanLight = new THREE.MeshStandardMaterial({ color: "#63f5ee", emissive: "#63f5ee", emissiveIntensity: 4, roughness: 0.25 });

  const undercarriage = mesh(new RoundedBoxGeometry(4.7, 0.58, 2.25, 5, 0.18), graphite);
  undercarriage.position.y = -0.05;
  root.add(undercarriage);
  const belly = mesh(new RoundedBoxGeometry(3.9, 0.75, 1.82, 5, 0.22), limeDark);
  belly.position.set(-0.15, 0.5, 0);
  root.add(belly);
  const hood = mesh(new RoundedBoxGeometry(1.65, 0.72, 1.78, 5, 0.2), lime);
  hood.position.set(1.55, 0.94, 0);
  hood.rotation.z = -0.05;
  root.add(hood);
  const cab = mesh(new RoundedBoxGeometry(1.72, 1.32, 1.72, 5, 0.18), graphite);
  cab.position.set(0.05, 1.26, 0);
  root.add(cab);
  const windshield = mesh(new THREE.PlaneGeometry(1.28, 0.9), glass);
  windshield.position.set(0.925, 1.42, 0);
  windshield.rotation.y = Math.PI * 0.5;
  root.add(windshield);
  [-1, 1].forEach((side) => {
    const sideWindow = mesh(new THREE.PlaneGeometry(1.15, 0.78), glass);
    sideWindow.position.set(0.05, 1.42, side * 0.866);
    sideWindow.rotation.y = side > 0 ? 0 : Math.PI;
    root.add(sideWindow);
  });

  const deck = mesh(new RoundedBoxGeometry(1.25, 0.34, 1.92, 4, 0.14), graphite);
  deck.position.set(-1.55, 0.94, 0);
  root.add(deck);
  const spoolA = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.52, 16), steel);
  const spoolB = spoolA.clone();
  spoolA.rotation.x = Math.PI * 0.5;
  spoolB.rotation.x = Math.PI * 0.5;
  spoolA.position.set(-1.7, 1.42, 0.46);
  spoolB.position.set(-1.7, 1.42, -0.46);
  root.add(spoolA, spoolB);

  const bumper = mesh(new RoundedBoxGeometry(0.34, 0.48, 2.55, 3, 0.1), steel);
  bumper.position.set(2.45, 0.14, 0);
  root.add(bumper);
  for (let index = 0; index < 8; index += 1) {
    const hazard = mesh(
      new THREE.BoxGeometry(0.035, 0.22, 0.22),
      material(index % 2 ? "#18221e" : "#d5ff50", 0.4, 0.38),
    );
    hazard.position.set(2.635, 0.13, -0.82 + index * 0.235);
    hazard.rotation.x = index % 2 ? 0.28 : -0.28;
    root.add(hazard);
  }
  const scanBlade = mesh(new RoundedBoxGeometry(0.22, 0.2, 2.82, 3, 0.06), graphite);
  scanBlade.position.set(2.72, -0.27, 0);
  scanBlade.rotation.z = -0.12;
  root.add(scanBlade);
  for (let index = 0; index < 7; index += 1) {
    const sensor = mesh(new THREE.SphereGeometry(0.045, 8, 6), cyanLight, false, false);
    sensor.position.set(2.84, -0.22, -0.95 + index * 0.315);
    root.add(sensor);
  }
  [-0.62, 0.62].forEach((z) => {
    const headlight = mesh(new THREE.BoxGeometry(0.07, 0.2, 0.38), cyanLight);
    headlight.position.set(2.63, 0.72, z);
    root.add(headlight);
    const light = new THREE.PointLight("#70fff4", 2.2, 9, 2);
    light.position.set(2.7, 0.75, z);
    root.add(light);
  });

  const brandTexture = createBrandTexture();
  [-1, 1].forEach((side) => {
    const brand = mesh(new THREE.PlaneGeometry(1.55, 0.39), new THREE.MeshBasicMaterial({ map: brandTexture, side: THREE.DoubleSide }), false, false);
    brand.position.set(0.12, 0.86, side * 0.921);
    brand.rotation.y = side > 0 ? 0 : Math.PI;
    root.add(brand);
  });

  const lidar = new THREE.Group();
  lidar.position.set(0.05, 2.08, 0);
  const mast = mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.72, 10), steel);
  mast.position.y = 0.31;
  lidar.add(mast);
  const scanner = mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.23, 18), graphite);
  scanner.position.y = 0.76;
  lidar.add(scanner);
  const scannerBand = mesh(new THREE.CylinderGeometry(0.465, 0.465, 0.08, 18), cyanLight);
  scannerBand.position.y = 0.78;
  lidar.add(scannerBand);
  root.add(lidar);

  const cageMaterial = material("#a5a6ac", 0.27, 0.88);
  [-0.78, 0.78].forEach((side) => {
    const rail = mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.35, 8), cageMaterial);
    rail.position.set(-0.05, 1.8, side);
    rail.rotation.z = Math.PI * 0.5;
    root.add(rail);
    const rearRail = mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.9, 8), cageMaterial);
    rearRail.position.set(-0.95, 1.35, side);
    rearRail.rotation.z = 0.42;
    root.add(rearRail);
  });
  const roofRack = mesh(new RoundedBoxGeometry(1.95, 0.12, 1.95, 3, 0.04), graphite);
  roofRack.position.set(-0.05, 2.05, 0);
  root.add(roofRack);

  const armJoint = new THREE.Group();
  armJoint.position.set(-1.5, 1.15, 0);
  const armPivot = mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.65, 12), graphite);
  armPivot.rotation.x = Math.PI * 0.5;
  armJoint.add(armPivot);
  const upper = mesh(new RoundedBoxGeometry(0.38, 0.38, 2.15, 3, 0.08), lime);
  upper.rotation.z = Math.PI * 0.28;
  upper.position.set(-0.65, 0.82, 0);
  armJoint.add(upper);
  const elbow = new THREE.Group();
  elbow.position.set(-1.3, 1.62, 0);
  armJoint.add(elbow);
  const joint = mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.65, 12), graphite);
  joint.rotation.x = Math.PI * 0.5;
  elbow.add(joint);
  const lower = mesh(new RoundedBoxGeometry(0.34, 0.34, 1.95, 3, 0.08), limeDark);
  lower.rotation.z = -Math.PI * 0.36;
  lower.position.set(-0.7, -0.86, 0);
  elbow.add(lower);
  const nozzle = mesh(new THREE.CylinderGeometry(0.13, 0.04, 0.7, 12), cyanLight);
  nozzle.position.set(-1.22, -1.67, 0);
  elbow.add(nozzle);
  const nozzleLight = new THREE.PointLight("#d5ff50", 3, 5, 2);
  nozzleLight.position.copy(nozzle.position);
  elbow.add(nozzleLight);
  root.add(armJoint);

  const wheelPositions = [
    new THREE.Vector3(1.55, -0.05, 1.24),
    new THREE.Vector3(1.55, -0.05, -1.24),
    new THREE.Vector3(-1.55, -0.05, 1.24),
    new THREE.Vector3(-1.55, -0.05, -1.24),
  ];
  const wheels: WheelVisual[] = [];
  wheelPositions.forEach((position, index) => {
    const container = new THREE.Group();
    container.position.copy(position);
    const roll = new THREE.Group();
    const tire = mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.5, 18), new THREE.MeshStandardMaterial({ color: "#25252d", roughness: 0.95, metalness: 0.03 }));
    tire.rotation.x = Math.PI * 0.5;
    roll.add(tire);
    for (let treadIndex = 0; treadIndex < 12; treadIndex += 1) {
      const angle = (treadIndex / 12) * TAU;
      const tread = mesh(new THREE.BoxGeometry(0.16, 0.11, 0.57), material("#17171d", 1, 0), false, true);
      tread.position.set(Math.cos(angle) * 0.625, Math.sin(angle) * 0.625, 0);
      tread.rotation.z = angle;
      roll.add(tread);
    }
    const rim = mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.515, 14), steel);
    rim.rotation.x = Math.PI * 0.5;
    roll.add(rim);
    const hub = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.54, 10), lime);
    hub.rotation.x = Math.PI * 0.5;
    roll.add(hub);
    container.add(roll);
    const strut = mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.65, 8), steel);
    strut.position.y = 0.55;
    strut.rotation.z = index < 2 ? -0.18 : 0.18;
    container.add(strut);
    root.add(container);
    wheels.push({ container, roll, strut });

    const fender = mesh(new RoundedBoxGeometry(1.45, 0.16, 0.63, 3, 0.05), graphite);
    fender.position.set(position.x, 0.55, position.z > 0 ? 1.11 : -1.11);
    root.add(fender);
  });

  const scanRing = mesh(
    new THREE.RingGeometry(2.6, 2.7, 64),
    new THREE.MeshBasicMaterial({ color: "#d5ff50", transparent: true, opacity: 0.38, side: THREE.DoubleSide }),
    false,
    false,
  ) as THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  scanRing.rotation.x = -Math.PI * 0.5;
  scanRing.position.y = -0.48;
  root.add(scanRing);

  const dustGeometry = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(72 * 3);
  for (let index = 0; index < dustPositions.length; index += 3) {
    dustPositions[index] = -2.5 - Math.random() * 3;
    dustPositions[index + 1] = -0.55 + Math.random() * 0.9;
    dustPositions[index + 2] = (Math.random() - 0.5) * 3.2;
  }
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: "#b99b6d", size: 0.16, transparent: true, opacity: 0, depthWrite: false }));
  root.add(dust);
  scene.add(root);
  return { root, wheels, lidar, armJoint, scanRing, dust };
}

function createTerrain(scene: THREE.Scene) {
  const groundMaterial = new THREE.MeshStandardMaterial({ color: "#71815f", roughness: 1, metalness: 0, vertexColors: true });
  const geometry = new THREE.PlaneGeometry(210, 210, 54, 54);
  geometry.rotateX(-Math.PI * 0.5);
  const colors: number[] = [];
  const colorA = new THREE.Color("#718460");
  const colorB = new THREE.Color("#a08b68");
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const z = positions.getZ(index);
    const edge = Math.max(Math.abs(x), Math.abs(z)) / 105;
    const color = colorA.clone().lerp(colorB, Math.max(0, edge - 0.35) * 0.82 + Math.random() * 0.08);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const ground = mesh(geometry, groundMaterial, false, true);
  ground.position.y = -0.08;
  scene.add(ground);

  const mountainMaterial = material("#4e435d", 1, 0);
  for (let index = 0; index < 44; index += 1) {
    const angle = (index / 44) * TAU + Math.random() * 0.15;
    const radius = 91 + Math.random() * 16;
    const height = 5 + Math.random() * 12;
    const mountain = mesh(new THREE.ConeGeometry(4 + Math.random() * 7, height, 5 + (index % 3)), mountainMaterial, false, true);
    mountain.position.set(Math.cos(angle) * radius, height * 0.5 - 0.1, Math.sin(angle) * radius);
    mountain.rotation.y = Math.random() * TAU;
    scene.add(mountain);
  }

  const treeTrunk = material("#665541", 1, 0);
  const foliage = material("#58774f", 1, 0);
  for (let index = 0; index < 160; index += 1) {
    const x = (Math.random() - 0.5) * 178;
    const z = (Math.random() - 0.5) * 178;
    const nearZone = expeditionZones.some((zone) => Math.hypot(zone.x - x, zone.z - z) < zone.radius + 5);
    const nearWestExpansion = x < -54 && z > -54 && z < 49;
    if (nearZone || nearWestExpansion || Math.hypot(x - SPAWN.x, z - SPAWN.z) < 8) continue;
    const tree = new THREE.Group();
    const trunk = mesh(new THREE.CylinderGeometry(0.11, 0.16, 1.2, 6), treeTrunk, false, true);
    trunk.position.y = 0.6;
    const crown = mesh(new THREE.ConeGeometry(0.72, 1.9, 7), foliage, false, true);
    crown.position.y = 1.75;
    tree.add(trunk, crown);
    tree.position.set(x, 0, z);
    const scale = 0.7 + Math.random() * 0.8;
    tree.scale.setScalar(scale);
    scene.add(tree);
  }
}

function createLandscapeDetails(scene: THREE.Scene) {
  const streamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(82, 0.02, -96),
    new THREE.Vector3(91, 0.02, -66),
    new THREE.Vector3(79, 0.02, -32),
    new THREE.Vector3(93, 0.02, 2),
    new THREE.Vector3(81, 0.02, 36),
    new THREE.Vector3(91, 0.02, 70),
    new THREE.Vector3(83, 0.02, 98),
  ]);
  const stream = mesh(
    new THREE.TubeGeometry(streamCurve, 96, 2.15, 6, false),
    new THREE.MeshPhysicalMaterial({
      color: "#5c98a1",
      roughness: 0.16,
      metalness: 0.2,
      transmission: 0.18,
      transparent: true,
      opacity: 0.82,
    }),
    false,
    true,
  );
  stream.scale.y = 0.12;
  scene.add(stream);

  const rockGeometry = new THREE.DodecahedronGeometry(1, 0);
  const rockMaterial = material("#756f7e", 0.96, 0.03);
  const rocks = new THREE.InstancedMesh(rockGeometry, rockMaterial, 42);
  rocks.castShadow = true;
  rocks.receiveShadow = true;
  const transform = new THREE.Object3D();
  for (let index = 0; index < 42; index += 1) {
    const lane = index % 3;
    const x = lane === 0 ? -88 + Math.random() * 22 : lane === 1 ? 63 + Math.random() * 25 : -18 + Math.random() * 36;
    const z = lane === 2 ? -82 + Math.random() * 13 : -84 + Math.random() * 168;
    transform.position.set(x, 0.45, z);
    transform.rotation.set(Math.random() * 0.35, Math.random() * TAU, Math.random() * 0.3);
    const scale = 0.45 + Math.random() * 1.45;
    transform.scale.set(scale * 1.25, scale * 0.78, scale);
    transform.updateMatrix();
    rocks.setMatrixAt(index, transform.matrix);
  }
  rocks.instanceMatrix.needsUpdate = true;
  scene.add(rocks);

  const grassGeometry = new THREE.ConeGeometry(0.25, 1.2, 4);
  const grassMaterial = material("#7f9857", 1, 0);
  const grass = new THREE.InstancedMesh(grassGeometry, grassMaterial, 220);
  grass.castShadow = false;
  grass.receiveShadow = true;
  for (let index = 0; index < 220; index += 1) {
    const grove = index % 4;
    const anchors = [
      new THREE.Vector2(-55, 58),
      new THREE.Vector2(58, 65),
      new THREE.Vector2(69, -66),
      new THREE.Vector2(-58, -66),
    ];
    const anchor = anchors[grove];
    const angle = Math.random() * TAU;
    const radius = 5 + Math.random() * 15;
    transform.position.set(anchor.x + Math.cos(angle) * radius, 0.52, anchor.y + Math.sin(angle) * radius);
    transform.rotation.set(0, Math.random() * TAU, (Math.random() - 0.5) * 0.16);
    const scale = 0.65 + Math.random() * 1.2;
    transform.scale.set(scale, scale, scale);
    transform.updateMatrix();
    grass.setMatrixAt(index, transform.matrix);
  }
  grass.instanceMatrix.needsUpdate = true;
  scene.add(grass);

  const beaconMaterial = material("#666575", 0.35, 0.76);
  for (let index = 0; index < 16; index += 1) {
    const angle = (index / 16) * TAU;
    const radius = 72 + (index % 2) * 7;
    const beacon = new THREE.Group();
    const mast = mesh(new THREE.CylinderGeometry(0.08, 0.14, 4.2, 8), beaconMaterial);
    mast.position.y = 2.1;
    const lamp = mesh(
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.MeshStandardMaterial({ color: "#d5ff50", emissive: "#d5ff50", emissiveIntensity: 3.2 }),
      false,
      false,
    );
    lamp.position.y = 4.25;
    beacon.add(mast, lamp);
    beacon.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    scene.add(beacon);
  }
}

function createWindStreaks(scene: THREE.Scene): WindStreakVisual {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 32;
  const context = canvas.getContext("2d")!;
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.25, "rgba(255,255,255,.12)");
  gradient.addColorStop(0.56, "rgba(255,255,255,.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 11, canvas.width, 10);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprites: THREE.Sprite[] = [];
  const speeds: number[] = [];
  for (let index = 0; index < 18; index += 1) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture,
      color: "#fffdf7",
      transparent: true,
      opacity: 0.1 + (index % 5) * 0.018,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    sprite.position.set(-105 + Math.random() * 210, 2.8 + Math.random() * 16, -105 + Math.random() * 210);
    sprite.scale.set(8 + Math.random() * 15, 0.28 + Math.random() * 0.22, 1);
    scene.add(sprite);
    sprites.push(sprite);
    speeds.push(2.4 + Math.random() * 4.6);
  }
  return { sprites, speeds };
}

function createSky(scene: THREE.Scene) {
  scene.background = new THREE.Color("#8f88a8");
  scene.fog = new THREE.FogExp2("#958da8", 0.0052);
  const sunDirection = SUN_VISUAL_DIRECTION.clone().normalize();
  const sky = mesh(
    new THREE.SphereGeometry(250, 36, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        zenithColor: { value: new THREE.Color("#b9b4d6") },
        horizonColor: { value: new THREE.Color("#74657f") },
        stormColor: { value: new THREE.Color("#44364f") },
        sunColor: { value: new THREE.Color("#fffef8") },
        sunDirection: { value: sunDirection },
      },
      vertexShader: `
        varying vec3 vDirection;
        void main() {
          vDirection = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 zenithColor;
        uniform vec3 horizonColor;
        uniform vec3 stormColor;
        uniform vec3 sunColor;
        uniform vec3 sunDirection;
        varying vec3 vDirection;
        void main() {
          vec3 direction = normalize(vDirection);
          float height = smoothstep(-0.22, 0.84, direction.y);
          vec3 color = mix(horizonColor, zenithColor, height);
          float horizonBank = 1.0 - smoothstep(0.08, 0.52, abs(direction.y - 0.06));
          float cloudBreak = 0.55 + 0.45 * sin(direction.x * 8.0 + direction.z * 5.0);
          color = mix(color, stormColor, horizonBank * cloudBreak * 0.34);
          float alignment = max(dot(direction, normalize(sunDirection)), 0.0);
          float halo = pow(alignment, 16.0);
          float disc = pow(alignment, 720.0);
          color += sunColor * (halo * 0.72 + disc * 4.5);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    }),
    false,
    false,
  );
  scene.add(sky);

  const sunCanvas = document.createElement("canvas");
  sunCanvas.width = 256;
  sunCanvas.height = 256;
  const sunContext = sunCanvas.getContext("2d")!;
  const glow = sunContext.createRadialGradient(128, 128, 6, 128, 128, 126);
  glow.addColorStop(0, "rgba(255,255,255,1)");
  glow.addColorStop(0.12, "rgba(255,255,255,.98)");
  glow.addColorStop(0.36, "rgba(255,252,238,.38)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  sunContext.fillStyle = glow;
  sunContext.fillRect(0, 0, 256, 256);
  const sunTexture = new THREE.CanvasTexture(sunCanvas);
  sunTexture.colorSpace = THREE.SRGBColorSpace;
  const sunDisc = new THREE.Sprite(new THREE.SpriteMaterial({
    map: sunTexture,
    color: "#fffef9",
    transparent: true,
    depthWrite: false,
    fog: false,
    blending: THREE.AdditiveBlending,
  }));
  sunDisc.position.copy(sunDirection).multiplyScalar(185);
  sunDisc.scale.set(34, 34, 1);
  scene.add(sunDisc);
}

function createPrintedStructure(scene: THREE.Scene, position: THREE.Vector3, color = "#d5ff50") {
  const group = new THREE.Group();
  group.position.copy(position);
  group.scale.y = 0.02;
  const baseMaterial = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, roughness: 0.48, metalness: 0.3 });
  for (let layer = 0; layer < 9; layer += 1) {
    const slab = mesh(new THREE.CylinderGeometry(1.25 - layer * 0.06, 1.34 - layer * 0.06, 0.12, 6), baseMaterial, true, true);
    slab.position.y = layer * 0.12;
    slab.rotation.y = layer * 0.12;
    group.add(slab);
  }
  const beacon = mesh(new THREE.CylinderGeometry(0.06, 0.2, 3.2, 12, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, side: THREE.DoubleSide }), false, false);
  beacon.position.y = 2.2;
  group.add(beacon);
  scene.add(group);
  return group;
}

function createOracleBlock(scene: THREE.Scene, id: string, x: number, z: number, rotation: number): OracleVisual {
  const group = new THREE.Group();
  const baseY = 0.82;
  group.position.set(x, baseY, z);
  group.rotation.y = rotation;

  const block = mesh(
    new RoundedBoxGeometry(2.7, 1.4, 1.7, 5, 0.14),
    new THREE.MeshStandardMaterial({
      color: "#393545",
      emissive: "#d5ff50",
      emissiveIntensity: 0.16,
      metalness: 0.58,
      roughness: 0.32,
    }),
  );
  group.add(block);

  const texture = createTextTexture("THE ORACLE", "FIELD RECEIPT", "#eef7e9", "#d5ff50");
  const label = mesh(
    new THREE.PlaneGeometry(2.45, 0.62),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
    false,
    false,
  );
  label.position.set(0, 0.08, 0.856);
  group.add(label);

  const halo = mesh(
    new THREE.TorusGeometry(1.85, 0.045, 8, 48),
    new THREE.MeshBasicMaterial({ color: "#d5ff50", transparent: true, opacity: 0.45 }),
    false,
    false,
  );
  halo.rotation.x = Math.PI * 0.5;
  halo.position.y = -0.76;
  group.add(halo);
  scene.add(group);
  return { id, group, baseY, hit: false };
}

export async function createSwoveeExperience(canvas: HTMLCanvasElement, callbacks: ExperienceCallbacks): Promise<ExperienceHandle> {
  callbacks.onProgress(0.08, "BOOTING THREE-DIMENSIONAL FIELD");
  const RAPIER = await import("@dimforge/rapier3d-compat");
  await RAPIER.init();
  callbacks.onProgress(0.24, "INITIALIZING RAPIER PHYSICS");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance", alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.34;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  createSky(scene);
  createTerrain(scene);
  createLandscapeDetails(scene);
  const windStreaks = createWindStreaks(scene);
  callbacks.onProgress(0.41, "MAPPING CYPRUS TERRAIN");

  const hemisphere = new THREE.HemisphereLight("#e3ddff", "#806f57", 2.35);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight("#fffef8", 4.35);
  sun.position.copy(SUN_OFFSET);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -34;
  sun.shadow.camera.right = 34;
  sun.shadow.camera.top = 34;
  sun.shadow.camera.bottom = -34;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 110;
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 0.025;
  scene.add(sun);

  const driveZones = expeditionZones.filter((zone) => zone.id !== "finish");
  const roadPoints = [
    new THREE.Vector2(SPAWN.x, SPAWN.z),
    ...driveZones.map((zone) => new THREE.Vector2(zone.x, zone.z)),
    new THREE.Vector2(SPAWN.x, SPAWN.z),
  ];
  for (let index = 0; index < roadPoints.length - 1; index += 1) addRoad(scene, roadPoints[index], roadPoints[index + 1], 5.4);
  const receipts = expeditionZones.find((zone) => zone.id === "receipts");
  const finish = expeditionZones.find((zone) => zone.id === "finish");
  if (receipts && finish) addRoad(scene, new THREE.Vector2(receipts.x, receipts.z), new THREE.Vector2(finish.x, finish.z), 6.2);
  addRoad(scene, new THREE.Vector2(-43, -12), new THREE.Vector2(-72, -20), 6.4);
  addRoad(scene, new THREE.Vector2(-72, -20), new THREE.Vector2(-72, -43), 6.4);
  addRoad(scene, new THREE.Vector2(-72, -20), new THREE.Vector2(-72, 31), 6.4);
  addRoad(scene, new THREE.Vector2(-72, 31), new THREE.Vector2(-24, 42), 6.4);
  const sanctuaryCats = expeditionZones.flatMap((zone) => createZoneWorld(scene, zone));
  const oracleVisuals = oracleBlocks.map((block) => createOracleBlock(scene, block.id, block.x, block.z, block.rotation));
  oracleVisuals.forEach((oracle) => {
    const points = createPointsSprite(175, "#d5ff50", "ORACLE");
    points.position.y = 2.15;
    oracle.group.add(points);
  });
  addAreaMarker(scene, "SOCIAL SIGNALS", "PHYSICAL LINKS · HIT + OPEN", -72, -50, "#6bb6ff");
  addAreaMarker(scene, "ARTICLE RANGE", "MODULAR FIELD ARCHIVE", -73, 44, "#ff765e", Math.PI);
  addAreaMarker(scene, "DEMOLITION LAB", "ROVALIZER IMPACT TEST", -92, -3, "#d5ff50", Math.PI * 0.5);
  callbacks.onProgress(0.62, "ASSEMBLING RESEARCH DISTRICTS");

  const world: World = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  world.timestep = 1 / 60;
  const groundBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(105, 0.1, 105).setTranslation(0, -0.18, 0).setFriction(1.4), groundBody);
  const addBarrier = (x: number, y: number, z: number, hx: number, hy: number, hz: number, rotationY = 0) => {
    const body = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z).setRotation({ x: 0, y: Math.sin(rotationY * 0.5), z: 0, w: Math.cos(rotationY * 0.5) }));
    world.createCollider(RAPIER.ColliderDesc.cuboid(hx, hy, hz).setFriction(0.8), body);
  };
  addBarrier(-105.5, 3, 0, 0.5, 3, 105);
  addBarrier(105.5, 3, 0, 0.5, 3, 105);
  addBarrier(0, 3, -105.5, 105, 3, 0.5);
  addBarrier(0, 3, 105.5, 105, 3, 0.5);
  sanctuaryCats.forEach((cat) => {
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.78)
        .setTranslation(cat.position.x, cat.position.y, cat.position.z)
        .setFriction(0.9)
        .setRestitution(0.28),
    );
  });

  const knockables: KnockableVisual[] = [];
  const addKnockable = (
    event: FieldObjectEvent,
    x: number,
    z: number,
    rotation: number,
    width = 4.5,
    height = 2.8,
    depth = 1.2,
    mass = 0.7,
  ) => {
    const group = createKnockableVisual(event, width, height, depth);
    group.position.set(x, height * 0.5 + 0.04, z);
    group.rotation.y = rotation;
    scene.add(group);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(UP, rotation);
    const body = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(x, height * 0.5 + 0.04, z)
        .setRotation({ x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w })
        .setLinearDamping(0.24)
        .setAngularDamping(0.17)
        .setCanSleep(true),
    );
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(width * 0.5, height * 0.5, depth * 0.5)
        .setMass(mass)
        .setFriction(0.72)
        .setRestitution(0.12),
      body,
    );
    knockables.push({
      body,
      group,
      startPosition: group.position.clone(),
      startQuaternion: quaternion.clone(),
      event,
      hit: false,
    });
  };

  socialLinks.forEach((link) => addKnockable({ ...link, kind: "social", points: 90 }, link.x, link.z, link.rotation, 5, 3.4, 1.15, 0.62));
  articleSignals.forEach((article) => addKnockable({ ...article, kind: "article", points: 140 }, article.x, article.z, article.rotation, 5, 3.3, 1.2, 0.66));
  const demolitionWords = ["DOUBT", "NO MARKET", "TOO EARLY", "STAY IN YOUR LANE", "IMPOSSIBLE", "CREDENTIALS", "CONSENSUS", "LATER"];
  demolitionWords.forEach((label, index) => {
    const row = Math.floor(index / 4);
    const column = index % 4;
    const event: FieldObjectEvent = {
      id: `demo-${index}`,
      label,
      eyebrow: "KNOCK IT DOWN",
      kind: "demolition",
      color: index % 2 ? "#ff765e" : "#d5ff50",
      points: 35,
    };
    addKnockable(event, -95 + row * 5.2, -13 + column * 4.1, row % 2 ? 0.08 : -0.08, 4.4, 3.8, 1.4, 0.55);
  });

  const chassisBody: RigidBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(SPAWN.x, SPAWN.y, SPAWN.z)
      .setCanSleep(false)
      .setLinearDamping(0.12)
      .setAngularDamping(0.38),
  );
  chassisBody.setEnabledRotations(false, true, false, true);
  const chassisCollider = RAPIER.ColliderDesc.cuboid(2.25, 0.48, 1.12)
    .setTranslation(0, -0.18, 0)
    .setMass(4.8)
    .setFriction(0.45)
    .setRestitution(0.08);
  world.createCollider(chassisCollider, chassisBody);
  const vehicleController: DynamicRayCastVehicleController = world.createVehicleController(chassisBody);
  vehicleController.indexUpAxis = 1;

  const wheelConnections = [
    { x: 1.55, y: 0.05, z: 1.18 },
    { x: 1.55, y: 0.05, z: -1.18 },
    { x: -1.55, y: 0.05, z: 1.18 },
    { x: -1.55, y: 0.05, z: -1.18 },
  ];
  wheelConnections.forEach((connection) => {
    vehicleController.addWheel(connection, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, 0.72, 0.62);
  });
  for (let index = 0; index < 4; index += 1) {
    vehicleController.setWheelSuspensionStiffness(index, 36);
    vehicleController.setWheelSuspensionCompression(index, 5.6);
    vehicleController.setWheelSuspensionRelaxation(index, 3.8);
    vehicleController.setWheelMaxSuspensionForce(index, 180);
    vehicleController.setWheelMaxSuspensionTravel(index, 0.72);
    vehicleController.setWheelFrictionSlip(index, 4.1);
    vehicleController.setWheelSideFrictionStiffness(index, 2.4);
  }

  const rover = createRovalizer(scene);
  sun.target = rover.root;
  callbacks.onProgress(0.82, "CALIBRATING SWOVEE ROVALIZER");
  const camera = new THREE.PerspectiveCamera(54, 1, 0.1, 340);
  camera.position.set(SPAWN.x - 11, 8, SPAWN.z + 10);
  const cameraTarget = new THREE.Vector3(SPAWN.x, 1.2, SPAWN.z);
  const cameraDesired = new THREE.Vector3();
  const cameraFocusDesired = new THREE.Vector3();
  const followDirection = new THREE.Vector3();
  let cameraYawOffset = 0;
  let cameraDistance = 11;
  let pointerMode: "drive" | "camera" | null = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerX = 0;
  let lastPointerMove = 0;
  let trackpadReleaseTimer = 0;

  const actions: Record<DriveAction, boolean> = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false,
    brake: false,
  };
  const keyMap: Record<string, DriveAction> = {
    w: "forward",
    arrowup: "forward",
    s: "backward",
    arrowdown: "backward",
    a: "left",
    arrowleft: "left",
    d: "right",
    arrowright: "right",
    shift: "boost",
    control: "brake",
    b: "brake",
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const action = keyMap[event.key.toLowerCase()];
    if (!action || ["INPUT", "TEXTAREA"].includes((event.target as HTMLElement)?.tagName)) return;
    event.preventDefault();
    actions[action] = true;
  };
  const onKeyUp = (event: KeyboardEvent) => {
    const action = keyMap[event.key.toLowerCase()];
    if (action) actions[action] = false;
  };
  const clearPointerDrive = () => {
    actions.forward = false;
    actions.backward = false;
    actions.left = false;
    actions.right = false;
  };
  const onPointerDown = (event: PointerEvent) => {
    if (event.button > 1) return;
    pointerMode = event.shiftKey || event.button === 1 ? "camera" : "drive";
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!pointerMode) return;
    if (pointerMode === "camera") {
      cameraYawOffset += (event.clientX - pointerX) * 0.007;
      pointerX = event.clientX;
      lastPointerMove = performance.now();
      return;
    }
    const horizontal = event.clientX - pointerStartX;
    const vertical = event.clientY - pointerStartY;
    actions.forward = vertical < -10;
    actions.backward = vertical > 10;
    actions.left = horizontal < -10;
    actions.right = horizontal > 10;
  };
  const onPointerUp = () => {
    if (pointerMode === "drive") clearPointerDrive();
    pointerMode = null;
  };
  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (event.altKey) {
      cameraDistance = THREE.MathUtils.clamp(cameraDistance + Math.sign(event.deltaY) * 1.1, 7.5, 17);
      return;
    }
    const horizontalDominant = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 0.72;
    if (!horizontalDominant) {
      actions.forward = event.deltaY < -0.5;
      actions.backward = event.deltaY > 0.5;
    }
    if (Math.abs(event.deltaX) > 0.5) {
      actions.left = event.deltaX < 0;
      actions.right = event.deltaX > 0;
    }
    window.clearTimeout(trackpadReleaseTimer);
    trackpadReleaseTimer = window.setTimeout(clearPointerDrive, 170);
  };
  window.addEventListener("keydown", onKeyDown, { passive: false });
  window.addEventListener("keyup", onKeyUp);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  let paused = true;
  let destroyed = false;
  let previous = performance.now();
  let accumulator = 0;
  let telemetryTimer = 0;
  let nearbyId: string | null = null;
  let printCooldown = 0;
  let printedCount = 0;
  let smoothedSteering = 0;
  const printed: Array<{ group: THREE.Group; born: number }> = [];
  let muted = false;
  let audioContext: AudioContext | null = null;
  let engineOscillator: OscillatorNode | null = null;
  let engineGain: GainNode | null = null;
  const roverPosition = new THREE.Vector3();
  const roverQuaternion = new THREE.Quaternion();
  const roverForward = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);

  const ensureAudio = () => {
    if (audioContext) {
      void audioContext.resume();
      return;
    }
    audioContext = new AudioContext();
    engineOscillator = audioContext.createOscillator();
    engineGain = audioContext.createGain();
    engineOscillator.type = "sawtooth";
    engineOscillator.frequency.value = 52;
    engineGain.gain.value = 0.0001;
    engineOscillator.connect(engineGain);
    engineGain.connect(audioContext.destination);
    engineOscillator.start();
  };

  const playImpact = (kind: FieldObjectEvent["kind"]) => {
    if (!audioContext || muted) return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    oscillator.type = kind === "demolition" ? "square" : "triangle";
    oscillator.frequency.setValueAtTime(kind === "article" ? 112 : kind === "social" ? 92 : 64, now);
    oscillator.frequency.exponentialRampToValueAtTime(34, now + 0.22);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === "demolition" ? 0.095 : 0.065, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  };

  const reset = () => {
    chassisBody.setTranslation({ x: SPAWN.x, y: SPAWN.y, z: SPAWN.z }, true);
    chassisBody.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    chassisBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    chassisBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
    cameraYawOffset = 0;
    smoothedSteering = 0;
    oracleVisuals.forEach((oracle) => {
      oracle.hit = false;
      oracle.group.visible = true;
      oracle.group.scale.setScalar(1);
      oracle.group.position.y = oracle.baseY;
    });
    sanctuaryCats.forEach((cat) => {
      cat.hit = false;
      cat.group.userData.startleUntil = 0;
    });
    knockables.forEach((item) => {
      item.hit = false;
      item.body.setTranslation(item.startPosition, true);
      item.body.setRotation({
        x: item.startQuaternion.x,
        y: item.startQuaternion.y,
        z: item.startQuaternion.z,
        w: item.startQuaternion.w,
      }, true);
      item.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      item.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    });
  };

  const teleportTo = (x: number, z: number) => {
    chassisBody.setTranslation({ x, y: SPAWN.y + 0.4, z }, true);
    chassisBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    chassisBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
    clearPointerDrive();
    smoothedSteering = 0;
    nearbyId = null;
    callbacks.onProximity(null);
    cameraTarget.set(x, 1.2, z);
  };

  const print = () => {
    const now = performance.now();
    if (paused || now < printCooldown || printedCount >= 12) return;
    const translation = chassisBody.translation();
    const rotation = chassisBody.rotation();
    roverQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    roverForward.copy(FORWARD).applyQuaternion(roverQuaternion).setY(0).normalize();
    const position = new THREE.Vector3(translation.x, 0.04, translation.z).addScaledVector(roverForward, -3.1);
    const group = createPrintedStructure(scene, position);
    printed.push({ group, born: now });
    printedCount += 1;
    printCooldown = now + 1050;
    callbacks.onPrint();
  };

  const updatePhysics = (delta: number) => {
    const acceleration = (actions.forward ? 1 : 0) - (actions.backward ? 1 : 0);
    const steeringInput = (actions.left ? 1 : 0) - (actions.right ? 1 : 0);
    smoothedSteering = THREE.MathUtils.lerp(smoothedSteering, steeringInput, 1 - Math.pow(0.0004, delta));
    const boostMultiplier = actions.boost ? 1.55 : 1;
    const currentSpeed = Math.abs(vehicleController.currentVehicleSpeed());
    const overflow = Math.max(0, currentSpeed - (actions.boost ? 15 : 8.5));
    const engineForce = acceleration * 54 * boostMultiplier / (1 + overflow * 0.68);
    const brakeForce = actions.brake ? 5.2 : acceleration === 0 ? 0.85 : 0;
    const steerAngle = smoothedSteering * THREE.MathUtils.lerp(0.7, 0.32, Math.min(currentSpeed / 15, 1));
    vehicleController.setWheelSteering(0, steerAngle);
    vehicleController.setWheelSteering(1, steerAngle);
    for (let index = 0; index < 4; index += 1) {
      vehicleController.setWheelEngineForce(index, engineForce * (index < 2 ? 0.38 : 1));
      vehicleController.setWheelBrake(index, brakeForce);
    }
    vehicleController.updateVehicle(delta);
    world.step();
  };

  const updateVisuals = (delta: number, elapsed: number) => {
    const translation = chassisBody.translation();
    const rotation = chassisBody.rotation();
    roverPosition.set(translation.x, translation.y, translation.z);
    roverQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    rover.root.position.copy(roverPosition);
    rover.root.quaternion.copy(roverQuaternion);
    sun.position.copy(roverPosition).add(SUN_OFFSET);
    const steering = smoothedSteering * 0.62;
    rover.wheels.forEach((wheel, index) => {
      const suspension = vehicleController.wheelSuspensionLength(index) ?? 0.72;
      wheel.container.position.set(wheelConnections[index].x, wheelConnections[index].y - suspension, wheelConnections[index].z);
      wheel.container.rotation.y = index < 2 ? steering : 0;
      wheel.roll.rotation.z = vehicleController.wheelRotation(index) ?? 0;
      wheel.strut.scale.y = Math.max(0.28, 1.12 - suspension * 0.65);
    });
    rover.lidar.rotation.y += delta * (actions.boost ? 7.2 : 3.8);
    rover.armJoint.rotation.y = Math.sin(elapsed * 0.0007) * 0.11;
    const scanPhase = (elapsed % 1800) / 1800;
    rover.scanRing.scale.setScalar(0.65 + scanPhase * 2.8);
    rover.scanRing.material.opacity = (1 - scanPhase) * 0.32;
    const speed = Math.abs(vehicleController.currentVehicleSpeed());
    if (audioContext && engineOscillator && engineGain) {
      engineOscillator.frequency.setTargetAtTime(48 + speed * 4.6 + (actions.boost ? 28 : 0), audioContext.currentTime, 0.06);
      engineGain.gain.setTargetAtTime(paused || muted ? 0.0001 : 0.018 + Math.min(speed / 900, 0.035), audioContext.currentTime, 0.08);
    }
    rover.dust.material.opacity = THREE.MathUtils.lerp(rover.dust.material.opacity, Math.min(speed / 17, 0.55), 0.08);
    const dustPositions = rover.dust.geometry.attributes.position as THREE.BufferAttribute;
    for (let index = 0; index < dustPositions.count; index += 1) {
      let x = dustPositions.getX(index) - delta * (2 + speed * 0.5);
      if (x < -8) x = -2.2;
      dustPositions.setX(index, x);
      dustPositions.setY(index, dustPositions.getY(index) + Math.sin(elapsed * 0.002 + index) * 0.002);
    }
    dustPositions.needsUpdate = true;

    windStreaks.sprites.forEach((sprite, index) => {
      sprite.position.x += delta * windStreaks.speeds[index];
      sprite.position.z -= delta * windStreaks.speeds[index] * 0.24;
      sprite.position.y += Math.sin(elapsed * 0.0007 + index * 1.7) * 0.0015;
      if (sprite.position.x > 108) {
        sprite.position.x = -108;
        sprite.position.z = -96 + Math.random() * 192;
        sprite.position.y = 2.8 + Math.random() * 16;
      }
      if (sprite.position.z < -108) sprite.position.z = 108;
    });

    scene.traverse((object) => {
      if (object.userData.animate === "brainCore") {
        object.rotation.y += delta * 0.45;
        const scale = 1 + Math.sin(elapsed * 0.0022) * 0.06;
        object.scale.setScalar(scale);
      }
      if (object.userData.animate === "brainOrbit") {
        object.rotation.y += delta * object.userData.speed;
        object.rotation.z += delta * object.userData.speed * 0.35;
      }
      if (object.userData.animate === "dish") object.rotation.y += delta * 0.12;
      if (object.userData.animate === "phage") {
        object.rotation.y += delta * 0.33;
        object.position.y += Math.sin(elapsed * 0.0018 + object.userData.offset) * 0.0025;
      }
      if (object.userData.animate === "sanctuaryCat") {
        const startled = elapsed < object.userData.startleUntil;
        const startledJump = startled ? Math.abs(Math.sin(elapsed * 0.012)) * 0.72 : 0;
        object.position.y = object.userData.baseY + Math.max(0, Math.sin(elapsed * 0.0014 + object.userData.offset)) * 0.035 + startledJump;
        object.rotation.z = Math.sin(elapsed * 0.0011 + object.userData.offset) * 0.025;
      }
    });

    printed.forEach((item) => {
      const age = elapsed - item.born;
      item.group.scale.y = THREE.MathUtils.lerp(item.group.scale.y, 1, 0.09);
      item.group.rotation.y += delta * 0.09;
      if (age > 28000) item.group.visible = false;
    });

    roverForward.copy(FORWARD).applyQuaternion(roverQuaternion).setY(0).normalize();
    if (pointerMode !== "camera" && performance.now() - lastPointerMove > 850) cameraYawOffset *= Math.pow(0.84, delta * 60);
    followDirection.copy(roverForward).applyAxisAngle(worldUp, cameraYawOffset);
    cameraDesired.copy(roverPosition).addScaledVector(followDirection, -cameraDistance).addScaledVector(UP, cameraDistance * 0.58);
    camera.position.lerp(cameraDesired, 1 - Math.pow(0.0015, delta));
    cameraFocusDesired.copy(roverPosition).addScaledVector(UP, 1.1).addScaledVector(roverForward, 1.6);
    cameraTarget.lerp(cameraFocusDesired, 1 - Math.pow(0.005, delta));
    camera.lookAt(cameraTarget);

    let nearest: ExpeditionZone | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const zone of expeditionZones) {
      const distance = Math.hypot(zone.x - translation.x, zone.z - translation.z);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = zone;
      }
    }
    const nextNearby = nearest && nearestDistance < nearest.radius ? nearest.id : null;
    if (nextNearby !== nearbyId) {
      nearbyId = nextNearby;
      callbacks.onProximity(nearbyId);
    }
    oracleVisuals.forEach((oracle, index) => {
      if (!oracle.hit) {
        oracle.group.position.y = oracle.baseY + Math.sin(elapsed * 0.002 + index) * 0.12;
        oracle.group.rotation.y += delta * 0.22;
        if (Math.hypot(oracle.group.position.x - translation.x, oracle.group.position.z - translation.z) < 2.8) {
          oracle.hit = true;
          callbacks.onOracle(oracle.id);
        }
      } else if (oracle.group.visible) {
        oracle.group.scale.multiplyScalar(Math.pow(0.02, delta));
        oracle.group.position.y += delta * 2.6;
        if (oracle.group.scale.x < 0.035) oracle.group.visible = false;
      }
    });
    sanctuaryCats.forEach((cat) => {
      if (cat.hit) return;
      if (Math.hypot(cat.position.x - translation.x, cat.position.z - translation.z) < 3.05) {
        cat.hit = true;
        cat.group.userData.startleUntil = elapsed + 1400;
        callbacks.onCatHit(cat.id);
      }
    });
    knockables.forEach((item) => {
      const translation = item.body.translation();
      const rotation = item.body.rotation();
      item.group.position.set(translation.x, translation.y, translation.z);
      item.group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
      if (!item.hit) {
        const displacement = Math.hypot(translation.x - item.startPosition.x, translation.z - item.startPosition.z);
        const tipped = Math.abs(rotation.x) > 0.22 || Math.abs(rotation.z) > 0.22;
        if (displacement > 0.65 || tipped) {
          item.hit = true;
          playImpact(item.event.kind);
          callbacks.onKnockdown(item.event);
        }
      }
    });
    if (translation.y < -7 || translation.y > 30) reset();
  };

  const resize = () => {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 700 ? 1.25 : 1.7));
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  const loop = (time: number) => {
    if (destroyed) return;
    const frameDelta = Math.min((time - previous) / 1000, 0.05);
    previous = time;
    if (!paused) {
      accumulator += frameDelta;
      while (accumulator >= 1 / 60) {
        updatePhysics(1 / 60);
        accumulator -= 1 / 60;
      }
    }
    updateVisuals(frameDelta, time);
    renderer.render(scene, camera);
    telemetryTimer += frameDelta;
    if (telemetryTimer > 0.12) {
      telemetryTimer = 0;
      const translation = chassisBody.translation();
      roverForward.copy(FORWARD).applyQuaternion(roverQuaternion);
      callbacks.onTelemetry({
        speed: Math.abs(vehicleController.currentVehicleSpeed()) * 3.6,
        heading: (Math.atan2(roverForward.z, roverForward.x) * 180 / Math.PI + 360) % 360,
        x: translation.x,
        z: translation.z,
        boosting: actions.boost,
        scanning: true,
      });
    }
    requestAnimationFrame(loop);
  };

  callbacks.onProgress(1, "ROVALIZER READY");
  callbacks.onReady();
  requestAnimationFrame(loop);

  return {
    start: () => { ensureAudio(); paused = false; },
    pause: () => { paused = true; },
    reset,
    teleportTo,
    print,
    setMuted: (value) => { muted = value; },
    setAction: (action, active) => { actions[action] = active; },
    destroy: () => {
      destroyed = true;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      window.clearTimeout(trackpadReleaseTimer);
      // The controller is owned by the world and is released by world.free().
      // Freeing it separately corrupts the shared WASM object table during
      // React Strict Mode's mount/unmount verification cycle.
      world.free();
      void audioContext?.close();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const objectMaterial = object.material;
          if (Array.isArray(objectMaterial)) objectMaterial.forEach((item) => item.dispose());
          else objectMaterial?.dispose();
        }
      });
      renderer.dispose();
    },
  };
}
