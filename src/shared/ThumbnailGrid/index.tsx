import * as React from "react";
import { Grid, GridCellProps } from "react-virtualized/dist/es/Grid";
import { Entity, Image } from "../../stores/entities";
import Thumbnail, { Props as ThumbnailProps } from "../Thumbnail";
const CELL_HEIGHT = 108;
const CELL_WIDTH = 104;
const COLUMN_COUNT = 12;
export interface Props {
	height: number;
	images: ReadonlyArray<Entity & Partial<Image>>;
	onImageClick?: (uid: string) => void;
	width: number;
}
type CellProps = GridCellProps & Pick<Props, "images" | "onImageClick">;
const Cell: React.SFC<CellProps> = ({
	columnIndex,
	images,
	isVisible,
	key,
	onImageClick,
	rowIndex,
}) => {
	if (!isVisible) {
		return <div key={key}/>;
	}
	const image = images[rowIndex * COLUMN_COUNT + columnIndex];
	const props: ThumbnailProps = { image };
	if (onImageClick) {
		props.onClick = () => onImageClick(image.uid);
	}
	return <Thumbnail {...props} key={key}/>;
};
const ThumbnailGrid: React.SFC<Props> = ({
	height,
	images,
	onImageClick,
	width,
}) => (
	<Grid
		cellRenderer={props => {
			const { columnIndex, rowIndex } = props;
			const key = images[rowIndex * COLUMN_COUNT + columnIndex].uid;
			const cellProps: CellProps = {...props, ...{images, key}};
			return <Cell {...cellProps}/>;
		}}
		columnCount={COLUMN_COUNT}
		columnWidth={CELL_WIDTH}
		height={height}
		rowCount={Math.ceil(images.length / COLUMN_COUNT)}
		rowHeight={CELL_HEIGHT}
		style={{ "marginBottom": "2rem" }}
		width={width}
	/>
);
export default ThumbnailGrid;
