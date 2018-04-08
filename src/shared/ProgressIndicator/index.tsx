import Button from "material-ui/Button";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Snackbar, { SnackbarProps } from "material-ui/Snackbar";
import * as React from "react";
import { Progress } from "../../store/types/Progress";
export interface Props {
	children?: React.ReactNode;
	onRetry?: () => void;
	progress: Progress;
}
const ProgressIndicator: React.SFC<Props> = ({
	children,
	onRetry,
	progress,
}) => {
	switch (progress.status) {
		case "success": {
			return (
				<div>{children}</div>
			);
		}
		case "pending": {
			return (
				<CircularProgress
					max={progress.total}
					value={progress.loaded}
				/>
			);
		}
		default: {
			const props: SnackbarProps = {
				"message": (<span>{String(progress.error) || "An error occurred."}</span>),
				"open": true,
			};
			if (onRetry) {
				props.action = (
					<Button
						color="secondary"
						onClick={onRetry}
						size="small"
					>
						Try Again
					</Button>
				);
			}
			return (
				<Snackbar {...props} />
			);
		}
	}
};
export default ProgressIndicator;
