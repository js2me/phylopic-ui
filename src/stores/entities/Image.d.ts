export interface Image {
	readonly attribution: string;
	readonly licenseURL: string;
	readonly modified: string;
	readonly name_uids: ReadonlyArray<string>;
	readonly originalSize: Readonly<[number, number]>;
	readonly submitted: string;
	readonly submitter_uid: string;
	readonly vector: boolean;
}
