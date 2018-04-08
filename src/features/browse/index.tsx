import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Icon from "material-ui/Icon";
import * as React from "react";
import ProgressIndicator from "../../shared/ProgressIndicator";
import Thumbnail from "../../shared/Thumbnail";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
const SPACING = 40;
export interface Props {
	images: Array<Entity & Partial<Image>>;
	onLoadNext: () => void;
	onRetry: () => void;
	progress: Progress;
	total: number;
}
const Browse: React.SFC<Props> = ({
	images,
	onLoadNext,
	onRetry,
	progress,
	total,
}) => (
		<div style={{ "textAlign": "center", "width": "100%" }}>
			<Grid
				alignContent="center"
				alignItems="center"
				container={true}
				justify="center"
				spacing={SPACING}
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
			<ProgressIndicator
				onRetry={onRetry}
				progress={progress}
			>
				{
					!(images.length >= total) && (
						<Button
							aria-label="load more"
							color="primary"
							onClick={onLoadNext}
							variant="fab"
						>
							<Icon>arrow_drop_down</Icon>
						</Button>
					)
				}
			</ProgressIndicator>
		</div>
	);
export default Browse;
