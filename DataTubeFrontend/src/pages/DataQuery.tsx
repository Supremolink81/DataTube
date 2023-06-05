const query_data: Function = (query_option: string) => {

    if (query_option === "CLASSIFICATION") {

        

    } else if (query_option === "REGRESSION") {



    } else if (query_option === "VISUALIZATION") {



    } else if (query_option === "ANALYSIS") {



    } else {

        return <></>;

    }

}

export const DataQuery: React.FC<{}> = () => {

    return (
        <>
            <h1 id="query-choice-text">Select Query Type:</h1>

            {query_data()}
        </>
    );
}