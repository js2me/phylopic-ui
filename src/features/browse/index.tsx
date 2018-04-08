import GridList, { GridTile } from "material-ui/GridList";
import * as React from "react";
import ProgressIndicator from "../../shared/ProgressIndicator";
import Thumbnail from "../../shared/Thumbnail";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
const COLUMNS = 12;
export interface Props {
	images: Array<Entity & Partial<Image>>;
	onRetry: () => void;
	progress: Progress;
}
const Browse: React.SFC<Props> = ({
	images,
	onRetry,
	progress,
}) => (
		<div>
			<GridList cols={COLUMNS}>
				{
					images.map(image => (
						<GridTile>
							<Thumbnail image={image} />
						</GridTile>
					))
				}
			</GridList>
			<ProgressIndicator
				onRetry={onRetry}
				progress={progress}
			/>
		</div>
	);
export default Browse;
