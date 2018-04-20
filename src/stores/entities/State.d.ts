import { Entity } from "./Entity";
export type State = Readonly<Record<string, Entity | undefined>>;
