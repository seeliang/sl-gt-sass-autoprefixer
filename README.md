# Gulp task for sass compile with autoprefixer

## Dependencies
```javascript
    "gulp"
    "gulp-autoprefixer"
    "gulp-import-css"
    "gulp-clean-css"
    "gulp-rename"
    "gulp-sass"
    "gulp-sass-bulk-import"
    "gulp-watch"
```  
## Folder structure
[Sample](https://github.com/seeliang/kickoff/tree/css-sass-autoperfixer)
## Usage

```sh
npm install sl-gt-sass-autoprefixer
```

In your gulpfile.js

```javascript
var gulp = require('gulp'),
  options = {
    sassFolder: scss,
    cleanCssSet : {
      sourceMap: true
    }
  }

require('sl-gt-sass-autoprefixer')(gulp, options);
```
#### Options
- sassFolder: set scss file folder for sass-watch  `default:assets/scss`
- cssFolder: set output file folder `default:build/css`
- outputName: set output css file name `default:main`
- prefixerSet: [More info](https://github.com/ai/browserslist) `default:{"browsers": ["> 2%"]}`
- clearCssSet: [More info](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api) `default:{}`

#### Watch
```sh
gulp sass-watch
```
#### Minify
```sh
gulp min-css
```
#### Check all tasks
```sh
gulp -T
```


## Reference


[Modularizing gulp tasks]('http://lfender6445.github.io/modularizing-gulp-tasks/')
