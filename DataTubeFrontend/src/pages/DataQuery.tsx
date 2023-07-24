import {useState} from "react";

const Filters: React.FC<{}> = () => {

    return (

        <>
            <h2>Select Variable Filters:</h2>

            <h4>Date Published</h4>
            <label htmlFor="date-min-value">Minimum: </label>
            <input type="number" name="date-max-value"></input>
            <label htmlFor="date-max-value">Maximum: </label>
            <input type="number" name="date-max-value"></input>

            <h4>Views</h4>
            <label htmlFor="views-min-value">Minimum: </label>
            <input type="number" name="views-max-value"></input>
            <label htmlFor="views-max-value">Maximum: </label>
            <input type="number" name="views-max-value"></input>

            <h4>Likes</h4>
            <label htmlFor="likes-min-value">Minimum: </label>
            <input type="number" name="likes-max-value"></input>
            <label htmlFor="likes-max-value">Maximum: </label>
            <input type="number" name="likes-max-value"></input>

            <h4>Comments</h4>
            <label htmlFor="comments-min-value">Minimum: </label>
            <input type="number" name="comments-max-value"></input>
            <label htmlFor="comments-max-value">Maximum: </label>
            <input type="number" name="comments-max-value"></input>

        </>

    );

}

const VariableOptions: React.FC<{}> = () => {
    return (
        <>
            <option>Date Published</option>
            <option>Views</option>
            <option>Likes</option>
            <option>Comments</option>
        </>
    );
}

const OneVariableVisualization: React.FC<{}> = () => {
    return (
        <>
            <h2 id="one-variable-variable-text">Choose your variable:</h2>
            <select id="one-variable-variable-choice" name="one-variable-variable-choice">
                <VariableOptions />
            </select>

            <h2 id="one-variable-visualization-text">Choose your visualization:</h2>
            <select id="one-variable-visualization-choice" name="one-variable-visualization-choice">
                <option>Histogram</option>
                <option>Boxplot</option>
                <option>Index Plot</option>
            </select>
        </>
    );
}

const TwoVariableVisualization: React.FC<{}> = () => {
    return (
        <>
            <h2 id="two-variable-first-variable-text">Choose your first variable:</h2>
            <select id="two-variable-first-variable-choice" name="two-variable-first-variable-choice">
                <VariableOptions />
            </select>

            <h2 id="two-variable-second-variable-text">Choose your second variable:</h2>
            <select id="two-variable-second-variable-choice" name="two-variable-second-variable-choice">
                <VariableOptions />
            </select>

            <h2 id="two-variable-visualization-text">Choose your visualization: </h2>
            <select id="two-variable-visualization-choice" name="two-variable-visualization-choice">
                <option>Scatterplot</option>
                <option>Heatmap</option>
            </select>
        </>
    );
}

const Visualization: React.FC<{}> = () => {

    let [variableCount, setVariableCount] = useState("ONE VARIABLE");

    const handleVariableCountChange: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVariableCount(e.target.value);
    }

    return (
        <>

            <h2 id="variable-count-choice-text">One or Two Variable?:</h2>

            <select id="variable-count-selector" defaultValue={"ONE VARIABLE"} onChange={handleVariableCountChange}>
                <option>ONE VARIABLE</option>
                <option>TWO VARIABLE</option>
            </select>

            {variableCount === "ONE VARIABLE" ? <OneVariableVisualization /> : <TwoVariableVisualization />}

        </>
    );
}

const OneVariableAnalysis: React.FC<{}> = () => {

    return (

        <>
        
            <h2 id="one-variable-variable-text">Choose your variable:</h2>
            <select id="one-variable-variable-choice" name="one-variable-variable-choice">
                <VariableOptions />
            </select>

        </>

    );

}

const TwoVariableAnalysis: React.FC<{}> = () => {

    return (

        <>
        
            <h2 id="two-variable-first-variable-text">Choose your first variable:</h2>
            <select id="two-variable-first-variable-choice" name="two-variable-first-variable-choice">
                <VariableOptions />
            </select>

            <h2 id="two-variable-second-variable-text">Choose your second variable:</h2>
            <select id="two-variable-second-variable-choice" name="two-variable-second-variable-choice">
                <VariableOptions />
            </select>

        </>

    );

}

