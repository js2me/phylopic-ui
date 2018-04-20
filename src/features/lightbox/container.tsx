import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../stores";
import { getImage, getNames, setLightboxImage } from "../../stores/lightbox";
import Lightbox, { DispatchProps, StateProps } from "./";
const mapStateToProps = (state: State) => {
	const { progress } = state.lightbox;
	return {
		"image": getImage(state),
		"names": getNames(state),
		progress,
	} as StateProps;
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
	"onClose": async() => dispatch(setLightboxImage({})),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Lightbox);
