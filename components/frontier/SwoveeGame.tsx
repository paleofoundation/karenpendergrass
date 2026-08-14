"use client";

/* eslint-disable @next/next/no-img-element -- these sanctuary photos are served by the charities that maintain them */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { DONATION_PROGRAMS, type DonationPurpose } from "@/lib/donations";
import { createSwoveeExperience } from "./engine";
import { articleSignals, expeditionZones, fieldOperations, mapExtent, markedZones, socialLinks, supportLinks, type ExpeditionZone, type FieldOperation } from "./zones";
import type { DriveAction, ExperienceHandle, FieldObjectEvent, Telemetry } from "./types";
import KpCompanion from "./KpCompanion";

type Leader = {
  id: string;
  playerName: string;
  score: number;
  discoveries: number;
  articles: number;
  timeSeconds: number;
  createdAt: string;
};

const initialTelemetry: Telemetry = {
  speed: 0,
  heading: 0,
  x: -7,
  z: 17,
  boosting: false,
  scanning: true,
};

const receiptsZone = expeditionZones.find((zone) => zone.id === "receipts")!;
const tiniesZone = expeditionZones.find((zone) => zone.id === "tinies")!;
const CAT_PENALTY = 150;
const TOTAL_KNOCKABLES = socialLinks.length + articleSignals.length + supportLinks.length + 8;
const COFFEE_PURPOSES: DonationPurpose[] = ["microbiome-medicine", "wikibiome"];
const DEMOLITION_QUIPS: Record<string, string> = {
  DOUBT: "Doubt has been peer-reviewed by the front bumper. Major revisions requested.",
  "NO MARKET": "Market research complete: there was, in fact, a market. It was hiding behind this block.",
  "TOO EARLY": "Chronology update: early is just on time with worse catering.",
  "STAY IN YOUR LANE": "Lane guidance declined. The Rovalizer brought its own lane.",
  IMPOSSIBLE: "Impossible has been successfully converted into a low-speed road feature.",
  CREDENTIALS: "Credential check complete. The machine remains unmoved by LinkedIn endorsements.",
  CONSENSUS: "Consensus has been safely flattened. Evidence may now proceed.",
  LATER: "Later has been rescheduled to now. Calendar invite declined.",
};

type Challenge = {
  id: string;
  label: string;
  progress: number;
  target: number;
  bonus: number;
};

type OperationRun = {
  scans: string[];
  reasoned: boolean;
  complete: boolean;
};

const emptyOperationRuns = () => Object.fromEntries(
  fieldOperations.map((operation) => [operation.id, { scans: [], reasoned: false, complete: false }]),
) as Record<string, OperationRun>;

const WORLD_ROADS: Array<[[number, number], [number, number]]> = (() => {
  const spawn: [number, number] = [-7, 17];
  const driveZones = expeditionZones.filter((zone) => zone.id !== "finish");
  const loop = [spawn, ...driveZones.map((zone) => [zone.x, zone.z] as [number, number]), spawn];
  const segments: Array<[[number, number], [number, number]]> = [];
  for (let index = 0; index < loop.length - 1; index += 1) segments.push([loop[index], loop[index + 1]]);
  const receipts = expeditionZones.find((zone) => zone.id === "receipts");
  const finish = expeditionZones.find((zone) => zone.id === "finish");
  if (receipts && finish) segments.push([[receipts.x, receipts.z], [finish.x, finish.z]]);
  segments.push(
    [[-43, -12], [-72, -20]],
    [[-72, -20], [-72, -43]],
    [[-72, -20], [-72, 31]],
    [[-72, 31], [-24, 42]],
    [[-72, 31], [-57, 57]],
  );
  return segments;
})();

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function directionLabel(heading: number) {
  const labels = ["E", "SE", "S", "SW", "W", "NW", "N", "NE"];
  return labels[Math.round(heading / 45) % 8];
}

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
  const activePointerRef = useRef<number | null>(null);
  const [pressed, setPressed] = useState(false);

  const release = useCallback((pointerId?: number) => {
    if (activePointerRef.current === null) return;
    if (pointerId !== undefined && activePointerRef.current !== pointerId) return;
    activePointerRef.current = null;
    setPressed(false);
    setAction(action, false);
  }, [action, setAction]);

  useEffect(() => {
    const releasePointer = (event: PointerEvent) => release(event.pointerId);
    const releaseOnBlur = () => release();
    const releaseWhenHidden = () => {
      if (document.hidden) release();
    };

    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    window.addEventListener("blur", releaseOnBlur);
    document.addEventListener("visibilitychange", releaseWhenHidden);

    return () => {
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
      window.removeEventListener("blur", releaseOnBlur);
      document.removeEventListener("visibilitychange", releaseWhenHidden);
      activePointerRef.current = null;
      setAction(action, false);
    };
  }, [action, release, setAction]);

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      aria-pressed={pressed}
      draggable={false}
      onPointerDown={(event) => {
        event.preventDefault();
        if (activePointerRef.current !== null) return;
        activePointerRef.current = event.pointerId;
        setPressed(true);
        setAction(action, true);
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // Global pointer listeners still guarantee release on older iOS browsers.
        }
      }}
      onPointerUp={(event) => release(event.pointerId)}
      onPointerCancel={(event) => release(event.pointerId)}
      onLostPointerCapture={(event) => release(event.pointerId)}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      {label}
    </button>
  );
}

