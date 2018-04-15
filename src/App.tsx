import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import Browse from "./features/browse/container";
import Lightbox from "./features/lightbox/container";
import WindowSize from "./features/windowSize/container";
const App: React.SFC = () => (
	<div>
		<WindowSize/>
		<AppBar position="sticky">
			<Toolbar>
				<Typography variant="title" color="inherit">
					PhyloPic
				</Typography>
			</Toolbar>
		</AppBar>
		<div style={{ "padding": 20 }}>
			<Browse/>
		</div>
		<Lightbox/>
	</div>
);
export default App;
