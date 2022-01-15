const express = require('express');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;

const fabObj = require('./math-logic/fibonacci-series');


const port = 3000;
  
if(cluster.isMaster) {
    console.log(`Total Number of CPUs counst is ${totalCPUs}`);

    for(let i = 0 ; i < totalCPUs ; i++) {
        cluster.fork();
    }

    cluster.on('online' , (worker) => {
        console.log(`Worker id is ${worker.id} and PID is ${worker.process.pid}`);
    });

    cluster.on('exit' , worker => {
        console.log(`Worker Id ${worker.id} and pid is ${worker.process.pid} is offline`);
        console.log("Let's for new worker!");
        cluster.fork();
    });
} else {
    const app = express();
    app.get('/:number' , (req,res) => {
        console.log(`Worker process id - ${cluster.worker.process.pid} has accepted the request!`);
        let number = fabObj.calculateFibonacciValue(Number.parseInt(req.params.number));
        res.status(200).json({
            data:number
        });
    });

    console.log('server log');
    
    app.listen(port , () => {
        console.log(`Server is running on port ${port}`);
    }); 
}   

