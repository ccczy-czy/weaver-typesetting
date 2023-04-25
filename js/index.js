// const upperDiv = document.getElementById('upperDiv');
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
  
//   const height = upperDiv.offsetHeight;
//   const newHeight = height - deltaY;
  
//   if (newHeight < 0) {
//     upperDiv.style.height = '0';
//   } else {
//     upperDiv.style.height = newHeight + 'px';
//   }
// }

// function stopDragging() {
//   isDragging = false;
// }

const upperDivs = document.querySelectorAll('.upperDiv');
const ruler = document.getElementById('ruler');

let isDragging = false;
let prevY = 0;

ruler.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', handleDragging);
document.addEventListener('mouseup', stopDragging);

function startDragging(e) {
  isDragging = true;
  prevY = e.clientY;
}

function handleDragging(e) {
  if (!isDragging) return;
  
  const deltaY = prevY - e.clientY;
  prevY = e.clientY;
  
  const height = upperDivs[0].offsetHeight;
  const newHeight = height - deltaY;
  // const lineHeight = parseInt(getComputedStyle(upperDivs[0]).lineHeight);
  
  if (newHeight < 0) {
    upperDivs.forEach(upperDiv => {
      upperDiv.style.height = '0';
      // upperDiv.style.lineHeight = 1 + 'px';
    });
  } else {
    upperDivs.forEach(upperDiv => {
      upperDiv.style.height = newHeight + 'px';
      // upperDiv.style.lineHeight = Math.max(lineHeight - diff / 5, 2) + 'px';
    });
  }
}

function stopDragging() {
  isDragging = false;
}

