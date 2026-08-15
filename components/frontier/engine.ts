import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { DynamicRayCastVehicleController, RigidBody, World } from "@dimforge/rapier3d-compat";
import { articleSignals, billboards, expeditionZones, fieldOperations, knowledgeSigns, oracleBlocks, socialLinks, supportLinks, type ExpeditionZone, type FieldLink, type FieldOperation } from "./zones";
import type { DriveAction, ExperienceCallbacks, ExperienceHandle, FieldObjectEvent, OperationStage } from "./types";

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);
const FORWARD = new THREE.Vector3(1, 0, 0);
const SPAWN = new THREE.Vector3(-7, 2.6, 17);
const SPAWN_YAW = 2.46;
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
  scanCone: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
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

type BillboardVisual = {
  event: FieldObjectEvent;
  group: THREE.Group;
  position: THREE.Vector3;
  hit: boolean;
};

type WindStreakVisual = {
  sprites: THREE.Sprite[];
  speeds: number[];
};

type OperationVisual = {
  operation: FieldOperation;
  checkpoints: Array<{
    id: string;
    group: THREE.Group;
    ring: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;
    beam: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial>;
  }>;
  buildSite: THREE.Group;
  buildRing: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;
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
  context.shadowColor = "rgba(18, 13, 26, .82)";
  context.shadowBlur = 16;
  context.shadowOffsetY = 5;
  context.fillStyle = color;
  context.font = "900 82px monospace";
  context.textAlign = "center";
  context.fillText(`${points > 0 ? "+" : ""}${points}`, 256, 86);
  context.shadowBlur = 10;
  context.fillStyle = "rgba(251, 250, 246, .86)";
  context.font = "800 21px monospace";
  context.letterSpacing = "7px";
  context.fillText(label, 256, 126);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(2.8, 0.88, 1);
  return sprite;
}

function createSignalIconTexture(event: FieldObjectEvent) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "rgba(35, 29, 49, .97)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = event.color;
  context.lineWidth = 9;
  context.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

  const centerX = 205;
  const centerY = 250;
  const icon = event.icon;
  context.fillStyle = event.color;
  if (icon === "orcid" || icon === "microbiome" || icon === "wikibiome") {
    context.beginPath();
    context.arc(centerX, centerY, 142, 0, TAU);
    context.fill();
  } else {
    context.fillRect(68, 112, 274, 274);
  }

  context.save();
  context.translate(centerX, centerY);
  context.strokeStyle = "#ffffff";
  context.fillStyle = "#ffffff";
  context.lineWidth = 22;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.textAlign = "center";
  context.textBaseline = "middle";
  if (icon === "linkedin") {
    context.font = "900 190px Arial";
    context.fillText("in", 0, 13);
  } else if (icon === "facebook") {
    context.font = "900 235px Arial";
    context.fillText("f", 2, 25);
  } else if (icon === "x") {
    context.font = "500 205px Arial";
    context.fillText("X", 0, 9);
  } else if (icon === "instagram") {
    context.strokeRect(-83, -83, 166, 166);
    context.beginPath();
    context.arc(0, 0, 49, 0, TAU);
    context.stroke();
    context.beginPath();
    context.arc(58, -58, 10, 0, TAU);
    context.fill();
  } else if (icon === "email") {
    context.strokeRect(-104, -69, 208, 138);
    context.beginPath();
    context.moveTo(-100, -62);
    context.lineTo(0, 18);
    context.lineTo(100, -62);
    context.stroke();
  } else if (icon === "orcid") {
    context.font = "800 155px Arial";
    context.fillText("iD", 0, 8);
  } else if (icon === "microbiome") {
    context.font = "900 112px Arial";
    context.fillText("MM", 0, 8);
    [[-80, -90], [70, -80], [-92, 72], [88, 80]].forEach(([x, y]) => {
      context.beginPath();
      context.arc(x, y, 14, 0, TAU);
      context.fill();
    });
  } else if (icon === "wikibiome") {
    context.font = "900 170px Georgia";
    context.fillText("W", 0, 8);
  }
  context.restore();

  context.fillStyle = event.color;
  context.font = "700 26px monospace";
  context.letterSpacing = "6px";
  context.fillText(event.eyebrow, 395, 132, 570);
  context.fillStyle = "#fbfaf6";
  context.font = event.icon === "orcid" ? "900 48px Arial" : "900 66px Arial";
  context.letterSpacing = "-2px";
  context.fillText(event.label, 392, 252, 580);
  context.fillStyle = "rgba(251,250,246,.62)";
  context.font = "700 23px monospace";
  context.letterSpacing = "4px";
  context.fillText(event.kind === "support" ? "OPEN SITE · COFFEE OPTIONAL" : "DRIVE THROUGH TO OPEN", 395, 342, 570);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function addRoad(scene: THREE.Scene, from: THREE.Vector2, to: THREE.Vector2, width = 4.2) {
  const dx = to.x - from.x;
  const dz = to.y - from.y;
  const length = Math.hypot(dx, dz);
  const shoulder = mesh(
    new THREE.BoxGeometry(length + 0.5, 0.055, width + 1.15),
    new THREE.MeshStandardMaterial({ color: "#817764", roughness: 1, metalness: 0 }),
    false,
    true,
  );
  shoulder.position.set((from.x + to.x) * 0.5, 0.005, (from.y + to.y) * 0.5);
  shoulder.rotation.y = -Math.atan2(dz, dx);
  scene.add(shoulder);
  const road = mesh(
    new THREE.BoxGeometry(length, 0.09, width),
    new THREE.MeshStandardMaterial({ color: "#454954", roughness: 0.92, metalness: 0.02 }),
    false,
    true,
  );
  road.position.set((from.x + to.x) * 0.5, 0.055, (from.y + to.y) * 0.5);
  road.rotation.y = shoulder.rotation.y;
  scene.add(road);

  const dashCount = Math.max(2, Math.floor(length / 4.4));
  const directionX = dx / Math.max(length, 0.001);
  const directionZ = dz / Math.max(length, 0.001);
  for (let index = 0; index < dashCount; index += 1) {
    const distance = -length * 0.5 + ((index + 0.5) / dashCount) * length;
    const dash = mesh(
      new THREE.BoxGeometry(Math.min(1.75, length / dashCount * 0.5), 0.018, 0.085),
      new THREE.MeshBasicMaterial({ color: "#ecece5" }),
      false,
      false,
    );
    dash.position.set(road.position.x + directionX * distance, 0.111, road.position.z + directionZ * distance);
    dash.rotation.y = road.rotation.y;
    scene.add(dash);
  }
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

function createBillboardCopyTexture(title: string, eyebrow: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, 1024, 512);
  const gradient = context.createLinearGradient(0, 0, 720, 0);
  gradient.addColorStop(0, "rgba(28,24,38,.96)");
  gradient.addColorStop(0.62, "rgba(28,24,38,.82)");
  gradient.addColorStop(1, "rgba(28,24,38,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1024, 512);
  context.fillStyle = color;
  context.font = "800 30px monospace";
  context.letterSpacing = "7px";
  context.fillText(eyebrow, 50, 86, 760);
  context.fillStyle = "#fbfaf6";
  context.font = "900 92px Arial";
  context.letterSpacing = "-3px";
  context.fillText(title, 46, 220, 780);
  context.fillStyle = "rgba(251,250,246,.84)";
  context.font = "700 29px Arial";
  context.fillText("DRIVE CLOSER FOR THE FULL BRIEFING", 50, 294, 720);
  context.fillStyle = color;
  context.fillRect(50, 342, 360, 5);
  context.font = "800 24px monospace";
  context.letterSpacing = "5px";
  context.fillText("SELECTED LINK · POINTS INSIDE", 50, 402, 700);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createAdvertisingBillboard(scene: THREE.Scene, link: FieldLink): BillboardVisual {
  const group = new THREE.Group();
  group.position.set(link.x, 0, link.z);
  group.rotation.y = link.rotation;
  const width = 10.8;
  const height = 5.8;
  const steel = material("#5f626b", 0.28, 0.86);
  const frame = material("#26232f", 0.38, 0.72);
  const board = mesh(new RoundedBoxGeometry(width, height, 0.46, 5, 0.12), frame);
  board.position.y = 5.8;
  group.add(board);
  [-4.25, 4.25].forEach((x) => {
    const post = mesh(new THREE.CylinderGeometry(0.16, 0.23, 6.4, 10), steel);
    post.position.set(x, 2.8, 0);
    group.add(post);
    const footing = mesh(new THREE.CylinderGeometry(0.62, 0.78, 0.28, 12), material("#706b68", 0.94, 0.02));
    footing.position.set(x, 0.12, 0);
    group.add(footing);
  });
  const loader = new THREE.TextureLoader();
  if (link.image) {
    const imageTexture = loader.load(link.image);
    imageTexture.colorSpace = THREE.SRGBColorSpace;
    const image = mesh(
      new THREE.PlaneGeometry(link.id === "billboard-gutsies" ? 4.4 : width - 0.34, height - 0.34),
      new THREE.MeshBasicMaterial({ map: imageTexture, color: "#ffffff", transparent: link.id === "billboard-gutsies", side: THREE.DoubleSide }),
      false,
      false,
    );
    image.position.set(link.id === "billboard-gutsies" ? 2.65 : 0, 5.8, 0.242);
    if (link.id === "billboard-gutsies") {
      const cream = mesh(new THREE.PlaneGeometry(width - 0.34, height - 0.34), new THREE.MeshBasicMaterial({ color: "#fff7ea" }), false, false);
      cream.position.set(0, 5.8, 0.236);
      group.add(cream);
    }
    group.add(image);
  }
  if (link.logoImage) {
    const logoTexture = loader.load(link.logoImage);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    const logo = mesh(new THREE.PlaneGeometry(5.2, 3.1), new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true, side: THREE.DoubleSide }), false, false);
    logo.position.set(-2.55, 6.2, 0.255);
    group.add(logo);
  } else {
    const copy = mesh(new THREE.PlaneGeometry(width - 0.32, height - 0.32), new THREE.MeshBasicMaterial({ map: createBillboardCopyTexture(link.label, link.eyebrow, link.color), transparent: true }), false, false);
    copy.position.set(0, 5.8, 0.255);
    group.add(copy);
  }
  const points = createPointsSprite(link.points ?? 200, link.color, "OPEN SELECTED LINK");
  points.position.set(0, 9.35, 0);
  group.add(points);
  scene.add(group);
  return {
    event: { ...link, kind: "billboard", points: link.points ?? 200 },
    group,
    position: new THREE.Vector3(link.x, 0, link.z),
    hit: false,
  };
}

