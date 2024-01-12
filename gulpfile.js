const gulp = require('gulp');

const port = 8090;
/*=============================
@Path 정의
==============================*/
const src = ".";
const dist = ".";
const path = {
	styles: {
		input: src+'/sass/',
		inputFile: src+'/sass/**/*.scss',
		output: dist+'/css/',
		autoprefixer: dist + "/css/style.css"
	}
};

//browser-sync
const browserSync = require('browser-sync');
function bs(done){
	browserSync.init({
		server : {baseDir : '.'},
        port: port,
        ui: { port: port + 1 },
        ghostMode: false,
        directory: true
	});
	gulp.watch("./html/**/*.html").on('change', browserSync.reload);
};

// sass
const gulpsass = require('gulp-dart-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	cssnano = require('cssnano'),
	autoprefixer = require("autoprefixer"), //벤더프리픽스 설정
	rename = require("gulp-rename");
function sass(){
	var plugins = [
		autoprefixer(),
		cssnano()
	];
	return gulp.src(path.styles.inputFile)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(gulpsass.sync().on('error', gulpsass.logError))
		.pipe(gulpsass({ errLogToConsole: true, }).on("error", gulpsass.logError)) //nested compact expanded compressed
		.pipe(postcss(plugins))
		.pipe(rename(function (path) {
			if (path.basename === 'home'){
				return {
					dirname: path.dirname,
					basename: '_home',
					extname: path.extname
				};
			} else {
				return {
					dirname: path.dirname,
					basename: path.basename,
					extname: path.extname
				};
			}
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.styles.output))
		.pipe(browserSync.stream({ match: "**/*.css" }))
	// .on('finish',browserSync.reload)
}

//html 브라우저 호환성 css 추가변경
function autopreFixer(){
	return gulp.src(path.scss.autoprefixer)
		.pipe(autoprefixer({
			cascade: true,
			remove: false
		}))
		.on("finish", reload);
}

function watchFile(done) {
	gulp.watch(path.styles.inputFile, sass);
	done();
};

const watch = gulp.parallel(watchFile, bs);







// tasks 선언
exports.default = watch;

