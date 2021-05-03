const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const path = require('path');
const nodemon = require('gulp-nodemon');


function compileTemplates() {
  // Assume all partials are in a folder such as source/partials/**/*.hbs
  var partials = gulp.src(['src/views/partials/*.hbs'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function(fileName) {
          // Strip the extension and the underscore
          // Escape the output with JSON.stringify
          return JSON.stringify(path.basename(fileName, '.js'));
        }
      }
    }))
    .pipe(declare({
      root: 'exports',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'));

    var templates = gulp.src(['src/views/*.hbs', 'src/views/test/**/*.hbs', '!src/views/partials/*.hbs'])
    // Compile each Handlebars template source file to a template function
      .pipe(handlebars())
    // Wrap each template function in a call to Handlebars.template
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
    // Declare template functions as properties and sub-properties of exports
      .pipe(declare({
        root: 'exports',
        noRedeclare: true, // Avoid duplicate declarations
      }))
    // Add the Handlebars module in the final output
      .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'));

  // Output both the partials and the templates as build/js/templates.js;
  return merge(partials, templates)
    .pipe(concat('templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/'));
};

function minifyCss() {
  return gulp.src('src/public/css/*.css')
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/public/css/'))
};

function minifyJs() {
  return gulp.src('src/public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/public/js/'))
};

function copyImages() {
  return gulp.src('src/public/images/**')
    .pipe(gulp.dest('dist/public/images/'))
};

gulp.task('nodemon', async function() {
  nodemon({
    script: 'bin/www',
    env: { 'NODE_ENV': 'development' },
    ext: 'js,hbs,css',
    ignore: ["dist/", "README"] 
  }).on('restart', function() {
    compileTemplates(), 
    minifyCss(), 
    minifyJs(), 
    copyImages()
  })
});

gulp.task('build', async function() {
  compileTemplates();
  minifyCss();
  minifyJs();
  copyImages();
});

gulp.task('default', gulp.series('build', 'nodemon'))
