let previousSelection = null;
let highlightEnabled = false;


document.addEventListener('mouseup', function(e) {
  const selection = window.getSelection().toString();
  if (selection && selection !== previousSelection) {
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement('span');
    span.className += 'highlighted';
    span.textContent = selection;
    range.deleteContents();
    range.insertNode(span);
    previousSelection = selection;
  }
});



const someSlider = document.querySelector('#slider2'); // select the slider from html
someSlider.addEventListener("input", (evt) => { // listen to input change event, i.e., when user drag the slider
  const boxes = document.querySelectorAll('.row'); // select all the boxes
  boxes.forEach((b) => { // loop through all the boxes, change letter spacing in each box
    b.style.letterSpacing = evt.target.value + 'px'; // or use rem ur choice
  });
});

// ISSUE: glitch
const slider1 = document.querySelector('#slider1'); // select the slider from html
slider1.addEventListener("input", (evt) => { // listen to input change event, i.e., when user drag the slider
  const boxes = document.querySelectorAll('.row'); // select all the boxes
  boxes.forEach((b) => { // loop through all the boxes, change letter spacing in each box
    b.style.lineHeight = evt.target.value + 'px'; // or use rem ur choice
  });
});

// ISSUE: glitch
const slider3 = document.querySelector('#slider3'); // select the slider from html
slider3.addEventListener("input", (evt) => { // listen to input change event, i.e., when user drag the slider
  const boxes = document.querySelectorAll('.row'); // select all the boxes
  boxes.forEach((b) => { // loop through all the boxes, change letter spacing in each box
    b.style.fontSize = evt.target.value + 'px'; // or use rem ur choice
  });
});

//special character/////////////////////////
const slider = document.querySelector('#slider');
slider.addEventListener("input", (evt) => {
  const stars = document.querySelectorAll('.specialCharacter');
  stars.forEach((s) => {
    s.style.fontSize = evt.target.value + 'rem';
    s.style.lineHeight = evt.target.value + 'rem';
  });
});

document.addEventListener("mouseup", function() {
  if (highlightEnabled) {
    const selectedNode = window.getSelection();
    const selectedText = selectedNode.toString().trim();
    if (selectedText !== "") {
      const newInsert = document.createElement('span');
      newInsert.className += 'selectedText specialCharacter';
      newInsert.textContent = '•';
      newInsert.style.maxWidth = 'fit-content';
      newInsert.style.fontSize = '1rem';
      newInsert.style.lineHeight = '1rem';
      const range = selectedNode.getRangeAt(0);
      range.deleteContents();
      range.insertNode(newInsert);
    }
  }
});

/////////////////////////////////////////////


// Temporarily commented out cuz the following code has no effect yet
//add "shift Z (undo/goback) function to the website"
// document.addEventListener('keydown', async function(evt) {
//   evt.stopImmediatePropagation()
//   if (
//     evt.code === 'KeyZ' &&
//     (evt.ctrlKey || evt.metaKey) &&
//     evt.shiftKey
//   ) {
//     // handle redo action
//   } else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
//     // handle undo action
//   }
// });

// window.addEventListener('keydown', function(evt) {
//   evt.stopImmediatePropagation();
//   if (evt.key === 'Z' && (evt.ctrlKey || evt.metaKey) && evt.shiftKey) {
//     // handle redo action
//   } else if (evt.key === 'Z' && (evt.ctrlKey || evt.metaKey)) {
//     // handle undo action
//   }
// });

const alignLeftBtn = document.getElementById("align-left-btn");
const alignCenterBtn = document.getElementById("align-center-btn");
const alignRightBtn = document.getElementById("align-right-btn");
const alignJustifyBtn = document.getElementById("align-justify-btn");
const textToAlign = document.querySelectorAll(".text-to-align");

alignLeftBtn.addEventListener("click", function() {
  textToAlign.forEach((text) => {
    text.style.textAlign = "left";
  });
});

alignCenterBtn.addEventListener("click", function() {
  textToAlign.forEach((text) => {
    text.style.textAlign = "center";
  });
});

alignRightBtn.addEventListener("click", function() {
  textToAlign.forEach((text) => {
    text.style.textAlign = "right";
  });
});

alignJustifyBtn.addEventListener("click", function() {
  textToAlign.forEach((text) => {
    text.style.textAlign = "justify";
  });
});






///////////////////////////camera////////////////////////////////
//   (() => {
//     // The width and height of the captured photo. We will set the
//     // width to the value defined here, but the height will be
//     // calculated based on the aspect ratio of the input stream.
  
//     const width = 320; // We will scale the photo width to this
//     let height = 0; // This will be computed based on the input stream
  
