import { connect } from "react-redux";
import { Dispatch } from "redux";
import { countLoadedImages, getImages } from "../../store/actions/browse";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import Browse, { DispatchProps, StateProps } from "./";
const MIN_LOAD_SIZE = 12;
const ITEM_HEIGHT = 108;
const ITEM_WIDTH = 104;
const getVisibleColumns = () =>  Math.floor(window.innerWidth / ITEM_WIDTH);
const getVisibleRows = () =>  Math.ceil(window.innerHeight / ITEM_HEIGHT);
const mapStateToProps = (state: State) => {
	const { progress, total, uids } = state.entities.lists.browse;
	const { byUID } = state.entities;
	const props: StateProps = {
		"images": uids.map(uid => byUID[uid] as Entity & Partial<Image>),
		progress,
		total,
	};
	return props;
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => {
	const props: DispatchProps = {
		"onImageClick": async(imageUID: string) => dispatch(setLightboxImage({ imageUID })),
		"onLoadNext": async() => {
			const count = dispatch(countLoadedImages());
			const size = getVisibleRows() * getVisibleColumns();
			return dispatch(getImages(count, Math.max(MIN_LOAD_SIZE, size)));
		},
	};
	return props;
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Browse);
