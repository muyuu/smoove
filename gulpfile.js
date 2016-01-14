const g = require("gulp");
const $ = require( 'gulp-load-plugins' )();
const connect = require('gulp-connect');

// local server
g.task("connect", () => {
    connect.server({
        port      : 3000,
        livereload: true
    });

    options = {
        url: `http://localhost:#{port}`,
        app: `Google Chrome`
    };

    g.src("./index.html")
        .pipe($.open("", options));
});

g.task('babel', ()=>{
    g.src(['src/smoothscroll.js'])
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(g.dest('./'));
});

g.task('lint', ()=>{
    g.src(['smoothscroll.js', 'app.js'])
        .pipe($.eslint())
        .pipe($.eslint.format());
});


g.task('jscs', ()=>{
    g.src(['smoothscroll.js', 'app.js'])
        .pipe($.jscs());
});

g.task('dev', ['babel'], ()=>{
    g.start(['lint', 'jscs']);
});

g.task("default", ['connect'], ()=>{
    g.watch("**/*.js", ["dev"]);
});


 //build
g.task('build', ()=>{
    g.src('./smoothscroll.js')
        .pipe($.sourcemaps.init())
        .pipe($.rename({
            basename: "smoothscroll.min",
            extname: ".js"
        }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(g.dest('./'));
});


