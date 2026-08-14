"use client";

/* eslint-disable @next/next/no-img-element -- portrait, logo, and sanctuary photography are intentional */

import { useCallback, useEffect, useRef, useState } from "react";
import { createSwoveeExperience } from "./engine";
import { expeditionZones, mapExtent, markedZones, type ExpeditionZone } from "./zones";
import type { DriveAction, ExperienceHandle, FieldObjectEvent, Telemetry } from "./types";
import KpCompanion from "./KpCompanion";

const initialTelemetry: Telemetry = {
  speed: 0,
  heading: 0,
  x: -7,
  z: 17,
  boosting: false,
  scanning: true,
};

const tiniesZone = expeditionZones.find((zone) => zone.id === "tinies")!;
const CAT_PENALTY = 150;
const DEMOLITION_QUIPS: Record<string, string> = {
  "NO MARKET": "Market research complete: there was, in fact, a market. It was hiding behind this block.",
  "TOO EARLY": "Early is just on time with worse catering.",
  "STAY IN YOUR LANE": "Lane guidance declined. The Rovalizer brought its own lane.",
  CREDENTIALS: "Credential check complete. The machine remains unmoved by LinkedIn endorsements.",
};

const WORLD_ROADS: Array<[[number, number], [number, number]]> = (() => {
  const spawn: [number, number] = [-7, 17];
  const loop = [spawn, ...expeditionZones.map((zone) => [zone.x, zone.z] as [number, number]), spawn];
  return loop.slice(0, -1).map((point, index) => [point, loop[index + 1]]);
})();

function isInteriorPage(href: string) {
  return href.startsWith("/");
}

function mapPercent(value: number) {
  return ((value + mapExtent) / (mapExtent * 2)) * 100;
}

