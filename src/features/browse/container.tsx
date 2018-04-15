import { connect } from "react-redux";
import { Dispatch } from "redux";
import { countLoadedImages, loadImages } from "../../store/actions/browse";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { getImages, getTotal } from "../../store/reducers/browse";
import { getWindowHeight, getWindowWidth } from "../../store/reducers/windowSize";
import Browse, { DispatchProps, StateProps } from "./";
const CELL_HEIGHT = 108;
const COLUMNS = 12;
const mapStateToProps = (state: State) => ({
	"height": getWindowHeight(state),
	"images": getImages(state),
	"total": getTotal(state),
	"width": getWindowWidth(state),
} as StateProps);
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
	"onImageClick": async(imageUID: string) => dispatch(setLightboxImage({ imageUID })),
	"onLoadNext": async() => {
		const count = dispatch(countLoadedImages());
		const rows = Math.max(1, Math.ceil(window.innerHeight / CELL_HEIGHT));
		return dispatch(loadImages(count, rows * COLUMNS));
	},
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Browse);
