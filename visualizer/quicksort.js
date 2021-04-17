async function partition(arr, start, end) {
  var pivotIndex = start;
  var pivotValue = arr[end];
  states[pivotIndex] = 0;
  if (flag) {
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        if (flag) {
          await swap(arr, i, pivotIndex);
          states[pivotIndex] = -1;
          pivotIndex++;
          states[pivotIndex] = 0;
        } else {
          break;
        }
      }
    }

    await swap(arr, pivotIndex, end);
    for (let i = start; i < end; i++) {
      if (i != pivotIndex) {
        states[i] = -1;
      }
    }
    return pivotIndex;
  }
}

async function quickSort(arr, start, end) {
  if (flag) {
    if (start >= end) {
      return;
    }
    stepped++;
    let index = await partition(arr, start, end);
    states[index] = -1;
    if (flag) {
      await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end),
      ]);
    }
  }
  done = new Date().getTime();
}
