import Paper from "material-ui/Paper";
import * as React from "react";
import { Entity, Image as ImageModel } from "../../stores/entities";
export interface Props {
	image: Readonly<Entity & Pick<ImageModel, "vector">>;
}
const Image: React.SFC<Props> = ({ image }) => {
	const src = `http://phylopic.org/assets/images/submissions/${image.uid}.${image.vector ? "svg" : "original.png"}`;
	return (
		<Paper style={{"overflow": "hidden", "textAlign": "center"}}>
			<img
				alt="silhouette"
				style={{
					"height": "auto",
					"margin": "2rem",
					"maxHeight": "50vh",
					"maxWidth": "100%",
					"objectFit": "contain",
					"width": "auto",
				}}
				src={src}
			/>
		</Paper>
	);
};
export default Image;
