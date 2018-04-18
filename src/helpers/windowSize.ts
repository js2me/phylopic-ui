declare global {
	interface Window {
		attachEvent: (name: string, listener: (event: Event) => void) => void;
	}
}
export const getWindowSize: () => [number, number] = () => {
	const element = document.documentElement;
	const body = document.getElementsByTagName("body")[0];
	return [
		window.innerWidth || element.clientWidth || body.clientWidth,
		window.innerHeight || element.clientHeight || body.clientHeight,
	];
};
export const listenToWindowResize = (listener: () => void) => {
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
