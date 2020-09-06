//global variables to grab DOM elements
const mainEl = document.querySelector("main");
const voiceSelectEl = document.querySelector("#voices");
const textAreaEl = document.querySelector("#text-to-speech");
const readBtn = document.querySelector("#read-text");
const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector("#close-btn");

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

data.forEach(createBox);

//create boxes for image and text
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="box-info">${text}</p>
    `;

    //TODO -- speak event 

    mainEl.appendChild(box);
}

//store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`

    voiceSelectEl.appendChild(option)
    })
}

//voice is changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

//event listeners
//toggle text box
toggleBtn.addEventListener("click", ()=>{
    document.querySelector("#text-box").classList.toggle("show")
});
//close button on text box
closeBtn.addEventListener("click", ()=>{
    document.querySelector("#text-box").classList.remove("show")
});

getVoices();