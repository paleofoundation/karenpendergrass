"use client";

/* eslint-disable @next/next/no-img-element -- portrait, logo, and sanctuary photography are intentional */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createSwoveeExperience } from "./engine";
import { billboards, expeditionZones, mapExtent, markedZones, type ExpeditionZone } from "./zones";
import type { DriveAction, ExperienceHandle, FieldObjectEvent, Telemetry } from "./types";
import KpCompanion from "./KpCompanion";
import { awardSafariOutboundLink, getSafariLinkReward, SAFARI_RUN_STORAGE_KEY } from "@/lib/safari-rewards";

const initialTelemetry: Telemetry = { speed: 0, heading: 0, x: -7, z: 17, boosting: false, scanning: true };
const tiniesZone = expeditionZones.find((zone) => zone.id === "tinies")!;
const CAT_PENALTY = 150;
const CHALLENGE_REWARD = 500;
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

function formatTime(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function publishSafariReward(label: string, points: number) {
  const at = Date.now();
  try {
    const previous = JSON.parse(window.localStorage.getItem("kp-safari-return-reward") || "null") as { label?: string; points?: number; at?: number } | null;
    if (previous?.label === label && previous.points === points && at - Number(previous.at || 0) < 750) return;
  } catch { /* A malformed previous reward is replaced below. */ }
  const reward = { id: `${at}-${Math.random().toString(36).slice(2)}`, label, points, at };
  window.localStorage.setItem("kp-safari-return-reward", JSON.stringify(reward));
  window.dispatchEvent(new CustomEvent("kp-safari-reward", { detail: reward }));
}

function TouchButton({ action, label, className = "", setAction }: { action: DriveAction; label: string; className?: string; setAction: (action: DriveAction, active: boolean) => void }) {
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
        try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* iOS uses the window listeners */ }
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

function ContinueSafariButton({ onContinue, label = "CONTINUE THE SAFARI" }: { onContinue: () => void; label?: string }) {
  return (
    <button type="button" className="continue-safari-button" onClick={onContinue}>
      <b>{label}</b>
      <span><kbd>ENTER</kbd> · NO POINTS</span>
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
  const [safetyOpen, setSafetyOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<Telemetry>(initialTelemetry);
  const [nearbyId, setNearbyId] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [catPenalty, setCatPenalty] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [project, setProject] = useState<ExpeditionZone | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportClaimed, setSupportClaimed] = useState(false);
  const [oracleOpen, setOracleOpen] = useState(false);
  const [oracleFound, setOracleFound] = useState(false);
  const [fieldLink, setFieldLink] = useState<FieldObjectEvent | null>(null);
  const [knockedDown, setKnockedDown] = useState<string[]>([]);
  const [linkRewards, setLinkRewards] = useState<string[]>([]);
  const [knowledgeOpened, setKnowledgeOpened] = useState<string[]>([]);
  const [articleRewards, setArticleRewards] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [catStrikeAt, setCatStrikeAt] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [muted, setMuted] = useState(false);
  const [runLoaded, setRunLoaded] = useState(false);
  const [notification, setNotification] = useState("KAREN'S BRAIN · FOUR DISTRICTS · 48 CATS");

  const totalScore = Math.max(0, score - catPenalty) * multiplier;
  const nearbyZone = expeditionZones.find((zone) => zone.id === nearbyId) ?? null;
  const mapPlayerX = mapPercent(telemetry.x);
  const mapPlayerY = mapPercent(telemetry.z);
  const socialFinds = linkRewards.filter((id) => id.startsWith("social-")).length;
  const researchFinds = linkRewards.filter((id) => id.startsWith("project-") || id.startsWith("billboard-") || (id.startsWith("site-") && id !== "site-advisory" && id !== "site-receipts")).length;
  const challenges = useMemo(() => [
    { id: "districts", title: "Discover all four districts", progress: discovered.length, target: markedZones.length, reward: CHALLENGE_REWARD },
    { id: "questions", title: "Answer the roadside questions", progress: knowledgeOpened.length, target: 5, reward: CHALLENGE_REWARD },
    { id: "research", title: "Open three research landmarks", progress: Math.min(researchFinds, 3), target: 3, reward: CHALLENGE_REWARD },
    { id: "social", title: "Find Social Plaza", progress: Math.min(socialFinds, 1), target: 1, reward: CHALLENGE_REWARD },
    { id: "cats", title: "Reach two districts without hitting a cat", progress: catPenalty === 0 ? Math.min(discovered.length, 2) : 0, target: 2, reward: CHALLENGE_REWARD },
  ], [catPenalty, discovered.length, knowledgeOpened.length, researchFinds, socialFinds]);
  const completeChallenges = challenges.filter((challenge) => completedChallenges.includes(challenge.id) || challenge.progress >= challenge.target).length;
  const projectPrimaryReward = project ? getSafariLinkReward(project.href) : null;
  const projectSecondaryReward = project?.secondaryHref ? getSafariLinkReward(project.secondaryHref) : null;
  const fieldReward = fieldLink?.href ? getSafariLinkReward(fieldLink.href) : null;
  const fieldSignalGlyph = fieldLink?.kind === "definition" ? "?" : fieldLink?.kind === "demolition" ? "×" : fieldLink?.icon === "orcid" ? "iD" : fieldLink?.kind === "social" ? "↗" : "KP";
  const fieldSignalType = fieldLink?.kind === "support" ? "PROJECT" : fieldLink?.kind?.toUpperCase() ?? "SIGNAL";

  useEffect(() => { startedRef.current = started; }, [started]);
  useEffect(() => { nearbyRef.current = nearbyId; }, [nearbyId]);
  useEffect(() => { experienceRef.current?.setMuted(muted); }, [muted]);
  useEffect(() => {
    modalOpenRef.current = Boolean(project || supportOpen || oracleOpen || fieldLink || showMap || safetyOpen || endOpen);
  }, [endOpen, fieldLink, oracleOpen, project, safetyOpen, showMap, supportOpen]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(SAFARI_RUN_STORAGE_KEY) || "null") as null | {
        score?: number; catPenalty?: number; multiplier?: number; elapsedSeconds?: number; discovered?: string[]; knockedDown?: string[]; linkRewards?: string[]; knowledgeOpened?: string[]; articleRewards?: string[]; completedChallenges?: string[]; oracleFound?: boolean;
      };
      if (saved) {
        setScore(Math.max(0, Number(saved.score) || 0));
        setCatPenalty(Math.max(0, Number(saved.catPenalty) || 0));
        setMultiplier(Number(saved.multiplier) === 10 ? 10 : 1);
        setElapsedSeconds(Math.max(0, Number(saved.elapsedSeconds) || 0));
        setDiscovered(Array.isArray(saved.discovered) ? saved.discovered : []);
        setKnockedDown(Array.isArray(saved.knockedDown) ? saved.knockedDown : []);
        setLinkRewards(Array.isArray(saved.linkRewards) ? saved.linkRewards : []);
        setKnowledgeOpened(Array.isArray(saved.knowledgeOpened) ? saved.knowledgeOpened : []);
        setArticleRewards(Array.isArray(saved.articleRewards) ? saved.articleRewards : []);
        setCompletedChallenges(Array.isArray(saved.completedChallenges) ? saved.completedChallenges : []);
        setOracleFound(Boolean(saved.oracleFound));
        setSupportClaimed(Number(saved.multiplier) === 10);
      }
    } catch { /* A malformed local run starts cleanly. */ }
    setRunLoaded(true);
  }, []);

  useEffect(() => {
    if (!runLoaded) return;
    window.localStorage.setItem(SAFARI_RUN_STORAGE_KEY, JSON.stringify({ score, catPenalty, multiplier, elapsedSeconds, discovered, knockedDown, linkRewards, knowledgeOpened, articleRewards, completedChallenges, oracleFound, totalScore }));
  }, [articleRewards, catPenalty, completedChallenges, discovered, elapsedSeconds, knockedDown, linkRewards, knowledgeOpened, multiplier, oracleFound, runLoaded, score, totalScore]);

  useEffect(() => {
    if (!runLoaded) return;
    window.localStorage.setItem("kp-safari-score", String(totalScore));
    window.dispatchEvent(new CustomEvent("kp-safari-score-change", { detail: { score: totalScore } }));
  }, [runLoaded, totalScore]);

  useEffect(() => {
    if (!started || endOpen) return;
    const timer = window.setInterval(() => setElapsedSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [endOpen, started]);

  useEffect(() => {
    if (!runLoaded) return;
    const newlyCompleted = challenges.filter((challenge) => challenge.progress >= challenge.target && !completedChallenges.includes(challenge.id));
    if (!newlyCompleted.length) return;
    setCompletedChallenges((current) => [...current, ...newlyCompleted.map((challenge) => challenge.id)]);
    setScore((value) => value + newlyCompleted.reduce((sum, challenge) => sum + challenge.reward, 0));
    newlyCompleted.forEach((challenge) => publishSafariReward(`${challenge.title} challenge complete`, challenge.reward));
    const latest = newlyCompleted[newlyCompleted.length - 1];
    setNotification(`${latest.title.toUpperCase()} · CHALLENGE COMPLETE +${latest.reward}`);
  }, [challenges, completedChallenges, runLoaded]);

  useEffect(() => {
    if (!catStrikeAt) return;
    const timer = window.setTimeout(() => setCatStrikeAt((current) => current === catStrikeAt ? 0 : current), 2300);
    return () => window.clearTimeout(timer);
  }, [catStrikeAt]);

  useEffect(() => {
    const awardDonation = () => {
      setSupportClaimed(true);
      setMultiplier(10);
      setCatPenalty(0);
      setNotification("$10 DONATION VERIFIED · FINAL SCORE MULTIPLIER 10×");
      window.localStorage.removeItem("kp-tinies-safari-donation-start");
      window.localStorage.removeItem("kp-tinies-safari-donation-verified");
    };
    const checkDonation = () => {
      const startedAt = Number(window.localStorage.getItem("kp-tinies-safari-donation-start") || 0);
      const verifiedAt = Number(window.localStorage.getItem("kp-tinies-safari-donation-verified") || 0);
      if (startedAt > 0 && verifiedAt >= startedAt) awardDonation();
    };
    const onStorage = (event: StorageEvent) => { if (event.key === "kp-tinies-safari-donation-verified") checkDonation(); };
    const onMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === "kp-tinies-safari-donation-verified") awardDonation();
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
            publishSafariReward(`${zone.title} discovered`, 100);
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
            publishSafariReward("The Oracle found", 250);
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
            if (item.kind === "demolition") {
              setScore((value) => value + item.points);
              publishSafariReward(`${item.label} flattened`, item.points);
            }
            setNotification(item.kind === "definition" ? `QUESTION FOUND · REVEAL FOR +${item.points}` : item.kind === "demolition" ? `ASSUMPTION FLATTENED · +${item.points}` : `BRIEFING FOUND · OPEN THE SELECTED LINK FOR +${item.points}`);
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
          setCatStrikeAt(now);
          if ("vibrate" in navigator) navigator.vibrate?.([90, 45, 120]);
          setNotification(`CAT SAFETY STRIKE · -${CAT_PENALTY} · DRIVE GENTLY`);
        },
        onOperationCheckpoint: () => undefined,
        onOperationPrint: () => undefined,
      });
    }

    initializationRef.current.then((experience) => {
      if (!activeRef.current) { dispose(experience); return; }
      localExperience = experience;
      experienceRef.current = experience;
    }).catch((error: unknown) => {
      console.error(error);
      setLoadingLabel("THE ROVALIZER COULD NOT START");
    });

    return () => {
      activeRef.current = false;
      if (localExperience) dispose(localExperience);
      if (experienceRef.current === localExperience) experienceRef.current = null;
    };
  }, []);

  const setAction = useCallback((action: DriveAction, active: boolean) => experienceRef.current?.setAction(action, active), []);
  const closeOverlay = useCallback(() => {
    setProject(null);
    setSupportOpen(false);
    setOracleOpen(false);
    setFieldLink(null);
    setShowMap(false);
    setEndOpen(false);
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
    setLinkRewards([]);
    setKnowledgeOpened([]);
    setArticleRewards([]);
    setCompletedChallenges([]);
    setOracleFound(false);
    setElapsedSeconds(0);
    setNotification("ROVALIZER RECOVERED · NEW SAFARI RUN");
    experienceRef.current?.reset();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const targetTag = (event.target as HTMLElement)?.tagName;
      if (["INPUT", "TEXTAREA"].includes(targetTag)) return;
      const key = event.key.toLowerCase();
      if (key === "enter" && startedRef.current && modalOpenRef.current && !safetyOpen) {
        if (["A", "BUTTON"].includes(targetTag)) return;
        event.preventDefault();
        closeOverlay();
        return;
      }
      if ((key === "e" || key === "enter") && startedRef.current && !modalOpenRef.current) {
        const zone = expeditionZones.find((item) => item.id === nearbyRef.current);
        if (zone) { event.preventDefault(); openZone(zone); }
      }
      if (key === "m" && startedRef.current) {
        event.preventDefault();
        setShowMap((current) => {
          if (current) experienceRef.current?.start(); else experienceRef.current?.pause();
          return !current;
        });
      }
      if (key === "r" && startedRef.current && !modalOpenRef.current) resetExperience();
      if (key === "escape" && modalOpenRef.current && !safetyOpen) closeOverlay();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOverlay, openZone, resetExperience, safetyOpen]);

  const requestBegin = () => {
    setSafetyOpen(true);
    experienceRef.current?.pause();
  };
  const begin = () => {
    setSafetyOpen(false);
    setStarted(true);
    experienceRef.current?.start();
    setNotification("CAT SAFETY ACTIVE · DRIVE · DISCOVER · OPEN THE WORK");
  };
  const jumpToZone = (zone: ExpeditionZone) => {
    experienceRef.current?.teleportTo(zone.x, zone.z + zone.radius + 4);
    setShowMap(false);
    setNotification(`${zone.title.toUpperCase()} · ARRIVING`);
    experienceRef.current?.start();
  };
  const beginSupportDonation = () => {
    window.localStorage.setItem("kp-tinies-safari-donation-start", String(Date.now()));
    setNotification("SECURE $10 CHECKOUT OPENED · RETURN FOR 10×");
  };
  const revealDefinition = (item: FieldObjectEvent) => {
    setKnowledgeOpened((current) => {
      if (current.includes(item.id)) return current;
      setScore((value) => value + item.points);
      publishSafariReward(`${item.label} answered`, item.points);
      setNotification(`ANSWER LOGGED · +${item.points}`);
      return [...current, item.id];
    });
  };
  const claimHref = (href: string) => {
    const reward = awardSafariOutboundLink(href);
    if (!reward?.awarded) return reward;
    setScore((value) => value + reward.points);
    setLinkRewards((current) => current.includes(reward.id) ? current : [...current, reward.id]);
    setNotification(`${reward.label.toUpperCase()} · +${reward.points}`);
    return reward;
  };
  const claimArticle = (href: string, id: string) => {
    const reward = claimHref(href);
    if (!reward?.awarded) return;
    setArticleRewards((current) => current.includes(id) ? current : [...current, id]);
  };
  const claimLink = (item: FieldObjectEvent) => {
    if (item.href) claimHref(item.href);
  };
  const openEnd = () => {
    setEndOpen(true);
    experienceRef.current?.pause();
  };

  return (
    <main className={`swovee-game ${started ? "is-started" : ""} ${muted ? "is-muted" : ""} ${catStrikeAt ? "has-cat-strike" : ""}`}>
      <canvas ref={canvasRef} className="game-canvas" aria-label="Three-dimensional journey through Karen's Brain" />
      <div className="screen-vignette" aria-hidden="true" />

      <header className="game-header">
        <div className="game-brand"><span>KAREN PENDERGRASS / SWOVEE</span><strong>KAREN&apos;S BRAIN</strong></div>
        <div className="header-telemetry" aria-label="Safari progress">
          <span><small>TIME</small><b>{formatTime(elapsedSeconds)}</b></span>
          <span><small>DISTRICTS</small><b>{discovered.length}/{markedZones.length}</b></span>
          <span><small>CHALLENGES</small><b>{completeChallenges}/{challenges.length}</b></span>
        </div>
        <nav className="game-tools" aria-label="Safari tools">
          <button onClick={() => { setShowMap(true); experienceRef.current?.pause(); }} aria-label="Open map" title="Map (M)">⌖</button>
          <a href="/leaderboard" aria-label="See leaderboard" title="Leaderboard">★</a>
          {started && <button className="end-safari-tool" onClick={openEnd}>END SAFARI</button>}
          <button onClick={() => setMuted((value) => !value)} aria-label={muted ? "Enable sound" : "Mute sound"} title="Sound">{muted ? "×" : "◖"}</button>
        </nav>
      </header>

      {started && (
        <aside className="safari-progress" aria-label="Safari score and challenges">
          <div className="score-readout"><span>SAFARI POINTS</span><strong>{totalScore.toLocaleString()}</strong>{multiplier === 10 && <b>10× ACTIVE</b>}<small>{catPenalty ? `${catPenalty} POINTS LOST TO CAT STRIKES` : "CAT-SAFE RUN"}</small></div>
          <div className="challenge-board">
            <header><span>CHALLENGES</span><b>{completeChallenges}/{challenges.length} COMPLETE</b></header>
            {challenges.map((challenge) => {
              const complete = completedChallenges.includes(challenge.id) || challenge.progress >= challenge.target;
              return <div className={complete ? "is-complete" : ""} key={challenge.id}><i>{complete ? "✓" : challenge.progress}</i><span>{challenge.title}<small>{complete ? "AWARDED" : `${challenge.progress}/${challenge.target}`} · +{challenge.reward}</small></span></div>;
            })}
          </div>
        </aside>
      )}

      <KpCompanion />
      <aside className="rover-hud" aria-label="Rovalizer speed"><span>SWOVEE ROVALIZER</span><strong>{Math.round(telemetry.speed).toString().padStart(2, "0")}</strong><small>KM/H</small></aside>
      <button className={`sanctuary-button ${catPenalty ? "is-alert" : ""}`} onClick={() => { setSupportOpen(true); experienceRef.current?.pause(); }}>
        <span>GARDENS OF ST. GERTRUDE</span><strong>{multiplier === 10 ? "10× SCORE ACTIVE · THANK YOU" : catPenalty ? `-${catPenalty} · $10 UNLOCKS 10×` : "HELP FEED 90+ CATS · $10 = 10×"}</strong>
      </button>
      <div className="field-notification" key={notification}>{notification}</div>
      {catStrikeAt > 0 && <div className="cat-strike-alert" key={catStrikeAt} role="status" aria-live="assertive"><span>CAT SAFETY STRIKE</span><strong>−{CAT_PENALTY}</strong><small>SAFARI POINTS DEDUCTED · THE CAT JUMPED CLEAR</small></div>}

      {nearbyZone && started && !modalOpenRef.current && (
        <button className="interact-callout" onClick={() => openZone(nearbyZone)}><kbd>E</kbd><span><small>{nearbyZone.label}</small><b>OPEN {nearbyZone.title}</b></span></button>
      )}
      <div className="control-hint"><span>CLICK + DRAG OR WASD TO DRIVE</span><span><kbd>E</kbd> OPEN · <kbd>M</kbd> MAP · <kbd>R</kbd> RECOVER</span></div>
      <div className="touch-drive" aria-label="Touch driving controls"><div><TouchButton action="left" label="←" setAction={setAction} /><TouchButton action="right" label="→" setAction={setAction} /></div><div><TouchButton action="backward" label="REV" setAction={setAction} /><TouchButton action="forward" label="GO" className="go" setAction={setAction} /></div></div>

      {!started && (
        <section className="launch-screen" aria-labelledby="launch-title">
          <div className="launch-panel">
            <div className="launch-topline"><span>KAREN&apos;S BRAIN · SWOVEE EXPEDITION</span><span>CYPRUS · 34.68° N / 33.14° E</span></div>
            <p className="launch-kicker">HEAVY METAL CERTIFICATION · MICROBIAL SCIENCE · ROBOTICS · AI · 90+ CATS</p>
            <h1 id="launch-title">ENTER<br /><em>KAREN&apos;S</em><br />BRAIN.</h1>
            <p className="launch-copy">Drive Karen&apos;s 2017 terrain-scanning, AI-guided 3D-printing machine through the work behind her career: Heavy Metal Certified as the commercial engine, microbial science as the research frontier, and the Gardens as the real-world impact.</p>
            <p className="launch-note">Collect points. Answer roadside questions. Find the research. Do not hit the cats.</p>
            <div className="launch-actions">
              <button className="launch-button" onClick={requestBegin} disabled={!ready}><span>{ready ? "ENTER KAREN'S BRAIN" : loadingLabel}</span><b>{ready ? "→" : `${Math.round(loadingProgress * 100)}%`}</b></button>
              <a className="static-site-button" href="/start"><span>MEET KAREN · STATIC SITE</span><b>↗</b></a>
            </div>
            <div className="loading-rail"><i style={{ width: `${loadingProgress * 100}%` }} /></div>
          </div>
          <aside className="launch-portrait" aria-label="Karen Pendergrass"><div className="portrait-readout"><span>FIELD SUBJECT IDENTIFIED</span><b>KAREN PENDERGRASS</b><small>MICROBIOME MEDICINE · MICROBIAL METALLOMICS</small></div><img src="/images/Karen_Pendergrass.png" alt="Karen Pendergrass" /><i className="portrait-scan" aria-hidden="true" /></aside>
        </section>
      )}

      {safetyOpen && (
        <div className="overlay safety-overlay">
          <article className="safety-card" role="dialog" aria-modal="true" aria-labelledby="safety-title">
            <span>BEFORE YOU DRIVE · CAT SAFETY RULE</span>
            <div className="safety-cat" aria-hidden="true">🐈</div>
            <h2 id="safety-title">CATS ROAM THE ENTIRE SAFARI.</h2>
            <p>They are not collectibles. Give them room. Every collision costs <strong>150 points</strong>. Drive gently, especially through long grass and around the Tinies district.</p>
            <button onClick={begin}>I&apos;LL WATCH FOR THE CATS · BEGIN →</button>
          </article>
        </div>
      )}

      {project && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="project-card" style={{ "--project-color": project.color } as React.CSSProperties} role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close project">×</button>
            {project.logo ? <div className="project-logo"><img src={project.logo} alt="Heavy Metal Certified" /></div> : <div className={`project-mark mark-${project.kind}`} aria-hidden="true"><span>{project.index}</span></div>}
            <div className="project-copy"><div className="briefing-status-bar"><span>IN-VEHICLE PROJECT DOSSIER</span><b>SIGNAL {project.index} · FIELD VERIFIED</b></div><span>{project.index} · {project.label}</span>{project.id === "heavy-metal-certified" && <b className="commercial-anchor">PRIMARY COMMERCIAL DESTINATION</b>}{project.founder && <strong className="founder-stamp">{project.founder}</strong>}<h2 id="project-title">{project.title}</h2><p className="project-kicker">{project.kicker}</p><p>{project.description}</p><div className="project-actions"><a href={project.href} target={isInteriorPage(project.href) ? undefined : "_blank"} rel={isInteriorPage(project.href) ? undefined : "noreferrer"} onClick={() => claimHref(project.href)}>{project.cta}{projectPrimaryReward ? ` · +${projectPrimaryReward.points}` : ""} {isInteriorPage(project.href) ? "→" : "↗"}</a>{project.secondaryHref && <a className="secondary" href={project.secondaryHref} target={isInteriorPage(project.secondaryHref) ? undefined : "_blank"} rel={isInteriorPage(project.secondaryHref) ? undefined : "noreferrer"} onClick={() => claimHref(project.secondaryHref!)}>{project.secondaryCta}{projectSecondaryReward ? ` · +${projectSecondaryReward.points}` : ""} {isInteriorPage(project.secondaryHref) ? "→" : "↗"}</a>}{project.support && <button className="donate" onClick={() => { setProject(null); setSupportOpen(true); }}>{project.support.cta} →</button>}<ContinueSafariButton onContinue={closeOverlay} /></div></div>
          </article>
        </div>
      )}

      {supportOpen && tiniesZone.support && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="cat-support-card" role="dialog" aria-modal="true" aria-labelledby="cat-support-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close donation card">×</button>
            <div className="sanctuary-cats" aria-label="Real cats from Gardens of St. Gertrude"><img src="https://raw.githubusercontent.com/paleofoundation/Cats/main/assets/profile_ziggy.jpg" alt="Ziggy, a real rescue cat at Gardens of St. Gertrude" /><img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-toshiba-1.jpg" alt="Toshiba, a real sanctuary cat" /><img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-splotch-1.jpg" alt="Splotch, a real sanctuary cat" /><img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-ziggy-1.jpg" alt="A real rescue cat cared for at the sanctuary" /></div>
            <div className="cat-support-copy"><span>GARDENS OF ST. GERTRUDE · 501(c)(3)</span><h2 id="cat-support-title">10× THE SCORE.<br /><em>REAL CAT FOOD.</em></h2><p>{tiniesZone.support.description}</p><p className="cat-funding-note">Heavy Metal Certified has helped fund and feed the sanctuary for years. Your gift helps Karen care for the 90+.</p><form action="/api/donations/checkout" method="post" target="_blank" onSubmit={beginSupportDonation}><input type="hidden" name="purpose" value="tinies-safari" /><button type="submit" disabled={supportClaimed}>{supportClaimed ? "10× MULTIPLIER VERIFIED · THANK YOU" : "DONATE $10 SECURELY · UNLOCK 10× ↗"}</button></form><ContinueSafariButton onContinue={closeOverlay} /></div>
          </article>
        </div>
      )}

      {oracleOpen && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}><article className="oracle-card" role="dialog" aria-modal="true" aria-labelledby="oracle-title" onMouseDown={(event) => event.stopPropagation()}><button className="overlay-close" onClick={closeOverlay}>×</button><div className="oracle-signal" aria-hidden="true"><span>THE</span><strong>O</strong><small>ORACLE</small></div><div className="oracle-copy"><div className="briefing-status-bar"><span>IN-VEHICLE RECEIPT</span><b>ARCHIVE SIGNAL · VERIFIED</b></div><span>THE ORACLE · A RECEIPT</span><h2 id="oracle-title">“Well, if it isn’t the Oracle herself.”</h2><p>Fred Hart gave Karen the nickname after she predicted that major food companies would put prebiotics on the front of their packaging—years before the market arrived. The point is not mysticism. It is a documented habit of seeing weak signals early.</p><div className="briefing-actions"><a href="/receipts" onClick={() => claimHref("/receipts")}>SEE KAREN&apos;S RECEIPTS · +100 →</a><ContinueSafariButton onContinue={closeOverlay} label="KEEP DRIVING" /></div></div></article></div>
      )}

      {fieldLink && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className={`field-link-card is-dossier ${fieldLink.kind === "definition" ? "definition-card" : ""} ${fieldLink.kind === "support" || fieldLink.kind === "billboard" ? "rich-briefing-card" : ""} ${fieldLink.image ? "has-briefing-image" : "has-signal-visual"}`} style={{ "--field-link-color": fieldLink.color } as React.CSSProperties} role="dialog" aria-modal="true" aria-labelledby="field-link-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay}>×</button>
            {fieldLink.image ? <div className={`briefing-visual ${fieldLink.id === "billboard-gutsies" ? "is-product" : ""} ${fieldLink.id === "billboard-consulting" ? "is-portrait" : ""}`}><img src={fieldLink.image} alt={`${fieldLink.label} campaign artwork`} /><i style={{ background: `linear-gradient(180deg,transparent,${fieldLink.color})` }} /><div className="visual-telemetry"><span>SWOVEE LIDAR CAPTURE</span><b>{fieldSignalType} · {fieldLink.points} PT OBJECTIVE</b></div></div> : <div className={`briefing-visual is-signal is-${fieldLink.kind}`} aria-hidden="true"><div className="signal-glyph"><b>{fieldSignalGlyph}</b></div><div className="visual-telemetry"><span>SWOVEE LIDAR SIGNAL</span><b>{fieldSignalType} · {fieldLink.points} PT OBJECTIVE</b></div></div>}
            <div className="briefing-copy">
              <div className="briefing-status-bar"><span>IN-VEHICLE FIELD DOSSIER</span><b>KP–01 · SIGNAL LOGGED</b></div>
              <span>{fieldLink.kind === "demolition" ? "ROVALIZER 1 · OBSTACLE 0" : fieldLink.eyebrow}</span>
              {fieldLink.founder && <strong className="founder-stamp">{fieldLink.founder}</strong>}
              <h2 id="field-link-title">{fieldLink.label}</h2>
              {fieldLink.kind === "definition" ? (
                knowledgeOpened.includes(fieldLink.id) ? <p className="definition-answer">{fieldLink.copy}</p> : <div className="definition-locked"><b>?</b><p>Open the full dashboard briefing to reveal the answer and collect <strong>+{fieldLink.points}</strong>.</p><button onClick={() => revealDefinition(fieldLink)}>REVEAL THE ANSWER · +{fieldLink.points}</button></div>
              ) : (
                <p>{fieldLink.kind === "demolition" ? DEMOLITION_QUIPS[fieldLink.label] : fieldLink.copy ?? (fieldLink.icon === "orcid" ? "Karen's scholarly record: papers, publications, and the research trail behind the work." : fieldLink.icon === "linkedin" ? "Karen's professional profile and current work." : "A direct route to Karen.")}</p>
              )}
              {fieldLink.details && <ul className="briefing-details">{fieldLink.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
              {fieldLink.kind !== "definition" && fieldLink.kind !== "demolition" && <p className="link-reward-note">POINTS ARE EARNED WHEN YOU OPEN KAREN&apos;S SELECTED LINK—not merely when you find the marker.</p>}
              <div className="briefing-actions">
                {fieldLink.href && (fieldLink.kind !== "definition" || knowledgeOpened.includes(fieldLink.id)) && <a href={fieldLink.href} target={isInteriorPage(fieldLink.href) ? undefined : "_blank"} rel={isInteriorPage(fieldLink.href) ? undefined : "noreferrer"} onClick={() => claimLink(fieldLink)}>{fieldReward && linkRewards.includes(fieldReward.id) ? `LINK OPENED · +${fieldReward.points} COLLECTED` : fieldLink.cta ?? (fieldLink.icon === "orcid" ? `OPEN ORCID · +${fieldLink.points}` : fieldLink.icon === "email" ? `CONTACT KAREN · +${fieldLink.points}` : `OPEN SELECTED LINK · +${fieldLink.points}`)} {isInteriorPage(fieldLink.href) ? "→" : "↗"}</a>}
                {fieldLink.articleHref && knowledgeOpened.includes(fieldLink.id) && <a className="article-reward-link" href={fieldLink.articleHref} target="_blank" rel="noreferrer" onClick={() => claimArticle(fieldLink.articleHref!, "tinies-story")}>{articleRewards.includes("tinies-story") || linkRewards.includes("article-tinies-story") ? "TINIES STORY OPENED · +250 COLLECTED" : fieldLink.articleCta} ↗</a>}
                <ContinueSafariButton onContinue={closeOverlay} />
              </div>
            </div>
          </article>
        </div>
      )}

      {showMap && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}><section className="field-map-panel" role="dialog" aria-modal="true" aria-labelledby="map-title" onMouseDown={(event) => event.stopPropagation()}><button className="overlay-close" onClick={closeOverlay}>×</button><header><span>KAREN&apos;S BRAIN · FAST TRAVEL</span><h2 id="map-title">CHOOSE A DISTRICT.</h2><p>Heavy Metal Certification leads the route; Microbes, Swovee, Tinies, Social Plaza, and four campaign billboards branch from it.</p></header><div className="field-map">{WORLD_ROADS.map(([from, to], index) => <i key={index} className="map-world-road" style={mapRoadStyle(from, to)} />)}{expeditionZones.map((zone) => <button key={zone.id} className={`map-zone ${zone.id === "heavy-metal-certified" ? "is-primary" : ""} ${discovered.includes(zone.id) ? "is-found" : ""}`} style={{ left: `${mapPercent(zone.x)}%`, top: `${mapPercent(zone.z)}%`, "--zone-color": zone.color } as React.CSSProperties} onClick={() => jumpToZone(zone)}><i>{zone.index}</i><span>{zone.title}</span></button>)}{billboards.map((billboard) => <button key={billboard.id} className="map-billboard" style={{ left: `${mapPercent(billboard.x)}%`, top: `${mapPercent(billboard.z)}%`, "--billboard-color": billboard.color } as React.CSSProperties} onClick={() => { experienceRef.current?.teleportTo(billboard.x, billboard.z + 9); setShowMap(false); experienceRef.current?.start(); }}><i>▰</i><span>{billboard.label}</span></button>)}<button className="map-social" style={{ left: `${mapPercent(-8)}%`, top: `${mapPercent(35)}%` }} onClick={() => { experienceRef.current?.teleportTo(-8, 29); setShowMap(false); experienceRef.current?.start(); }}>SOCIAL PLAZA</button><span className="map-rover" style={{ left: `${mapPlayerX}%`, top: `${mapPlayerY}%`, transform: `translate(-50%,-50%) rotate(${telemetry.heading + 90}deg)` }}>▲</span></div></section></div>
      )}

      {endOpen && (
        <div className="overlay" role="presentation">
          <article className="end-safari-card" role="dialog" aria-modal="true" aria-labelledby="end-title">
            <button className="overlay-close" onClick={closeOverlay}>×</button><span>END OF THIS SAFARI RUN</span><h2 id="end-title">YOU FOUND<br /><em>{totalScore.toLocaleString()} POINTS.</em></h2><div className="end-stats"><p><b>{discovered.length}/{markedZones.length}</b><small>DISTRICTS</small></p><p><b>{completeChallenges}/{challenges.length}</b><small>CHALLENGES</small></p><p><b>{formatTime(elapsedSeconds)}</b><small>FIELD TIME</small></p></div>
            {multiplier === 1 ? <div className="ten-x-offer"><strong>TURN {Math.max(0, score - catPenalty).toLocaleString()} INTO {(Math.max(0, score - catPenalty) * 10).toLocaleString()} POINTS.</strong><p>A verified $10 donation supports the 90+ cats at Gardens of St. Gertrude and multiplies this Safari score by ten.</p><form action="/api/donations/checkout" method="post" target="_blank" onSubmit={beginSupportDonation}><input type="hidden" name="purpose" value="tinies-safari" /><button type="submit">DONATE $10 · UNLOCK 10× ↗</button></form></div> : <p className="multiplier-thanks">10× MULTIPLIER ACTIVE · THANK YOU FOR HELPING FEED THE 90+.</p>}
            <div className="end-actions"><a href="/leaderboard">SEE LEADERBOARD + LEAVE A NOTE →</a><a href="/start" className="secondary">END SAFARI · MEET KAREN →</a><button onClick={closeOverlay}>KEEP DRIVING</button></div>
          </article>
        </div>
      )}
    </main>
  );
}
