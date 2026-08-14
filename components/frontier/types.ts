import type { DonationPurpose } from "@/lib/donations";

export type Telemetry = {
  speed: number;
  heading: number;
  x: number;
  z: number;
  boosting: boolean;
  scanning: boolean;
};

export type FieldIcon = "linkedin" | "instagram" | "x" | "facebook" | "email" | "orcid" | "microbiome" | "wikibiome";

export type FieldObjectEvent = {
  id: string;
  label: string;
  eyebrow: string;
  kind: "social" | "article" | "demolition" | "support";
  href?: string;
  icon?: FieldIcon;
  supportPurpose?: DonationPurpose;
  color: string;
  points: number;
};

export type ExperienceCallbacks = {
  onProgress: (progress: number, label: string) => void;
  onReady: () => void;
  onTelemetry: (telemetry: Telemetry) => void;
  onProximity: (zoneId: string | null) => void;
  onPrint: () => void;
  onOracle: (blockId: string) => void;
  onKnockdown: (item: FieldObjectEvent) => void;
  onCatHit: (catId: string) => void;
  onOperationCheckpoint: (operationId: string, checkpointId: string) => void;
  onOperationPrint: (operationId: string) => void;
};

export type OperationStage = "scan" | "print";

export type DriveAction = "forward" | "backward" | "left" | "right" | "boost" | "brake";

export type ExperienceHandle = {
  start: () => void;
  pause: () => void;
  reset: () => void;
  teleportTo: (x: number, z: number) => void;
  print: () => void;
  setMuted: (muted: boolean) => void;
  setAction: (action: DriveAction, active: boolean) => void;
  setOperation: (operationId: string | null, stage?: OperationStage) => void;
  destroy: () => void;
};
