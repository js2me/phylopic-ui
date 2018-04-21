import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../stores";
import { getProgress } from "../../stores/async";
import { getImage, getNames, getProgressKey, selectImage } from "../../stores/lightbox";
import Lightbox, { DispatchProps, StateProps } from "./";
const mapStateToProps = (state: State) => {
	const key = getProgressKey(state);
	const progress = getProgress(key)(state);
	return {
		"image": getImage(state),
		"names": getNames(state),
		progress,
	} as StateProps;
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
	"onClose": async() => dispatch(selectImage({ "imageUID": null })),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Lightbox);
