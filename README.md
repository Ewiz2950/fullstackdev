# fullstackdev

# dependencies
- nodejs
    - express
    - express-handlebars
    - bootstrap
    - popper.js
    - bootstrap-icons
    - express-session
    - path

- gulp
    - gulp-handlebars
    - gulp-uglify
    - gulp-uglifycss
    - gulp-nodemon
    - gulp-wrap
    - merge-stream
    - gulp-concat
    - gulp-declare


# setting up
```shell
git clone https://github.com/Ewiz2950/fullstackdev.git
cd <project folder name>
npm install
```
# launching

```shell
gulp
```

# templates usage
```js
/* templates.main() returns the precompiled base template 
we are passing in the required precompiled template into the
body section {{body}} as declared in main.hbs */
templates.main({body: templates.<hbs file name>})
```
