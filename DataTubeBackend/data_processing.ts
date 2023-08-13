import * as d3 from "d3";
import * as oracledb from "oracledb";

type FilterInfo = {
    variable: string,
    minValue: number,
    maxValue: number,
}

const connectToOracle: Function = async () => {

    let connection: oracledb.Connection | undefined = undefined;

    try {

        const DATABASE_USERNAME = process.env.DATABASE_USERNAME;

        const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

        const DATABASE_CONNECT_STRING = process.env.DATABASE_CONNECT_STRING;

        connection = await oracledb.getConnection({user: DATABASE_USERNAME, password: DATABASE_PASSWORD, connectionString: DATABASE_CONNECT_STRING});

        return connection;

    } catch (error) {

        console.error(error);
        
    } finally {

        if (connection !== undefined) {

            try {

                await connection.close();

            } catch (error) {

                console.error(error);

            }

        }

    }

}

const getFilteredData: Function = async (filters: Array<FilterInfo>, variableName: string) => {
    
    let oracleDatabase: oracledb.Connection = connectToOracle();

    try {

        let sqlQuery: string = `select ${variableName} from YoutubeVideoData where`;

        for (let index = 0; index < filters.length; index++) {

            if (index > 0) {

                sqlQuery += " and";

            }

            const filter = filters[index];

            sqlQuery += ` ${filter.minValue} <= ${filter.variable} <= ${filter.maxValue}`;

        }

        let queryResult = await oracleDatabase.execute(sqlQuery);

        if (queryResult.resultSet !== undefined) {

            let rowsRetrieved = await queryResult.resultSet.getRows();

            await queryResult.resultSet.close();

            return rowsRetrieved;

        }

    } catch (error) {

        console.error(error);

    }

}

export {getFilteredData};