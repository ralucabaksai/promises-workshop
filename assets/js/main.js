const textInputElement = document.querySelector('[name="text"]'); // input containing text to be displayed
const delayInputElement = document.querySelector('[name="delay"]'); // input containing delay time in seconds between text displays
const startRenderButtonElement = document.querySelector(".start-render"); // button for triggering rendering
const renderTypeRadioElements = document.querySelectorAll(
  '[name="render-type"]'
); // array of radio inputs containing the type of render
const paragraphListElement = document.querySelector(".paragraph-list"); // container for appending rendered paragraphs

// First thing to do is to listen for startRenderButtonElement clicks
// And call renderByType when a click event occurs, with the required parameters

// NOTE: feel free to add more utility functions
startRenderButtonElement.addEventListener("click", doRender);
function doRender() {
  let renderType = "";
  for (let i = 0; i < renderTypeRadioElements.length; i++) {
    if (renderTypeRadioElements[i].checked === true) {
      renderType = renderTypeRadioElements[i].value;
    }
  }
  renderByType(renderType, textInputElement.value, delayInputElement.value);
}

/**
 * Contains logic for running different render types based on the renderType param
 * Can be ran using callbacks, for loop or promises
 * @param renderType Type of rendering to be executed, can be callBacks, forLoop or promises
 * @param delay Delay time in seconds
 *
 */
function renderByType(renderType, text, delay) {
  if (renderType === "callBacks") {
    runCallBacks(text, delay);
  } else if (renderType === "forLoop") {
    runForLoop(text, delay);
  } else runPromises(text, delay);
}

/**
 * Creates a new paragraph and appends it to the paragraphListElement
 * @param text Content of the paragragh
 */
function addParagraph(text) {
  const para = document.createElement("p");
  para.innerHTML = text;
  paragraphListElement.appendChild(para);
}

/**
 * Displays 4 paragraphs at a delay interval using callbacks
 * @param text Text to be shown at delay interval
 * @param delay Delay time in seconds
 */
function runCallBacks(text, delay) {
  setTimeout(function () {
    addParagraph(text);
    setTimeout(function () {
      addParagraph(text);
      setTimeout(function () {
        addParagraph(text);
        setTimeout(function () {
          addParagraph(text);
        }, delay * 1000);
      }, delay * 1000);
    }, delay * 1000);
  }, delay * 1000);
}

/**
 * Displays 4 paragraphs at a delay interval using for loop
 * @param text Text to be shown at delay interval
 * @param delay Delay time in seconds
 */
function runForLoop(text, delay) {
  for (let i = 0; i < 4; i++) {
    setTimeout(function () {
      addParagraph(text);
      console.log(delay * 1000 * (i + 1));
    }, delay * 1000 * i);
  }
}

/**
 * Displays 4 paragraphs at a delay interval using promises
 * @param text Text to be shown at delay interval
 * @param delay Delay time in seconds
 */
function runPromises(text, delay) {
  setDelay(delay)
    .then(function () {
      addParagraph(text);
      return setDelay(delay);
    })
    .then(function () {
      addParagraph(text);
      return setDelay(delay);
    })
    .then(function () {
      addParagraph(text);
      return setDelay(delay);
    })
    .then(function () {
      addParagraph(text);
      return setDelay(delay);
    });
}
function setDelay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time * 1000);
  });
}
// NOTE: You can also start with the addParagraph function implementation followed by runCallBacks, runForLoop and runPromises
// And you can test it by calling the function with some given parameters
// Uncomment below functions calls to test if the function works

// addParagraph('Lorem ipsum dolor sit.') // should result in having a new paragraph in the paragraphListElement container
// runCallBacks('Lorem ipsum dolor sit.', 1); // should display given text 4 times with 1 second delay between displays
// runForLoop('Lorem ipsum dolor sit.', 1); // should display given text 4 times with 1 second delay between displays
// runPromises('Lorem ipsum dolor sit.', 1); // should display given text 4 times with 1 second delay between displays
