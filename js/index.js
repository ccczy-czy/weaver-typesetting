// const upperDivs = document.querySelectorAll('.upperDiv');
// const textBoxes = document.querySelectorAll('.text');
// const ruler = document.getElementById('ruler');

// let isDragging = false;
// let prevY = 0;

// ruler.addEventListener('mousedown', startDragging);
// document.addEventListener('mousemove', handleDragging);
// document.addEventListener('mouseup', stopDragging);

// function startDragging(e) {
//   isDragging = true;
//   prevY = e.clientY;
// }

// function handleDragging(e) {
//   if (!isDragging) return;
  
//   const deltaY = prevY - e.clientY;
//   prevY = e.clientY;
  
//   const height = upperDivs[0].offsetHeight;
//   const newHeight = height - deltaY;

//   const lineHeight = parseFloat(getComputedStyle(upperDivs[0]).lineHeight);
//   const direction = height < newHeight ? 1 : -1;

//   const deltaLineHeight = newHeight * 0.002 * direction;
//   const newLineHeight = lineHeight + deltaLineHeight;
  
//   if (newHeight < 0) {
//     upperDivs.forEach(upperDiv => {
//       upperDiv.style.height = '0';
//       upperDiv.style.lineHeight = 0.1;
//     });
//   } else {
//     upperDivs.forEach(upperDiv => {
//       upperDiv.style.height = newHeight + 'px';
//       upperDiv.style.lineHeight = Math.min(newLineHeight, 24.96) + 'px';
//     });
//   }
// }

// function stopDragging() {
//   isDragging = false;
// }

const onresize = (dom_elem, callback) => {
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(dom_elem);
};

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
});
