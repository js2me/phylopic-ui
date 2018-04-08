import AppBar from "material-ui/AppBar";
import BottomNavigation from "material-ui/BottomNavigation";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import Browse from "./features/browse/container";
const App: React.SFC = () => (
	<MuiThemeProvider>
		<div>
			<AppBar title="PhyloPic"/>
			<div style={{"margin": "2rem", "textAlign": "center", "width": "100%"}}>
				<Browse/>
			</div>
			<BottomNavigation />
		</div>
	</MuiThemeProvider>
);
export default App;
