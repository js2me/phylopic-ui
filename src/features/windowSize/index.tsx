import * as React from "react";
import { getWindowSize, listenToWindowResize } from "../../helpers/windowSize";
export interface DispatchProps {
	onResize: (size: [number, number]) => void;
}
class WindowSize extends React.Component<DispatchProps> {
	public componentWillMount() {
		listenToWindowResize(() => this.props.onResize(getWindowSize()));
	}
	// tslint:disable:prefer-function-over-method
	public render() {
		return null;
	}
	// tslint:enable:prefer-function-over-method
}
export default WindowSize;
