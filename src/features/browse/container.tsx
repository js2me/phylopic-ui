import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getImages } from "../../store/actions/browse";
import { State } from "../../store/reducers";
import { Entity } from "../../store/types/Entity";
import { Image } from "../../store/types/Image";
import { Progress } from "../../store/types/Progress";
import Browse from "./";
const INITIAL_SIZE = 12;
const NEXT_SIZE = 48;
interface StateProps {
	images: Array<Entity & Partial<Image>>;
	progress: Progress;
	total: number;
}
interface DispatchProps {
	dispatch: Dispatch<State>;
}
type Props = StateProps & DispatchProps;
const mapStateToProps = (state: State) => {
	const { progress, total, uids } = state.entities.lists.browse;
	const { byUID } = state.entities;
	return {
		"images": uids.map(uid => byUID[uid]),
		progress,
		total,
	};
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({ dispatch });
class BrowseContainer extends React.Component<Props> {
	public async componentWillMount() {
		return this.loadNext(INITIAL_SIZE);
	}
	public render() {
		const { images, progress, total } = this.props;
		return (
			<Browse
				images={images}
				onLoadNext={async() => this.loadNext(NEXT_SIZE)}
				onRetry={this.retry}
				progress={progress}
				total={total}
			/>
		);
	}
	private readonly loadNext = async(size: number) => {
		const { dispatch, images } = this.props;
		return dispatch(getImages(images.length, size));
	}
	private readonly retry = async() =>
		this.loadNext(this.props.images.length ? NEXT_SIZE : INITIAL_SIZE)
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BrowseContainer);
