export enum Types {
	SET = "selections/SET",
}
export const set = <T>(payload: {
	key: string;
	uids: ReadonlyArray<string>;
}) => ({
	payload,
	"type": Types.SET as Types.SET,
});
export type Action = ReturnType<typeof set>;
