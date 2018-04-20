import Button from "material-ui/Button";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Snackbar, { SnackbarProps } from "material-ui/Snackbar";
import * as React from "react";
import { Progress } from "../../stores/async";
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
	if (progress.pending) {
		return <CircularProgress/>;
	}
	if (progress.error) {
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
		return <Snackbar {...props} />;
	}
	return <div>{children}</div>;
};
export default ProgressIndicator;
