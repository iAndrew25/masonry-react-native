import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { getDefaultColumns, getDefaultColumnsList, updateColumnsHeight, getSmallestColumnId } from './utils';

function MasonryList({
	numberOfColumns,
	data,
	keyExtractor,
	contentContainerStyle,
	ListHeaderComponent,
	renderItem: Brick,
	...rest
}) {
	const columnsHeight = useRef(getDefaultColumnsList({ numberOfColumns }));
	const [columns, setColumns] = useState([]);
	const previousData = useRef([]);
	const itemIndex = useRef(-1);

	const populateColumns = ({ item, nextKey }) => {
		setColumns(prevColumns => {
			const smallestColumnId = getSmallestColumnId({
				columns: columnsHeight.current
			});

			return prevColumns.map(column => ({
				...column,
				content:
					column.id === smallestColumnId
						? [
								...column.content,
								{
									item,
									order: nextKey
								}
						  ]
						: column.content
			}));
		});
	};

	const renderNextBrick = () => {
		const nextKey = itemIndex.current + 1;

		if (!data[nextKey]) return;

		itemIndex.current = nextKey;
		populateColumns({
			nextKey,
			item: data[nextKey]
		});
	};

	const handleOnLayout = columnId => event => {
		const newColumnHeight = event.nativeEvent.layout.height;

		columnsHeight.current = updateColumnsHeight({
			columnId,
			newColumnHeight: newColumnHeight,
			columns: columnsHeight.current
		});

		renderNextBrick();
	};

	const initiateFirstRender = () => {
		itemIndex.current = 0;
		columnsHeight.current = getDefaultColumnsList({ numberOfColumns });

		return getDefaultColumns({
			numberOfColumns,
			item: data[itemIndex.current]
		});
	};

	useEffect(() => {
		if (!columns.length && data.length) {
			setColumns(initiateFirstRender());
		}
	}, [columns]);

	useEffect(() => {
		setColumns(prevColumns => {
			if (!data.length || data.length <= previousData.current.length) {
				return [];
			}

			if ((!prevColumns.length && data.length) || (!previousData.current.length && data.length)) {
				return initiateFirstRender();
			}

			renderNextBrick();
		});

		previousData.current = data;
	}, [data]);

	return (
		<ScrollView {...rest}>
			{Boolean(ListHeaderComponent) && <ListHeaderComponent />}
			<View style={[styles.columnWrapper, contentContainerStyle]}>
				{Boolean(columns.length) &&
					columns.map(({ content, id }) => (
						<View key={id}>
							<View onLayout={handleOnLayout(id)}>
								{Boolean(content.length) &&
									content.map(({ item }, key) => <Brick item={item} key={keyExtractor(item)} />)}
							</View>
						</View>
					))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	columnWrapper: {
		flexDirection: 'row'
	}
});

MasonryList.defaultProps = {
	numberOfColumns: 2,
	data: []
};

export default MasonryList;
