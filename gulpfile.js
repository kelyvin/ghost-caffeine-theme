"use strict";
var PORT, _s, banner, browserSync, changed, concat, cssmin, dist, gulp, gutil, header, pkg, prefix, reload, sass, src, strip, uglify;

gulp = require("gulp");
gutil = require("gulp-util");
sass = require("gulp-sass");
concat = require("gulp-concat");
header = require("gulp-header");
uglify = require("gulp-uglify");
cssmin = require("gulp-cssmin");
changed = require("gulp-changed");
pkg = require("./package.json");
_s = require("underscore.string");
prefix = require("gulp-autoprefixer");
strip = require("gulp-strip-css-comments");
browserSync = require("browser-sync");
reload = browserSync.reload;

PORT = {
    GHOST: 2368,
    BROWSERSYNC: 3000
};

dist = {
    name: _s.slugify(pkg.name),
    css: "assets/css",
    js: "assets/js"
};

src = {
    sass: {
        main: "assets/scss/" + dist.name + ".scss",
        files: ["assets/scss/**/**"]
    },
    js: {
        fonts: [
            "node_modules/fontfaceobserver/fontfaceobserver.js",
            "assets/js/src/fonts.js"
        ],
        main: [
            "assets/js/src/*.js"
        ],
        node_modules: [
            "assets/js/src/libs/subbscribe.js",
            "node_modules/ghosthunter/dist/jquery.ghosthunter.js",
            "node_modules/fitvids/fitvids.min.js",
            "node_modules/prismjs/prism.js",
            "node_modules/toastr/build/toastr.min.js",
            "node_modules/store/dist/store.modern.min.js"
        ]
    },
    css: {
        main: "assets/css/" + dist.name + ".css",
        node_modules: [
            "node_modules/prismjs/themes/prism-okaidia.css",
        ]
    },
    fonts: {
        files: [
            "node_modules/font-awesome/fonts/**.*"
        ],
        dest: "assets/fonts"
    }
};

banner = ["/**", " * <%= pkg.name %> - <%= pkg.description %>", " * @version <%= pkg.version %>", " * @link    <%= pkg.homepage %>", " * @author  <%= pkg.author.name %> (<%= pkg.author.url %>)", " * @license <%= pkg.license %>", " */", ""].join("\n");

function fonts() {
    return gulp.src(src.fonts.files)
        .pipe(gulp.dest(src.fonts.dest));
}

function css() {
    return gulp.src(src.css.node_modules)
        .pipe(changed(dist.css))
        .pipe(gulp.src(src.sass.main))
        .pipe(sass().on("error", gutil.log))
        .pipe(concat(dist.name + ".css"))
        .pipe(prefix())
        .pipe(strip({
            all: true
        }))
        .pipe(cssmin())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dist.css));
}

function js() {
    return gulp.src(src.js.fonts)
        .pipe(gulp.src(src.js.main))
        .pipe(changed(dist.js))
        .pipe(gulp.src(src.js.node_modules))
        .pipe(concat(dist.name + ".js"))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dist.js));
}

function server() {
    return browserSync.init(null, {
        proxy: "http://127.0.0.1:" + PORT.GHOST,
        files: ["assets/**/*.*"],
        reloadDelay: 300,
        port: PORT.BROWSERSYNC
    });
}

function watch() {
    gulp.watch(src.sass.files).on("all", css);
    gulp.watch(src.js.main).on("all", js);
    gulp.watch(src.js.fonts).on("all", js);
    return gulp.watch(src.js.node_modules).on("all", js);
}

gulp.task("fonts", fonts);
gulp.task("css", gulp.series("fonts", css));
gulp.task("js", js);
gulp.task("server", server);
gulp.task("build", gulp.series("css", "js"));
gulp.task("default", gulp.series("build", "server", watch));
