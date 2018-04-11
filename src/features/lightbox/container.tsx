import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Name } from "../../store/types/Name";
import Lightbox, { DispatchProps, StateProps } from "./";
const mapStateToProps = (state: State) => {
	const { entities } = state;
	const { imageUID, progress } = state.lightbox;
	const image = imageUID
		? (entities[imageUID] as Readonly<Entity & Image> || null)
		: null;
	const names = image
		? image.name_uids
			.map(uid => entities[uid] as Readonly<Entity & Pick<Name, "html">>)
			.filter(Boolean)
		: null;
	return {
		image,
		names,
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