//     // |streaming| indicates whether or not we're currently streaming
//     // video from the camera. Obviously, we start at false.
  
//     let streaming = false;
  
//     // The various HTML elements we need to configure or control. These
//     // will be set by the startup() function.
  
//     let video = null;
//     let canvas = null;
//     let photo = null;
//     let startbutton = null;
  
//     function showViewLiveResultButton() {
//       if (window.self !== window.top) {
//         // Ensure that if our document is in a frame, we get the user
//         // to first open it in its own tab or window. Otherwise, it
//         // won't be able to request permission for camera access.
//         document.querySelector(".contentarea").remove();
//         const button = document.createElement("button");
//         button.textContent = "View live result of the example code above";
//         document.body.append(button);
//         button.addEventListener("click", () => window.open(location.href));
//         return true;
//       }
//       return false;
//     }
  
//     function startup() {
//       if (showViewLiveResultButton()) {
//         return;
//       }
//       video = document.getElementById("video");
//       canvas = document.getElementById("canvas");
//       photo = document.getElementById("photo");
//       startbutton = document.getElementById("startbutton");
  
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: false })
//         .then((stream) => {
//           video.srcObject = stream;
//           video.play();
//         })
//         .catch((err) => {
//           console.error(`An error occurred: ${err}`);
//         });
  
//       video.addEventListener(
//         "canplay",
//         (ev) => {
//           if (!streaming) {
//             height = video.videoHeight / (video.videoWidth / width);
  
//             // Firefox currently has a bug where the height can't be read from
//             // the video, so we will make assumptions if this happens.
  
//             if (isNaN(height)) {
//               height = width / (4 / 3);
//             }
  
//             video.setAttribute("width", width);
//             video.setAttribute("height", height);
//             canvas.setAttribute("width", width);
//             canvas.setAttribute("height", height);
//             streaming = true;
//           }
//         },
//         false
//       );
  
//       startbutton.addEventListener(
//         "click",
//         (ev) => {
//           takepicture();
//           ev.preventDefault();
//         },
//         false
//       );
  
//       clearphoto();
//     }
  
//     // Fill the photo with an indication that none has been
//     // captured.
  
//     function clearphoto() {
//       const context = canvas.getContext("2d");
//       context.fillStyle = "#AAA";
//       context.fillRect(0, 0, canvas.width, canvas.height);
  
//       const data = canvas.toDataURL("image/png");
//       photo.setAttribute("src", data);
//     }
  
//     // Capture a photo by fetching the current contents of the video
//     // and drawing it into a canvas, then converting that to a PNG
//     // format data URL. By drawing it on an offscreen canvas and then
//     // drawing that to the screen, we can change its size and/or apply
//     // other changes before drawing it.
  
//     function takepicture() {
//       const context = canvas.getContext("2d");
//       if (width && height) {
//         canvas.width = width;
//         canvas.height = height;
//         context.drawImage(video, 0, 0, width, height);
  
//         const data = canvas.toDataURL("image/png");
//         photo.setAttribute("src", data);
//       } else {
//         clearphoto();
//       }
//     }
  
//     // Set up our event listener to run the startup process
//     // once loading is complete.
//     window.addEventListener("load", startup, false);
//   })();
  

// const editableDiv = document.getElementById('editable-div');
// const imageInput = document.getElementById('image-input');

// editableDiv.addEventListener('paste', (event) => {
//   const items = (event.clipboardData || event.originalEvent.clipboardData).items;
//   let file = null;
  
//   for (const item of items) {
//     if (item.type.indexOf('image') === 0) {
//       file = item.getAsFile();
//       break;
//     }
//   }
  
//   if (file !== null) {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const imgElement = document.createElement('img');
//       imgElement.src = event.target.result;
//       editableDiv.appendChild(imgElement);
//     };
//     reader.readAsDataURL(file);
//   }
// });

// editableDiv.addEventListener('dragover', (event) => {
//   event.preventDefault();
// });

// editableDiv.addEventListener('drop', (event) => {
//   event.preventDefault();
//   const files = event.dataTransfer.files;
  
//   for (const file of files) {
//     if (file.type.indexOf('image') === 0) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const imgElement = document.createElement('img');
//         imgElement.src = event.target.result;
//         editableDiv.appendChild(imgElement);
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// });

// editableDiv.addEventListener('click', () => {
//   imageInput.click();
// });

// imageInput.addEventListener('change', () => {
//   const files = imageInput.files;
  
//   for (const file of files) {
//     if (file.type.indexOf('image') === 0) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const imgElement = document.createElement('img');
//         imgElement.src = event.target.result;
//         editableDiv.appendChild(imgElement);
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// });
