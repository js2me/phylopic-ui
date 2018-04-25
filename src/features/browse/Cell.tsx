import * as React from "react";
import { GridCellProps } from "react-virtualized";
import Thumbnail from "../../shared/Thumbnail";
import { Entity, Image } from "../../stores/entities";
export interface Props extends GridCellProps {
	columnCount: number;
	images: ReadonlyArray<Entity & Partial<Image>>;
	onImageClick: (imageUID: string) => void;
}
const Cell: React.SFC<Props> = ({
	columnCount,
	columnIndex,
	key,
	images,
	onImageClick,
	rowIndex,
	style,
}) => {
	const image = images[rowIndex * columnCount + columnIndex];
	const imageUID = image ? image.uid : null;
	const onClick = imageUID ? () => onImageClick(imageUID) : undefined;
	return (
		<div
			key={key}
			style={style}
		>
			<Thumbnail
				image={image}
				onClick={onClick}
			/>
		</div>
	);
};
export default Cell;
