import * as express from "express";

const router = express.Router();

router.get("/oneVariableVisualization", (req, res) => {

    const variableName = req.query.variableName;

    const visualizationType = req.query.visualizationType;

});

router.get("/twoVariableVisualization", (req, res) => {

    const firstVariableName = req.query.firstVariableName;

    const secondVariableName = req.query.secondVariableName;

    const visualizationType = req.query.visualizationType;

    try {

        const visualizationImage = 

    }

});

router.get("/oneVariableAnalysis", (req, res) => {

    const variableName = req.query.variableName;

});

router.get("/twoVariableAnalysis", (req, res) => {

    const firstVariableName = req.query.firstVariableName;

    const secondVariableName = req.query.secondVariableName;

});

router.get("/regression", (req, res) => {

    const responseVariable = req.query.responseVariable;

    const explanatoryVariables = req.query.explanatoryVariables;

    try {

        const regressionModel;

        res.send(regressionModel);

    } catch (error) {

        res.send(error);

    }

});