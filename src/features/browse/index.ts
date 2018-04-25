import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../stores";
import { Image } from "../../stores/entities";
import { selectImage } from "../../stores/lightbox";
import { getEntities, getTotal } from "../../stores/searches";
import { getWindowHeight, getWindowWidth } from "../../stores/windowSize";
import { loadImages } from "./actions";
import Component, { DispatchProps, StateProps } from "./Component";
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
	"onImageClick": async(imageUID: string) => dispatch(selectImage({ imageUID })),
	"onLoadRequest": async(start: number, size: number) => dispatch(loadImages(start, size)),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Component);
