import { Dispatch } from "redux";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { Name } from "../types/Name";
import { Progress } from "../types/Progress";
import { User } from "../types/User";
export enum Types {
	SET_LIGHTBOX = "SET_LIGHTBOX",
}
import { State } from "../reducers";
import { addEntities, getEntities } from "./entities";
import { fetchLegacy, Image as LegacyImage, PNGFile } from "./legacy";
export const setLightbox = (payload: {
	imageUID: string | null;
	progress: Progress;
}) => ({
	payload,
	"type": Types.SET_LIGHTBOX as Types.SET_LIGHTBOX,
});
const isCompleteImage = (image: Partial<Image>) => {
	const keys = new Set(Object.keys(image));
	return [
		"attribution",
		"licenseURL",
		"modified",
		"name_uids",
		"originalSize",
		"submitted",
		"submitter_uid",
		"vector",
	].every(key => keys.has(key));
};
const getOriginalSize = (image: LegacyImage) => {
	const largest = image.pngFiles.reduce((max: PNGFile | null, file) => max ? (file.width > max.width ? file : max) : file, null);
	if (largest) {
		return [largest.width, largest.height] as [number, number];
	}
	throw new Error("Invalid image.");
};
export const setLightboxImage = (payload: { imageUID?: string; }) =>
	async(dispatch: Dispatch<State>) => {
		let image: (Entity & Image) | null = null;
		try {
			const { imageUID } = payload;
			if (!imageUID) {
				dispatch(setLightbox({
					"imageUID": null,
					"progress": {
						"error": null,
						"pending": false,
					},
				}));
				return;
			}
			const [existingImage] = dispatch(getEntities([imageUID])) as Array<Readonly<Entity & Partial<Image>> | undefined>;
			if (existingImage && isCompleteImage(existingImage)) {
				image = existingImage as Entity & Image;
			} else {
				dispatch(setLightbox({
					"imageUID": null,
					"progress": {
						"error": null,
						"pending": true,
					},
				}));
				const legacyImage = await fetchLegacy<Entity & LegacyImage>(
					dispatch,
					`http://phylopic.org/api/a/image/${imageUID}?options=credit+licenseURL+modified+pngFiles+submitted+submitter+svgFile+taxa+canonicalName+html+string+allowContact+email+firstName+lastName`,
				);
				image = {
					"attribution": legacyImage.credit,
					"licenseURL": legacyImage.licenseURL,
					"modified": legacyImage.modified,
					"name_uids": legacyImage.taxa.map(taxon => taxon.canonicalName!.uid),
					"originalSize": getOriginalSize(legacyImage),
					"submitted": legacyImage.submitted,
					"submitter_uid": legacyImage.submitter.uid,
					"uid": imageUID,
					"vector": Boolean(legacyImage.svgFile),
				};
				const names: Array<Entity & Partial<Name>> = legacyImage.taxa.map(taxon => taxon.canonicalName!);
				const submitter: Entity & Partial<User> = legacyImage.submitter;
				const entities: Entity[] = [image, submitter, ...names];
				dispatch(addEntities(entities));
			}
		} catch (error) {
			dispatch(setLightbox({
				"imageUID": null,
				"progress": {
					error,
					"pending": false,
				},
			}));
			return;
		}
		dispatch(setLightbox({
			"imageUID": image ? image.uid : null,
			"progress": {
				"error": null,
				"pending": false,
			},
		}));
	};
export type Action = ReturnType<typeof setLightbox>;
