import React, {Fragment, useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {
	getDefaultColumns,
	getDefaultColumnsList,
	updateColumnsHeight,
	filterLatestColumns,
	getColumnHeight,
	getSmallestColumnId,
	compareLists
} from './utils';

function MasonryList({numberOfColumns, data, renderItem, keyExtractor, contentContainerStyle, ListHeaderComponent, ...rest}) {
	const columnsHeight = useRef(getDefaultColumnsList({numberOfColumns}));
	const [columns, setColumns] = useState([]);
	const previousData = useRef([]);
	const itemIndex = useRef(-1);

	const populateColumns = ({Brick, nextKey}) => {
		setColumns(prevColumns => {
			const smallestColumnId = getSmallestColumnId({
				columns: columnsHeight.current
			});

			return prevColumns.map(column => ({
				...column,
				content: column.id === smallestColumnId ? [
					...column.content,
					{
						order: nextKey,
						element: <Brick />,
						item: data[nextKey],
					}
				] : column.content
			}))
		});
	}

	const renderNextBrick = () => {
		const nextKey = itemIndex.current + 1;

		if(!data[nextKey]) return;

		itemIndex.current = nextKey;
		populateColumns({
			nextKey,
			Brick: renderItem({
				item: data[nextKey],
				key: nextKey
			})
		});		
	}

	const handleOnLayout = columnId => event => {
		const newColumnHeight = event.nativeEvent.layout.height;

		columnsHeight.current = updateColumnsHeight({
			columnId,
			newColumnHeight: newColumnHeight,
			stoppedAtId: itemIndex.current,
			columns: columnsHeight.current
		});

		renderNextBrick();
	}

	const initiateFirstRender = () => {
		itemIndex.current = 0;
		columnsHeight.current = getDefaultColumnsList({numberOfColumns});

		return getDefaultColumns({
			numberOfColumns,
			item: data[0],
			Brick: renderItem({
				item: data[0],
				key: 0
			})
		});		
	}

	useEffect(() => {
		if(!columns.length && data.length) {
			setColumns(initiateFirstRender())			
		}
	}, [columns])

	useEffect(() => {
		setColumns(prevColumns => {
			if(!data.length || (data.length <= previousData.current.length)) {
				return [];
			}

			if(
				(!prevColumns.length && data.length) || 
				(!previousData.current.length && data.length)
			) {
				return initiateFirstRender()
			}

			const stoppedAtId = compareLists({data, prevData: previousData.current});
			const newStoppedAt = stoppedAtId < 2 ? 0 : stoppedAtId - 1;
			itemIndex.current = stoppedAtId < 2 ? -1 : stoppedAtId - 2;

			return filterLatestColumns({
				columns: prevColumns,
				stoppedAtId: newStoppedAt
			});
		});

		previousData.current = data;
	}, [data])

	return (
		<ScrollView {...rest}>
			{Boolean(ListHeaderComponent) && <ListHeaderComponent />}
			<View style={[{flexDirection: 'row'}, contentContainerStyle]}>
				{Boolean(columns.length) && columns.map(({content, id}) => {
					return (
						<View key={id}>
							<View onLayout={handleOnLayout(id)}>
								{Boolean(content.length) && content.map(({element, item}, key) => {
									return <Fragment key={keyExtractor(item)}>{element}</Fragment>
								})}
							</View>
						</View>
					)
				})}
			</View>
		</ScrollView>
	);
}

MasonryList.defaultProps = {
	numberOfColumns: 2,
	data: []
};

export default MasonryList;