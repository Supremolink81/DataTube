import * as d3 from "d3";

const covariance: Function = (firstArrayOfData: Array<number>, secondArrayOfData: Array<number>) => {

    let unnormalizedSum = 0;

    const firstMean: number | undefined = d3.mean(firstArrayOfData);

    const secondMean: number | undefined = d3.mean(secondArrayOfData);

    if (firstMean !== undefined && secondMean !== undefined) {
        
        try {

            for (let index = 0; index < firstArrayOfData.length; index++) {

                unnormalizedSum += (firstArrayOfData[index] - firstMean) * (secondArrayOfData[index] - secondMean);
        
            }

            return unnormalizedSum / (firstArrayOfData.length - 1);

        } catch (error) {

            throw new Error(`The following error happened; ${error}. Perhaps the arrays have different lengths? Or there is only one pair of entries.`);

        }

    } else {

        throw new Error("Mean for both arrays must be defined; perhaps one of the entries is empty?");

    }

}

const correlation = (firstArrayOfData: Array<number>, secondArrayOfData: Array<number>) => {

    const firstVariance: number | undefined = d3.variance(firstArrayOfData);

    const secondVariance: number | undefined = d3.variance(secondArrayOfData);

    if (firstVariance !== undefined && secondVariance !== undefined) {

        return covariance(firstArrayOfData, secondArrayOfData) / Math.sqrt(firstVariance * secondVariance);

    } else {

        throw new Error("Both variances must be defined; perhaps there is only one pair of entries?")

    }

}

const oneVariableSummaryStats: Function = (arrayOfData: Array<number>) => {

    return {

        "Mean" : d3.mean(arrayOfData),

        "Median" : d3.median(arrayOfData),

        "Mode" : d3.mode(arrayOfData),

        "Variance" : d3.variance(arrayOfData),

        "Standard Deviation" : d3.deviation(arrayOfData),

        "First Quartile" : d3.quantile(arrayOfData, 0.25),

        "Third Quartile" : d3.quantile(arrayOfData, 0.75),

    };

}

const twoVariableSummaryStats: Function = (firstArrayOfData: Array<number>, secondArrayOfData: Array<number>) => {

    return {

        "First Variable Summary Statistics" : oneVariableSummaryStats(firstArrayOfData),

        "Second Variable Summary Statistics" : oneVariableSummaryStats(secondArrayOfData),

        "Covariance" : covariance(firstArrayOfData, secondArrayOfData),

        "Correlation" : correlation(firstArrayOfData, secondArrayOfData),

    };

}