import * as React from "react";
import { Grid as VirtualizedGrid, InfiniteLoaderChildProps } from "react-virtualized";
import { Entity, Image } from "../../stores/entities";
import Cell from "./Cell";
export interface Props extends InfiniteLoaderChildProps {
	columnCount: number;
	columnWidth: number;
	height: number;
	images: ReadonlyArray<Entity & Partial<Image>>;
	onImageClick: (imageUID: string) => void;
	rowCount: number;
	rowHeight: number;
	width: number;
}
const Grid: React.SFC<Props> = ({
	columnCount,
	columnWidth,
	height,
	images,
	onImageClick,
	onRowsRendered,
	registerChild,
	rowCount,
	rowHeight,
	width,
}) => (
		<VirtualizedGrid
			cellRenderer={props => (
				<Cell
					{...props}
					columnCount={columnCount}
					images={images}
					onImageClick={onImageClick}
				/>
			)}
			columnWidth={columnWidth}
			columnCount={columnCount}
			height={height}
			onSectionRendered={({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }) => {
				const startIndex = rowStartIndex * columnCount + columnStartIndex;
				const stopIndex = rowStopIndex * columnCount + columnStopIndex;
				onRowsRendered({ startIndex, stopIndex });
			}}
			ref={registerChild}
			rowCount={rowCount}
			rowHeight={rowHeight}
			width={width}
		/>
	);
export default Grid;
