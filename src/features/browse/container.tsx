import { connect } from "react-redux";
import { Dispatch } from "redux";
import { countLoadedImages, getImages } from "../../store/actions/browse";
import { setLightboxImage } from "../../store/actions/lightbox";
import { State } from "../../store/reducers";
import { imagesSelector } from "../../store/selectors/browse";
import Browse, { DispatchProps, StateProps } from "./";
const MIN_LOAD_SIZE = 12;
const ITEM_HEIGHT = 108;
const ITEM_WIDTH = 104;
const mapStateToProps = (state: State) => {
	const { total } = state.search.browse || { "total": NaN };
	const props: StateProps = {
		"images": imagesSelector(state),
		total,
	};
	return props;
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => {
	const props: DispatchProps = {
		"onImageClick": async(imageUID: string) => dispatch(setLightboxImage({ imageUID })),
		"onLoadNext": async() => {
			const count = dispatch(countLoadedImages());
			const rows = Math.ceil(window.innerHeight / ITEM_HEIGHT);
			const columns = Math.floor(window.innerWidth / ITEM_WIDTH);
			return dispatch(getImages(count, Math.max(MIN_LOAD_SIZE, rows * columns)));
		},
	};
	return props;
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Browse);
