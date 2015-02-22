JSPM LESS Plugin
===

This is a systemjs plugin that allows injection of less files without the need for pre-compiling.

The less files are loaded in using ajax then rendered and injected as a style tag into the document head.

(This is an experimental plugin)

## Installation

    jspm install less
  
## Usage

CommonJS:

    require("path/to/style.less!");

ES6:

    import "path/to/style.less!"

##TODO

- support for `@import`
- add a way to specify options for the less renderer