export default function SwoveeGame() {
  const { user, isLoaded: userLoaded } = useUser();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const experienceRef = useRef<ExperienceHandle | null>(null);
  const initializationRef = useRef<Promise<ExperienceHandle> | null>(null);
  const experienceActiveRef = useRef(false);
  const experienceDisposedRef = useRef(false);
  const startedRef = useRef(false);
  const modalOpenRef = useRef(false);
  const nearbyRef = useRef<string | null>(null);
  const playerNameSeededRef = useRef(false);
  const lastCatStrikeRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState("INITIALIZING FIELD SYSTEM");
  const [started, setStarted] = useState(false);
  const [telemetry, setTelemetry] = useState<Telemetry>(initialTelemetry);
  const [nearbyId, setNearbyId] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [printed, setPrinted] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [mission, setMission] = useState<ExpeditionZone | null>(null);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [supportMission, setSupportMission] = useState<ExpeditionZone | null>(null);
  const [supportClaimed, setSupportClaimed] = useState(false);
  const [coffeeSupported, setCoffeeSupported] = useState<DonationPurpose[]>([]);
  const [oracleCard, setOracleCard] = useState<string | null>(null);
  const [oracleFound, setOracleFound] = useState<string[]>([]);
  const [knockedDown, setKnockedDown] = useState<string[]>([]);
  const [fieldLink, setFieldLink] = useState<FieldObjectEvent | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [playerName, setPlayerName] = useState("EXPEDITION PILOT");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState("LIDAR LINK ESTABLISHED");
  const [muted, setMuted] = useState(false);
  const [catHits, setCatHits] = useState<string[]>([]);
  const [catPenalty, setCatPenalty] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [operationRuns, setOperationRuns] = useState<Record<string, OperationRun>>(emptyOperationRuns);
  const [activeOperationId, setActiveOperationId] = useState<string | null>(null);
  const [operationConsoleId, setOperationConsoleId] = useState<string | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);

  const nearbyZone = useMemo(
    () => expeditionZones.find((zone) => zone.id === nearbyId) ?? null,
    [nearbyId],
  );
  const markedDiscovered = discovered.filter((id) => markedZones.some((zone) => zone.id === id)).length;
  const totalScore = Math.max(0, score - catPenalty);
  const activeOperation = fieldOperations.find((operation) => operation.id === activeOperationId) ?? null;
  const operationConsole = fieldOperations.find((operation) => operation.id === operationConsoleId) ?? null;
  const missionOperation = mission ? fieldOperations.find((operation) => operation.zoneId === mission.id) ?? null : null;
  const activeOperationRun = activeOperation ? operationRuns[activeOperation.id] : null;
  const completedOperations = fieldOperations.filter((operation) => operationRuns[operation.id]?.complete).length;
  const challenges = useMemo<Challenge[]>(() => [
    { id: "signals", label: "MAP ALL PROJECT SIGNALS", progress: markedDiscovered, target: markedZones.length, bonus: 400 },
    { id: "briefings", label: "LOG 3 DASHBOARD BRIEFINGS", progress: Math.min(readArticles.length, 3), target: 3, bonus: 450 },
    { id: "operations", label: "COMPLETE 3 FIELD OPERATIONS", progress: completedOperations, target: fieldOperations.length, bonus: 900 },
    { id: "impacts", label: "KNOCK DOWN 12 SIGNALS", progress: Math.min(knockedDown.length, 12), target: 12, bonus: 500 },
    { id: "oracle", label: "RECOVER 3 ORACLE RECEIPTS", progress: oracleFound.length, target: 3, bonus: 600 },
  ], [markedDiscovered, readArticles.length, completedOperations, knockedDown.length, oracleFound.length]);

  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  useEffect(() => {
    modalOpenRef.current = Boolean(mission || supportMission || oracleCard || fieldLink || operationConsoleId || showMap || showLeaderboard);
  }, [mission, supportMission, oracleCard, fieldLink, operationConsoleId, showMap, showLeaderboard]);

  useEffect(() => {
    experienceRef.current?.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    nearbyRef.current = nearbyId;
  }, [nearbyId]);

  useEffect(() => {
    if (!userLoaded || !user || playerNameSeededRef.current) return;
    const emailStem = user.primaryEmailAddress?.emailAddress.split("@")[0];
    setPlayerName((user.fullName || emailStem || "EXPEDITION PILOT").slice(0, 32));
    playerNameSeededRef.current = true;
  }, [user, userLoaded]);

  useEffect(() => {
    const newlyCompleted = challenges.filter(
      (challenge) => challenge.progress >= challenge.target && !completedChallenges.includes(challenge.id),
    );
    if (newlyCompleted.length === 0) return;
    const challengeBonus = newlyCompleted.reduce((sum, challenge) => sum + challenge.bonus, 0);
    setCompletedChallenges((current) => [...current, ...newlyCompleted.map((challenge) => challenge.id)]);
    setScore((value) => value + challengeBonus);
    setNotification(`${newlyCompleted[0].label} COMPLETE  +${challengeBonus}`);
  }, [challenges, completedChallenges]);

  useEffect(() => {
    const awardVerifiedDonation = () => {
      setSupportClaimed((current) => {
        if (current) return current;
        setCatPenalty(0);
        setScore((value) => value + (tiniesZone.support?.bonus ?? 1000));
        setNotification("TINIES DONATION VERIFIED · CAT POINTS RESTORED +1000");
        setSupportMission(tiniesZone);
        experienceRef.current?.pause();
        window.localStorage.removeItem("kp-tinies-donation-start");
        window.localStorage.removeItem("kp-tinies-donation-verified");
        return true;
      });
    };
    const checkStoredDonation = () => {
      const startedAt = Number(window.localStorage.getItem("kp-tinies-donation-start") || 0);
      const verifiedAt = Number(window.localStorage.getItem("kp-tinies-donation-verified") || 0);
      if (startedAt > 0 && verifiedAt >= startedAt) awardVerifiedDonation();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "kp-tinies-donation-verified") checkStoredDonation();
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === "kp-tinies-donation-verified") awardVerifiedDonation();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("message", onMessage);
    checkStoredDonation();
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    const awardCoffee = (purpose: DonationPurpose) => {
      if (!COFFEE_PURPOSES.includes(purpose)) return;
      setCoffeeSupported((current) => {
        if (current.includes(purpose)) return current;
        const program = DONATION_PROGRAMS[purpose];
        setScore((value) => value + program.rewardPoints);
        setNotification(`${program.project.toUpperCase()} COFFEE VERIFIED · OPEN KNOWLEDGE +${program.rewardPoints}`);
        window.localStorage.removeItem(`kp-coffee-${purpose}-start`);
        window.localStorage.removeItem(`kp-coffee-${purpose}-verified`);
        return [...current, purpose];
      });
    };
    const checkStoredCoffee = () => {
      COFFEE_PURPOSES.forEach((purpose) => {
        const startedAt = Number(window.localStorage.getItem(`kp-coffee-${purpose}-start`) || 0);
        const verifiedAt = Number(window.localStorage.getItem(`kp-coffee-${purpose}-verified`) || 0);
        if (startedAt > 0 && verifiedAt >= startedAt) awardCoffee(purpose);
      });
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key?.startsWith("kp-coffee-") && event.key.endsWith("-verified")) checkStoredCoffee();
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "kp-coffee-donation-verified") return;
      awardCoffee(event.data.purpose as DonationPurpose);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("message", onMessage);
    checkStoredCoffee();
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    experienceActiveRef.current = true;
    let localExperience: ExperienceHandle | null = null;
    const disposeExperience = (experience: ExperienceHandle) => {
      if (experienceDisposedRef.current) return;
      experienceDisposedRef.current = true;
      experience.destroy();
    };

    if (!initializationRef.current) {
      experienceDisposedRef.current = false;
      initializationRef.current = createSwoveeExperience(canvasRef.current, {
        onProgress: (progress, label) => {
          if (!experienceActiveRef.current) return;
          setLoadingProgress(progress);
          setLoadingLabel(label);
        },
        onReady: () => {
          if (experienceActiveRef.current) setReady(true);
        },
        onTelemetry: (next) => {
          if (experienceActiveRef.current) setTelemetry(next);
        },
        onProximity: (zoneId) => {
          if (!experienceActiveRef.current) return;
          setNearbyId(zoneId);
          if (!zoneId || zoneId === "finish") return;
          const zone = expeditionZones.find((item) => item.id === zoneId);
          if (!zone) return;
          setDiscovered((current) => {
            if (current.includes(zoneId)) return current;
            const bonus = zone.secret ? 400 : 65;
            setScore((value) => value + bonus);
            setNotification(zone.secret ? `UNMARKED SIGNAL RECOVERED  +${bonus}` : `PROJECT SIGNAL MAPPED  +${bonus}`);
            return [...current, zoneId];
          });
        },
        onPrint: () => {
          if (!experienceActiveRef.current) return;
          setPrinted((current) => {
            const next = current + 1;
            if (next <= 12) {
              setScore((value) => value + 10);
              setNotification("STRUCTURE PRINTED  +10");
            }
            return next;
          });
        },
        onOracle: (blockId) => {
          if (!experienceActiveRef.current) return;
          setOracleFound((current) => {
            if (current.includes(blockId)) return current;
            setScore((value) => value + 175);
            setNotification("THE ORACLE RECEIPT RECOVERED  +175");
            setOracleCard(blockId);
            experienceRef.current?.pause();
            return [...current, blockId];
          });
        },
        onKnockdown: (item) => {
          if (!experienceActiveRef.current) return;
          setKnockedDown((current) => {
            if (current.includes(item.id)) return current;
            const bonus = item.points;
            setScore((value) => value + bonus);
            setNotification(`${item.kind === "demolition" ? "ASSUMPTION FLATTENED" : item.kind === "social" ? "SOCIAL SIGNAL HIT" : item.kind === "support" ? "OPEN KNOWLEDGE SIGNAL HIT" : "ARTICLE SIGNAL HIT"}  +${bonus}`);
            if (item.href || item.kind === "demolition") {
              setFieldLink(item);
              experienceRef.current?.pause();
            }
            return [...current, item.id];
          });
        },
        onCatHit: (catId) => {
          if (!experienceActiveRef.current) return;
          const now = Date.now();
          if (now - lastCatStrikeRef.current < 1500) return;
          lastCatStrikeRef.current = now;
          setCatHits((current) => {
            if (current.includes(catId)) return current;
            setCatPenalty((value) => value + CAT_PENALTY);
            setNotification(`CAT SAFETY STRIKE  -${CAT_PENALTY} · DONATE $1 TO RESTORE`);
            return [...current, catId];
          });
        },
        onOperationCheckpoint: (operationId, checkpointId) => {
          if (!experienceActiveRef.current) return;
          const operation = fieldOperations.find((item) => item.id === operationId);
          if (!operation) return;
          setOperationRuns((current) => {
            const run = current[operationId] ?? { scans: [], reasoned: false, complete: false };
            if (run.scans.includes(checkpointId)) return current;
            const scans = [...run.scans, checkpointId];
            setScore((value) => value + 40);
            setNotification(`FIELD SIGNAL CAPTURED · ${scans.length}/${operation.checkpoints.length}  +40`);
            if (scans.length >= operation.checkpoints.length && !run.reasoned) {
              setOperationError(null);
              setOperationConsoleId(operationId);
              experienceRef.current?.pause();
            }
            return { ...current, [operationId]: { ...run, scans } };
          });
        },
        onOperationPrint: (operationId) => {
          if (!experienceActiveRef.current) return;
          const operation = fieldOperations.find((item) => item.id === operationId);
          if (!operation) return;
          setOperationRuns((current) => {
            const run = current[operationId];
            if (!run?.reasoned || run.complete) return current;
            setScore((value) => value + operation.reward);
            setNotification(`${operation.code} COMPLETE · STRUCTURE DEPLOYED  +${operation.reward}`);
            setActiveOperationId(null);
            setOperationConsoleId(operationId);
            experienceRef.current?.pause();
            return { ...current, [operationId]: { ...run, complete: true } };
          });
        },
      });
    }

    initializationRef.current
      .then((experience) => {
        if (!experienceActiveRef.current) {
          disposeExperience(experience);
          return;
        }
        localExperience = experience;
        experienceRef.current = experience;
      })
      .catch((error: unknown) => {
        console.error(error);
        setLoadingLabel("FIELD SYSTEM COULD NOT START");
      });
    return () => {
      experienceActiveRef.current = false;
      if (localExperience) disposeExperience(localExperience);
      if (experienceRef.current === localExperience) experienceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = window.setInterval(() => {
      if (!modalOpenRef.current) setElapsed((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started]);

  const setAction = useCallback((action: DriveAction, active: boolean) => {
    experienceRef.current?.setAction(action, active);
  }, []);

  const fetchLeaders = useCallback(async () => {
    try {
      const response = await fetch("/api/scores", { cache: "no-store" });
      if (!response.ok) return;
      const payload = (await response.json()) as { scores?: Leader[] };
      setLeaders(payload.scores ?? []);
    } catch {
      setLeaders([]);
    }
  }, []);

  const openZone = useCallback((zone: ExpeditionZone) => {
    if (zone.id === "finish") {
      setShowLeaderboard(true);
      setSubmitted(false);
      void fetchLeaders();
    } else {
      setMission(zone);
      setBriefingOpen(false);
    }
    experienceRef.current?.pause();
  }, [fetchLeaders]);

  const closeOverlay = useCallback(() => {
    setMission(null);
    setBriefingOpen(false);
    setSupportMission(null);
    setOracleCard(null);
    setFieldLink(null);
    setOperationConsoleId(null);
    setOperationError(null);
    setShowMap(false);
    setShowLeaderboard(false);
    if (startedRef.current) experienceRef.current?.start();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((event.target as HTMLElement)?.tagName)) return;
      const key = event.key.toLowerCase();
      if (key === "e" || key === "enter") {
        const zone = expeditionZones.find((item) => item.id === nearbyRef.current);
        if (zone && startedRef.current && !modalOpenRef.current) {
          event.preventDefault();
          openZone(zone);
        }
      }
      if (key === " ") {
        if (startedRef.current && !modalOpenRef.current) {
          event.preventDefault();
          experienceRef.current?.print();
        }
      }
      if (key === "m" && startedRef.current) {
        event.preventDefault();
        setShowMap((current) => {
          if (!current) experienceRef.current?.pause();
          else experienceRef.current?.start();
          return !current;
        });
      }
      if (key === "r" && startedRef.current && !modalOpenRef.current) experienceRef.current?.reset();
      if (key === "escape" && modalOpenRef.current) closeOverlay();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openZone, closeOverlay]);

  const begin = () => {
    setStarted(true);
    experienceRef.current?.start();
    setNotification(`EXPEDITION LIVE · FIND THE ${markedZones.length} PROJECT SIGNALS`);
  };

  const claimArticle = (zone: ExpeditionZone) => {
    if (readArticles.includes(zone.id)) return;
    setReadArticles((current) => [...current, zone.id]);
    setScore((value) => value + 225);
    setNotification("DASHBOARD BRIEFING LOGGED  +225");
  };

  const beginOperation = (operation: FieldOperation) => {
    const run = operationRuns[operation.id] ?? { scans: [], reasoned: false, complete: false };
    if (run.complete) {
      setOperationConsoleId(operation.id);
      setMission(null);
      experienceRef.current?.pause();
      return;
    }
    setMission(null);
    setBriefingOpen(false);
    setActiveOperationId(operation.id);
    setOperationError(null);
    if (run.scans.length >= operation.checkpoints.length && !run.reasoned) {
      setOperationConsoleId(operation.id);
      experienceRef.current?.pause();
      return;
    }
    const stage = run.reasoned ? "print" : "scan";
    experienceRef.current?.setOperation(operation.id, stage);
    setNotification(stage === "scan" ? `${operation.code} ACTIVE · CAPTURE ${operation.checkpoints.length - run.scans.length} FIELD SIGNALS` : `${operation.code} READY · DRIVE TO THE FABRICATION PAD`);
    experienceRef.current?.start();
  };

  const answerOperation = (operation: FieldOperation, optionIndex: number) => {
    if (optionIndex !== operation.answer) {
      setOperationError("MODEL REJECTED · THAT RULE COLLAPSES PART OF THE EVIDENCE CHAIN. TRY AGAIN.");
      return;
    }
    setOperationRuns((current) => ({
      ...current,
      [operation.id]: { ...current[operation.id], reasoned: true },
    }));
    setOperationError(null);
    setOperationConsoleId(null);
    setActiveOperationId(operation.id);
    experienceRef.current?.setOperation(operation.id, "print");
    setScore((value) => value + 150);
    setNotification(`${operation.code} REASONING LOCKED  +150 · FABRICATION PAD ONLINE`);
    experienceRef.current?.start();
  };

  const beginSupportDonation = () => {
    window.localStorage.setItem("kp-tinies-donation-start", String(Date.now()));
    setNotification("SECURE $1 TINIES CHECKOUT OPENED · VERIFYING ON RETURN");
  };

  const beginCoffeeDonation = (purpose: DonationPurpose) => {
    window.localStorage.setItem(`kp-coffee-${purpose}-start`, String(Date.now()));
    setNotification(`${DONATION_PROGRAMS[purpose].project.toUpperCase()} COFFEE CHECKOUT OPENED · VERIFYING ON RETURN`);
  };

  const submitScore = async () => {
    if (submitting || submitted) return;
    if (!user) {
      setNotification("EMAIL SIGN-IN REQUIRED TO LOG A PUBLIC SCORE");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          playerName,
          score: totalScore,
          discoveries: discovered.length,
          articles: readArticles.length,
          timeSeconds: elapsed,
        }),
      });
      if (!response.ok) throw new Error("score rejected");
      setSubmitted(true);
      await fetchLeaders();
    } catch {
      setNotification("SIGNAL BOARD TEMPORARILY OFFLINE");
    } finally {
      setSubmitting(false);
    }
  };

  const resetRun = () => {
    setScore(0);
    setDiscovered([]);
    setReadArticles([]);
    setPrinted(0);
    setOracleFound([]);
    setKnockedDown([]);
    setFieldLink(null);
    setOracleCard(null);
    setBriefingOpen(false);
    setSupportMission(null);
    setSupportClaimed(false);
    setCatHits([]);
    setCatPenalty(0);
    setCompletedChallenges([]);
    setOperationRuns(emptyOperationRuns());
    setActiveOperationId(null);
    setOperationConsoleId(null);
    setOperationError(null);
    lastCatStrikeRef.current = 0;
    setElapsed(0);
    setSubmitted(false);
    setShowLeaderboard(false);
    setMission(null);
    experienceRef.current?.reset();
    experienceRef.current?.setOperation(null);
    experienceRef.current?.start();
    setNotification("NEW EXPEDITION STARTED");
  };

  const jumpToZone = (zone: ExpeditionZone) => {
    const landingOffset = zone.id === "finish" ? -(zone.radius + 3) : zone.radius + 4;
    experienceRef.current?.teleportTo(zone.x, zone.z + landingOffset);
    setShowMap(false);
    setNotification(`NAVIGATION JUMP COMPLETE · ${zone.title.toUpperCase()}`);
    experienceRef.current?.start();
  };

  const mapPlayerX = ((telemetry.x + mapExtent) / (mapExtent * 2)) * 100;
  const mapPlayerY = ((telemetry.z + mapExtent) / (mapExtent * 2)) * 100;

  return (
    <main className={`swovee-game ${started ? "is-started" : ""} ${muted ? "is-muted" : ""}`}>
      <canvas ref={canvasRef} className="game-canvas" aria-label="Three-dimensional Swovee Rovalizer expedition" />
      <div className="screen-vignette" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="game-header">
        <div className="game-brand">
          <span>KAREN PENDERGRASS / SWOVEE</span>
          <strong>DRIVE THE FRONTIER</strong>
        </div>
        <div className="header-telemetry">
          <span><small>SCORE</small><b>{totalScore.toString().padStart(4, "0")}</b></span>
          <span><small>PROJECTS</small><b>{markedDiscovered}/{markedZones.length}</b></span>
          <span className="run-clock"><small>RUN CLOCK</small><b>{formatTime(elapsed)}</b></span>
        </div>
        <nav className="game-tools" aria-label="Game tools">
          <a href="/start" aria-label="Open Karen Pendergrass field guide" title="Open the main website">KP</a>
          <button onClick={() => {
            setShowMap(true);
            experienceRef.current?.pause();
          }} aria-label="Open field map" title="Field map (M)">⌖</button>
          <button onClick={() => setMuted((value) => !value)} aria-label={muted ? "Enable sound" : "Mute sound"} title="Sound">{muted ? "×" : "◖"}</button>
          <button onClick={() => {
            setShowLeaderboard(true);
            experienceRef.current?.pause();
            void fetchLeaders();
          }} aria-label="Open signal board" title="Leaderboard">▥</button>
        </nav>
      </header>

      <KpCompanion />

      <aside className="rover-hud" aria-label="Rovalizer telemetry">
        <div className="rover-id"><span>SWOVEE</span><b>ROVALIZER R–01</b></div>
        <div className="speedometer">
          <strong>{Math.round(telemetry.speed).toString().padStart(2, "0")}</strong>
          <span>KM/H</span>
        </div>
        <div className="telemetry-grid">
          <span><small>HEADING</small><b>{directionLabel(telemetry.heading)} {Math.round(telemetry.heading).toString().padStart(3, "0")}°</b></span>
          <span><small>LIDAR</small><b className="online">SCANNING</b></span>
          <span><small>PRINTS</small><b>{Math.min(printed, 12)}/12</b></span>
          <span><small>DRIVE</small><b>{telemetry.boosting ? "BOOST" : "NOMINAL"}</b></span>
        </div>
      </aside>

      <aside className="mission-tracker">
        <div className="tracker-heading"><span>FIELD OBJECTIVE</span><b>{markedDiscovered === markedZones.length ? "ALL PROJECTS MAPPED" : `TRANSMIT TO ${markedZones.length} PROJECTS`}</b></div>
        <div className="tracker-zones">
          {markedZones.map((zone) => (
            <span key={zone.id} className={discovered.includes(zone.id) ? "is-complete" : ""}>
              <i style={{ "--zone-color": zone.color } as React.CSSProperties} />
              {zone.index} {zone.title}
            </span>
          ))}
        </div>
      </aside>

      <aside className="challenge-board" aria-label="Live expedition challenges">
        <div className="challenge-heading"><span>LIVE CHALLENGES</span><b>{completedChallenges.length}/{challenges.length} COMPLETE</b></div>
        <div className="challenge-list">
          {challenges.map((challenge) => {
            const complete = completedChallenges.includes(challenge.id);
            return (
              <div key={challenge.id} className={complete ? "is-complete" : ""}>
                <span><i>{complete ? "✓" : `${challenge.progress}/${challenge.target}`}</i>{challenge.label}</span>
                <b>{complete ? "BANKED" : `+${challenge.bonus}`}</b>
              </div>
            );
          })}
        </div>
        <button className={catHits.length > 0 ? "cat-rule is-alert" : "cat-rule"} onClick={() => {
          setSupportMission(tiniesZone);
          experienceRef.current?.pause();
        }}>
          <span><i>{catHits.length > 0 ? `-${catPenalty}` : "SAFE"}</i>CAT GUARDIAN RULE</span>
          <b>{catHits.length > 0 ? "RESTORE $1" : "AVOID 48 CATS"}</b>
        </button>
      </aside>

      <div className="field-notification" key={notification}>{notification}</div>

      {activeOperation && activeOperationRun && started && (
        <button
          className="active-operation-hud"
          style={{ "--operation-color": activeOperation.color } as React.CSSProperties}
          onClick={() => {
            if (activeOperationRun.scans.length >= activeOperation.checkpoints.length && !activeOperationRun.reasoned) {
              setOperationConsoleId(activeOperation.id);
              experienceRef.current?.pause();
            }
          }}
          aria-label={`${activeOperation.code} ${activeOperation.title}`}
        >
          <span><i>{activeOperation.code}</i><b>{activeOperation.title}</b></span>
          <em>
            {!activeOperationRun.reasoned
              ? activeOperationRun.scans.length >= activeOperation.checkpoints.length
                ? "OPEN REASONING CONSOLE"
                : `SCAN ${activeOperationRun.scans.length}/${activeOperation.checkpoints.length}`
              : "PRINT AT THE LIT FABRICATION PAD"}
          </em>
          <strong><i className={activeOperationRun.scans.length >= activeOperation.checkpoints.length ? "is-done" : ""}>SCAN</i><i className={activeOperationRun.reasoned ? "is-done" : ""}>REASON</i><i>PRINT</i></strong>
        </button>
      )}

      {nearbyZone && started && !mission && !showMap && !showLeaderboard && (
        <button className="interact-callout" onClick={() => openZone(nearbyZone)}>
          <kbd>E</kbd>
          <span><small>{nearbyZone.secret ? "UNMARKED SIGNAL" : nearbyZone.label}</small><b>ENTER {nearbyZone.title}</b></span>
        </button>
      )}

      <div className="keyboard-hints" aria-label="Keyboard controls">
        <span><kbd>WASD</kbd> DRIVE</span>
        <span><kbd>SHIFT</kbd> BOOST</span>
        <span><kbd>SPACE</kbd> PRINT</span>
        <span><kbd>E</kbd> INTERACT</span>
        <span><kbd>CTRL</kbd> BRAKE</span>
        <span><kbd>R</kbd> RECOVER</span>
      </div>

      <div className="trackpad-hint" aria-label="Trackpad driving controls">
        <b>TRACKPAD DRIVE</b>
        <span>CLICK + DRAG TO DRIVE · TWO-FINGER SWIPE TO MOVE · SHIFT + DRAG TO LOOK</span>
      </div>

      <div className="touch-drive" aria-label="Touch driving controls">
        <div className="touch-steer">
          <TouchButton action="left" label="←" setAction={setAction} />
          <TouchButton action="right" label="→" setAction={setAction} />
        </div>
        <div className="touch-pedals">
          <TouchButton action="backward" label="REV" setAction={setAction} />
          <TouchButton action="forward" label="GO" className="go" setAction={setAction} />
        </div>
        <TouchButton action="brake" label="BRAKE" className="touch-brake" setAction={setAction} />
        <button className="touch-print" onClick={() => experienceRef.current?.print()}>PRINT</button>
      </div>

      {!started && (
        <section className="launch-screen" aria-labelledby="launch-title">
          <div className="launch-panel">
            <div className="launch-topline"><span>EXPEDITION KP–01</span><span>34.68° N / 33.14° E</span></div>
            <p className="launch-kicker">THE 2017 IDEA · NOW A REAL-TIME 3D BODY OF WORK</p>
            <h1 id="launch-title">DRIVE THE<br /><em>FRONTIER.</em></h1>
            <p className="launch-copy">
              In 2017, Karen imagined robotics, 3D printing, laser scanning, and AI having a baby. Swovee would scan terrain, understand it, and print what the place needed—someday for terraforming, and first for practical construction here on Earth.
            </p>
            <p className="launch-instruction">Pilot the Rovalizer through Karen’s projects. Stop inside a glowing installation and press E for an in-dashboard briefing. The expedition never has to leave this screen.</p>
            <div className="launch-loop">
              <span><b>01</b> DRIVE THE PROJECT LOOP</span>
              <span><b>02</b> READ DASHBOARD BRIEFINGS</span>
              <span><b>03</b> KNOCK DOWN EVERYTHING</span>
              <span><b>04</b> FIND ARTICLES + ORACLE BLOCKS</span>
              <span className="cat-launch-rule"><b>05</b> DO NOT HIT THE CATS · −150 EACH</span>
            </div>
            <div className="launch-actions">
              <button className="launch-button" onClick={begin} disabled={!ready}>
                <span>{ready ? "START THE ROVALIZER" : loadingLabel}</span>
                <b>{ready ? "→" : `${Math.round(loadingProgress * 100)}%`}</b>
              </button>
              <a className="static-site-button" href="/start"><span>ENTER THE STATIC SITE</span><b>↗</b></a>
            </div>
            <div className="loading-rail"><i style={{ width: `${loadingProgress * 100}%` }} /></div>
            <p className="launch-credit">Three.js + Rapier physics · Architecture adapted from Bruno Simon's MIT-licensed Folio 2025 · Atmosphere and performance studies informed by Revo Realms (MIT)</p>
          </div>
          <div className="vehicle-spec">
            <span className="spec-number">R–01</span>
            <div><small>PLATFORM</small><b>SWOVEE ROVALIZER</b></div>
            <div><small>MISSION</small><b>SCAN · REASON · PRINT</b></div>
            <div><small>STATUS</small><b className="online">{ready ? "FIELD READY" : "CALIBRATING"}</b></div>
          </div>
        </section>
      )}

      {mission && (
        <div className="overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="mission-modal" style={{ "--mission-color": mission.color } as React.CSSProperties} role="dialog" aria-modal="true" aria-labelledby="mission-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close mission">×</button>
            <div className="mission-graphic">
              <div className={`graphic-symbol symbol-${mission.kind}`}><i /><i /><i /><i /></div>
              <span>{mission.index}</span>
            </div>
            <div className={`mission-content ${briefingOpen ? "is-briefing" : ""}`}>
              <span className="mission-label">{mission.index} / {mission.label}</span>
              {mission.founder && <strong className="founder-stamp">{mission.founder}</strong>}
              <h2 id="mission-title">{mission.title}</h2>
              {!briefingOpen ? (
                <>
                  <p className="mission-kicker">{mission.kicker}</p>
                  <p className="mission-description">{mission.description}</p>
                  <div className="mission-actions">
                    {missionOperation && (
                      <button
                        className={`field-operation-button ${operationRuns[missionOperation.id]?.complete ? "is-complete" : ""}`}
                        style={{ "--operation-color": missionOperation.color } as React.CSSProperties}
                        onClick={() => beginOperation(missionOperation)}
                      >
                        <span><small>{missionOperation.code} · PLAYABLE FIELD OPERATION</small><b>{missionOperation.title}</b></span>
                        <em>{operationRuns[missionOperation.id]?.complete ? "COMPLETE ✓" : `+${missionOperation.reward + 270}`}</em>
                      </button>
                    )}
                    {mission.briefing && (
                      <button className="dashboard-brief-button" onClick={() => setBriefingOpen(true)}>
                        <span><small>DASHBOARD BRIEFING · {mission.briefing.readingTime}</small><b>{mission.briefing.title}</b></span>
                        <em>{readArticles.includes(mission.id) ? "READ ✓" : "+225"}</em>
                      </button>
                    )}
                    {mission.support && (
                      <button className="sanctuary-support-button" onClick={() => {
                        setSupportMission(mission);
                        setMission(null);
                        setBriefingOpen(false);
                      }}>
                        <span><small>SANCTUARY SUPPLY MISSION</small><b>{mission.support.title}</b></span>
                        <em>{supportClaimed ? "VERIFIED ✓" : `+${mission.support.bonus}`}</em>
                      </button>
                    )}
                    <button className="return-drive-button" onClick={closeOverlay}>RETURN TO DRIVING <span>→</span></button>
                    <a className="external-project-link" href={mission.href} target={isInteriorPage(mission.href) ? undefined : "_blank"} rel={isInteriorPage(mission.href) ? undefined : "noreferrer"}>{mission.cta}<span>{isInteriorPage(mission.href) ? "→" : "↗"}</span></a>
                  </div>
                  <p className="return-hint">{isInteriorPage(mission.href) ? "This page includes a persistent Return to Expedition control." : "The full project opens in a separate tab. This expedition stays open exactly where you parked."}</p>
                </>
              ) : mission.briefing ? (
                <div className="dashboard-briefing">
                  <div className="briefing-status"><span>IN-VEHICLE DOSSIER</span><b>{mission.briefing.readingTime}</b></div>
                  <h3>{mission.briefing.title}</h3>
                  <p>{mission.briefing.intro}</p>
                  <ul>
                    {mission.briefing.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  {mission.briefing.timeline && (
                    <div className="receipts-timeline">
                      {mission.briefing.timeline.map((item) => (
                        <div key={item.year}><strong>{item.year}</strong><span>{item.event}</span></div>
                      ))}
                    </div>
                  )}
                  {mission.briefing.receipt && <blockquote><span>FIELD RECEIPT</span>{mission.briefing.receipt}</blockquote>}
                  <div className="briefing-actions">
                    <button
                      className={readArticles.includes(mission.id) ? "is-logged" : ""}
                      onClick={() => claimArticle(mission)}
                      disabled={readArticles.includes(mission.id)}
                    >
                      {readArticles.includes(mission.id) ? "BRIEFING LOGGED ✓" : "LOG BRIEFING AS READ  +225"}
                    </button>
                    <a href={mission.href} target={isInteriorPage(mission.href) ? undefined : "_blank"} rel={isInteriorPage(mission.href) ? undefined : "noreferrer"}>VIEW THE FULL PROJECT SITE {isInteriorPage(mission.href) ? "→" : "↗"}</a>
                    <button onClick={closeOverlay}>RETURN TO DRIVING →</button>
                  </div>
                </div>
              ) : null}
            </div>
          </article>
        </div>
      )}

      {operationConsole && (
        <div className="overlay operation-overlay" role="presentation" onMouseDown={closeOverlay}>
          <article
            className={`operation-console ${operationRuns[operationConsole.id]?.complete ? "is-complete" : ""}`}
            style={{ "--operation-color": operationConsole.color } as React.CSSProperties}
            role="dialog"
            aria-modal="true"
            aria-labelledby="operation-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close field operation">×</button>
            <div className="operation-console-visual">
              <span>{operationConsole.code}</span>
              <div className="operation-radar"><i /><i /><i /><b /></div>
              <strong>SCAN<br />REASON<br />PRINT</strong>
            </div>
            <div className="operation-console-copy">
              <span>SWOVEE FIELD OPERATIONS · {operationConsole.zoneId.replaceAll("-", " ")}</span>
              <h2 id="operation-title">{operationConsole.title}</h2>
              <div className="operation-step-rail">
                <i className="is-complete">01 <b>SCAN</b></i>
                <i className={operationRuns[operationConsole.id]?.reasoned ? "is-complete" : "is-active"}>02 <b>REASON</b></i>
                <i className={operationRuns[operationConsole.id]?.complete ? "is-complete" : operationRuns[operationConsole.id]?.reasoned ? "is-active" : ""}>03 <b>PRINT</b></i>
              </div>
              {operationRuns[operationConsole.id]?.complete ? (
                <div className="operation-complete-copy">
                  <strong>STRUCTURE DEPLOYED · FIELD LOOP CLOSED</strong>
                  <p>{operationConsole.receipt}</p>
                  <div><span>SCAN</span><b>{operationConsole.checkpoints.length}/{operationConsole.checkpoints.length}</b></div>
                  <div><span>REASONING MODEL</span><b>ACCEPTED</b></div>
                  <div><span>FABRICATION</span><b>VERIFIED</b></div>
                  <button onClick={closeOverlay}>RETURN TO THE EXPEDITION →</button>
                </div>
              ) : (
                <div className="operation-reasoning">
                  <p>{operationConsole.intro}</p>
                  <blockquote><span>FIELD RECEIPT</span>{operationConsole.receipt}</blockquote>
                  <h3>{operationConsole.question}</h3>
                  <div className="operation-options">
                    {operationConsole.options.map((option, index) => (
                      <button key={option} onClick={() => answerOperation(operationConsole, index)}>
                        <i>{String(index + 1).padStart(2, "0")}</i><span>{option}</span><b>SELECT</b>
                      </button>
                    ))}
                  </div>
                  {operationError && <strong className="operation-error">{operationError}</strong>}
                </div>
              )}
            </div>
          </article>
        </div>
      )}

      {supportMission?.support && (
        <div className="overlay cat-support-overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="cat-support-card" role="dialog" aria-modal="true" aria-labelledby="cat-support-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close cat food mission">×</button>
            <div className="sanctuary-cats" aria-label="Real cats from Gardens of St. Gertrude">
              <img src="https://raw.githubusercontent.com/paleofoundation/Cats/main/assets/profile_ziggy.jpg" alt="Ziggy, a real rescue cat at Gardens of St. Gertrude" />
              <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-toshiba-1.jpg" alt="Toshiba, a real sanctuary cat" />
              <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-splotch-1.jpg" alt="Splotch, a real sanctuary cat" />
              <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-ziggy-1.jpg" alt="A real rescue cat cared for by the sanctuary" />
              <span>THESE ARE REAL GARDENS OF ST. GERTRUDE CATS</span>
            </div>
            <div className="cat-support-copy">
              <span>OPTIONAL SIDE MISSION · GARDENS OF ST. GERTRUDE</span>
              <h2 id="cat-support-title">HELP FEED THE<br /><em>90+.</em></h2>
              <p>{supportMission.support.description}</p>
              <p className="cat-funding-note"><strong>THE ENGINE BEHIND THE CAT FOOD:</strong> Heavy Metal Certified has been the work funding and feeding the Gardens of St. Gertrude cats all these years.</p>
              <div className="cat-food-meter"><span>ONE BAG OF CAT FOOD</span><i><b /></i><strong>EVERY SMALL GIFT MOVES THE MARKER</strong></div>
              <form className="cat-donation-form" action="/api/donations/checkout" method="post" target="_blank" onSubmit={beginSupportDonation}>
                <input type="hidden" name="purpose" value="tinies" />
                <button type="submit" disabled={supportClaimed}>
                  <span>{supportClaimed ? "$1 DONATION VERIFIED" : `${supportMission.support.cta} · $1 SECURE CHECKOUT`}</span>
                  <strong>{supportClaimed ? "CAT POINTS RESTORED ✓" : `RESTORE PENALTIES + ${supportMission.support.bonus} PTS ↗`}</strong>
                </button>
              </form>
              <button onClick={closeOverlay}>RETURN TO DRIVING →</button>
              <small>Stripe checkout opens separately. Only a verified $1 donation restores cat-safety penalties and awards the sanctuary bonus.</small>
            </div>
          </article>
        </div>
      )}

      {oracleCard && (
        <div className="overlay oracle-overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="oracle-card" role="dialog" aria-modal="true" aria-labelledby="oracle-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close Oracle receipt">×</button>
            <div className="oracle-signal"><span>THE</span><strong>O</strong><span>ORACLE</span></div>
            <div className="oracle-copy">
              <span>FIELD RECEIPT · BLOCK {oracleFound.indexOf(oracleCard) + 1}/3</span>
              <h2 id="oracle-title">THE ORACLE</h2>
              <p>That is what Fred Hart called Karen: <strong>“The Oracle.”</strong> Not because the future arrived by magic, but because she kept recognizing the weak signal before it became the obvious market.</p>
              <blockquote>In 2020, Karen told Fred that Pepsi would put prebiotics on its cans. The prediction was on the record before Pepsi confirmed the direction in 2026.</blockquote>
              <div className="oracle-actions">
                <button onClick={closeOverlay}>KEEP DRIVING →</button>
                <button onClick={() => {
                  setOracleCard(null);
                  setMission(receiptsZone);
                  setBriefingOpen(true);
                }}>OPEN THE RECEIPTS DOSSIER</button>
              </div>
            </div>
          </article>
        </div>
      )}

      {fieldLink && (
        <div className="overlay field-link-overlay" role="presentation" onMouseDown={closeOverlay}>
          <article className="field-link-card" style={{ "--field-link-color": fieldLink.color } as React.CSSProperties} role="dialog" aria-modal="true" aria-labelledby="field-link-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close field signal">×</button>
            <span>{fieldLink.kind === "demolition" ? "DEMOLITION REPORT · ROVALIZER 1 / OBSTACLE 0" : fieldLink.eyebrow}</span>
            <h2 id="field-link-title">{fieldLink.label}</h2>
            <p>{fieldLink.kind === "demolition"
              ? DEMOLITION_QUIPS[fieldLink.label] ?? "Another immovable assumption has discovered that it was, in fact, movable."
              : fieldLink.kind === "social"
                ? fieldLink.icon === "orcid"
                  ? "You found Karen’s ORCID research record. Open it to browse the papers, publications, and scholarly trail behind the expedition."
                  : "You knocked over a live social signal. Follow it—or leave it lying in the field and keep driving."
                : fieldLink.kind === "support"
                  ? `${fieldLink.label} is a real, free public website. Explore it without paying a thing; if it earns a coffee, the optional support mission keeps the knowledge flowing.`
                  : "You discovered a modular article signal in the expanded field archive. Read it now, or keep mapping the world."}</p>
            <div>
              {fieldLink.href && (
                <a href={fieldLink.href} target={isInteriorPage(fieldLink.href) ? undefined : "_blank"} rel={isInteriorPage(fieldLink.href) ? undefined : "noreferrer"}>
                  {fieldLink.icon === "orcid" ? "OPEN KAREN’S ORCID RECORD" : fieldLink.icon === "email" ? "CONTACT KAREN" : fieldLink.kind === "social" ? "OPEN SOCIAL PROFILE" : fieldLink.kind === "support" ? `EXPLORE ${fieldLink.label}` : "OPEN ARTICLE"} {isInteriorPage(fieldLink.href) ? "→" : "↗"}
                </a>
              )}
              {fieldLink.kind === "support" && fieldLink.supportPurpose && (
                <form className="knowledge-support-form" action="/api/donations/checkout" method="post" target="_blank" onSubmit={() => beginCoffeeDonation(fieldLink.supportPurpose!)}>
                  <input type="hidden" name="purpose" value={fieldLink.supportPurpose} />
                  <button type="submit" disabled={coffeeSupported.includes(fieldLink.supportPurpose)}>
                    {coffeeSupported.includes(fieldLink.supportPurpose) ? "COFFEE VERIFIED · +750 ✓" : `BUY THE BUILDERS A ${DONATION_PROGRAMS[fieldLink.supportPurpose].amountLabel} COFFEE ↗`}
                  </button>
                </form>
              )}
              <button onClick={closeOverlay}>{fieldLink.kind === "demolition" ? "CONTINUE LUMBERING →" : "RETURN TO DRIVING →"}</button>
            </div>
          </article>
        </div>
      )}

      {showMap && (
        <div className="overlay map-overlay" role="presentation" onMouseDown={closeOverlay}>
          <section className="field-map-panel" role="dialog" aria-modal="true" aria-labelledby="map-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close field map">×</button>
            <header><span>ROVALIZER LIDAR SURVEY · FAST TRAVEL ENABLED</span><h2 id="map-title">EXPEDITION TERRAIN</h2><p>This is the world as the Rovalizer has scanned it: roads, elevation, water, operations, and project districts. Select a discovered signal to jump to its landing pad. Oracle receipts remain deliberately off-grid.</p></header>
            <div className="field-map lidar-map">
              <div className="map-landform map-highland-west"><i /><i /><i /></div>
              <div className="map-landform map-highland-south"><i /><i /><i /></div>
              <div className="map-waterway"><i /><i /></div>
              <span className="map-grid-coordinate coordinate-north">N</span>
              <span className="map-grid-coordinate coordinate-scale">0&nbsp;&nbsp;&nbsp;250&nbsp;&nbsp;&nbsp;500 M</span>
              {WORLD_ROADS.map(([from, to], index) => <i key={`road-${index}`} className="map-world-road" style={mapRoadStyle(from, to)} />)}
              {discovered.map((zoneId) => {
                const zone = expeditionZones.find((item) => item.id === zoneId);
                if (!zone) return null;
                return <i key={`scan-${zone.id}`} className="map-scan-reveal" style={{ left: `${mapPercent(zone.x)}%`, top: `${mapPercent(zone.z)}%`, "--scan-color": zone.color } as React.CSSProperties} />;
              })}
              <i className="map-scan-reveal is-current" style={{ left: `${mapPlayerX}%`, top: `${mapPlayerY}%` } as React.CSSProperties} />
              {expeditionZones.map((zone) => {
                const left = mapPercent(zone.x);
                const top = mapPercent(zone.z);
                const hidden = zone.secret && !discovered.includes(zone.id);
                return (
                  <button
                    key={zone.id}
                    className={`map-zone ${discovered.includes(zone.id) ? "is-found" : ""} ${hidden ? "is-hidden" : ""}`}
                    style={{ left: `${left}%`, top: `${top}%`, "--zone-color": zone.color } as React.CSSProperties}
                    onClick={() => !hidden && jumpToZone(zone)}
                    aria-label={hidden ? "Unmarked signal" : `Jump to ${zone.title}`}
                  >
                    <i>{hidden ? "?" : zone.index}</i><span>{hidden ? "UNMARKED" : zone.title}</span>
                  </button>
                );
              })}
              {fieldOperations.map((operation) => (
                <span
                  key={`operation-${operation.id}`}
                  className={`map-operation ${operationRuns[operation.id]?.complete ? "is-complete" : ""} ${activeOperationId === operation.id ? "is-active" : ""}`}
                  style={{ left: `${mapPercent(operation.buildSite.x)}%`, top: `${mapPercent(operation.buildSite.z)}%`, "--operation-color": operation.color } as React.CSSProperties}
                  title={`${operation.code} ${operation.title}`}
                >{operationRuns[operation.id]?.complete ? "✓" : "◆"}</span>
              ))}
              <span className="map-expansion map-social" style={{ left: `${mapPercent(-72)}%`, top: `${mapPercent(-43)}%` }}>SOCIAL PLAZA · {socialLinks.length}</span>
              <span className="map-expansion map-articles" style={{ left: `${mapPercent(-73)}%`, top: `${mapPercent(32)}%` }}>ARTICLE RANGE · {articleSignals.length}</span>
              <span className="map-expansion map-support" style={{ left: `${mapPercent(-57)}%`, top: `${mapPercent(57)}%` }}>OPEN KNOWLEDGE CAFÉ · {supportLinks.length}</span>
              <span className="map-expansion map-demolition" style={{ left: `${mapPercent(-92)}%`, top: `${mapPercent(-3)}%` }}>DEMOLITION LAB · 8</span>
              <span className="map-rover" style={{ left: `${mapPlayerX}%`, top: `${mapPlayerY}%`, transform: `translate(-50%,-50%) rotate(${telemetry.heading + 90}deg)` }}>▲</span>
            </div>
            <footer><span><i className="map-key scanned" /> SURVEYED</span><span><i className="map-key pending" /> UNMAPPED</span><span>OPS {completedOperations}/{fieldOperations.length} · KNOCKDOWNS {knockedDown.length}/{TOTAL_KNOCKABLES} · R–01 / {Math.round(telemetry.x)}, {Math.round(telemetry.z)}</span></footer>
          </section>
        </div>
      )}

      {showLeaderboard && (
        <div className="overlay leaderboard-overlay" role="presentation" onMouseDown={closeOverlay}>
          <section className="signal-board" role="dialog" aria-modal="true" aria-labelledby="board-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="overlay-close" onClick={closeOverlay} aria-label="Close signal board">×</button>
            <header>
              <span>GLOBAL EXPEDITION RECORD</span>
              <h2 id="board-title">SIGNAL BOARD</h2>
              <p>{markedDiscovered === markedZones.length ? "All project signals mapped." : `${markedZones.length - markedDiscovered} project signal${markedZones.length - markedDiscovered === 1 ? "" : "s"} still missing.`} {oracleFound.length === 3 ? "All Oracle receipts recovered." : `${3 - oracleFound.length} Oracle block${3 - oracleFound.length === 1 ? "" : "s"} remain in the field.`} {catHits.length > 0 ? `${catHits.length} cat-safety strike${catHits.length === 1 ? "" : "s"} deducted ${catPenalty} points.` : "Cat Guardian status: clean."}</p>
            </header>
            <div className="run-summary">
              <span><small>FIELD SCORE</small><b>{totalScore.toString().padStart(4, "0")}</b></span>
              <span><small>SCANS</small><b>{discovered.length}</b></span>
              <span><small>BRIEFINGS</small><b>{readArticles.length}</b></span>
              <span><small>TIME</small><b>{formatTime(elapsed)}</b></span>
            </div>
            <SignedOut>
              <div className="score-sign-in">
                <div><strong>EMAIL-VERIFIED LEADERBOARD</strong><span>Sign in with an email address before adding your name. Your email is never displayed.</span></div>
                <SignInButton mode="modal"><button type="button">SIGN IN TO LOG THIS RUN →</button></SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="board-identity"><UserButton afterSignOutUrl="/" /><span>VERIFIED PILOT · EMAIL HIDDEN</span></div>
              <div className="callsign-form">
                <label htmlFor="player-name">PLAYER NAME</label>
                <input id="player-name" value={playerName} maxLength={32} onChange={(event) => setPlayerName(event.target.value.replace(/[\r\n\t<>]/g, "").slice(0, 32))} />
                <button onClick={submitScore} disabled={submitting || submitted || playerName.trim().length < 2}>{submitted ? "RUN LOGGED ✓" : submitting ? "TRANSMITTING…" : "LOG THIS RUN"}</button>
              </div>
            </SignedIn>
            <ol className="global-leaders">
              {leaders.length === 0 && <li className="empty-board">NO FIELD RECORDS RECEIVED YET. TAKE POLE POSITION.</li>}
              {leaders.map((leader, index) => (
                <li key={leader.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{leader.playerName}</b>
                  <em>{leader.discoveries} SCANS · {leader.articles} BRIEFS · {formatTime(leader.timeSeconds)}</em>
                  <strong>{leader.score.toString().padStart(4, "0")}</strong>
                </li>
              ))}
            </ol>
            <footer className="board-actions">
              <button onClick={closeOverlay}>KEEP EXPLORING</button>
              <button onClick={resetRun}>NEW RUN</button>
              <a href="/contact">CONTACT KAREN →</a>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}
