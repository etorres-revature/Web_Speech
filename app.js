//Web Speech API
//

//global variables to grab DOM elements
const mainEl = document.querySelector("main");
const voiceSelectEl = document.querySelector("#voices");
const textAreaEl = document.querySelector("#text-to-speech");
const readBtn = document.querySelector("#read-text");
const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector("#close-btn");

//hard coded objects for image and text to read with that image
const data = [
  {
    image: "./assets/img/drink.jpg",
    text: "I am thirsty",
  },
  {
    image: "./assets/img/food.jpg",
    text: "I am hungry",
  },
  {
    image: "./assets/img/tired.jpg",
    text: "I am tired",
  },
  {
    image: "./assets/img/hurt.jpg",
    text: "I am hurt",
  },
  {
    image: "./assets/img/happy.jpg",
    text: "I am happy",
  },
  {
    image: "./assets/img/angry.jpg",
    text: "I am angry",
  },
  {
    image: "./assets/img/sad.jpg",
    text: "I am sad",
  },
  {
    image: "./assets/img/scared.jpg",
    text: "I am scared",
  },
  {
    image: "./assets/img/outside.jpg",
    text: "I want to go outside",
  },
  {
    image: "./assets/img/home.jpg",
    text: "I want to go home",
  },
  {
    image: "./assets/img/school.jpg",
    text: "I want to go to school",
  },
  {
    image: "./assets/img/grandma.jpg",
    text: "I want to go to Grandma's",
  },
];

//running a for each on the data array
data.forEach(createBox);

//create boxes for image and text
function createBox(item) {
  //creating a variable to hold the created div html element
  const box = document.createElement("div");

  //deconstructing the item and pulling out the image and text into variables
  const { image, text } = item;

  //adding the box class to the new html element
  box.classList.add("box");
  //setting the innerHTML of the div in box variable to display the deconstructed image and text
  box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="box-info">${text}</p>
    `;

    //event listener for speak eventspeak event 
    box.addEventListener("click", () => {
      //running set text 
        setTextMessage(text);
        //running function to make computer talk!!!
        speakText();

        //add an active effect
        box.classList.add("active");
        //setTimeout to remove the active shadow form the selected box
        setTimeout(() => {
            box.classList.remove("active")
        }, 1200);
    })

    //appending the box variable onto the main container
    mainEl.appendChild(box);
}

//initialize speech synthesis utterance
const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

//populate select element in HTML with options from Speech Synthesis
function getVoices() {
  //setting variable voices to go into the speechSynthesis API and pull out the available voices
    voices = speechSynthesis.getVoices();

    //using forEach on voices to populate the options for the select
    voices.forEach(voice => {
      //setting the option HTML element into the variable named option
    const option = document.createElement("option");

    //pulling out the name value and setting it to the option value
    option.value = voice.name;
    //setting the option's innerText to be the name and teh language
    option.innerText = `${voice.name} ${voice.lang}`

    //putting the options into the select in the html
    voiceSelectEl.appendChild(option)
    })
}

//set text
function setTextMessage(text) {
  //setting the text of the message to synthesize
    message.text = text;
}

//speak the text
function speakText() {
  //making the computer speak!!
    speechSynthesis.speak(message);
}

//set foice to use to read text
function setVoice(e) {
  //setting new voice from selected option in html select
    message.voice = voices.find(voice => voice.name === e.target.value);
}

//voice is changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

//event listeners
//toggle text box
toggleBtn.addEventListener("click", ()=>{
  //putting the show class on the text box
    document.querySelector("#text-box").classList.toggle("show")
});
//close button on text box
closeBtn.addEventListener("click", ()=>{
  //removing the show class on the text box
    document.querySelector("#text-box").classList.remove("show")
});

//change voice from select
voiceSelectEl.addEventListener("change", setVoice);

//read text from text area
readBtn.addEventListener("click", () => {
  //running the function to set the message from the text box textarea
    setTextMessage(textAreaEl.value);
    //making the computer SPEAK!!
    speakText();
})

//running the funciton to populate the select with options in the html
getVoices();