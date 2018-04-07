interface ImageBase {
    attribution: string;
    general_uid: string | null;
    licenseURL: string;
    modified: string;
    specific_uid: string;
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

