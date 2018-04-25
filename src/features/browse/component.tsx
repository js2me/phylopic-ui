import Chip from "material-ui/Chip";
import * as React from "react";
import { InfiniteLoader } from "react-virtualized/dist/es/InfiniteLoader";
import { Entity, Image } from "../../stores/entities";
import Grid from "./Grid";
const CELL_HEIGHT = 108;
const CELL_WIDTH = 104;
export interface DispatchProps {
	onImageClick: (imageUID: string) => void;
	onLoadRequest: (start: number, size: number) => Promise<void>;
}
export interface StateProps {
	height: number;
	images: ReadonlyArray<Entity & Partial<Image>>;
	total: number;
	width: number;
}
const ensureMin1 = (n: number) => isNaN(n) ? 1 : Math.max(1, n);
class Component extends React.Component<DispatchProps & StateProps> {
	public async componentWillMount() {
		const { height, onLoadRequest, total } = this.props;
		if (isNaN(total)) {
			const rowCount = ensureMin1(Math.ceil(height / CELL_HEIGHT));
			return onLoadRequest(0, rowCount * this.columnCount);
		}
	}
	public render() {
		const {
			height,
			images,
			onImageClick,
			total,
			width,
		} = this.props;
		const columnCount = this.columnCount;
		const rowCount = ensureMin1(Math.ceil(total / columnCount));
		const loadedRows = Math.floor(images.length / columnCount);
		const visibleRows = ensureMin1(Math.ceil(height / CELL_HEIGHT));
		return (
			<div style={{"textAlign": "center"}}>
				{!isNaN(total) && <div><Chip label={total}/> images in the database.</div>}
				<InfiniteLoader
					isRowLoaded={({ index }) => index <= loadedRows}
					loadMoreRows={async({ startIndex, stopIndex }) => this.loadMoreRows(startIndex, stopIndex, columnCount)}
					minimumBatchSize={visibleRows}
					rowCount={rowCount}
					threshold={visibleRows}
				>
					{({ onRowsRendered, registerChild }) => (
						<Grid
							columnWidth={CELL_WIDTH}
							columnCount={columnCount}
							height={height}
							images={images}
							onImageClick={onImageClick}
							onRowsRendered={onRowsRendered}
							registerChild={registerChild}
							rowCount={rowCount}
							rowHeight={CELL_HEIGHT}
							width={width}
						/>
					)}
				</InfiniteLoader>
			</div>
		);
	}
	protected get columnCount() {
		return ensureMin1(Math.floor(this.props.width / CELL_WIDTH));
	}
	protected async loadMoreRows(startRow: number, stopRow: number, columnCount: number) {
		const { onLoadRequest } = this.props;
		const start = startRow * columnCount;
		const stop = stopRow * columnCount;
		return onLoadRequest(start, stop - start);
	}
}
export default Component;
