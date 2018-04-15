export const getWindowSize: () => [number, number] = () => {
	const element = document.documentElement;
	const body = document.getElementsByTagName("body")[0];
	return [
		window.innerWidth || element.clientWidth || body.clientWidth,
		window.innerHeight || element.clientHeight || body.clientHeight,
	];
};
