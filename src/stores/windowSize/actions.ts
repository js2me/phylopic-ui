export enum Types {
	SET = "windowSize/SET",
}
export const set = (payload: Readonly<[number, number]>) => ({
	payload,
	"type": Types.SET as Types.SET,
});
export type Action = ReturnType<typeof set>;
