import { connect } from "react-redux";
import { Dispatch } from "redux";
import { set } from "../../store/actions/windowSize";
import { State } from "../../store/reducers";
import WindowSize, { DispatchProps } from "./";
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
	"onResize": (size: [number, number]) => dispatch(set(size)),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WindowSize);
