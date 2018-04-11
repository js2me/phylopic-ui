import { Theme } from "material-ui";
import Chip from "material-ui/Chip";
import Icon from "material-ui/Icon";
import { StyleRules, withStyles, WithStyles } from "material-ui/styles";
import * as React from "react";
import { Entity } from "../../store/types/Entity";
import { Name } from "../../store/types/Name";
const styles: (theme: Theme) => StyleRules = (theme: Theme) => ({
	"chip": {
		"marginBottom": theme.spacing.unit,
	},
	"root": {
		"display": "flex",
		"flexWrap": "wrap",
		"justifyContent": "center",
	},
});
export interface Props extends Partial<WithStyles> {
	names: ReadonlyArray<Entity & Pick<Name, "html">>;
}
const Taxonomy: React.SFC<Props> = ({ classes, names }) => (
	<div className={classes!.root}>
		{
			names.map((name, index) => [
				index ? <Icon>arrow_forward</Icon> : null,
				<Chip
					className={classes!.chip}
					key={name.uid}
					label={<span dangerouslySetInnerHTML={{ "__html": name.html }} />}
				/>,
			])
		}
	</div>
);
export default withStyles(styles)(Taxonomy);
