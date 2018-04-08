import * as React from "react";
import { connect } from "react-redux";
import { getImages } from "../../store/actions/browse";
import { State } from "../../store/reducers";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
import Browse from "./";
const INITIAL_SIZE = 12;
interface StateProps {
	images: Array<Entity & Partial<Image>>;
	progress: Progress;
}
interface DispatchProps {
	getImages: typeof getImages;
}
type Props = StateProps & DispatchProps;
const mapStateToProps = (state: State) => {
	const { progress, uids } = state.entities.lists.browse;
	const { byUID } = state.entities;
	return {
		"images": uids.map(uid => byUID[uid]),
		progress,
	};
};
const mapDispatchToProps = () => ({
	getImages,
});
class BrowseContainer extends React.Component<Props> {
	public componentWillMount() {
		this.props.getImages(0, INITIAL_SIZE);
	}
	public render() {
		const { images, progress } = this.props;
		return (
			<Browse
				images={images}
				onRetry={this.handleRetry}
				progress={progress}
			/>
		);
	}
	private readonly handleRetry = () => {
		// :TODO:
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BrowseContainer);
