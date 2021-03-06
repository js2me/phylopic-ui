import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Browse from "./features/browse";
import Lightbox from "./features/lightbox";
import { getWindowSize, listenToWindowResize } from "./helpers/windowSize";
import { State } from "./stores";
import { set } from "./stores/windowSize/actions";
export interface DispatchProps {
	onResize: (size: [number, number]) => void;
}
class App extends React.Component<DispatchProps> {
	public componentWillMount() {
		listenToWindowResize(() => this.props.onResize(getWindowSize()));
	}
	// tslint:disable:prefer-function-over-method
	public render() {
		return (
			<div>
				<AppBar position="sticky">
					<Toolbar>
						<Typography variant="title" color="inherit">
							PhyloPic
						</Typography>
					</Toolbar>
				</AppBar>
				<div style={{ "padding": 20 }}>
					<Browse />
				</div>
				<Lightbox />
			</div>
		);
	}
	// tslint:enable:prefer-function-over-method
}
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
	"onResize": (size: Readonly<[number, number]>) => dispatch(set(size)),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
