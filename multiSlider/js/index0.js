let rowNum = 5;
let colNum = 6;
let cols = document.querySelectorAll('.col');
let stopResize = true; // flag used to stop automatic resize when row / col is deleted

// observe resize
const onresize = (dom_elem, callback) => {
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(dom_elem);
};

// function used to listen to resize, when new row / col is add, add this to newly added elements
const listenColResize = (col, oldTextHeight, oldLineHeight) => {
  onresize(col, () => {
    if (stopResize) return; // if is deleting, stop resize

    const [colNum, rowNum] = col.className.split(" ").slice(1); // get colNum and rowNum of box

    const boxHeight = col.offsetHeight;

    const newLineHeight = boxHeight / (oldTextHeight / oldLineHeight);

    col.querySelector('.text').style.lineHeight = newLineHeight + 'px';

    document.querySelectorAll('.' + colNum).forEach((box) => {
      box.style.width = col.offsetWidth + 'px';
    });

    document.querySelectorAll('.' + rowNum).forEach((box) => {
      box.style.height = col.offsetHeight + 'px';
      box.querySelector('.text').style.lineHeight = newLineHeight + 'px';
    });

    col.addEventListener('input', () => { // expand col when typing
      col.style.height = col.scrollHeight + 'px';
    });
  });
};

// function for concatenating an array into a string
const concatArray = (arr) => {
  let string = "";
  for (let i = 0; i < arr.length; i++) {
    string += arr[i];
  }

  return string;
}

// TODO: 
// 1. Newly added row doesn't retain the same width as the last row if the use shrinks boxes before adding new row
const addRowButton = document.querySelector('#addRowButton');
addRowButton.addEventListener('click', (evt) => { // listen to add button click event
  evt.preventDefault();

  const newRow = document.createElement('div');
  newRow.className += 'row';
  rowNum++;

  for (i = 1; i <= colNum; i++) {
    const newCol = document.createElement('div');
    newCol.className += `col c${i} r${rowNum}`;

    const newText = document.createElement('div');
    newText.className += 'text';
    newText.textContent = 'start edit me.';
    newText.setAttribute('contenteditable', true);

    newCol.appendChild(newText);
    newRow.appendChild(newCol);
  }

  document.querySelector('.loomContainer').appendChild(newRow);
  cols = document.querySelectorAll('.col'); // reset the cols to be the newest html

  stopResize = false;

  // re-append resize listener to newly added row
  newRow.querySelectorAll('.col').forEach((newCol) => {
    const oldLineHeight = parseFloat(getComputedStyle(newCol.querySelector('.text')).lineHeight);

    // fix glitch when dragging on first cell
    const textHeights = [];
    document.querySelectorAll('.' + newCol.className.split(" ").slice(1)[0]).forEach((box) => {
      textHeights.push(box.querySelector('.text').offsetHeight);
    });

    const oldTextHeight = Math.max(...textHeights);
    listenColResize(newCol, oldTextHeight, oldLineHeight);
  });
});

const deleteRowButton = document.querySelector('#deleteRowButton');
deleteRowButton.addEventListener('click', (evt) => { // listen to delete row click event
  stopResize = true;
  evt.preventDefault();
  const lastRow = document.querySelector('.loomContainer').querySelector(`.r${rowNum}`).parentNode;
  document.querySelector('.loomContainer').removeChild(lastRow); // delete row

  rowNum--; // reset # of rows

  cols = document.querySelectorAll('.col'); // reset cols to be the newest html
  setTimeout(() => {
    stopResize = false; // toggle back stopResize to continue listen to resize on the rest boxes
  }, 200);
});

