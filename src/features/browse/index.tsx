import Chip from "material-ui/Chip";
import CircularProgress from "material-ui/Progress/CircularProgress";
import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import ThumbnailGrid from "../../shared/ThumbnailGrid";
import { Entity, Image } from "../../stores/entities";
const CELL_HEIGHT = 108;
const CELL_WIDTH = 104;
export interface DispatchProps {
	onImageClick: (imageUID: string) => void;
	onLoadNext: (numLoaded: number, numToLoad: number) => void;
}
export interface StateProps {
	height: number;
	images: ReadonlyArray<Entity & Partial<Image>>;
	total: number;
	width: number;
}
class Browse extends React.Component<DispatchProps & StateProps> {
	public async componentWillMount() {
		if (!this.props.images.length) {
			return this.loadNext();
		}
	}
	public render() {
		const {
			height,
			images,
			onImageClick,
			total,
			width,
		} = this.props;
		const { length } = images;
		return (
			<InfiniteScroll
				hasMore={length < total}
				loadMore={this.loadNext}
				loader={(<CircularProgress/>)}
				pageStart={0}
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
	protected loadNext = async() => {
		const { images, onLoadNext } = this.props;
		const columns = Math.max(1, Math.floor(this.props.width / CELL_WIDTH));
		const visibleRows = Math.max(1, Math.ceil(this.props.height / CELL_HEIGHT));
		return onLoadNext(images.length, columns * visibleRows);
	}
}
export default Browse;
