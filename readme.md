# css-to-style

Transform a string of css rules into a style object.

## Usage

```js
import toStyle from 'css-to-style';

toStyle('font-size: 2em; color: #f00; margin-top: 4px');
// returns { fontSize: '2em', color: '#f00', marginTop: '4px' }
```
