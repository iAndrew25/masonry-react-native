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
			length: 7
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
				numberOfColumns={4}
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
		width: 90,
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