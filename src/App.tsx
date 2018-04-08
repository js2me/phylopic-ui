import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import BrowseContainer from "./features/browse/container";
import LightboxContainer from "./features/lightbox/container";
const App: React.SFC = () => (
	<div>
		<AppBar position="sticky">
			<Toolbar>
				<Typography variant="title" color="inherit">
					PhyloPic
				</Typography>
			</Toolbar>
		</AppBar>
		<div style={{ "padding": 20 }}>
			<BrowseContainer/>
		</div>
		<LightboxContainer/>
	</div>
);
export default App;
