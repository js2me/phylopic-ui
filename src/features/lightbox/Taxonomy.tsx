import Chip from "material-ui/Chip";
import * as React from "react";
import { Entity } from "../../store/types/Entity";
import { Name } from "../../store/types/Name";
export interface Props {
	names: ReadonlyArray<Entity & Pick<Name, "html">>;
}
const Taxonomy: React.SFC<Props> = ({ names }) => (
	<div>
		{
			names.map(name => (
				<Chip
					key={name.uid}
					label={<span dangerouslySetInnerHTML={{ "__html": name.html}}/>}
				/>
			))
		}
	</div>
);
export default Taxonomy;
