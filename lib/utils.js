import React from 'react';

const getDefaultColumns = ({ numberOfColumns, item, Brick }) =>
	Array(numberOfColumns)
		.fill()
		.map((_, key) => ({
			id: key,
			content:
				key === 0
					? [
							{
								item,
								order: 0,
								element: <Brick />
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

const updateColumnsHeight = ({ columns, columnId, newColumnHeight, key }) => {
	console.log('newColumnHeight', newColumnHeight);

	return columns.map(column =>
		
		column.id === columnId
			? {
					...column,
					heightWithBricks: [
						...column.heightWithBricks,
						{
							order: key,
							columnHeight: newColumnHeight
						}
					]
			  }
			: column
	);
};

const filterLatestColumns = ({ columns, stoppedAtId }) =>
	columns.map(column => ({
		...column,
		content: column.content.filter(({ order }) => order < stoppedAtId)
	}));

const getColumnHeight = column => column.heightWithBricks[column.heightWithBricks.length - 1]?.columnHeight || 0;

const getSmallestColumnId = ({ columns }) =>
	columns.reduce(
		(smallestColumn, column) => (getColumnHeight(smallestColumn) > getColumnHeight(column) ? column : smallestColumn),
		columns[0]
	).id;

const compareLists = ({ data, prevData }) => data.findIndex((item, key) => item.id !== prevData[key]?.id);

export {
	getDefaultColumns,
	getDefaultColumnsList,
	updateColumnsHeight,
	filterLatestColumns,
	getColumnHeight,
	getSmallestColumnId,
	compareLists
};
