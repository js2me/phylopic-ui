import Grid from "material-ui/Grid";
import * as React from "react";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import Thumbnail from "../Thumbnail";
const SPACING = 40;
export interface Props {
	images: Array<Entity & Partial<Image>>;
}
const ThumbnailGrid: React.SFC<Props> = ({ images }) => (
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
					<Thumbnail image={image} />
				</Grid>
			))
		}
	</Grid>
);
export default ThumbnailGrid;
