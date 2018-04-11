import Chip from "material-ui/Chip";
import CircularProgress from "material-ui/Progress/CircularProgress";
import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroller";
import ThumbnailGrid from "../../shared/ThumbnailGrid";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
export interface DispatchProps {
	onImageClick: (imageUID: string) => void;
	onLoadNext: () => void;
}
export interface StateProps {
	images: ReadonlyArray<Entity & Partial<Image>>;
	total: number;
}
class Browse extends React.Component<DispatchProps & StateProps> {
	public async componentWillMount() {
		return this.props.onLoadNext();
	}
	public render() {
		const {
			images,
			onImageClick,
			onLoadNext,
			total,
		} = this.props;
		const { length } = images;
		return (
			<InfiniteScroll
				hasMore={length < total}
				loadMore={onLoadNext}
				loader={(<CircularProgress/>)}
				pageStart={0}
				style={{ "textAlign": "center", "width": "100%" }}
			>
				{!isNaN(total) && <div><Chip label={total}/> images in the database.</div>}
				<ThumbnailGrid
					images={images}
					onImageClick={onImageClick}
				/>
				{!length && <CircularProgress/>}
			</InfiniteScroll>
		);
	}
}
export default Browse;