function createLogoKnockableVisual(event: FieldObjectEvent, width: number, height: number, depth: number) {
  const group = new THREE.Group();
  const icon = event.icon!;
  const brand = new THREE.MeshStandardMaterial({ color: event.color, roughness: 0.34, metalness: 0.42, emissive: event.color, emissiveIntensity: 0.08 });
  const white = new THREE.MeshStandardMaterial({ color: "#fbfaf6", roughness: 0.32, metalness: 0.28 });
  const dark = new THREE.MeshStandardMaterial({ color: "#292532", roughness: 0.44, metalness: 0.58 });
  const steel = new THREE.MeshStandardMaterial({ color: "#747781", roughness: 0.28, metalness: 0.82 });
  const plinthY = -height * 0.5 + 0.22;
  const plinth = mesh(new RoundedBoxGeometry(width * 0.82, 0.38, depth * 1.55, 4, 0.08), dark);
  plinth.position.y = plinthY;
  group.add(plinth);
  const plinthBand = mesh(new RoundedBoxGeometry(width * 0.72, 0.11, depth * 1.62, 3, 0.03), brand, false, true);
  plinthBand.position.y = plinthY + 0.22;
  group.add(plinthBand);
  [-0.72, 0.72].forEach((x) => {
    const support = mesh(new THREE.CylinderGeometry(0.055, 0.075, 1.15, 8), steel);
    support.position.set(x, plinthY + 0.72, 0);
    group.add(support);
  });

  const mark = new THREE.Group();
  mark.position.y = 0.25;
  group.add(mark);
  const addBar = (barWidth: number, barHeight: number, x: number, y: number, rotation = 0, barMaterial: THREE.Material = white, z = 0) => {
    const bar = mesh(new RoundedBoxGeometry(barWidth, barHeight, 0.48, 3, Math.min(0.08, barWidth * 0.18)), barMaterial);
    bar.position.set(x, y, z);
    bar.rotation.z = rotation;
    mark.add(bar);
    return bar;
  };
  const addTile = (tileWidth = 2.8, tileHeight = 2.8, tileDepth = 0.34, tileMaterial: THREE.Material = brand) => {
    const tile = mesh(new RoundedBoxGeometry(tileWidth, tileHeight, tileDepth, 6, 0.3), tileMaterial);
    mark.add(tile);
    return tile;
  };

  if (icon === "linkedin") {
    addTile();
    addBar(0.27, 1.2, -0.72, -0.24);
    const dot = mesh(new THREE.SphereGeometry(0.19, 18, 12), white);
    dot.position.set(-0.72, 0.78, 0);
    mark.add(dot);
    addBar(0.27, 1.58, -0.08, -0.05);
    addBar(0.27, 1.16, 0.78, -0.26);
    addBar(0.83, 0.28, 0.36, 0.45);
  } else if (icon === "facebook") {
    addTile();
    addBar(0.34, 2.15, 0.18, -0.15);
    addBar(1.18, 0.34, 0.58, 0.76);
    addBar(1.05, 0.31, 0.36, 0.12);
  } else if (icon === "instagram") {
    addTile();
    addBar(1.85, 0.22, 0, 1.02);
    addBar(1.85, 0.22, 0, -1.02);
    addBar(0.22, 1.85, -1.02, 0);
    addBar(0.22, 1.85, 1.02, 0);
    const lens = mesh(new THREE.TorusGeometry(0.55, 0.16, 12, 32), white);
    mark.add(lens);
    const flash = mesh(new THREE.SphereGeometry(0.15, 16, 10), white);
    flash.position.set(0.7, 0.7, 0.04);
    mark.add(flash);
  } else if (icon === "x") {
    const backRing = mesh(new THREE.TorusGeometry(1.45, 0.1, 10, 48), dark);
    mark.add(backRing);
    addBar(0.38, 3.3, 0, 0, Math.PI * 0.23, white);
    addBar(0.38, 3.3, 0, 0, -Math.PI * 0.23, brand);
  } else if (icon === "email") {
    addTile(3.15, 2.3, 0.38);
    addBar(1.9, 0.22, -0.67, 0.18, -0.55);
    addBar(1.9, 0.22, 0.67, 0.18, 0.55);
    addBar(1.45, 0.18, -0.72, -0.58, 0.48, dark);
    addBar(1.45, 0.18, 0.72, -0.58, -0.48, dark);
  } else if (icon === "orcid") {
    const disc = mesh(new THREE.CylinderGeometry(1.62, 1.62, 0.42, 48), brand);
    disc.rotation.x = Math.PI * 0.5;
    mark.add(disc);
    addBar(0.25, 1.35, -0.72, -0.25);
    const dot = mesh(new THREE.SphereGeometry(0.18, 18, 12), white);
    dot.position.set(-0.72, 0.78, 0);
    mark.add(dot);
    addBar(0.26, 1.82, 0.05, 0);
    const dCurve = mesh(new THREE.TorusGeometry(0.62, 0.14, 12, 30, Math.PI), white);
    dCurve.position.set(0.08, 0, 0);
    dCurve.rotation.z = -Math.PI * 0.5;
    mark.add(dCurve);
  } else if (icon === "microbiome") {
    const core = mesh(new THREE.SphereGeometry(1.02, 24, 18), brand);
    core.scale.set(1.12, 0.94, 0.62);
    mark.add(core);
    for (let index = 0; index < 9; index += 1) {
      const angle = (index / 9) * TAU;
      const cell = mesh(new THREE.SphereGeometry(0.22 + (index % 3) * 0.045, 14, 10), index % 2 ? white : brand);
      cell.position.set(Math.cos(angle) * 1.38, Math.sin(angle) * 1.18, (index % 2 ? 1 : -1) * 0.08);
      mark.add(cell);
    }
    const orbit = mesh(new THREE.TorusGeometry(1.45, 0.06, 8, 48), white);
    orbit.rotation.z = -0.28;
    mark.add(orbit);
  } else if (icon === "wikibiome") {
    const leftPage = mesh(new RoundedBoxGeometry(1.45, 2.25, 0.3, 4, 0.12), brand);
    const rightPage = leftPage.clone();
    leftPage.position.x = -0.72;
    rightPage.position.x = 0.72;
    leftPage.rotation.y = -0.18;
    rightPage.rotation.y = 0.18;
    mark.add(leftPage, rightPage);
    addBar(0.2, 1.7, -0.68, 0, -0.16);
    addBar(0.2, 1.7, 0, 0, 0.16);
    addBar(0.2, 1.7, 0.68, 0, -0.16);
  } else if (icon === "phage") {
    const head = mesh(new THREE.IcosahedronGeometry(1.03, 1), brand);
    head.position.y = 0.5;
    mark.add(head);
    addBar(0.22, 1.15, 0, -0.72, 0, steel);
    const collar = mesh(new THREE.TorusGeometry(0.46, 0.1, 8, 24), white);
    collar.rotation.x = Math.PI * 0.5;
    collar.position.y = -0.35;
    mark.add(collar);
    [-0.68, 0, 0.68].forEach((x, index) => addBar(0.13, 1.05, x, -1.16, index === 1 ? 0 : index ? -0.55 : 0.55, white));
  } else if (icon === "heavy-metal") {
    const shield = mesh(new THREE.CylinderGeometry(1.55, 1.35, 0.42, 6), brand);
    shield.rotation.x = Math.PI * 0.5;
    shield.rotation.z = Math.PI * 0.5;
    mark.add(shield);
    addBar(0.27, 2.05, -0.55, 0, 0, white);
    addBar(0.27, 2.05, 0.55, 0, 0, white);
    addBar(1.35, 0.27, 0, 0.12, 0, white);
  } else if (icon === "heavy-metal-index") {
    addTile(3.15, 2.75, 0.38, dark);
    [-0.85, -0.28, 0.28, 0.85].forEach((x, index) => {
      const barHeight = 0.7 + index * 0.38;
      addBar(0.32, barHeight, x, -0.82 + barHeight * 0.5, 0, index === 3 ? brand : white, 0.24);
    });
  } else if (icon === "tinies") {
    const face = mesh(new THREE.SphereGeometry(1.12, 24, 18), brand);
    face.scale.set(1, 0.88, 0.42);
    mark.add(face);
    [-0.58, 0.58].forEach((x) => {
      const ear = mesh(new THREE.ConeGeometry(0.46, 0.9, 3), brand);
      ear.position.set(x, 0.88, 0);
      mark.add(ear);
      const eye = mesh(new THREE.SphereGeometry(0.11, 12, 8), white);
      eye.position.set(x * 0.55, 0.12, 0.43);
      mark.add(eye);
    });
  } else if (icon === "gardens") {
    addTile(2.9, 2.35, 0.36, brand);
    const roof = mesh(new THREE.ConeGeometry(2.05, 1.35, 4), white);
    roof.rotation.y = Math.PI * 0.25;
    roof.position.y = 1.35;
    roof.scale.z = 0.72;
    mark.add(roof);
    addBar(0.72, 1.25, 0, -0.55, 0, dark, 0.22);
  }

  return group;
}

