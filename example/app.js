import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import patternMock from 'pattern-mock';

import Masonry from '../lib';

const mockData = patternMock({
	data: {
		__pattern__: [{
			id: 'COUNTER',
			title: 'FULL_NAME',
			description: 'SENTENCE'
		}],
		__config__: {
			length: 3
		}
	}
}).data;


const mockDatas = patternMock({
	data: {
		__pattern__: [
			{
				id: 'COUNTER',
				color: 'COLOR',
				word: 'WORD',
				height: {
					__pattern__: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
					__config__: {
						shouldPickOne: true
					}
				}
			}
		],
		__config__: {
			length: 3
		}
	}
}).data;

function App() {
	const [data, setData] = useState(mockData);

	const handleOnRemove = () => {}

	return (
		<View style={styles.wrapper}>
			<Masonry
				data={data}
				numberOfColumns={3}
				keyExtractor={item => item.id}
				renderItem={({ item }) => () => {
					const {title, description} = item;

					return (
						<TouchableOpacity
							onPress={() => handleOnRemove(item)}
							style={styles.item}
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
		backgroundColor: '#fff',
		borderRadius: 4,
		padding: 8,
		margin: 4,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 4
	},
	description: {
		fontSize: 12
	}
});

export default App;