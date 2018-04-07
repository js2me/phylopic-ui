interface ImageBase {
    licenseURL: string;
    attribution: string;
    submitter_uid: string;
    specific_uid: string;
    general_uid: string | null;
}
interface RasterImage extends ImageBase {
    originalSize: [number, number];
}
interface VectorImage extends ImageBase {
    vector: true;
}
export type Image = RasterImage | VectorImage;

