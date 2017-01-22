# validator-sa

Implements validation and normalization of strings, for South African ID
numbers. Maybe in future other validation that is specific to South Africa.

# How to Use

Install it locally via `npm`:

```
npm install validator-sa
```

In ES6, import what you need:

```
import { isValidSouthAfricanIDNumber } from 'validator-sa'
```

In ES5, `require` it, and use it form there:

```
var validator = require('validator-sa');

var isValid = validator.isValidSouthAfricanIDNumber('123')
// `isValid` should be false
```

If you want to use it directly in the browser, use the respective file
(minified or not) from [lib](./lib).

# API

Generated documentation is [here](./api.md).

