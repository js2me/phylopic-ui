import { connect } from "react-redux";
import { Dispatch } from "redux";
import { countLoadedImages, loadImages } from "../../store/actions/browse";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { getEntities, getTotal } from "../../store/reducers/search";
import { getWindowHeight, getWindowWidth } from "../../store/reducers/windowSize";
import { Image } from "../../store/types/Image";
import Browse, { DispatchProps, StateProps } from "./";
const KEY = "browse";
const getImages = getEntities<Image>(KEY);
const getTotalImages = getTotal(KEY);
const mapStateToProps = (state: State) => ({
	"height": getWindowHeight(state),
	"images": getImages(state),
	"total": getTotalImages(state),
	"width": getWindowWidth(state),
} as StateProps);
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
	"onImageClick": async(imageUID: string) => dispatch(setLightboxImage({ imageUID })),
	"onLoadNext": async(numToLoad: number) => {
		const count = dispatch(countLoadedImages());
		return dispatch(loadImages(count, numToLoad));
	},
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Browse);
