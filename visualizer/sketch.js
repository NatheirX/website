let color = "#3b444b";
let pics = [];
let screen_width = 1000;
let screen_height = 600;
let bubble = false;
let sort = false;
let selection = false;
let insertion = false;
let sorted = false;
let currently_running;
let swapped = 0;
let stepped = 0;
let states = [];
let vartime = 1;
let flag = true;
let timer = [];
let timette;
let done;
function setup() {
  createCanvas(slider.value, screen_height);
  for (let i = 0; i < parseInt(slider.value); i++) {
    pics.push(random(screen_height));
    states[i] = -1;
  }
}

async function draw() {
  background(color);
  for (let c = 0; c < pics.length; c++) {
    line(c, screen_height, c, screen_height - pics[c]);
    if (states[c] == 0) {
      stroke("red");
      states[c] = -1;
    } else if (states[c] == 1) {
      stroke("green");
      states[c] = -1;
    } else {
      stroke(255);
    }
  }

  if (bubble) {
    timette = new Date().getTime();
    currently_running = "bubblesort";
    bubblesort(pics);
    change();
    bubble = false;
  } else if (sort) {
    timette = new Date().getTime();
    currently_running = "quicksort";
    quickSort(pics, 0, pics.length);
    change();
    sort = false;
  } else if (selection) {
    timette = new Date().getTime();
    currently_running = "selectionsort";
    selectionSort(pics);
    change();
    selection = false;
  } else if (insertion) {
    currently_running = "insertionSort";
    change();
    timette = new Date().getTime();
    insertionSort(pics);

    insertion = false;
  }
  swaps.textContent = swapped;
  steps.textContent = stepped;
  size.textContent = pics.length;
  speed.textContent = speedtime.value;
  if (done) {
    time.textContent = done - timette;
  } else if (timette) {
    time.textContent = new Date().getTime() - timette;
  } else {
    time.textContent = 0;
  }
}

async function swap(lst, first, second) {
  await sleep(101 - speedtime.value);
  let temp_var = lst[first];
  lst[first] = lst[second];
  lst[second] = temp_var;
  swapped++;
  stepped++;
}

resetBtn.addEventListener("click", async function () {
  currently_running = "reset";
  change();
  await reset();
  stepped = 0;
  swapped = 0;
});

async function reset() {
  pics = [];
  for (let i = 0; i < slider.value; i++) {
    pics.push(random(screen_height));
  }
  flag = false;
  noLoop();
  loop();
  await sleep(200);
  swapped = 0;
  states = [];
  stepped = 0;
  flag = true;
  if (swapped != 0 || stepped != 0) {
    reset();
  }

  timette = 0;
  done = null;
}

BubbleSort.addEventListener("click", function () {
  bubble = true;
});
QuickSort.addEventListener("click", function () {
  sort = true;
});
SelectionSort.addEventListener("click", function () {
  selection = true;
});
InsertionSort.addEventListener("click", function () {
  insertion = true;
});
slider.oninput = async function () {
  reset();
  resizeCanvas(slider.value, screen_height);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function change() {
  btns.forEach(function (event) {
    if (event.classList.contains(currently_running)) {
      content.forEach(function (e) {
        e.classList.remove("active");
        if (e.id == currently_running) {
          console.log(e);
          e.classList.add("active");
        }
      });
    }
  });
}
