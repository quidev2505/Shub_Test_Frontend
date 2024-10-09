import { fetchData, sendResults } from './api.js';
import { calculatePrefixSums, processQueries } from './utils.js';

const MAX_ARRAY_LENGTH = 100000;

async function solveQueries() {
  // Task 4 - DATA STRUCTURE & ALGORITHM
  try {
    // Fetch input data
    const { token, data: inputArray, query: queries } = await fetchData();

    // Validate input data
    validateInputData(inputArray);

    // Calculate prefix sums
    const { regularPrefixSum, alternatePrefixSum } = calculatePrefixSums(inputArray);

    // Process queries
    const queryResults = processQueries(queries, regularPrefixSum, alternatePrefixSum);

    // Send results back to the server
    await sendResults(queryResults, token);

    console.log('Results sent successfully!');
    console.log('Query results:', queryResults);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

function validateInputData(inputArray) {
  if (inputArray.length > MAX_ARRAY_LENGTH) {
    throw new Error(`Input array exceeds maximum length of ${MAX_ARRAY_LENGTH}`);
  }
  if (!inputArray.every(num => Number.isInteger(num) && num >= 0)) {
    throw new Error('Input array contains invalid elements');
  }
}

solveQueries();