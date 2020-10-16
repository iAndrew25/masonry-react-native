# masonry-react-native
A simple React Native implementation of Masonry layout, using ScrollView.

## Features
 * allows rendering any type of content inside a `View`.
 * calculates each column's height and adds a new `View` to the smallest column, so no space will be wasted.
 * can be used with `LayoutAnimation` for a nicer render animation.
 * API similar with `FlatList`
 
![preview](https://raw.githubusercontent.com/iAndrew25/masonry-react-native/master/example/preview.gif)

## Usage
### Install
Using Node Package Manager (`npm`):

```
$ npm install masonry-react-native
```

### Import
```javascript
import Masonry from 'masonry-react-native';
```

### Render
```javascript
<Masonry
	data={[
		{id: 0, text: 'Text 0'},
		{id: 1, text: 'Text 1'},
		{id: 2, text: 'Text 2'},
	]}
	numberOfColumns={3}
	keyExtractor={({id}) => id}
	renderItem={({item}) => (
		<Text>{item.text}</Text>
	)}
/>
```

### API
|Props|Type|Description|Default|
|-----|-----|-----|-----|
| numberOfColumns | number | number of columns | 2 |
| data | array | list of items | [] |
| keyExtractor | func | extracts unique id |  |
| ListHeaderComponen | element | element to be rendered in the list header |  |
| renderItem | func | element to be rendered inside the list |  |
| ...rest | object | the rest of props are passed to `ScrollView` |  |

## Authors
* **Andrew** - [iAndrew25](https://github.com/iAndrew25)

See also the list of [contributors](https://github.com/iAndrew25/masonry-react-native/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