const addColButton = document.querySelector('#addColButton');
addColButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  colNum++;

  const newColsArr = []; // used to store newly added cols

  for (i = 1; i <= rowNum; i++) {
    const newCol = document.createElement('div');
    newCol.className += `col c${colNum} r${i}`;

    const newText = document.createElement('div');
    newText.className += 'text';
    newText.textContent = 'start edit me.';
    newText.setAttribute('contenteditable', true);

    newCol.appendChild(newText);
    document.querySelector(`.r${i}`).parentNode.appendChild(newCol);
    newColsArr.push(newCol);
    stopResize = true; // stop resize when new col is added
  }

  cols = document.querySelectorAll('.col'); // reset the cols to be the newest html

  //re-append resize listener to newly added row
  cols.forEach((col) => {
    const oldLineHeight = parseFloat(getComputedStyle(col.querySelector('.text')).lineHeight);

    onresize(col, () => {
      if (stopResize) stopResize = false;
  
      const [colNum, rowNum] = col.className.split(" ").slice(1); // get colNum and rowNum of box
  
      const newLineHeight = parseFloat(getComputedStyle(document.querySelector('.' + col.className.split(" ").slice(1)[1])).lineHeight)

      col.querySelector('.text').style.lineHeight =  newLineHeight + 'px';
  
      document.querySelectorAll('.' + colNum).forEach((box) => {
        box.style.width = col.offsetWidth + 'px';
      });
  
      document.querySelectorAll('.' + rowNum).forEach((box) => {
        box.style.height = col.offsetHeight + 'px';
      });
  
      col.addEventListener('input', () => { // expand col when typing
        col.style.height = col.scrollHeight + 'px';
      });
    });
  });
});

const deleteColButton = document.querySelector('#deleteColButton');
deleteColButton.addEventListener('click', (evt) => {
  stopResize = true;
  evt.preventDefault();
  const lastCols = document.querySelector('.loomContainer').querySelectorAll(`.c${colNum}`);
  lastCols.forEach((col) => {
    col.parentNode.removeChild(col); // delete row
  });

  colNum--; // reset # of rows

  cols = document.querySelectorAll('.col'); // reset cols to be the newest html
  setTimeout(() => {
    stopResize = false; // toggle back stopResize to continue listen to resize on the rest boxes
  }, 200);
});

cols.forEach((col) => { // loop through all the boxes and listen to resize event
  const oldLineHeight = parseFloat(getComputedStyle(col.querySelector('.text')).lineHeight);

  // fix glitch when dragging on first cell
  const textHeights = [];
  document.querySelectorAll('.' + col.className.split(" ").slice(1)[0]).forEach((box) => {
    textHeights.push(box.querySelector('.text').offsetHeight);
  });

  const oldTextHeight = Math.max(...textHeights);

  stopResize = false; 
  listenColResize(col, oldTextHeight, oldLineHeight);
});

let fontSizeSlider;
document.getElementById('slider').addEventListener('mouseup', () => {
  fontSizeSlider = document.querySelector('#slider').value;
})

document.addEventListener("mouseup", function() {
  const selectedNode = window.getSelection();
  const selectedText = selectedNode.toString().trim();
  if (selectedText !== "") {
    const newInsert = document.createElement('span');
    newInsert.className += 'selectedText specialCharacter';
    newInsert.textContent = '•';
    newInsert.style.maxWidth = 'fit-content';
    newInsert.style.fontSize = fontSizeSlider + 'rem';
    newInsert.style.lineHeight = fontSizeSlider + 'rem';

    const insertArray = selectedNode.focusNode.parentNode.innerHTML.toString().split(selectedText);
    insertArray.splice(1, 0, newInsert.outerHTML);

    selectedNode.focusNode.parentNode.innerHTML = concatArray(insertArray);

  }
});

const slider = document.querySelector('#slider');
slider.addEventListener("input", (evt) => {
  const stars = document.querySelectorAll('.specialCharacter');
  stars.forEach((s) => {
    s.style.fontSize = evt.target.value + 'rem';
    s.style.lineHeight = evt.target.value + 'rem';
  });
});

const someSlider = document.querySelector('#slider2'); // select the slider from html
someSlider.addEventListener("input", (evt) => { // listen to input change event, i.e., when user drag the slider
  const boxes = document.querySelectorAll('.col'); // select all the boxes
  boxes.forEach((b) => { // loop through all the boxes, change letter spacing in each box
    b.style.letterSpacing = evt.target.value + 'px'; // or use rem ur choice
  });
});

const sizeSlider = document.querySelector('#slider3');
sizeSlider.addEventListener("input", (evt) => {
  const cols = document.querySelectorAll('.col');
  cols.forEach((s) => {
    console.log(evt.target.value)
    s.style.fontSize = evt.target.value + 'px';

    });
});

// const kern = document.querySelector('#slider4');
// slider.addEventListener("input", (evt) => {
//   const cols = document.querySelectorAll('.col');
//   boxes.forEach((s) => {
//     s.style.fontKerning = evt.target.value + 'rem';
//   });
// });
