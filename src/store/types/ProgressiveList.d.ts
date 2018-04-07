import { Progress } from "./Progress";
export interface ProgressiveList {
    progress: Progress;
    total: number;
    uids: string[];
}
