import gulp from 'gulp';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps'
import browserify from 'browserify';
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import del from 'del';

const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: './dist/css'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    jsFiles: ['main.js'],
    jsFolder: 'src/scripts/',
    dest: './dist/js'
  }
};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'new-theme/*' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({ grid: 'autoplace' }))
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

export function scripts(done) {
  paths.scripts.jsFiles.map(function (entry) {
    return browserify({
      entries: [paths.scripts.jsFolder + entry]
    })
    .transform("babelify", { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source(entry))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dest))
  });
  done();
}

 /*
  * You could even use `export as` to rename exported tasks
  */
function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}
export { watchFiles as watch };

const build = gulp.series(clean, gulp.parallel(styles, scripts));
/*
 * Export a default task
 */
exports.default = watchFiles
gulp.task('build', build);
// export default build;