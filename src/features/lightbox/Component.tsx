import Dialog, { DialogContent } from "material-ui/Dialog";
import * as React from "react";
import ProgressIndicator from "../../shared/ProgressIndicator";
import { Progress } from "../../stores/async";
import { Entity, Image as ImageModel, Name } from "../../stores/entities";
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
const Component: React.SFC<DispatchProps & StateProps> = ({
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
export default Component;
