async function selectionSort(arr) {
  let len = arr.length;
  if (flag) {
    for (let i = 0; i < len; i++) {
      if (flag) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
          stepped++;
          if (arr[j] < arr[min]) {
            min = j;
          }
        }
        if (min != i) {
          await swap(arr, i, min);
          states[i] = 1;
          states[min] = 0;
        }
      } else {
        break;
      }
    }
  }
  done = new Date().getTime();
}
