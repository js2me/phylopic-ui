import Chip from "material-ui/Chip";
import CircularProgress from "material-ui/Progress/CircularProgress";
import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import ThumbnailGrid from "../../shared/ThumbnailGrid";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
export interface Props {
	images: Array<Entity & Partial<Image>>;
	onImageClick: (uid: string) => void;
	onLoadNext: () => void;
	progress: Progress;
	total: number;
}
const Browse: React.SFC<Props> = ({
	images,
	onImageClick,
	onLoadNext,
	progress,
	total,
}) => (
		<InfiniteScroll
			hasMore={total <= images.length}
			loadMore={onLoadNext}
			loader={(<CircularProgress/>)}
			pageStart={0}
			style={{ "textAlign": "center", "width": "100%" }}
		>
			<Chip label={isNaN(total) ? "…" : total}/>
			<ThumbnailGrid
				images={images}
				onImageClick={onImageClick}
			/>
		</InfiniteScroll>
	);
export default Browse;
