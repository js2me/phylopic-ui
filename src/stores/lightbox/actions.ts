import { Dispatch } from "redux";
import { fetchLegacy, Image as LegacyImage, PNGFile } from "../../legacy/api";
import { fail, start, succeed } from "../async";
import { addEntities, Entity, getEntities, Image, Name, User } from "../entities";
export enum Types {
	SET = "lightbox/SET",
}
import { State } from "../";
export const set = (payload: {
	imageUID: string | null;
}) => ({
	payload,
	"type": Types.SET as Types.SET,
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
	].every(k => keys.has(k));
};
const getOriginalSize = (image: LegacyImage) => {
	const largest = image.pngFiles.reduce((max: PNGFile | null, file) => max ? (file.width > max.width ? file : max) : file, null);
	if (largest) {
		return [largest.width, largest.height] as [number, number];
	}
	throw new Error("Invalid image.");
};
export const selectImage = (payload: { imageUID: string | null; }) =>
	async(dispatch: Dispatch<State>) => {
		const { imageUID } = payload;
		if (!imageUID) {
			dispatch(set({ "imageUID": null }));
			return;
		}
		const key = `lightbox/${imageUID}`;
		dispatch(start({ key }));
		let image: (Entity & Image) | null = null;
		try {
			const [existingImage] = await dispatch(getEntities<Image>({"uids": [imageUID]}));
			if (existingImage && isCompleteImage(existingImage)) {
				image = existingImage as Entity & Image;
			} else {
				dispatch(set({ "imageUID": null }));
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
				dispatch(addEntities([image, submitter, ...names]));
			}
		} catch (error) {
			dispatch(set({ "imageUID": null }));
			dispatch(fail({ error, key }));
			return;
		}
		dispatch(set({ imageUID }));
		dispatch(succeed({ key }));
};
export type Action = ReturnType<typeof set>;
