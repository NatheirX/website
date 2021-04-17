async function insertionSort(arr) {
  let n = arr.length;
  if (flag) {
    for (let i = 1; i < n; i++) {
      stepped++;
      let current = arr[i];
      let j = i - 1;
      if (flag) {
        while (j > -1 && current < arr[j]) {
          arr[j + 1] = arr[j];
          states[j + 1] = 0;
          j--;
          await sleep(101 - speedtime.value);
          swapped++;
          stepped++;
        }
        states[j] = 1;
        states[j - 1] = 1;
        states[j - 2] = 1;
        arr[j + 1] = current;
      } else {
        flag = false;
        break;
      }
    }
  }
  done = new Date().getTime();
}
