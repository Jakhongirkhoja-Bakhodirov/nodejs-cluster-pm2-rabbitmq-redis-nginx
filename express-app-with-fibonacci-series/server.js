const express = require('express');
const fabObj = require('./math-logic/fibonacci-series');

const app = express();
const port = 3000;

app.get('/:number' , (req,res) => {
    console.log(req.params);
    let number = fabObj.calculateFibonacciValue(Number.parseInt(req.params.number));
    res.status(200).json({
        data:number
    });
});

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});