function createKnockableVisual(event: FieldObjectEvent, width: number, height: number, depth: number) {
  if (event.icon) return createLogoKnockableVisual(event, width, height, depth);
  if (event.kind === "definition") {
    const group = new THREE.Group();
    const postMaterial = material("#625e69", 0.42, 0.62);
    [-width * 0.37, width * 0.37].forEach((x) => {
      const post = mesh(new THREE.CylinderGeometry(0.09, 0.12, height * 0.84, 8), postMaterial);
      post.position.set(x, -height * 0.08, 0);
      group.add(post);
    });
    const signTexture = createTextTexture(event.label, event.eyebrow, "#eff9e9", event.color);
    [-1, 1].forEach((side) => {
      const sign = mesh(
        new THREE.PlaneGeometry(width * 0.94, height * 0.48),
        new THREE.MeshBasicMaterial({ map: signTexture, transparent: true, side: THREE.DoubleSide }),
        false,
        false,
      );
      sign.position.set(0, height * 0.19, side * (depth * 0.5 + 0.012));
      sign.rotation.y = side < 0 ? Math.PI : 0;
      group.add(sign);
    });
    const crossbar = mesh(new RoundedBoxGeometry(width, height * 0.53, depth, 3, 0.08), material("#373241", 0.5, 0.35));
    crossbar.position.y = height * 0.19;
    group.add(crossbar);
    // Keep the readable faces slightly proud of the physical sign.
    group.children.slice(2, 4).forEach((child) => { child.renderOrder = 2; });
    return group;
  }
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
  const texture = event.icon ? createSignalIconTexture(event) : createTextTexture(event.label, event.eyebrow, "#eff9e9", event.color);
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

  if (event.icon === "orcid") {
    const badgeMaterial = material("#a6ce39", 0.34, 0.18);
    [-1, 1].forEach((side) => {
      const badge = mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.2, 32), badgeMaterial);
      badge.rotation.x = Math.PI * 0.5;
      badge.position.set(-width * 0.27, 0, side * (depth * 0.5 + 0.14));
      group.add(badge);
      const badgeTexture = createTextTexture("iD", "ORCID", "#ffffff", "#a6ce39");
      const badgeFace = mesh(
        new THREE.PlaneGeometry(1.65, 0.42),
        new THREE.MeshBasicMaterial({ map: badgeTexture, transparent: true, side: THREE.DoubleSide }),
        false,
        false,
      );
      badgeFace.position.set(-width * 0.27, 0, side * (depth * 0.5 + 0.255));
      badgeFace.rotation.y = side < 0 ? Math.PI : 0;
      group.add(badgeFace);
    });
  }
  const top = mesh(
    new THREE.BoxGeometry(width * 0.82, 0.055, depth * 0.82),
    new THREE.MeshBasicMaterial({ color: event.color }),
    false,
    false,
  );
  top.position.y = height * 0.5 + 0.025;
  group.add(top);
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
  const points = createPointsSprite(100, zone.color, "DISCOVER DISTRICT");
  points.position.set(zone.x, 5.6, zone.z);
  scene.add(points);
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
  const body = mesh(new THREE.CapsuleGeometry(0.3, 0.58, 6, 12), fur);
  body.rotation.z = Math.PI * 0.5;
  body.scale.set(1, 0.82, 0.86);
  body.position.set(-0.05, 0.52, 0);
  const chest = mesh(new THREE.SphereGeometry(0.32, 14, 10), fur);
  chest.scale.set(0.82, 1.15, 0.9);
  chest.position.set(0.34, 0.56, 0);
  const head = mesh(new THREE.SphereGeometry(0.3, 16, 12), fur);
  head.scale.set(0.96, 0.9, 0.88);
  head.position.set(0.52, 0.9, 0);
  const muzzle = mesh(new THREE.SphereGeometry(0.13, 12, 8), material("#efe4d5", 0.92, 0));
  muzzle.scale.set(0.75, 0.55, 1.15);
  muzzle.position.set(0.77, 0.84, 0);
  const nose = mesh(new THREE.SphereGeometry(0.045, 10, 7), material("#8c5b65", 0.72, 0));
  nose.position.set(0.88, 0.89, 0);
  const earGeometry = new THREE.ConeGeometry(0.13, 0.28, 3);
  const earA = mesh(earGeometry, fur);
  const earB = earA.clone();
  earA.position.set(0.52, 1.19, 0.15);
  earB.position.set(0.52, 1.19, -0.15);
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: "#cbe76b", emissive: "#9fbd43", emissiveIntensity: 0.7, roughness: 0.35 });
  [-0.13, 0.13].forEach((z) => {
    const eye = mesh(new THREE.SphereGeometry(0.043, 10, 7), eyeMaterial, false, false);
    eye.position.set(0.78, 0.99, z);
    group.add(eye);
  });
  [-0.2, 0.2].forEach((z) => {
    const frontLeg = mesh(new THREE.CapsuleGeometry(0.055, 0.38, 4, 8), fur);
    frontLeg.position.set(0.37, 0.22, z);
    group.add(frontLeg);
    const backLeg = frontLeg.clone();
    backLeg.position.x = -0.35;
    group.add(backLeg);
  });
  const tail = mesh(new THREE.TorusGeometry(0.42, 0.06, 8, 20, Math.PI * 1.35), fur);
  tail.position.set(-0.5, 0.7, 0);
  tail.rotation.x = Math.PI * 0.5;
  tail.rotation.z = -0.35;
  group.add(body, chest, head, muzzle, nose, earA, earB, tail);
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
  for (let index = 0; index < 16; index += 1) {
    const cat = createCat(catColors[index % catColors.length]);
    const angle = index * 2.399963;
    const radius = 3.2 + (index % 7) * 0.72;
    cat.position.set(Math.cos(angle) * radius, 0, 1.5 + Math.sin(angle) * radius * 0.72);
    cat.rotation.y = -angle + (index % 2 ? 0.45 : -0.18);
    cat.scale.setScalar(1.08 + (index % 5) * 0.1);
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

function createSafariCats(scene: THREE.Scene) {
  const catColors = ["#efe6d2", "#282a28", "#d98242", "#a99b83", "#e8d4b9", "#47433c", "#d9d5c8", "#8c5b3f"];
  const positions: Array<[number, number, number]> = [
    [-2, 10, 0.4], [8, 18, -0.8], [-21, 23, 0.7], [-31, 15, -0.2],
    [-48, 2, 0.9], [-55, -20, -0.6], [-45, -38, 0.35], [-29, -51, -0.8],
    [-7, -53, 0.6], [10, -45, -0.25], [24, -33, 0.85], [38, -22, -0.4],
    [51, -6, 0.5], [46, 13, -0.9], [24, 18, 0.25], [18, 41, -0.6],
    [31, 51, 0.75], [51, 44, -0.35], [57, 28, 0.5], [5, 55, -0.75],
    [-18, 50, 0.35], [-42, 39, -0.55], [-57, 20, 0.8], [2, -14, -0.25],
    [61, 7, 0.65], [52, -38, -0.45], [30, -55, 0.25], [3, -64, -0.75],
    [-23, -65, 0.55], [-64, -47, -0.3], [-68, 3, 0.7], [-34, 61, -0.55],
  ];
  const cats: CatVisual[] = [];
  positions.forEach(([x, z, rotation], index) => {
    const cat = createCat(catColors[index % catColors.length]);
    cat.position.set(x, 0, z);
    cat.rotation.y = rotation;
    cat.scale.setScalar(1.15 + (index % 4) * 0.11);
    cat.userData.animate = "sanctuaryCat";
    cat.userData.offset = index * 0.77;
    cat.userData.baseY = 0;
    cat.userData.startleUntil = 0;
    scene.add(cat);
    cats.push({ id: `safari-cat-${index + 1}`, group: cat, position: new THREE.Vector3(x, 0.7, z), hit: false });
  });
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
  const fieldPanel = material("#b7b8b0", 0.34, 0.62);
  const glass = new THREE.MeshPhysicalMaterial({ color: "#5b8491", roughness: 0.07, metalness: 0.12, transmission: 0.7, transparent: true, opacity: 0.82 });
  const cyanLight = new THREE.MeshStandardMaterial({ color: "#63f5ee", emissive: "#63f5ee", emissiveIntensity: 4, roughness: 0.25 });

  const undercarriage = mesh(new RoundedBoxGeometry(5.9, 0.58, 2.35, 5, 0.18), graphite);
  undercarriage.position.y = -0.05;
  root.add(undercarriage);
  const belly = mesh(new RoundedBoxGeometry(4.9, 0.78, 1.9, 5, 0.22), fieldPanel);
  belly.position.set(-0.15, 0.5, 0);
  root.add(belly);
  const hood = mesh(new RoundedBoxGeometry(1.85, 0.78, 1.88, 5, 0.2), fieldPanel);
  hood.position.set(1.85, 0.97, 0);
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

  const deck = mesh(new RoundedBoxGeometry(1.55, 0.34, 2, 4, 0.14), graphite);
  deck.position.set(-1.8, 0.94, 0);
  root.add(deck);
  const spoolA = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.52, 16), steel);
  const spoolB = spoolA.clone();
  spoolA.rotation.x = Math.PI * 0.5;
  spoolB.rotation.x = Math.PI * 0.5;
  spoolA.position.set(-1.95, 1.42, 0.46);
  spoolB.position.set(-1.95, 1.42, -0.46);
  root.add(spoolA, spoolB);

  const bumper = mesh(new RoundedBoxGeometry(0.34, 0.48, 2.55, 3, 0.1), steel);
  bumper.position.set(3.03, 0.14, 0);
  root.add(bumper);
  for (let index = 0; index < 8; index += 1) {
    const hazard = mesh(
      new THREE.BoxGeometry(0.035, 0.22, 0.22),
      material(index % 2 ? "#18221e" : "#d5ff50", 0.4, 0.38),
    );
    hazard.position.set(3.215, 0.13, -0.82 + index * 0.235);
    hazard.rotation.x = index % 2 ? 0.28 : -0.28;
    root.add(hazard);
  }
  const scanBlade = mesh(new RoundedBoxGeometry(0.22, 0.2, 2.82, 3, 0.06), graphite);
  scanBlade.position.set(3.3, -0.27, 0);
  scanBlade.rotation.z = -0.12;
  root.add(scanBlade);
  for (let index = 0; index < 7; index += 1) {
    const sensor = mesh(new THREE.SphereGeometry(0.045, 8, 6), cyanLight, false, false);
    sensor.position.set(3.42, -0.22, -0.95 + index * 0.315);
    root.add(sensor);
  }
  [-0.62, 0.62].forEach((z) => {
    const headlight = mesh(new THREE.BoxGeometry(0.07, 0.2, 0.38), cyanLight);
    headlight.position.set(3.22, 0.72, z);
    root.add(headlight);
    const light = new THREE.PointLight("#70fff4", 2.2, 9, 2);
    light.position.set(3.29, 0.75, z);
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
  const scanCone = mesh(
    new THREE.ConeGeometry(3.5, 3.2, 32, 1, true, -Math.PI * 0.18, Math.PI * 0.36),
    new THREE.MeshBasicMaterial({ color: "#63f5ee", transparent: true, opacity: 0.075, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }),
    false,
    false,
  ) as THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  scanCone.position.y = -0.82;
  scanCone.rotation.y = Math.PI;
  lidar.add(scanCone);
  root.add(lidar);

  const safetyOrange = new THREE.MeshStandardMaterial({ color: "#ff8a3d", emissive: "#ff572f", emissiveIntensity: 0.7, roughness: 0.32, metalness: 0.32 });
  const rearModule = mesh(new RoundedBoxGeometry(1.22, 1.28, 1.9, 4, 0.16), fieldPanel);
  rearModule.position.set(-2.38, 1.04, 0);
  root.add(rearModule);
  [-0.48, 0.48].forEach((z, index) => {
    const canister = mesh(new THREE.CylinderGeometry(0.29, 0.32, 1.03, 16), index ? limeDark : steel);
    canister.position.set(-2.5, 1.2, z);
    root.add(canister);
    const cap = mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 12), safetyOrange);
    cap.position.set(-2.5, 1.79, z);
    root.add(cap);
  });
  const exhaust = mesh(new THREE.CylinderGeometry(0.075, 0.1, 1.35, 10), graphite);
  exhaust.position.set(-2.35, 2.22, -0.72);
  root.add(exhaust);
  const exhaustCap = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.09, 10), steel);
  exhaustCap.position.set(-2.35, 2.91, -0.72);
  exhaustCap.rotation.z = 0.16;
  root.add(exhaustCap);
  [-0.62, 0.62].forEach((z) => {
    const tailLight = mesh(new THREE.BoxGeometry(0.07, 0.24, 0.32), safetyOrange, false, false);
    tailLight.position.set(-3.02, 0.75, z);
    root.add(tailLight);
  });

  const ventMaterial = new THREE.MeshStandardMaterial({ color: "#181a20", roughness: 0.72, metalness: 0.68 });
  [-1, 1].forEach((side) => {
    for (let index = 0; index < 5; index += 1) {
      const vent = mesh(new THREE.BoxGeometry(0.62, 0.055, 0.03), ventMaterial);
      vent.position.set(-0.6 + index * 0.04, 0.78 + index * 0.1, side * 0.928);
      vent.rotation.z = -0.42;
      root.add(vent);
    }
    const step = mesh(new RoundedBoxGeometry(0.72, 0.12, 0.28, 2, 0.03), steel);
    step.position.set(0.2, 0.18, side * 1.22);
    root.add(step);
  });

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
    new THREE.Vector3(2.05, -0.05, 1.3),
    new THREE.Vector3(2.05, -0.05, -1.3),
    new THREE.Vector3(0, -0.05, 1.3),
    new THREE.Vector3(0, -0.05, -1.3),
    new THREE.Vector3(-2.05, -0.05, 1.3),
    new THREE.Vector3(-2.05, -0.05, -1.3),
  ];
  const wheels: WheelVisual[] = [];
  wheelPositions.forEach((position, index) => {
    const container = new THREE.Group();
    container.position.copy(position);
    const roll = new THREE.Group();
    const tire = mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.5, 24), new THREE.MeshStandardMaterial({ color: "#25252d", roughness: 0.95, metalness: 0.03 }));
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
    for (let lugIndex = 0; lugIndex < 6; lugIndex += 1) {
      const lugAngle = (lugIndex / 6) * TAU;
      const lug = mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.565, 8), graphite, false, false);
      lug.rotation.x = Math.PI * 0.5;
      lug.position.set(Math.cos(lugAngle) * 0.17, Math.sin(lugAngle) * 0.17, 0);
      roll.add(lug);
    }
    container.add(roll);
    const strut = mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.65, 8), steel);
    strut.position.y = 0.55;
    strut.rotation.z = index < 2 ? -0.18 : 0.18;
    container.add(strut);
    const suspensionArm = mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.92, 8), graphite);
    suspensionArm.position.set(index < 2 ? -0.18 : 0.18, 0.34, 0);
    suspensionArm.rotation.z = index < 2 ? -0.72 : 0.72;
    container.add(suspensionArm);
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
  return { root, wheels, lidar, armJoint, scanCone, scanRing, dust };
}

function createTerrainTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#aeb59b";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < image.data.length; index += 4) {
    const grain = Math.floor((Math.random() - 0.5) * 28);
    image.data[index] = Math.max(0, Math.min(255, image.data[index] + grain));
    image.data[index + 1] = Math.max(0, Math.min(255, image.data[index + 1] + grain));
    image.data[index + 2] = Math.max(0, Math.min(255, image.data[index + 2] + Math.floor(grain * 0.72)));
  }
  context.putImageData(image, 0, 0);
  context.globalAlpha = 0.2;
  for (let index = 0; index < 1700; index += 1) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = 0.5 + Math.random() * 3.4;
    context.fillStyle = index % 4 === 0 ? "#5f6559" : index % 3 === 0 ? "#c9bd91" : "#777d68";
    context.beginPath();
    context.ellipse(x, y, radius * 1.8, radius, Math.random() * TAU, 0, TAU);
    context.fill();
  }
  context.globalAlpha = 0.11;
  context.strokeStyle = "#50564b";
  context.lineWidth = 1;
  for (let index = 0; index < 36; index += 1) {
    context.beginPath();
    const originX = Math.random() * 1024;
    const originY = Math.random() * 1024;
    context.moveTo(originX, originY);
    context.bezierCurveTo(originX + Math.random() * 90 - 45, originY + Math.random() * 70 - 35, originX + Math.random() * 140 - 70, originY + Math.random() * 110 - 55, originX + Math.random() * 190 - 95, originY + Math.random() * 150 - 75);
    context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  texture.anisotropy = 8;
  return texture;
}

