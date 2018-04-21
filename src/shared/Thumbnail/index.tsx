import * as React from "react";
import { Entity, Image } from "../../stores/entities";
const DIMENSION = 64;
export interface Props {
	image: (Entity & Partial<Image>) | undefined;
	onClick?: () => void;
}
const Thumbnail: React.SFC<Props> = ({ image, onClick }) => {
	if (image) {
		const img = (
			<img
				alt={image.attribution ? `silhouette by ${image.attribution}` : "unattributed silhouette"}
				height={DIMENSION}
				src={`http://phylopic.org/assets/images/submissions/${image.uid}.thumb.png`}
				width={DIMENSION}
			/>
		);
		if (!onClick) {
			return img;
		}
		return (
			<a href="#" onClick={onClick}>
				{img}
			</a>
		);
	}
	return <span/>;
};
export default Thumbnail;
