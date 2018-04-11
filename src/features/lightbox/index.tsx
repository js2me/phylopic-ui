import Dialog, { DialogContent } from "material-ui/Dialog";
import * as React from "react";
import ProgressIndicator from "../../shared/ProgressIndicator";
import { Entity } from "../../store/types/Entity";
import { Image as ImageModel } from "../../store/types/Image";
import { Name } from "../../store/types/Name";
import { Progress } from "../../store/types/Progress";
import Image from "./Image";
import Taxonomy from "./Taxonomy";
export interface DispatchProps {
	onClose: () => void;
}
export interface StateProps {
	image: Readonly<Entity & ImageModel> | null;
	names: ReadonlyArray<Entity & Pick<Name, "html">> | null;
	progress: Progress;
}
const Lightbox: React.SFC<DispatchProps & StateProps> = ({
	image,
	names,
	onClose,
	progress,
}) => (
		<Dialog
			fullWidth={true}
			maxWidth="md"
			open={progress.pending || Boolean(image || progress.error)}
			onClose={onClose}
		>
			<DialogContent>
				<ProgressIndicator progress={progress}>
					{names && <Taxonomy names={names}/>}
					{image && <Image image={image}/>}
				</ProgressIndicator>
			</DialogContent>
		</Dialog>
	);
export default Lightbox;
