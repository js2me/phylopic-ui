import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { getImage, getNames } from "../../store/reducers/lightbox";
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
