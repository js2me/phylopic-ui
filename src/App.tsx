import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import Browse from "./features/browse/container";
const App: React.SFC = () => (
	<div>
		<AppBar position="static">
			<Toolbar>
				<Typography variant="title" color="inherit">
					PhyloPic
				</Typography>
			</Toolbar>
		</AppBar>
		<div style={{ "padding": 20 }}>
			<Browse/>
		</div>
	</div>
);
export default App;
