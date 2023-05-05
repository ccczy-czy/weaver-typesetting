const onresize = (dom_elem, callback) => {
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(dom_elem);
  };
  
  const concatArray = (arr) => {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
      string += arr[i];
    }
  
    return string;
  }
  
  const cols = document.querySelectorAll('.col');
  cols.forEach((item) => {
    const oldHeight = parseFloat(getComputedStyle(item).height);
  
    onresize(item, () => {
      const [colNum, rowNum] = item.className.split(" ").slice(1);
  
      const newHeight = parseFloat(getComputedStyle(item).height);
      const direction = oldHeight - newHeight < 0 ? 1 : -1;
  
      const oldLineHeight = parseFloat(getComputedStyle(item).lineHeight);
      let newLineHeight = (oldLineHeight + direction * 0.012 * oldLineHeight) < 1.94 ? 1.92 : (oldLineHeight + direction * 0.012 * oldLineHeight);
      newLineHeight = newLineHeight > 23.04 ? 23.04 : newLineHeight;
  
      item.style.lineHeight = newLineHeight + 'px';
  
      document.querySelectorAll('.' + colNum).forEach((box) => {
        box.style.width = item.style.width;
        box.style.lineHeight = newLineHeight + 'px';
      });
  
      document.querySelectorAll('.' + rowNum).forEach((box) => {
        box.style.height = item.style.height;
        box.style.lineHeight = newLineHeight + 'px';
      });
    });
  
    item.addEventListener('input', () => {
      item.style.height = 'auto';
      item.style.height = item.scrollHeight + 'px';
    });
  });
  
  let fontSizeSlider;
  document.getElementById('slider').addEventListener('mouseup', () => {
    fontSizeSlider = document.querySelector('#slider').value;
    console.log(fontSizeSlider)
  })
  
  document.addEventListener("mouseup", function() {
    const selectedNode = window.getSelection();
    const selectedText = selectedNode.toString().trim();
    if (selectedText !== "") {
      const newInsert = document.createElement('span');
      newInsert.className += 'selectedText specialCharacter';
      // newInsert.textContent = selectedText;
      newInsert.textContent = '•';
      newInsert.style.maxWidth = 'fit-content';
      newInsert.style.fontSize = fontSizeSlider + 'rem';
      newInsert.style.lineHeight = fontSizeSlider + 'rem';
  
      // newInsert.className += 'specialCharacter';
  
      /*
      newInsert.textContent = '*';
      newInsert.className += 'specialCharacter';
  
      TODO: 
      1. Add a slider to control the font size of the *
      */
  
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
  
  const kern = document.querySelector('#slider4');
  slider.addEventListener("input", (evt) => {
    const cols = document.querySelectorAll('.col');
    boxes.forEach((s) => {
      s.style.fontKerning = evt.target.value + 'rem';
    });
  });
  
  
  
  
  
  
  // console.log(document.querySelector('#slider').value);