# metalsmith-models
Metalsmith plugin to include JSON models into files and expose the data as metadata on the file object.

# Installation

```
npm install --save metalsmith-models
```

# CLI
In metalsmith.json

```
{
    "source": "src",
    "destination": "build",
    "plugins": {
        "metalsmith-models": {
            "directory": "models"
        },
    }
}
```

# API

```
var Metalsmith = require('metalsmith');
var models = require('metalsmith-models');

var metalsmith = new Metalsmith(__dirname)
.use(models({
  directory: "models"
}));
```

## Options
### options.directory
Type: `String` Default value: `models` Source directory of all JSON files.

# Usage
JSON file can be loaded into the files using YAML front matter as below:

##### data_file.json
```
{
  "key1": "value 1",
  "key2": "value 2"
}
```

##### page.hbs
```
---
model: data_file
---
```
Where data_file is the name of the JSON file that is placed under the models directory (See CLI Usage or API section).

The path of the JSON files is always relative to the root directory (Ex: models).

##### How to use the data.
In case of pages using handlebars:
```
{{model.key1}}
```


### Loading multile JSON files
If you need to load multiple JSON files in a page, use below format:
```
---
model:
  obj1: data_file1
  obj2: data_file2
---
```
##### How to use the data.
In case of pages using handlebars:
```
{{model.obj1.key1}}
{{model.obj2.key1}}
```
