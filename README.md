# elasticstream
Streaming [elasticsearch](http://www.elasticsearch.org/) indexers.

## Usage
Write document with ID `maciejmalecki` to index `twitter`, type `user`:

```js
var elasticstream = require('elasticstream'),
    stream = elasticstream({ index: 'twitter', type: 'user'});

stream.write({
  id: 'maciejmalecki',
  doc: {
    name: 'Maciej Malecki'
  }
});
stream.end();
```
