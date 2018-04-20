import { Entity } from "./Entity";
export interface EntityParams<T> extends Pick<Entity, "uid"> {
    readonly fields?: ReadonlySet<keyof T>;
}