function createTerrain(scene: THREE.Scene) {
  const terrainTexture = createTerrainTexture();
  const groundMaterial = new THREE.MeshStandardMaterial({ color: "#a4ae89", map: terrainTexture, bumpMap: terrainTexture, bumpScale: 0.085, roughness: 0.98, metalness: 0, vertexColors: true });
  const geometry = new THREE.PlaneGeometry(210, 210, 54, 54);
  geometry.rotateX(-Math.PI * 0.5);
  const colors: number[] = [];
  const colorA = new THREE.Color("#8da478");
  const colorB = new THREE.Color("#b39b79");
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const z = positions.getZ(index);
    positions.setY(index, Math.sin(x * 0.15) * Math.cos(z * 0.13) * 0.028);
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
    const radius = 112 + Math.random() * 18;
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

  const puddleMaterial = new THREE.MeshPhysicalMaterial({
    color: "#8ca8b7",
    roughness: 0.08,
    metalness: 0.18,
    transmission: 0.12,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const puddlePositions = [
    [-19, 29, 2.7, 1.3, 0.2],
    [7, 45, 3.6, 1.25, -0.42],
    [25, 20, 2.4, 1.05, 0.68],
    [-39, 6, 3.1, 1.3, -0.16],
    [-48, -31, 2.7, 1.18, 0.37],
    [10, -30, 3.4, 1.25, -0.58],
    [54, -12, 2.5, 1.1, 0.28],
    [47, 46, 3.1, 1.2, -0.24],
    [-66, 49, 2.8, 1.15, 0.54],
  ] as const;
  puddlePositions.forEach(([x, z, width, depth, rotation]) => {
    const puddle = mesh(new THREE.CircleGeometry(1, 40), puddleMaterial, false, false);
    puddle.rotation.x = -Math.PI * 0.5;
    puddle.rotation.z = rotation;
    puddle.position.set(x, 0.035, z);
    puddle.scale.set(width, depth, 1);
    scene.add(puddle);

    const wetEdge = mesh(
      new THREE.RingGeometry(0.98, 1.13, 40),
      new THREE.MeshBasicMaterial({ color: "#50594f", transparent: true, opacity: 0.25, depthWrite: false }),
      false,
      false,
    );
    wetEdge.rotation.x = -Math.PI * 0.5;
    wetEdge.rotation.z = rotation;
    wetEdge.position.set(x, 0.028, z);
    wetEdge.scale.set(width, depth, 1);
    scene.add(wetEdge);
  });

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

  // Layered, low-poly grass creates a continuous Safari landscape while
  // keeping the roads and district pads readable.
  const grassGeometry = new THREE.ConeGeometry(0.18, 0.96, 3);
  ["#789254", "#91a963", "#627d49"].forEach((grassColor, layer) => {
    const count = 430;
    const grass = new THREE.InstancedMesh(grassGeometry, material(grassColor, 1, 0), count);
    grass.castShadow = false;
    grass.receiveShadow = true;
    let placed = 0;
    while (placed < count) {
      const x = -92 + Math.random() * 184;
      const z = -92 + Math.random() * 184;
      const nearZone = expeditionZones.some((zone) => Math.hypot(zone.x - x, zone.z - z) < zone.radius + 2.5);
      const nearSpawn = Math.hypot(x - SPAWN.x, z - SPAWN.z) < 7;
      if (nearZone || nearSpawn) continue;
      const height = 0.55 + Math.random() * 1.2;
      transform.position.set(x, height * 0.46, z);
      transform.rotation.set((Math.random() - 0.5) * 0.12, Math.random() * TAU, (Math.random() - 0.5) * 0.22);
      transform.scale.set(0.65 + Math.random() * 0.85, height, 0.65 + Math.random() * 0.85);
      transform.updateMatrix();
      grass.setMatrixAt(placed, transform.matrix);
      placed += 1;
    }
    grass.instanceMatrix.needsUpdate = true;
    grass.userData.windLayer = layer;
    scene.add(grass);
  });

  const flowerAnchors = [
    new THREE.Vector2(-49, 53),
    new THREE.Vector2(49, 60),
    new THREE.Vector2(58, -50),
    new THREE.Vector2(-50, -57),
    new THREE.Vector2(14, 58),
  ];
  const flowerCount = 180;
  const stems = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.018, 0.026, 0.54, 5),
    material("#607c4a", 1, 0),
    flowerCount,
  );
  const flowerHeads = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(0.09, 0),
    new THREE.MeshStandardMaterial({ color: "#e6d6ef", emissive: "#a98fc2", emissiveIntensity: 0.18, roughness: 0.82 }),
    flowerCount,
  );
  stems.castShadow = false;
  flowerHeads.castShadow = false;
  for (let index = 0; index < flowerCount; index += 1) {
    const anchor = flowerAnchors[index % flowerAnchors.length];
    const angle = Math.random() * TAU;
    const radius = 2 + Math.pow(Math.random(), 0.65) * 16;
    const x = anchor.x + Math.cos(angle) * radius;
    const z = anchor.y + Math.sin(angle) * radius;
    const height = 0.32 + Math.random() * 0.42;
    transform.position.set(x, height * 0.5, z);
    transform.rotation.set((Math.random() - 0.5) * 0.1, Math.random() * TAU, (Math.random() - 0.5) * 0.12);
    transform.scale.set(0.75 + Math.random() * 0.45, height / 0.54, 0.75 + Math.random() * 0.45);
    transform.updateMatrix();
    stems.setMatrixAt(index, transform.matrix);
    transform.position.set(x, height + 0.02, z);
    transform.rotation.set(Math.random() * 0.6, Math.random() * TAU, Math.random() * 0.6);
    const headScale = 0.7 + Math.random() * 0.75;
    transform.scale.setScalar(headScale);
    transform.updateMatrix();
    flowerHeads.setMatrixAt(index, transform.matrix);
  }
  stems.instanceMatrix.needsUpdate = true;
  flowerHeads.instanceMatrix.needsUpdate = true;
  scene.add(stems, flowerHeads);

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

