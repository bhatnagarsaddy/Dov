/// <binding />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    processhtml = require('gulp-processhtml'),
    sequence = require('run-sequence'),
    $ = require('gulp-load-plugins')();

var paths = {
    webroot: "./",
    webrootPublishDest: "../../dovico-outlookaddin-publish/"
};

// Js files on Home page
paths.jsHome = [paths.webroot + "Scripts/OutlookAddin/Home.js",
                paths.webroot + "Scripts/OutlookAddin/Login/Login.js",
                paths.webroot + "Scripts/OutlookAddin/TimeEntry/TimeEntryHome.js",
                paths.webroot + "Scripts/OutlookAddin/Utility/Validator.js"];
paths.concatJsHomeDest = paths.webrootPublishDest + "Scripts/OutlookAddin/siteHome.min.js";

// Js files on TimeEntryHome page
paths.jsTimeEntryHome = [paths.webroot + "Scripts/OutlookAddin/TimeEntry/TimeEntryDetails/TimeEntryDetails.js",
                paths.webroot + "Scripts/OutlookAddin/TimeEntry/TimeEntries/TimeEntries.js"];
paths.concatJsTimeEntryHomeDest = paths.webrootPublishDest + "Scripts/OutlookAddin/TimeEntry/siteTimeEntryHome.min.js";

// Js files on Help page
paths.jsHelp = [paths.webroot + "Scripts/OutlookAddin/Help/Help.js"];
paths.concatJsHelpDest = paths.webrootPublishDest + "Scripts/OutlookAddin/Help/siteHelp.min.js";

// Js files for config
paths.jsConfig = [paths.webroot + "Scripts/OutlookAddin/config.js"];
paths.concatJsConfigDest = paths.webrootPublishDest + "Scripts/OutlookAddin/siteConfig.min.js";

// CSS files for Site.css
paths.cssSite = paths.webroot + "Content/OutlookAddin/Site.css";
paths.concatCssSiteDest = paths.webrootPublishDest + "Content/OutlookAddin/site.min.css";

// CSS files for Site-IE.css
paths.cssSiteIE = paths.webroot + "Content/OutlookAddin/Site-IE.css";
paths.concatCssSiteIEDest = paths.webrootPublishDest + "Content/OutlookAddin";

// HTML files
paths.html = paths.webroot + "Views/**/*.html";
paths.processhtmlDest = paths.webrootPublishDest + "Views";

// Js files on Home page
gulp.task("clean:jsHome", function (cb) {
    rimraf(paths.concatJsHomeDest, cb);
});

// Js files on TimeEntryHome page
gulp.task("clean:jsTimeEntryHome", function (cb) {
    rimraf(paths.concatJsTimeEntryHomeDest, cb);
});

// Js files on Help page
gulp.task("clean:jsHelp", function (cb) {
    rimraf(paths.concatJsHelpDest, cb);
});

// Js files for config
gulp.task("clean:jsConfig", function (cb) {
    rimraf(paths.concatJsConfigDest, cb);
});

// CSS files for Site.css
gulp.task("clean:cssSite", function (cb) {
    rimraf(paths.concatCssSiteDest, cb);
});

// CSS files for Site-IE.css
gulp.task("clean:cssSiteIE", function (cb) {
    rimraf(paths.concatCssSiteIEDest, cb);
});

// HTML files
gulp.task("clean:html", function (cb) {
    rimraf(paths.processhtmlDest, cb);
});

gulp.task("clean", ["clean:jsHome", "clean:jsTimeEntryHome", "clean:jsHelp", "clean:jsConfig", "clean:cssSite", "clean:cssSiteIE", "clean:html"]);

// Js files on Home page
gulp.task("min:jsHome", function () {
    return gulp.src(paths.jsHome)
      .pipe(concat(paths.concatJsHomeDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

// Js files on TimeEntryHome page
gulp.task("min:jsTimeEntryHome", function () {
    return gulp.src(paths.jsTimeEntryHome)
      .pipe(concat(paths.concatJsTimeEntryHomeDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

// Js files on Help page
gulp.task("min:jsHelp", function () {
    return gulp.src(paths.jsHelp)
      .pipe(concat(paths.concatJsHelpDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

// Js files for config
gulp.task("min:jsConfig", function () {
    return gulp.src(paths.jsConfig)
      .pipe(concat(paths.concatJsConfigDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

// CSS files for Site.css
gulp.task("min:cssSite", function () {
    return gulp.src(paths.cssSite)
      .pipe(concat(paths.concatCssSiteDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

// CSS files for Site-IE.css
gulp.task("min:cssSiteIE", function () {
    return gulp.src(paths.cssSiteIE)
      .pipe(gulp.dest(paths.concatCssSiteIEDest));
});

gulp.task("min", ["min:jsHome", "min:jsTimeEntryHome", "min:jsHelp", "min:jsConfig", "min:cssSite", "min:cssSiteIE"]);

// HTML files
gulp.task('processhtml', function () {
    return gulp.src(paths.html)
               .pipe(processhtml({}))
               .pipe($.versionAppend(['js', 'css'], { appendType: 'guid' }))
               .pipe(gulp.dest(paths.processhtmlDest));
});

//*********** Start of Gulp task to run after publish ***********//

gulp.task("Run-Gulp-Task-After-Publish", function (cb) {
    return sequence("clean", "min", "processhtml", cb);
});

//*********** End of Gulp task to run after publish ***********//