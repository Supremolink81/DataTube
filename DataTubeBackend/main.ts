import * as express from "express";
import * as visualization from "./visualization"
import * as preprocessing from "./data_processing"
import * as analysis from "./analysis"
import * as regression from "./regression"

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

        const visualizationImage = "Placeholder";

    } catch (error) {

        res.send(error);
    }

});

router.get("/oneVariableAnalysis", (req, res) => {

    const variableName = req.query.variableName;

    try {

        const analysisResults = "Placeholder";

        res.send(analysisResults);

    } catch (error) {

        res.send(error);

    }

});

router.get("/twoVariableAnalysis", (req, res) => {

    const firstVariableName = req.query.firstVariableName;

    const secondVariableName = req.query.secondVariableName;

    try {

        const analysisResults = "Placeholder";

        res.send(analysisResults);

    } catch (error) {

        res.send(error);

    }

});

router.get("/regression", (req, res) => {

    const responseVariable = req.query.responseVariable;

    const explanatoryVariables = req.query.explanatoryVariables;

    try {

        const regressionModel = "Placeholder";

        res.send(regressionModel);

    } catch (error) {

        res.send(error);

    }

});