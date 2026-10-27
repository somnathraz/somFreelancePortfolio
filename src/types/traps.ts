/**
 * Trace format v1. Mirror of interview-traps/shared/trace-schema.ts
 * (github.com/somnathraz/interview-traps). Keep the two in sync.
 */

export type ActorKind = "client" | "server" | "db" | "cache" | "queue" | "external";

export interface TrapActor {
    id: string;
    label: string;
    kind: ActorKind;
}

export type TrapEventType = "request" | "read" | "write" | "wait" | "check" | "response" | "note";
export type TrapSeverity = "ok" | "warn" | "bad";
export type StoreState = Record<string, Array<Record<string, string | number | boolean | null>>>;

export interface TrapEvent {
    t: number;
    actor: string;
    target?: string;
    type: TrapEventType;
    label: string;
    detail?: string;
    step?: string;
    severity?: TrapSeverity;
    state?: StoreState;
}

export interface TrapVariant {
    label: string;
    source: string;
    steps: Record<string, [number, number]>;
    initialState: StoreState;
    events: TrapEvent[];
    outcome: { ok: boolean; headline: string };
}

export interface TrapBundle {
    schemaVersion: 1;
    slug: string;
    number: number;
    title: string;
    question: string;
    why: string;
    rule: string;
    links: { repo: string; reel?: string | null };
    actors: TrapActor[];
    variants: { bug: TrapVariant; fix: TrapVariant };
    generatedAt: string;
}

export type TrapVariantName = keyof TrapBundle["variants"];
