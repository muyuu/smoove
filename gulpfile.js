const g = require("gulp");
const $ = require( 'gulp-load-plugins' )();
const connect = require('gulp-connect');

const filename = 'smoove';
const file = `${filename}.js`;

const port = 4000;

// local server
g.task("connect", () => {
    connect.server({
        port      : port,
        livereload: true
    });

    options = {
        uri: `http://localhost:${port}/index.html`,
        app: `Google Chrome`
    };

    g.src("./index.html")
        .pipe($.open("", options));
});

g.task('babel', ()=>{
    console.log(`src/${file}`);
    g.src(`src/${file}`)
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(g.dest('./'));
});

g.task('lint', ()=>{
    g.src([`src/${file}`])
        .pipe($.eslint())
        .pipe($.eslint.formatEach());
});


g.task('jscs', ()=>{
    g.src(file)
        .pipe($.jscs());
});

g.task('dev', ['babel'], ()=>{
    g.start(['lint', 'jscs']);
});

g.task("default", ['connect'], ()=>{
    g.watch("src/**/*.js", ["dev"]);
});


 //build
g.task('build', ['dev'], ()=>{
    g.src(file)
        .pipe($.sourcemaps.init())
        .pipe($.rename({
            basename: `${filename}.min`,
            extname: ".js"
        }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(g.dest('./'));
});