function mapRoadStyle(from: [number, number], to: [number, number]) {
  const left = mapPercent(from[0]);
  const top = mapPercent(from[1]);
  const deltaX = mapPercent(to[0]) - left;
  const deltaY = mapPercent(to[1]) - top;
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${Math.hypot(deltaX, deltaY)}%`,
    transform: `rotate(${Math.atan2(deltaY, deltaX) * 180 / Math.PI}deg)`,
  } as React.CSSProperties;
}

function TouchButton({
  action,
  label,
  className = "",
  setAction,
}: {
  action: DriveAction;
  label: string;
  className?: string;
  setAction: (action: DriveAction, active: boolean) => void;
}) {
  const pointerRef = useRef<number | null>(null);

  const release = useCallback((pointerId?: number) => {
    if (pointerRef.current === null) return;
    if (pointerId !== undefined && pointerId !== pointerRef.current) return;
    pointerRef.current = null;
    setAction(action, false);
  }, [action, setAction]);

  useEffect(() => {
    const onPointerUp = (event: PointerEvent) => release(event.pointerId);
    const onBlur = () => release();
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onBlur);
      setAction(action, false);
    };
  }, [action, release, setAction]);

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onPointerDown={(event) => {
        event.preventDefault();
        pointerRef.current = event.pointerId;
        setAction(action, true);
        try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* iOS fallback uses window listeners */ }
      }}
      onPointerUp={(event) => release(event.pointerId)}
      onPointerCancel={(event) => release(event.pointerId)}
      onLostPointerCapture={(event) => release(event.pointerId)}
      onContextMenu={(event) => event.preventDefault()}
    >
      {label}
    </button>
  );
}

export default function SwoveeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const experienceRef = useRef<ExperienceHandle | null>(null);
  const initializationRef = useRef<Promise<ExperienceHandle> | null>(null);
  const activeRef = useRef(false);
  const disposedRef = useRef(false);
  const startedRef = useRef(false);
  const modalOpenRef = useRef(false);
  const nearbyRef = useRef<string | null>(null);
  const lastCatStrikeRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState("WAKING THE ROVALIZER");
  const [started, setStarted] = useState(false);
  const [telemetry, setTelemetry] = useState<Telemetry>(initialTelemetry);
  const [nearbyId, setNearbyId] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [catPenalty, setCatPenalty] = useState(0);
  const [project, setProject] = useState<ExpeditionZone | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportClaimed, setSupportClaimed] = useState(false);
  const [oracleOpen, setOracleOpen] = useState(false);
  const [oracleFound, setOracleFound] = useState(false);
  const [fieldLink, setFieldLink] = useState<FieldObjectEvent | null>(null);
  const [knockedDown, setKnockedDown] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [muted, setMuted] = useState(false);
  const [notification, setNotification] = useState("FOUR DISTRICTS · ONE BODY OF WORK");

  const totalScore = Math.max(0, score - catPenalty);
  const nearbyZone = expeditionZones.find((zone) => zone.id === nearbyId) ?? null;
  const mapPlayerX = mapPercent(telemetry.x);
  const mapPlayerY = mapPercent(telemetry.z);

  useEffect(() => { startedRef.current = started; }, [started]);
  useEffect(() => { nearbyRef.current = nearbyId; }, [nearbyId]);
  useEffect(() => { experienceRef.current?.setMuted(muted); }, [muted]);
  useEffect(() => {
    modalOpenRef.current = Boolean(project || supportOpen || oracleOpen || fieldLink || showMap);
  }, [project, supportOpen, oracleOpen, fieldLink, showMap]);

  useEffect(() => {
    const awardDonation = () => {
      setSupportClaimed((current) => {
        if (current) return current;
        setCatPenalty(0);
        setScore((value) => value + (tiniesZone.support?.bonus ?? 1000));
        setNotification("$1 DONATION VERIFIED · THANK YOU FOR FEEDING THE 90+");
        window.localStorage.removeItem("kp-tinies-donation-start");
        window.localStorage.removeItem("kp-tinies-donation-verified");
        return true;
      });
    };
    const checkDonation = () => {
      const startedAt = Number(window.localStorage.getItem("kp-tinies-donation-start") || 0);
      const verifiedAt = Number(window.localStorage.getItem("kp-tinies-donation-verified") || 0);
      if (startedAt > 0 && verifiedAt >= startedAt) awardDonation();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "kp-tinies-donation-verified") checkDonation();
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === "kp-tinies-donation-verified") awardDonation();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("message", onMessage);
    checkDonation();
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    activeRef.current = true;
    let localExperience: ExperienceHandle | null = null;
    const dispose = (experience: ExperienceHandle) => {
      if (disposedRef.current) return;
      disposedRef.current = true;
      experience.destroy();
    };

    if (!initializationRef.current) {
      disposedRef.current = false;
      initializationRef.current = createSwoveeExperience(canvasRef.current, {
        onProgress: (progress, label) => {
          if (!activeRef.current) return;
          setLoadingProgress(progress);
          setLoadingLabel(label);
        },
        onReady: () => { if (activeRef.current) setReady(true); },
        onTelemetry: (next) => { if (activeRef.current) setTelemetry(next); },
        onProximity: (zoneId) => {
          if (!activeRef.current) return;
          setNearbyId(zoneId);
          if (!zoneId) return;
          const zone = expeditionZones.find((item) => item.id === zoneId);
          if (!zone) return;
          setDiscovered((current) => {
            if (current.includes(zoneId)) return current;
            setScore((value) => value + 100);
            setNotification(`${zone.title.toUpperCase()} DISCOVERED · +100`);
            return [...current, zoneId];
          });
        },
        onPrint: () => undefined,
        onOracle: () => {
          if (!activeRef.current) return;
          setOracleFound((current) => {
            if (current) return current;
            setScore((value) => value + 250);
            setNotification("THE ORACLE · RECEIPT FOUND +250");
            setOracleOpen(true);
            experienceRef.current?.pause();
            return true;
          });
        },
        onKnockdown: (item) => {
          if (!activeRef.current) return;
          setKnockedDown((current) => {
            if (current.includes(item.id)) return current;
            setScore((value) => value + item.points);
            setNotification(`${item.kind === "demolition" ? "ASSUMPTION FLATTENED" : "SIGNAL FOUND"} · +${item.points}`);
            setFieldLink(item);
            experienceRef.current?.pause();
            return [...current, item.id];
          });
        },
        onCatHit: () => {
          if (!activeRef.current) return;
          const now = Date.now();
          if (now - lastCatStrikeRef.current < 1500) return;
          lastCatStrikeRef.current = now;
          setCatPenalty((value) => value + CAT_PENALTY);
          setNotification(`CAT SAFETY STRIKE · -${CAT_PENALTY} · $1 RESTORES THE POINTS`);
        },
        onOperationCheckpoint: () => undefined,
        onOperationPrint: () => undefined,
      });
    }

    initializationRef.current
      .then((experience) => {
        if (!activeRef.current) {
          dispose(experience);
          return;
        }
        localExperience = experience;
        experienceRef.current = experience;
      })
      .catch((error: unknown) => {
        console.error(error);
        setLoadingLabel("THE ROVALIZER COULD NOT START");
      });

    return () => {
      activeRef.current = false;
      if (localExperience) dispose(localExperience);
      if (experienceRef.current === localExperience) experienceRef.current = null;
    };
  }, []);

  const setAction = useCallback((action: DriveAction, active: boolean) => {
    experienceRef.current?.setAction(action, active);
  }, []);

  const closeOverlay = useCallback(() => {
    setProject(null);
    setSupportOpen(false);
    setOracleOpen(false);
    setFieldLink(null);
    setShowMap(false);
    if (startedRef.current) experienceRef.current?.start();
  }, []);

  const openZone = useCallback((zone: ExpeditionZone) => {
    setProject(zone);
    experienceRef.current?.pause();
  }, []);

  const resetExperience = useCallback(() => {
    setDiscovered([]);
    setScore(0);
    setCatPenalty(0);
    setKnockedDown([]);
    setOracleFound(false);
    setNotification("ROVALIZER RECOVERED");
    experienceRef.current?.reset();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((event.target as HTMLElement)?.tagName)) return;
      const key = event.key.toLowerCase();
      if ((key === "e" || key === "enter") && startedRef.current && !modalOpenRef.current) {
        const zone = expeditionZones.find((item) => item.id === nearbyRef.current);
        if (zone) {
          event.preventDefault();
          openZone(zone);
        }
      }
      if (key === "m" && startedRef.current) {
        event.preventDefault();
        setShowMap((current) => {
          if (current) experienceRef.current?.start();
          else experienceRef.current?.pause();
          return !current;
        });
      }
      if (key === "r" && startedRef.current && !modalOpenRef.current) resetExperience();
      if (key === "escape" && modalOpenRef.current) closeOverlay();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOverlay, openZone, resetExperience]);

  const begin = () => {
    setStarted(true);
    experienceRef.current?.start();
    setNotification("DRIVE · DISCOVER · OPEN THE WORK");
  };

  const jumpToZone = (zone: ExpeditionZone) => {
    experienceRef.current?.teleportTo(zone.x, zone.z + zone.radius + 4);
    setShowMap(false);
    setNotification(`${zone.title.toUpperCase()} · ARRIVING`);
    experienceRef.current?.start();
  };

  const beginSupportDonation = () => {
    window.localStorage.setItem("kp-tinies-donation-start", String(Date.now()));
    setNotification("SECURE $1 CHECKOUT OPENED");
  };

  return (
    <main className={`swovee-game ${started ? "is-started" : ""} ${muted ? "is-muted" : ""}`}>
      <canvas ref={canvasRef} className="game-canvas" aria-label="Three-dimensional Swovee Rovalizer experience" />
      <div className="screen-vignette" aria-hidden="true" />

      <header className="game-header">
        <div className="game-brand">
          <span>KAREN PENDERGRASS / SWOVEE</span>
          <strong>DRIVE THE FRONTIER</strong>
        </div>
        <div className="header-telemetry" aria-label="Game progress">
          <span><small>DISCOVERED</small><b>{discovered.length}/{markedZones.length}</b></span>
          <span><small>SCORE</small><b>{totalScore.toString().padStart(4, "0")}</b></span>
        </div>
        <nav className="game-tools" aria-label="Game tools">
          <button onClick={() => { setShowMap(true); experienceRef.current?.pause(); }} aria-label="Open map" title="Map (M)">⌖</button>
          <button onClick={() => setMuted((value) => !value)} aria-label={muted ? "Enable sound" : "Mute sound"} title="Sound">{muted ? "×" : "◖"}</button>
        </nav>
      </header>

      <KpCompanion />

      <aside className="rover-hud" aria-label="Rovalizer speed">
        <span>SWOVEE ROVALIZER</span>
        <strong>{Math.round(telemetry.speed).toString().padStart(2, "0")}</strong>
        <small>KM/H</small>
      </aside>

      <button className={`sanctuary-button ${catPenalty ? "is-alert" : ""}`} onClick={() => { setSupportOpen(true); experienceRef.current?.pause(); }}>
        <span>GARDENS OF ST. GERTRUDE</span>
        <strong>{catPenalty ? `-${catPenalty} · RESTORE WITH $1` : "HELP FEED 90+ CATS · $1"}</strong>
      </button>

      <div className="field-notification" key={notification}>{notification}</div>

      {nearbyZone && started && !modalOpenRef.current && (
        <button className="interact-callout" onClick={() => openZone(nearbyZone)}>
          <kbd>E</kbd>
          <span><small>{nearbyZone.label}</small><b>OPEN {nearbyZone.title}</b></span>
        </button>
      )}

      <div className="control-hint" aria-label="Driving controls">
        <span>CLICK + DRAG OR WASD TO DRIVE</span>
        <span><kbd>E</kbd> OPEN · <kbd>M</kbd> MAP · <kbd>R</kbd> RECOVER</span>
      </div>

      <div className="touch-drive" aria-label="Touch driving controls">
        <div><TouchButton action="left" label="←" setAction={setAction} /><TouchButton action="right" label="→" setAction={setAction} /></div>
        <div><TouchButton action="backward" label="REV" setAction={setAction} /><TouchButton action="forward" label="GO" className="go" setAction={setAction} /></div>
      </div>

      {!started && (
        <section className="launch-screen" aria-labelledby="launch-title">
          <div className="launch-panel">
            <div className="launch-topline"><span>KAREN PENDERGRASS</span><span>CYPRUS · 34.68° N / 33.14° E</span></div>
            <p className="launch-kicker">RESEARCHER · STANDARDS DEVELOPER · FOUNDER</p>
            <h1 id="launch-title">HEAVY METALS.<br /><em>MICROBES.</em><br />MACHINES.</h1>
            <p className="launch-copy">
              Karen works where heavy-metal exposure meets the microbiome—and where research becomes standards. Swovee is her robotics, AI, laser-scanning, and 3D-printing project. Gardens of St. Gertrude is the real sanctuary where she cares for more than 90 cats.
            </p>
            <p className="launch-note">This is a small world on purpose: four districts, one body of work.</p>
            <div className="launch-actions">
              <button className="launch-button" onClick={begin} disabled={!ready}>
                <span>{ready ? "DRIVE THE SWOVEE" : loadingLabel}</span>
                <b>{ready ? "→" : `${Math.round(loadingProgress * 100)}%`}</b>
              </button>
              <a className="static-site-button" href="/start"><span>MEET KAREN</span><b>↗</b></a>
            </div>
            <div className="loading-rail"><i style={{ width: `${loadingProgress * 100}%` }} /></div>
          </div>
          <aside className="launch-portrait" aria-label="Karen Pendergrass">
            <div className="portrait-readout"><span>SUBJECT IDENTIFIED</span><b>KAREN PENDERGRASS</b><small>MICROBIOME MEDICINE · MICROBIAL METALLOMICS</small></div>
            <img src="/images/Karen_Pendergrass.png" alt="Karen Pendergrass" />
            <i className="portrait-scan" aria-hidden="true" />
          </aside>
        </section>
      )}

      {project && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="project-card" style={{ "--project-color": project.color } as React.CSSProperties} role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close project">×</button>
            {project.logo ? (
              <div className="project-logo"><img src={project.logo} alt="Heavy Metal Certified" /></div>
            ) : (
              <div className={`project-mark mark-${project.kind}`} aria-hidden="true"><span>{project.index}</span></div>
            )}
            <div className="project-copy">
              <span>{project.index} · {project.label}</span>
              {project.founder && <strong className="founder-stamp">{project.founder}</strong>}
              <h2 id="project-title">{project.title}</h2>
              <p className="project-kicker">{project.kicker}</p>
              <p>{project.description}</p>
              <div className="project-actions">
                <a href={project.href} target={isInteriorPage(project.href) ? undefined : "_blank"} rel={isInteriorPage(project.href) ? undefined : "noreferrer"}>{project.cta} {isInteriorPage(project.href) ? "→" : "↗"}</a>
                {project.secondaryHref && <a className="secondary" href={project.secondaryHref} target={isInteriorPage(project.secondaryHref) ? undefined : "_blank"} rel={isInteriorPage(project.secondaryHref) ? undefined : "noreferrer"}>{project.secondaryCta} {isInteriorPage(project.secondaryHref) ? "→" : "↗"}</a>}
                {project.support && <button className="donate" onClick={() => { setProject(null); setSupportOpen(true); }}>{project.support.cta} →</button>}
                <button onClick={closeOverlay}>RETURN TO DRIVING</button>
              </div>
            </div>
          </article>
        </div>
      )}

      {supportOpen && tiniesZone.support && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="cat-support-card" role="dialog" aria-modal="true" aria-labelledby="cat-support-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close donation card">×</button>
            <div className="sanctuary-cats" aria-label="Real cats from Gardens of St. Gertrude">
              <img src="https://raw.githubusercontent.com/paleofoundation/Cats/main/assets/profile_ziggy.jpg" alt="Ziggy, a real rescue cat at Gardens of St. Gertrude" />
              <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-toshiba-1.jpg" alt="Toshiba, a real sanctuary cat" />
              <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-splotch-1.jpg" alt="Splotch, a real sanctuary cat" />
              <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-ziggy-1.jpg" alt="A real rescue cat cared for at the sanctuary" />
            </div>
            <div className="cat-support-copy">
              <span>GARDENS OF ST. GERTRUDE · 501(c)(3)</span>
              <h2 id="cat-support-title">HELP FEED<br /><em>THE 90+.</em></h2>
              <p>{tiniesZone.support.description}</p>
              <p className="cat-funding-note">Heavy Metal Certified has helped Karen fund and feed the sanctuary for years. A dollar from you helps too.</p>
              <form action="/api/donations/checkout" method="post" target="_blank" onSubmit={beginSupportDonation}>
                <input type="hidden" name="purpose" value="tinies" />
                <button type="submit" disabled={supportClaimed}>{supportClaimed ? "DONATION VERIFIED · THANK YOU" : "DONATE $1 SECURELY ↗"}</button>
              </form>
              <button onClick={closeOverlay}>RETURN TO DRIVING</button>
            </div>
          </article>
        </div>
      )}

      {oracleOpen && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="oracle-card" role="dialog" aria-modal="true" aria-labelledby="oracle-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close Oracle card">×</button>
            <span>THE ORACLE · A RECEIPT</span>
            <h2 id="oracle-title">“Well, if it isn’t the Oracle herself.”</h2>
            <p>Fred Hart gave Karen the nickname after she predicted that major food companies would put prebiotics on the front of their packaging—years before the market arrived. The point is not mysticism. It is a documented habit of seeing weak signals early.</p>
            <div><a href="/receipts">SEE KAREN'S RECEIPTS →</a><button onClick={closeOverlay}>KEEP DRIVING</button></div>
          </article>
        </div>
      )}

      {fieldLink && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="field-link-card" style={{ "--field-link-color": fieldLink.color } as React.CSSProperties} role="dialog" aria-modal="true" aria-labelledby="field-link-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close field signal">×</button>
            <span>{fieldLink.kind === "demolition" ? "ROVALIZER 1 · OBSTACLE 0" : fieldLink.eyebrow}</span>
            <h2 id="field-link-title">{fieldLink.label}</h2>
            <p>{fieldLink.kind === "demolition"
              ? DEMOLITION_QUIPS[fieldLink.label]
              : fieldLink.icon === "orcid"
                ? "Karen's scholarly record: papers, publications, and the research trail behind the work."
                : fieldLink.icon === "linkedin"
                  ? "Karen's professional profile and current work."
                  : "A direct route to contact Karen."}</p>
            <div>
              {fieldLink.href && <a href={fieldLink.href} target={isInteriorPage(fieldLink.href) ? undefined : "_blank"} rel={isInteriorPage(fieldLink.href) ? undefined : "noreferrer"}>{fieldLink.icon === "orcid" ? "OPEN ORCID" : fieldLink.icon === "email" ? "CONTACT KAREN" : "OPEN LINKEDIN"} {isInteriorPage(fieldLink.href) ? "→" : "↗"}</a>}
              <button onClick={closeOverlay}>RETURN TO DRIVING</button>
            </div>
          </article>
        </div>
      )}

      {showMap && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <section className="field-map-panel" role="dialog" aria-modal="true" aria-labelledby="map-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close map">×</button>
            <header><span>FAST TRAVEL</span><h2 id="map-title">FOUR DISTRICTS.</h2><p>Choose any district. The map is deliberately small.</p></header>
            <div className="field-map">
              {WORLD_ROADS.map(([from, to], index) => <i key={index} className="map-world-road" style={mapRoadStyle(from, to)} />)}
              {expeditionZones.map((zone) => (
                <button key={zone.id} className={`map-zone ${discovered.includes(zone.id) ? "is-found" : ""}`} style={{ left: `${mapPercent(zone.x)}%`, top: `${mapPercent(zone.z)}%`, "--zone-color": zone.color } as React.CSSProperties} onClick={() => jumpToZone(zone)}>
                  <i>{zone.index}</i><span>{zone.title}</span>
                </button>
              ))}
              <span className="map-rover" style={{ left: `${mapPlayerX}%`, top: `${mapPlayerY}%`, transform: `translate(-50%,-50%) rotate(${telemetry.heading + 90}deg)` }}>▲</span>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
