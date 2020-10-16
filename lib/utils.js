const getDefaultColumns = ({ numberOfColumns, item }) =>
	Array(numberOfColumns)
		.fill()
		.map((_, key) => ({
			id: key,
			content:
				key === 0
					? [
							{
								item,
								order: 0
							}
					  ]
					: []
		}));

const getDefaultColumnsList = ({ numberOfColumns }) =>
	Array(numberOfColumns)
		.fill()
		.map((_, key) => ({
			id: key,
			heightWithBricks: []
		}));

const updateColumnsHeight = ({ columns, columnId, newColumnHeight }) => {
	return columns.map(column =>
		column.id === columnId
			? {
					...column,
					heightWithBricks: [
						...column.heightWithBricks,
						{
							columnHeight: newColumnHeight
						}
					]
			  }
			: column
	);
};

const getColumnHeight = column => column.heightWithBricks[column.heightWithBricks.length - 1]?.columnHeight || 0;

const getSmallestColumnId = ({ columns }) =>
	columns.reduce(
		(smallestColumn, column) => (getColumnHeight(smallestColumn) > getColumnHeight(column) ? column : smallestColumn),
		columns[0]
	).id;

export { getDefaultColumns, getDefaultColumnsList, updateColumnsHeight, getColumnHeight, getSmallestColumnId };
