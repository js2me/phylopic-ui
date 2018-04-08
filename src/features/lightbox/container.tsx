import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import Lightbox, { DispatchProps, StateProps } from "./";
const mapStateToProps = (state: State) => {
	const props: StateProps = {
		"image": state.lightbox.imageUID
			? (state.entities.byUID[state.lightbox.imageUID] as Readonly<Entity & Image> || null)
			: null,
		"progress": state.lightbox.progress,
	};
	return props;
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => {
	const props: DispatchProps = {
		"onClose": async() => dispatch(setLightboxImage({})),
	};
	return props;
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Lightbox);
