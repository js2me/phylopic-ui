import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../stores";
import { Image } from "../../stores/entities";
import { setLightboxImage } from "../../stores/lightbox";
import { getEntities, getTotal } from "../../stores/search";
import { getWindowHeight, getWindowWidth } from "../../stores/windowSize";
import Browse, { DispatchProps, StateProps } from "./";
import { loadImages } from "./actions";
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
	"onLoadNext": async(numLoaded: number, numToLoad: number) => dispatch(loadImages(numLoaded, numToLoad)),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Browse);
