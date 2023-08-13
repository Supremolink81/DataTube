import * as express from "express";
import {oneVariableVisualization, twoVariableVisualization} from "./visualization"
import {getFilteredData} from "./data_processing"
import {oneVariableSummaryStats, twoVariableSummaryStats} from "./analysis"
import * as regression from "./regression"

const router = express.Router();

router.get("/oneVariableVisualization", async (req, res) => {

    const variableName = req.query.variableName;

    const filters = req.query.filters;

    try {

        const visualizationType: string = req.query.visualizationType as string;

        const filteredData = await getFilteredData(filters, variableName);

        const visualizationImage = oneVariableVisualization(filteredData, visualizationType);

        res.sendFile(visualizationImage);

    } catch (error) {

        res.send(error);
    }

});

router.get("/twoVariableVisualization", async (req, res) => {

    const firstVariableName = req.query.firstVariableName;

    const secondVariableName = req.query.secondVariableName;

    const filters = req.query.filters;

    try {

        const visualizationType: string = req.query.visualizationType as string;

        const filteredDataFirstVariable = await getFilteredData(filters, firstVariableName);

        const filteredDataSecondVariable = await getFilteredData(filters, secondVariableName);

        const visualizationImage = twoVariableVisualization(filteredDataFirstVariable, filteredDataSecondVariable, visualizationType);

        res.sendFile(visualizationImage);

    } catch (error) {

        res.send(error);
    }

});

router.get("/oneVariableAnalysis", async (req, res) => {

    const variableName = req.query.variableName;

    const filters = req.query.filters;

    try {

        const filteredData = await getFilteredData(filters, variableName);

        const analysisResults = oneVariableSummaryStats(filteredData);

        res.send(analysisResults);

    } catch (error) {

        res.send(error);

    }

});

router.get("/twoVariableAnalysis", async (req, res) => {

    const firstVariableName = req.query.firstVariableName;

    const secondVariableName = req.query.secondVariableName;

    const filters = req.query.filters;

    try {

        const filteredDataFirstVariable = await getFilteredData(filters, firstVariableName);

        const filteredDataSecondVariable = await getFilteredData(filters, secondVariableName);

        const analysisResults = twoVariableSummaryStats(filteredDataFirstVariable, filteredDataSecondVariable);

        res.send(analysisResults);

    } catch (error) {

        res.send(error);

    }

});

router.get("/regression", async (req, res) => {

    const responseVariable = req.query.responseVariable;

    const explanatoryVariables = req.query.explanatoryVariables;

    const filters = req.query.filters;

    try {

        const filteredData = await getFilteredData(filters);

        const regressionModel = "Placeholder";

        res.send(regressionModel);

    } catch (error) {

        res.send(error);

    }

});