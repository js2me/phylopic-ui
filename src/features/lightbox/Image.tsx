import * as React from "react";
import { Entity } from "../../store/types/Entity";
import { Image as ImageModel } from "../../store/types/Image";
export interface Props {
	image: Readonly<Entity & Pick<ImageModel, "originalSize" | "vector">>;
}
const Image: React.SFC<Props> = ({ image }) => {
	const src = `http://phylopic.org/assets/images/submissions/${image.uid}.${image.vector ? "svg" : "original.png"}`;
	return (
		<img
			height={image.originalSize[1]}
			src={src}
			width={image.originalSize[0]}
		/>
	);
};
export default Image;