const Analysis: React.FC<{}> = () => {

    let [variableCount, setVariableCount] = useState("ONE VARIABLE");

    const handleVariableCountChange: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVariableCount(e.target.value);
    }

    return (

        <>
        
        <h2 id="variable-count-choice-text">One or Two Variable?:</h2>

            <select id="variable-count-selector" defaultValue={"ONE VARIABLE"} onChange={handleVariableCountChange}>
                <option>ONE VARIABLE</option>
                <option>TWO VARIABLE</option>
            </select>

            {variableCount === "ONE VARIABLE" ? <OneVariableAnalysis /> : <TwoVariableAnalysis />}

        </>

    );

}

type RegressionVariablesProperties = {
    dependent_variable: string,
}

const RegressionVariables: React.FC<RegressionVariablesProperties> = (props) => {

    if (props.dependent_variable === "Date Published") {

        return (

            <>
                <h2 id="feature-selection-header">Choose your features: </h2>

                <p><input type="checkbox" id="likes-checkbox" name="likes-checkbox"></input>Likes</p>
                <p><input type="checkbox" id="views-checkbox" name="views-checkbox"></input>Views</p>
                <p><input type="checkbox" id="comments-checkbox" name="comments-checkbox"></input>Comments</p>
            </>

        );

    } else if (props.dependent_variable === "Views") {

        return (

            <>
                <h2 id="feature-selection-header">Choose your features: </h2>
                
                <p><input type="checkbox" id="date-published-checkbox" name="date-published-checkbox"></input>Date Published</p>
                <p><input type="checkbox" id="likes-checkbox" name="likes-checkbox"></input>Likes</p>
                <p><input type="checkbox" id="comments-checkbox" name="comments-checkbox"></input>Comments</p>
            </>

        );

    } else if (props.dependent_variable === "Likes") {

        return (

            <>
                <h2 id="feature-selection-header">Choose your features: </h2>
                
                <p><input type="checkbox" id="date-published-checkbox" name="date-published-checkbox"></input>Date Published</p>
                <p><input type="checkbox" id="views-checkbox" name="views-checkbox"></input>Views</p>
                <p><input type="checkbox" id="comments-checkbox" name="comments-checkbox"></input>Comments</p>
            </>

        );

    } else if (props.dependent_variable === "Comments") {

        return (

            <>
                <h2 id="feature-selection-header">Choose your features: </h2>
                
                <p><input type="checkbox" id="date-published-checkbox" name="date-published-checkbox"></input>Date Published</p>
                <p><input type="checkbox" id="likes-checkbox" name="likes-checkbox"></input>Likes</p>
                <p><input type="checkbox" id="views-checkbox" name="views-checkbox"></input>Views</p>
            </>

        );

    }

    return <></>;

}

const Regression: React.FC<{}> = () => {

    let [variable, setVariable] = useState("");

    const handleVariableChange: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVariable(e.target.value);
    }

    return (

        <>

            <h2 id="regression-target-variable-text">Choose your target variable:</h2>
            <select id="regression-target-variable-choice" name="regression-target-variable-choice" onChange={handleVariableChange}>
                <VariableOptions />
            </select>

            <RegressionVariables dependent_variable={variable} />

        </>

    );

}

type QueryCustomizationProperties = {
    query_option: string,
}

const QueryCustomization: React.FC<QueryCustomizationProperties> = (properties) => {

    if (properties.query_option === "REGRESSION") {

        return <Regression />;

    } else if (properties.query_option === "VISUALIZATION") {

        return <Visualization />;

    } else if (properties.query_option === "ANALYSIS") {

        return <Analysis />;

    } else {

        return <p id="query-choice">PLEASE SELECT A QUERY TYPE.</p>;

    }

}

export const DataQuery: React.FC<{}> = () => {

    let [queryOption, setQueryOption] = useState("");

    const handleQueryTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQueryOption(e.target.value);
    }

    const query_selector = <select id="query-selector" defaultValue={"VISUALIZATION"} onChange={handleQueryTypeChange}>
        <option>VISUALIZATION</option>
        <option>ANALYSIS</option>
        <option>REGRESSION</option>
    </select>

    return (
        <form name="query-form" method="GET">
            
            <h1 className="page-title">Data Query</h1>

            <Filters />

            <h2 id="query-choice-text">Select Query Type:</h2>

            {query_selector}

            <QueryCustomization query_option={queryOption} />

            <h2 id="submit-button"><input type="submit" value="Submit"></input></h2>

        </form>
    );
}