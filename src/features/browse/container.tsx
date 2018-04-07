import * as React from "react";
import { connect, MapDispatchToPropsParam, MapStateToPropsParam,  } from "react-redux";
import { getImages } from "../../store/actions/browse";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
import { State } from "../../store/types/State";
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
const mapStateToProps: MapStateToPropsParam<StateProps, Props, State> = state => {
	const { progress, uids } = state.entityLists.browse;
	return {
		"images": uids.map(uid => state.entitiesByUID[uid]),
		progress,
	};
};
const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, Props> = dispatch => ({
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
