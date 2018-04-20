export interface Name {
	readonly html: string;
	readonly string: string;
	readonly preferred_uid: string;
	readonly synonym_uids: ReadonlySet<string>;
}
