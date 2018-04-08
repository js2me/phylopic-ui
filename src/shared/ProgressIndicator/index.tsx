import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import * as React from "react";
import { Progress } from "../../store/types/Progress";
export interface Props {
	children?: React.ReactNode;
	onRetry?: () => void;
	progress: Progress;
}
const ProgressIndicator: React.SFC<Props> = ({ children, onRetry, progress }) => {
	switch (progress.status) {
		case "failure": {
			return (
				<Snackbar
					action={onRetry ? "Try Again" : undefined}
					message={String(progress.error) || "Error"}
					onActionClick={onRetry}
					open={true}
				/>
			);
		}
		case "pending": {
			return (
				<CircularProgress
					max={progress.total}
					mode={progress.total ? "determinate" : "indeterminate"}
					value={progress.loaded}
				/>
			);
		}
		default: {
			return (
				<div>{children}</div>
			);
		}
	}
};
export default ProgressIndicator;
