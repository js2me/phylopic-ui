interface ImageBase {
    attribution: string;
    licenseURL: string;
    modified: string;
    name_uids: string[];
    submitted: string;
    submitter_uid: string;
}
interface RasterImage extends ImageBase {
    originalSize: [number, number];
}
interface VectorImage extends ImageBase {
    vector: true;
}
export type Image = RasterImage | VectorImage;

