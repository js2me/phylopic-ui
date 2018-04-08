import Modal from "material-ui/Modal";
import * as React from "react";
import ProgressIndicator from "../../shared/ProgressIndicator";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
export interface DispatchProps {
	onClose: () => void;
}
export interface StateProps {
	image: Readonly<Entity & Image> | null;
	progress: Progress;
}
const renderImage = (image: Readonly<Entity & Image> | null) => {
	if (image) {
		const src = `http://phylopic.org/assets/images/submissions/${image.uid}.${image.vector ? "svg" : "original.png"}`;
		return (
			<img src={src} />
		);
	}
	return undefined;
};
const Lightbox: React.SFC<DispatchProps & StateProps> = ({
	image,
	onClose,
	progress,
}) => (
		<Modal
			open={Boolean(image) || progress.status !== "success"}
			onClose={onClose}
		>
			<ProgressIndicator progress={progress}>
				{renderImage(image)}
			</ProgressIndicator>
		</Modal>
	);
export default Lightbox;
