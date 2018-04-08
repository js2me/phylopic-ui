import Grid from "material-ui/Grid";
import * as React from "react";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import Thumbnail from "../Thumbnail";
const SPACING = 40;
export interface Props {
	images: ReadonlyArray<Entity & Partial<Image>>;
	onImageClick?: (uid: string) => void;
}
const ThumbnailGrid: React.SFC<Props> = ({ images, onImageClick }) => (
	<Grid
		alignContent="center"
		alignItems="center"
		container={true}
		justify="center"
		key="grid"
		spacing={SPACING}
		style={{ "marginBottom": "2rem" }}
	>
		{
			images.map(image => (
				<Grid
					item={true}
					key={image.uid}
				>
					<Thumbnail
						image={image}
						onClick={onImageClick ? () => onImageClick(image.uid) : undefined}
					/>
				</Grid>
			))
		}
	</Grid>
);
export default ThumbnailGrid;
