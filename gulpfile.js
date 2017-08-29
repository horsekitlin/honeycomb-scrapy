const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const babel = require("gulp-babel");

gulp.task("compile", () => {
  return gulp
    .src("./lib/**/*.js")
    .pipe(
      babel({
        presets: ["es2015", "stage-2"],
        plugins: [
          "transform-flow-strip-types",
          "transform-runtime",
          "syntax-async-generators"
        ]
      })
    )
    .pipe(gulp.dest("./build"));
});

gulp.task("watch", ["compile"], () => {
  return nodemon({
    script: "build/index", // run ES5 code
    watch: "lib", // watch ES2015 code
    tasks: ["compile"] // compile synchronously onChange
  });
});
gulp.task("default", ["watch"]);
