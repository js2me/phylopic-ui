import Chip from "material-ui/Chip";
import CircularProgress from "material-ui/Progress/CircularProgress";
import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import ThumbnailGrid from "../../shared/ThumbnailGrid";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
const CELL_HEIGHT = 108;
const CELL_WIDTH = 104;
export interface DispatchProps {
	onImageClick: (imageUID: string) => void;
	onLoadNext: (numToLoad: number) => void;
}
export interface StateProps {
	height: number;
	images: ReadonlyArray<Entity & Partial<Image>>;
	total: number;
	width: number;
}
class Browse extends React.Component<DispatchProps & StateProps> {
	public async componentWillMount() {
		return this.props.onLoadNext(this.pageSize);
	}
	public render() {
		const {
			height,
			images,
			onImageClick,
			onLoadNext,
			total,
			width,
		} = this.props;
		const { length } = images;
		return (
			<InfiniteScroll
				hasMore={length < total}
				loadMore={() => onLoadNext(this.pageSize)}
				loader={(<CircularProgress/>)}
				pageStart={0}
				style={{ "textAlign": "center", "width": "100%" }}
			>
				{!isNaN(total) && <div><Chip label={total}/> images in the database.</div>}
				<ThumbnailGrid
					height={height}
					images={images}
					onImageClick={onImageClick}
					width={width}
				/>
				{!length && <CircularProgress/>}
			</InfiniteScroll>
		);
	}
	protected get columns() {
		return Math.max(1, Math.floor(this.props.width / CELL_WIDTH));
	}
	protected get pageSize() {
		return this.visibleRows * this.columns;
	}
	protected get visibleRows() {
		return Math.max(1, Math.ceil(this.props.height / CELL_HEIGHT));
	}
}
export default Browse;
