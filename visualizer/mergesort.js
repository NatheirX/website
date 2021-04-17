async function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  await sleep(10)
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  await mergeSort(left);
  await mergeSort(right);
  return await merge(arr, left, right);
}

async function merge(array, leftArray, rightArray) {
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) {
      array[k] = leftArray[i];
      i += 1;
    } else {
      array[k] = rightArray[j];
      j += 1;
    }
    k += 1;
  }
  while (i < leftArray.length) {
    array[k] = leftArray[i];
    i += 1;
    k += 1;
  }
  while (j < rightArray.length) {
    array[k] = rightArray[j];
    j += 1;
    k += 1;
  }
  return array;
}
