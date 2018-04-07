import { Entity } from "./Entity";
import { Image } from "./Image";
import { Name } from "./Name";
import { ProgressiveList } from "./ProgressiveList";
import { User } from "./User";
export interface State {
    entitiesByUID: {
        [uid: string]: Entity;
    };
    entityLists: {
        [id: string]: ProgressiveList;
    };
    version: string;
}
