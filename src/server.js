// Variant A. Without cluster. =>

const app = require('./app');

// eslint-disable-next-line no-use-before-define
init();

async function init() {
  try {
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}

// --

// Variant B. With cluster. Please comment out variant A and uncomment this variant to test it. =>

// const totalCPUs = require('os').cpus().length;
// const cluster = require('cluster');
// const app = require('./app');
//
// if (cluster.isMaster) {
//   console.log(`Running Master PID#: ${process.pid}`);
//   console.log(`Number of CPUs: ${totalCPUs}`);
//
//   for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
//   }
//
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker died: ${worker.process.pid}`);
//     // console.log(`Code: ${code}`);
//     // console.log(`Signal: ${signal}`);
//   });
// } else {
//   // eslint-disable-next-line no-use-before-define
//   init();
// }
//
// async function init() {
//   try {
//     app.listen(3001, () => {
//       console.log('Express App Listening on Port 3001');
//     });
//   } catch (error) {
//     console.error(`An error occurred: ${JSON.stringify(error)}`);
//     // eslint-disable-next-line no-process-exit
//     process.exit(1);
//   }
// }
