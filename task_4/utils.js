export function calculatePrefixSums(inputArray) {
  const regularPrefixSum = [0];
  const alternatePrefixSum = [0];
  //Tính tổng cho toàn bộ inputArray theo từng loại - type 1 và type 2
  for (let i = 0; i < inputArray.length; i++) {
    regularPrefixSum[i + 1] = regularPrefixSum[i] + inputArray[i];
    alternatePrefixSum[i + 1] = alternatePrefixSum[i] + (i % 2 === 0 ? inputArray[i] : -inputArray[i]);
  }

  return { regularPrefixSum, alternatePrefixSum };
}

export function processQueries(queries, regularPrefixSum, alternatePrefixSum) {
  //Tính toán trên từng query
  return queries.map(({ type, range: [left, right] }) => {
    if (type === '1') {
      return regularPrefixSum[right + 1] - regularPrefixSum[left];
    } else {
      return alternatePrefixSum[right + 1] - alternatePrefixSum[left];
    }
  });
}