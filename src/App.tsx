import AppBar from "material-ui/AppBar";
import BottomNavigation from "material-ui/BottomNavigation";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import Browse from "./features/browse/container";
export default () => (
	<MuiThemeProvider>
		<AppBar title="PhyloPic"/>
		<div style={{"margin": "2rem", "text-align": "center", "width": "100%"}}>
			<Browse/>
		</div>
		<BottomNavigation />
	</MuiThemeProvider>
);
