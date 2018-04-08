import * as React from "react";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
const DIMENSION = 64;
export interface Props {
	image: Entity & Partial<Image>;
}
const Thumbnail: React.SFC<Props> = ({ image }) => (
	<img
		alt={image.attribution ? `silhouette by ${image.attribution}` : "unattributed silhouette"}
		height={DIMENSION}
		src={`http://phylopic.org/assets/images/submissions/${image.uid}.thumb.png`}
		width={DIMENSION}
	/>
);
export default Thumbnail;
