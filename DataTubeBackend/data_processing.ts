import * as d3 from "d3";
import * as oracledb from "oracledb";

type FilterInfo = {
    variable: string,
    minValue: number,
    maxValue: number,
}

const connectToOracle: Function = async () => {

    let connection;

    try {

        const DATABASE_USERNAME = process.env.DATABASE_USERNAME;

        const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

        const DATABASE_CONNECT_STRING = process.env.DATABASE_CONNECT_STRING;

        connection = oracledb.getConnection({user: DATABASE_USERNAME, password: DATABASE_PASSWORD, connectionString: DATABASE_CONNECT_STRING});

        return connection;

    } catch (error) {

        console.error(error);
        
    } finally {

        if (connection) {

            try {

                await connection.close();

            } catch (error) {

                console.error(error);

            }

        }

    }

}

const getFilteredData: Function = (dataTable: d3.DSVRowArray, filters: Array<FilterInfo>) => {
    
    let oracleDatabase = connectToOracle();

    try {

        const sqlQuery: string = `SELECT * FROM YoutubeVideoData WHERE `;

    } catch (error) {

        console.error(error);

    }

}

module.exports = getFilteredData