import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import patternMock from 'pattern-mock';

import Masonry from '../lib';

const mockData = patternMock({
	data: {
		__pattern__: [{
			id: 'NUMBER',
			title: 'FULL_NAME',
			description: 'SENTENCE',
			backgroundColor: 'COLOR'
		}],
		__config__: {
			length: 10
		}
	}
}).data;

function App() {
	const [data, setData] = useState(mockData);

	const getNewItem = () => patternMock({
		id: 'NUMBER',
		title: 'FULL_NAME',
		description: 'SENTENCE',
		backgroundColor: 'COLOR'		
	});

	const handleOnRemoveAll = () => setData([]);
	const handleOnRemove = item => setData(prevData => prevData.filter(({id}) => id !== item.id));
	const handleOnAdd = () => setData(prevData => [...prevData, getNewItem()]);

	return (
		<View style={styles.wrapper}>
		<View style={styles.actions}>
			<Text onPress={handleOnAdd}>Add new item</Text>
			<Text onPress={handleOnRemoveAll}>Remove all items</Text>
		</View>
			<Masonry
				data={data}
				numberOfColumns={4}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					const {title, description, backgroundColor} = item;

					return (
						<TouchableOpacity
							onPress={() => handleOnRemove(item)}
							style={[styles.item, {backgroundColor}]}
						>
							<Text style={styles.title}> {title} </Text>
							<Text style={styles.description}> {description} </Text>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: '#eee'
	},
	item: {
		width: 90,
		backgroundColor: '#fff',
		borderRadius: 4,
		padding: 8,
		margin: 4,
	},
	title: {
		color: '#fff',
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 4
	},
	description: {
		color: '#fff',
		fontSize: 12
	},
	actions: {
		paddingVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#fff',
		marginBottom: 8
	}
});

export default App;