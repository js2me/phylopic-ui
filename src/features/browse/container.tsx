import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getImages } from "../../store/actions/browse";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
import Browse from "./";
const MIN_LOAD_SIZE = 12;
const ITEM_HEIGHT = 108;
const ITEM_WIDTH = 104;
interface StateProps {
	images: Array<Entity & Partial<Image>>;
	progress: Progress;
	total: number;
}
interface DispatchProps {
	dispatch: Dispatch<State>;
}
type Props = StateProps & DispatchProps;
const getVisibleColumns = () =>  Math.floor(window.innerWidth / ITEM_WIDTH);
const getVisibleRows = () =>  Math.ceil(window.innerHeight / ITEM_HEIGHT);
const mapStateToProps = (state: State) => {
	const { progress, total, uids } = state.entities.lists.browse;
	const { byUID } = state.entities;
	return {
		"images": uids.map(uid => byUID[uid]),
		progress,
		total,
	};
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({ dispatch });
class BrowseContainer extends React.Component<Props> {
	public async componentWillMount() {
		return this.loadNext();
	}
	public render() {
		const { images, progress, total } = this.props;
		return (
			<Browse
				images={images}
				onImageClick={this.openLightbox}
				onLoadNext={this.loadNext}
				progress={progress}
				total={total}
			/>
		);
	}
	private readonly loadNext = async() => {
		const { dispatch, images } = this.props;
		const size = getVisibleRows() * getVisibleColumns();
		return dispatch(getImages(images.length, Math.max(MIN_LOAD_SIZE, size)));
	}
	private readonly openLightbox = async(imageUID: string) => {
		const { dispatch } = this.props;
		return dispatch(setLightboxImage({ imageUID }));
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BrowseContainer);
