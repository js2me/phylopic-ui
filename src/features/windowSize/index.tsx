import * as React from "react";
import { getWindowSize } from "../../helpers/windowSize";
export interface DispatchProps {
	onResize: (size: [number, number]) => void;
}
declare global {
	interface Window {
		attachEvent: (name: string, listener: (event: Event) => void) => void;
	}
}
const listenToWindowResize = (listener: () => void) => {
	if (window.addEventListener) {
		window.addEventListener("resize", listener);
	} else if (window.attachEvent) {
		window.attachEvent("onresize", listener);
	} else if (window.onresize) {
		const existing = window.onresize;
		window.onresize = (event: UIEvent) => {
			listener();
			existing.call(window, event);
		};
	} else {
		window.onresize = listener;
	}
};
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
