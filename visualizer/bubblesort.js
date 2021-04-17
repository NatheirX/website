async function bubblesort(arr) {
  let len = arr.length;
  if (flag) {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        stepped++;
        if (flag) {
          if (arr[j] > arr[j + 1]) {
            states[j] = 0;
            states[j + 1] = 1;
            await swap(arr, j, j + 1);
          }
        } else {
          break;
        }
      }
    }
  }
  done = new Date().getTime();
}

