/*Gulp (https://gulpjs.com/) is an automation tool that makes
  the life of a developer far easier. Oftentimes developers have
  a number of things they must do that are tedius and repetitive.
  For example, running "npm test" and then "npm start" every time
  we want to deploy our code. Or running "npm run webpack" every
  time we want to bundle our client code.

  Gulp allows us to turn these repetitive jobs into "tasks" that
  it can run for us.
*/

/*Much like express, gulp is built to encorporate various plugins.
  Many of these plugins are available on npm. Since each is made
  by a different developer they all have their own syntax and
  documentation that you'll need to follow. Below we import a number
  of gulp-friendly versions of libraries we have used before such
  as eslint, webpack, etc. We also import the root gulp library, 
  and we import gulp-sass which will build our scss into css. Note 
  that we give it the sass library to use for doing the actual building.
*/
const gulp = require('gulp');
const { spawn } = require('child_process');
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint-new');
const webpackConfig = require('./webpack.config.js');

let nodeProcess = null;

/*Here is our first gulp task. Gulp tasks are defined as functions
  and have one requirement. They must take in a callback function
  (called "done" here), and they must call that callback at the end
  of the task. This lets the gulp library know that our task has
  completed.

  This task is meant to compile our sass into css. We start by using
  the src function from the gulp library to load the file. gulp.src()
  creates a "stream" object, which can be used to pass information
  between consecutive function calls. So gulp.src() loads our file
  into a stream. We then "pipe" that stream into the next function.

  The next function, sass(), recieves our file from the gulp.src()
  stream, and operates on that file. Due to the specifications of
  the gulp-sass library, this will convert an .scss file to css.
  The gulp-sass library also defines an on error handler.

  The output from the sass() function is the compiled css based on
  our main.scss file. We then pass or "pipe" that result into the
  gulp.dest() function. That function takes in some content and writes
  it to a given file. By default the file name will have the same
  name as the input file. In this case 'main.scss' turns into 'main.css'
  in the hosted folder.

  Finally we let gulp know we are done with our task.
*/
const sassTask = (done) => {
    gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./hosted'));

    done();
};

/*Here we have another task whose job it is to run webpack based
  on the specifications in our webpackConfig (imported above).
  We could simply run "npm run webpack" to accomplish the same
  results, but by putting it into a gulp task we can combine it
  with other tasks.
*/
const jsTask = (done) => {
    webpack(webpackConfig)
        .pipe(gulp.dest('./hosted'));
    
    done();
}
  
/*Our third task will run eslint on our code. In sassTask above
  we saw that gulp.src() can take in a single file. We can also
  give it a pattern to match such as the one in lintTask. The 
  pattern below tells gulp to load every .js file from any folder
  inside the .js folder. It will then pass those files into the
  eslint library which will function just like npm test.
*/
const lintTask = (done) => {
    gulp.src('./server/**/*.js')
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    
    done();
}

/*One major benefit of gulp is that because it is running node
  under the hood, it can multithread our tasks. The gulp.parallel
  function takes in any number of tasks and can run them on
  separate threads simultaneously. This can seriously speed up
  our tasks, especially if each of them takes a while.
*/
const build = gulp.parallel(sassTask, jsTask, lintTask);
const herokuBuild = gulp.parallel(sassTask, jsTask);

/*There used to be a maintained gulp-nodemon package, but it has not
  been updated in a number of years. While base nodemon still works,
  to have something work elegantly with gulp we have to instead make
  our own basic restarter like nodemon. Fortunately with the node
  child_process library we can spin up our server in a thread like
  nodemon would.

  We will pair this with gulp.watch() and our lint task down in the
  watch function below.
*/
const serverTask = (done) => {
  if(nodeProcess) {
    nodeProcess.kill();
  }
  nodeProcess = spawn('node', ['./server/app.js'], { stdio: 'inherit' });
  done();
}

/*This watch task below is doing quite a lot. The gulp.watch()
  function takes in a single file, folder, pattern, or array
  of files/folders/patterns and observes them. When any of the
  given files change, it will rerun the task given as the second
  parameter.

  For example, the first watch() call says that any time something
  in our scss folder changes, the sassTask should be rerun.

  The second watch statement says any time a .jsx or .js file in
  the client folder changes, the jsTask should be run.

  Finally, we will tell gulp to watch our server folder for changes.
  When they happen, it will trigger the series of tasks described.
  In this case, it will run our lint task, and then our server task.

  For all of these tasks, we say { ignoreInitial: false } because by
  default, gulp will not run the task on startup. If we didn't set this,
  our server would only start when our code changed. Our scss wouldn't
  build until we edited it. Our react code wouldn't bundle until we
  changed it.
*/
const watch = (done) => {
    gulp.watch('./scss', { ignoreInitial: false }, sassTask);
    gulp.watch(['./client/*.js', './client/*.jsx'], { ignoreInitial: false }, jsTask);
    gulp.watch('./server/**/*.js', { ignoreInitial: false }, gulp.series(lintTask, serverTask));

    done();
}

/*From our gulpFile, we want to export any tasks that we want
  to be able to call from our package.json. In this case we can
  simply export all of them.

  To call a gulp task from a package.json script, we simply
  say "gulp [TASKNAME]". See examples of this in the package.json
  in this project.
*/
module.exports = {
	sassTask,
    build,
    jsTask,
    lintTask,
    watch,
    herokuBuild,
};