function createOperationsGateway(scene: THREE.Scene) {
  const base = new THREE.Vector3(-16.5, 0, 9.5);
  const lateral = new THREE.Vector3(0.63, 0, -0.78);
  const frameMaterial = material("#afb1b0", 0.3, 0.82);
  fieldOperations.forEach((operation, index) => {
    const group = new THREE.Group();
    group.position.copy(base).addScaledVector(lateral, (index - 1) * 4.5);
    const plinth = mesh(new THREE.CylinderGeometry(1.18, 1.42, 0.28, 24), frameMaterial);
    plinth.position.y = 0.14;
    group.add(plinth);
    const halo = mesh(
      new THREE.TorusGeometry(1.38, 0.07, 8, 48),
      new THREE.MeshBasicMaterial({ color: operation.color, transparent: true, opacity: 0.82 }),
      false,
      false,
    );
    halo.rotation.x = Math.PI * 0.5;
    halo.position.y = 0.31;
    group.add(halo);
    [-0.78, 0.78].forEach((offset) => {
      const pylon = mesh(new THREE.CylinderGeometry(0.09, 0.16, 4.6, 9), frameMaterial);
      pylon.position.set(offset, 2.45, 0);
      group.add(pylon);
      const marker = mesh(
        new THREE.OctahedronGeometry(0.22, 0),
        new THREE.MeshStandardMaterial({ color: operation.color, emissive: operation.color, emissiveIntensity: 3.2 }),
        false,
        false,
      );
      marker.position.set(offset, 4.82, 0);
      group.add(marker);
    });
    const lintel = mesh(new RoundedBoxGeometry(1.9, 0.18, 0.18, 2, 0.03), frameMaterial);
    lintel.position.y = 4.5;
    group.add(lintel);
    const beacon = mesh(
      new THREE.CylinderGeometry(0.11, 0.72, 12, 20, 1, true),
      new THREE.MeshBasicMaterial({ color: operation.color, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }),
      false,
      false,
    );
    beacon.position.y = 6;
    group.add(beacon);
    const labelTexture = createTextTexture(operation.code, operation.title, "#fbfaf6", operation.color);
    const label = mesh(
      new THREE.PlaneGeometry(3.4, 0.85),
      new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
      false,
      false,
    );
    label.position.y = 5.65;
    label.userData.faceCamera = true;
    group.add(label);
    scene.add(group);
  });

  const gateTexture = createTextTexture("FIELD OPERATIONS", "SCAN · REASON · PRINT", "#fbfaf6", "#d5ff50");
  const gateLabel = mesh(
    new THREE.PlaneGeometry(7.6, 1.9),
    new THREE.MeshBasicMaterial({ map: gateTexture, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
    false,
    false,
  );
  gateLabel.position.set(base.x, 8.6, base.z);
  gateLabel.userData.faceCamera = true;
  scene.add(gateLabel);
}

function createFieldOperationVisual(scene: THREE.Scene, operation: FieldOperation): OperationVisual {
  const checkpoints = operation.checkpoints.map((checkpoint, index) => {
    const group = new THREE.Group();
    group.position.set(checkpoint.x, 0.08, checkpoint.z);
    group.visible = false;
    const base = mesh(
      new THREE.CylinderGeometry(1.45, 1.68, 0.22, 24),
      new THREE.MeshStandardMaterial({ color: "#31313a", roughness: 0.54, metalness: 0.55 }),
    );
    base.position.y = 0.08;
    group.add(base);
    const ring = mesh(
      new THREE.TorusGeometry(1.5, 0.075, 8, 48),
      new THREE.MeshBasicMaterial({ color: operation.color, transparent: true, opacity: 0.78 }),
      false,
      false,
    ) as THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;
    ring.rotation.x = Math.PI * 0.5;
    ring.position.y = 0.22;
    group.add(ring);
    const mast = mesh(new THREE.CylinderGeometry(0.07, 0.11, 2.7, 10), material("#7f828b", 0.3, 0.86));
    mast.position.y = 1.45;
    group.add(mast);
    const sensor = mesh(
      new THREE.OctahedronGeometry(0.34, 0),
      new THREE.MeshStandardMaterial({ color: operation.color, emissive: operation.color, emissiveIntensity: 3.4, roughness: 0.24 }),
      false,
      false,
    );
    sensor.position.y = 2.9;
    group.add(sensor);
    const beam = mesh(
      new THREE.CylinderGeometry(0.04, 0.62, 5.8, 16, 1, true),
      new THREE.MeshBasicMaterial({ color: operation.color, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }),
      false,
      false,
    ) as THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial>;
    beam.position.y = 5.65;
    group.add(beam);
    const labelTexture = createTextTexture(checkpoint.label, `${operation.code} · SCAN ${index + 1}/${operation.checkpoints.length}`, "#fbfaf6", operation.color);
    const label = mesh(
      new THREE.PlaneGeometry(3.8, 0.95),
      new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
      false,
      false,
    );
    label.position.set(0, 3.65, 0);
    label.userData.faceCamera = true;
    group.add(label);
    scene.add(group);
    return { id: checkpoint.id, group, ring, beam };
  });

  const buildSite = new THREE.Group();
  buildSite.position.set(operation.buildSite.x, 0.08, operation.buildSite.z);
  buildSite.visible = false;
  const buildBase = mesh(
    new THREE.CylinderGeometry(operation.buildSite.radius * 0.74, operation.buildSite.radius * 0.82, 0.12, 40),
    new THREE.MeshStandardMaterial({ color: "#343641", roughness: 0.62, metalness: 0.44, transparent: true, opacity: 0.88 }),
    false,
    true,
  );
  buildSite.add(buildBase);
  const buildRing = mesh(
    new THREE.TorusGeometry(operation.buildSite.radius * 0.78, 0.11, 10, 72),
    new THREE.MeshBasicMaterial({ color: operation.color, transparent: true, opacity: 0.82 }),
    false,
    false,
  ) as THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;
  buildRing.rotation.x = Math.PI * 0.5;
  buildRing.position.y = 0.13;
  buildSite.add(buildRing);
  [0.34, 0.58].forEach((scale, index) => {
    const inner = mesh(
      new THREE.RingGeometry(operation.buildSite.radius * scale - 0.04, operation.buildSite.radius * scale + 0.04, 64),
      new THREE.MeshBasicMaterial({ color: operation.color, transparent: true, opacity: 0.24 - index * 0.05, side: THREE.DoubleSide }),
      false,
      false,
    );
    inner.rotation.x = -Math.PI * 0.5;
    inner.position.y = 0.15;
    buildSite.add(inner);
  });
  const buildTexture = createTextTexture("PRINT HERE", `${operation.code} · FABRICATION PAD`, "#fbfaf6", operation.color);
  const buildLabel = mesh(
    new THREE.PlaneGeometry(5.2, 1.3),
    new THREE.MeshBasicMaterial({ map: buildTexture, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
    false,
    false,
  );
  buildLabel.position.set(0, 2.65, 0);
  buildLabel.userData.faceCamera = true;
  buildSite.add(buildLabel);
  scene.add(buildSite);
  return { operation, checkpoints, buildSite, buildRing };
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
  scene.background = new THREE.Color("#a39caf");
  scene.fog = new THREE.FogExp2("#aaa3b7", 0.0046);
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

  const cloudCanvas = document.createElement("canvas");
  cloudCanvas.width = 512;
  cloudCanvas.height = 192;
  const cloudContext = cloudCanvas.getContext("2d")!;
  const cloudPuffs = [
    [110, 112, 86],
    [184, 78, 104],
    [278, 104, 122],
    [372, 84, 91],
    [438, 116, 73],
  ];
  cloudPuffs.forEach(([x, y, radius]) => {
    const cloudGlow = cloudContext.createRadialGradient(x, y, 2, x, y, radius);
    cloudGlow.addColorStop(0, "rgba(236,232,247,.72)");
    cloudGlow.addColorStop(0.46, "rgba(136,119,157,.48)");
    cloudGlow.addColorStop(1, "rgba(75,57,90,0)");
    cloudContext.fillStyle = cloudGlow;
    cloudContext.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  });
  const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
  cloudTexture.colorSpace = THREE.SRGBColorSpace;
  for (let index = 0; index < 12; index += 1) {
    const angle = (index / 12) * TAU + 0.16;
    const cloud = new THREE.Sprite(new THREE.SpriteMaterial({
      map: cloudTexture,
      color: index % 3 === 0 ? "#f2eef8" : "#a99bb7",
      transparent: true,
      opacity: index % 3 === 0 ? 0.24 : 0.32,
      depthWrite: false,
      fog: false,
    }));
    const radius = 150 + (index % 3) * 7;
    cloud.position.set(Math.cos(angle) * radius, 28 + (index % 4) * 5, Math.sin(angle) * radius);
    cloud.scale.set(66 + (index % 4) * 11, 19 + (index % 3) * 4, 1);
    scene.add(cloud);
  }
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
  const points = createPointsSprite(250, "#d5ff50", "FIELD RECEIPT");
  points.position.y = 2.05;
  points.userData.faceCamera = true;
  group.add(points);
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
  renderer.toneMappingExposure = 1.52;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  createSky(scene);
  createTerrain(scene);
  createLandscapeDetails(scene);
  const operationVisuals = fieldOperations.map((operation) => createFieldOperationVisual(scene, operation));
  const windStreaks = createWindStreaks(scene);
  callbacks.onProgress(0.41, "MAPPING CYPRUS TERRAIN");

  const hemisphere = new THREE.HemisphereLight("#eeeaff", "#948165", 2.9);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight("#fffef8", 5.1);
  sun.position.copy(SUN_OFFSET);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -34;
  sun.shadow.camera.right = 34;
  sun.shadow.camera.top = 34;
  sun.shadow.camera.bottom = -34;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 110;
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 0.025;
  scene.add(sun);

  const driveZones = expeditionZones;
  const roadPoints = [
    new THREE.Vector2(SPAWN.x, SPAWN.z),
    ...driveZones.map((zone) => new THREE.Vector2(zone.x, zone.z)),
    new THREE.Vector2(SPAWN.x, SPAWN.z),
  ];
  for (let index = 0; index < roadPoints.length - 1; index += 1) addRoad(scene, roadPoints[index], roadPoints[index + 1], 5.4);
  const sanctuaryCats = [
    ...expeditionZones.flatMap((zone) => createZoneWorld(scene, zone)),
    ...createSafariCats(scene),
  ];
  addAreaMarker(scene, "SOCIAL PLAZA", "LINKEDIN · EMAIL · ORCID", -8, 42, "#a6ce39", Math.PI);
  addAreaMarker(scene, "CAT SAFARI", "AVOID THE CATS · -150 PER STRIKE", 4, 9, "#ff9cae", -0.35);
  const billboardVisuals = billboards.map((link) => createAdvertisingBillboard(scene, link));
  const oracleVisuals = oracleBlocks.map((block) => createOracleBlock(scene, block.id, block.x, block.z, block.rotation));
  callbacks.onProgress(0.62, "RAISING SAFARI BILLBOARDS");

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
  billboards.forEach((link) => addBarrier(link.x, 3.1, link.z, 5.4, 3.1, 0.28, link.rotation));
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
    const pointLabel = event.kind === "definition" ? "REVEAL ANSWER" : event.kind === "support" || event.kind === "social" ? "OPEN SELECTED LINK" : "DISCOVER";
    const points = createPointsSprite(event.points, event.color, pointLabel);
    points.position.set(0, height * 0.78 + 1.05, 0);
    points.userData.faceCamera = true;
    group.add(points);
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

  socialLinks.forEach((link) => {
    const isOrcid = link.icon === "orcid";
    addKnockable({ ...link, kind: "social", points: isOrcid ? 250 : 90 }, link.x, link.z, link.rotation, isOrcid ? 4.4 : 3.6, isOrcid ? 4.8 : 4.2, isOrcid ? 1.65 : 1.45, isOrcid ? 0.82 : 0.62);
  });
  supportLinks.forEach((link) => addKnockable({ ...link, kind: "support", points: link.points ?? 125 }, link.x, link.z, link.rotation, 3.9, 4.15, 1.45, 0.66));
  knowledgeSigns.forEach((sign) => addKnockable({ ...sign, kind: "definition", points: sign.points ?? 150 }, sign.x, sign.z, sign.rotation, 5.2, 3.15, 0.46, 0.34));
  articleSignals.forEach((article) => addKnockable({ ...article, kind: "article", points: 140 }, article.x, article.z, article.rotation, 5, 3.3, 1.2, 0.66));
  const demolitionWords = ["NO MARKET", "TOO EARLY", "STAY IN YOUR LANE", "CREDENTIALS"];
  demolitionWords.forEach((label, index) => {
    const event: FieldObjectEvent = {
      id: `demo-${index}`,
      label,
      eyebrow: "KNOCK IT DOWN",
      kind: "demolition",
      color: index % 2 ? "#ff765e" : "#d5ff50",
      points: 35,
    };
    addKnockable(event, -20 - index * 5.1, 6 - index * 5.2, index % 2 ? 0.09 : -0.07, 4.2, 3.5, 1.35, 0.55);
  });

  const chassisBody: RigidBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(SPAWN.x, SPAWN.y, SPAWN.z)
      .setCanSleep(false)
      .setLinearDamping(0.14)
      .setAngularDamping(0.82)
      .setAdditionalMassProperties(
        4,
        { x: 0, y: -0.72, z: 0 },
        { x: 5.2, y: 8.5, z: 5.2 },
        { x: 0, y: 0, z: 0, w: 1 },
      ),
  );
  chassisBody.setRotation({ x: 0, y: Math.sin(SPAWN_YAW * 0.5), z: 0, w: Math.cos(SPAWN_YAW * 0.5) }, true);
  chassisBody.setEnabledRotations(true, true, true, true);
  const chassisCollider = RAPIER.ColliderDesc.roundCuboid(2.85, 0.48, 1.18, 0.16)
    .setTranslation(0, -0.18, 0)
    .setMass(4.8)
    .setFriction(0.45)
    .setRestitution(0.08);
  world.createCollider(chassisCollider, chassisBody);
  const climbingNose = RAPIER.ColliderDesc.convexHull(new Float32Array([
    2.05, -0.6, -1.06,
    2.05, -0.6, 1.06,
    2.05, 0.14, -1.06,
    2.05, 0.14, 1.06,
    3.45, -0.38, -1.06,
    3.45, -0.38, 1.06,
  ]));
  if (climbingNose) {
    world.createCollider(
      climbingNose.setMass(0.35).setFriction(0.26).setRestitution(0.04),
      chassisBody,
    );
  }
  const vehicleController: DynamicRayCastVehicleController = world.createVehicleController(chassisBody);
  vehicleController.indexUpAxis = 1;

  const wheelConnections = [
    { x: 2.05, y: 0.05, z: 1.24 },
    { x: 2.05, y: 0.05, z: -1.24 },
    { x: 0, y: 0.05, z: 1.24 },
    { x: 0, y: 0.05, z: -1.24 },
    { x: -2.05, y: 0.05, z: 1.24 },
    { x: -2.05, y: 0.05, z: -1.24 },
  ];
  wheelConnections.forEach((connection) => {
    vehicleController.addWheel(connection, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, 0.72, 0.62);
  });
  for (let index = 0; index < wheelConnections.length; index += 1) {
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
  let activeOperationId: string | null = null;
  let activeOperationStage: OperationStage = "scan";
  const collectedOperationCheckpoints = new Set<string>();
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
    chassisBody.setRotation({ x: 0, y: Math.sin(SPAWN_YAW * 0.5), z: 0, w: Math.cos(SPAWN_YAW * 0.5) }, true);
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
    billboardVisuals.forEach((billboard) => { billboard.hit = false; });
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
    activeOperationId = null;
    activeOperationStage = "scan";
    collectedOperationCheckpoints.clear();
    operationVisuals.forEach((visual) => {
      visual.buildSite.visible = false;
      visual.checkpoints.forEach((checkpoint) => {
        checkpoint.group.visible = false;
        checkpoint.group.scale.setScalar(1);
      });
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
    const activeOperation = fieldOperations.find((operation) => operation.id === activeOperationId);
    const objectivePrint = activeOperation && activeOperationStage === "print" && Math.hypot(translation.x - activeOperation.buildSite.x, translation.z - activeOperation.buildSite.z) < activeOperation.buildSite.radius + 1.8;
    const group = createPrintedStructure(scene, position, objectivePrint ? activeOperation.color : "#d5ff50");
    printed.push({ group, born: now });
    printedCount += 1;
    printCooldown = now + 1050;
    callbacks.onPrint();
    if (objectivePrint && activeOperation) {
      callbacks.onOperationPrint(activeOperation.id);
      activeOperationId = null;
      operationVisuals.forEach((visual) => {
        visual.buildSite.visible = false;
        visual.checkpoints.forEach((checkpoint) => { checkpoint.group.visible = false; });
      });
    }
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
    vehicleController.setWheelSteering(4, -steerAngle * 0.16);
    vehicleController.setWheelSteering(5, -steerAngle * 0.16);
    for (let index = 0; index < wheelConnections.length; index += 1) {
      vehicleController.setWheelEngineForce(index, engineForce * (index < 2 ? 0.28 : 0.55));
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
      wheel.container.rotation.y = index < 2 ? steering : index >= 4 ? -steering * 0.16 : 0;
      wheel.roll.rotation.z = vehicleController.wheelRotation(index) ?? 0;
      wheel.strut.scale.y = Math.max(0.28, 1.12 - suspension * 0.65);
    });
    rover.lidar.rotation.y += delta * (actions.boost ? 7.2 : 3.8);
    rover.scanCone.material.opacity = 0.055 + Math.sin(elapsed * 0.005) * 0.018;
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
      if (object.userData.faceCamera) object.quaternion.copy(camera.quaternion);
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

    operationVisuals.forEach((visual, operationIndex) => {
      const active = visual.operation.id === activeOperationId;
      visual.buildSite.visible = active && activeOperationStage === "print";
      if (visual.buildSite.visible) {
        visual.buildRing.rotation.z += delta * 0.22;
        const pulse = 1 + Math.sin(elapsed * 0.0032) * 0.035;
        visual.buildSite.scale.set(pulse, 1, pulse);
      }
      visual.checkpoints.forEach((checkpoint, checkpointIndex) => {
        const key = `${visual.operation.id}:${checkpoint.id}`;
        const collected = collectedOperationCheckpoints.has(key);
        checkpoint.group.visible = active && activeOperationStage === "scan" && !collected;
        if (!checkpoint.group.visible) return;
        checkpoint.ring.rotation.z += delta * (0.35 + checkpointIndex * 0.06);
        checkpoint.beam.material.opacity = 0.07 + Math.sin(elapsed * 0.003 + checkpointIndex + operationIndex) * 0.035;
        checkpoint.group.position.y = 0.08 + Math.sin(elapsed * 0.002 + checkpointIndex) * 0.045;
        if (Math.hypot(checkpoint.group.position.x - translation.x, checkpoint.group.position.z - translation.z) < 3.1) {
          collectedOperationCheckpoints.add(key);
          checkpoint.group.visible = false;
          callbacks.onOperationCheckpoint(visual.operation.id, checkpoint.id);
        }
      });
    });

    printed.forEach((item) => {
      const age = elapsed - item.born;
      item.group.scale.y = THREE.MathUtils.lerp(item.group.scale.y, 1, 0.09);
      item.group.rotation.y += delta * 0.09;
      if (age > 28000) item.group.visible = false;
    });

    roverForward.copy(FORWARD).applyQuaternion(roverQuaternion).setY(0).normalize();
    if (pointerMode !== "camera" && performance.now() - lastPointerMove > 850) cameraYawOffset *= Math.pow(0.84, delta * 60);
    followDirection.copy(roverForward).applyAxisAngle(worldUp, cameraYawOffset - 0.18);
    cameraDesired.copy(roverPosition).addScaledVector(followDirection, -cameraDistance).addScaledVector(UP, cameraDistance * 0.48);
    camera.position.lerp(cameraDesired, 1 - Math.pow(0.0015, delta));
    cameraFocusDesired.copy(roverPosition).addScaledVector(UP, 1.1).addScaledVector(roverForward, 1.6 + Math.min(speed * 0.12, 2.4));
    cameraTarget.lerp(cameraFocusDesired, 1 - Math.pow(0.005, delta));
    camera.lookAt(cameraTarget);
    camera.fov = THREE.MathUtils.lerp(camera.fov, 54 + Math.min(speed * 0.42, actions.boost ? 9 : 5), 1 - Math.pow(0.025, delta));
    camera.updateProjectionMatrix();

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
    billboardVisuals.forEach((billboard) => {
      if (billboard.hit) return;
      if (Math.hypot(billboard.position.x - translation.x, billboard.position.z - translation.z) < 7.2) {
        billboard.hit = true;
        callbacks.onKnockdown(billboard.event);
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
    setOperation: (operationId, stage = "scan") => {
      activeOperationId = operationId;
      activeOperationStage = stage;
      operationVisuals.forEach((visual) => {
        const active = visual.operation.id === operationId;
        visual.buildSite.visible = active && stage === "print";
        visual.checkpoints.forEach((checkpoint) => {
          const key = `${visual.operation.id}:${checkpoint.id}`;
          checkpoint.group.visible = active && stage === "scan" && !collectedOperationCheckpoints.has(key);
        });
      });
    },
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
