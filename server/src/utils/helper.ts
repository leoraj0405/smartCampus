import { EventType, TargetAudience } from "./enums";

export function isValidEventType(value: any): value is EventType {
    return Object.values(EventType)
        .filter(v => typeof v === "number")
        .includes(Number(value));
}

export function isValidAudience(value: number): value is TargetAudience {
    return Object.values(TargetAudience)
        .filter(v => typeof v === "number")
        .includes(Number(value));
}