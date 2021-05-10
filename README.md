# Full Stack Development Project

# Dependencies

- express
- bootstrap
- popper.js
- bootstrap-icons
- express-session
- path

- **gulp**
    - gulp-handlebars
    - gulp-uglify
    - gulp-uglifycss
    - gulp-nodemon
    - gulp-wrap
    - merge-stream
    - gulp-concat
    - gulp-declare


# Setting up
```bat
git clone https://github.com/Ewiz2950/fullstackdev.git
cd <project folder name>
npm install
#  To use gulp commands in terminal
npm install -g gulp
```
# Launching

```bat
gulp
```

# Templates usage
```js
// importing in the file containing all the precompiled templates
var templates = require('../dist/views/templates.js')

/* templates.main() returns the precompiled base template 
we are passing in the required precompiled template into the
body section {{body}} as declared in main.hbs */
templates.main({
    body: templates.<hbs file name>
    })
```
