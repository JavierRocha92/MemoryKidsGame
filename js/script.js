// Datos
const operators = [
  "suma",
  "resta",
  "producto",
  "division",
  "igual",
  "porcentaje",
];

const gameavatars = [
  "avatar1",
  "avatar2",
  "avatar3",
  "avatar4",
  "avatar5",
  "avatar6",
];

const foods = ["chicken", "burger", "hot-dog", "ice-cream", "pizza", "potatos"];

const flowers = ["daisy", "iris", "lavender", "rose", "sakura", "sunflower"];

const names = [
  "María",
  "Miguel",
  "Cristina",
  "Gloria",
  "Lucía",
  "Martina",
  "Sofía",
  "Paula",
  "Daniela",
  "Valeria",
  "Alba",
  "Julia",
  "Noa",
  "Hugo",
  "Daniel",
  "Martín",
  "Pablo",
  "Alejandro",
  "Lucas",
  "Álvaro",
  "Adrián",
  "Mateo",
  "David",
];

const configavatars = [
  "astronauta",
  "boy1",
  "boy2",
  "boy3",
  "boy4",
  "boy5",
  "farmer",
  "giraffe",
  "girl1",
  "girl3",
  "girl4",
  "girl5",
  "gril2",
  "happy1",
  "happy2",
  "officer",
  "pig",
  "vampire",
];
// -----------------------------------------------------------------------------------

// Nodos

// Header
const data = document.getElementById("data");
const data__name = document.getElementById("data__name");
const data__titlename = document.getElementById("data__titlename");
const data__img = document.getElementById("data__img");
// Config
const config = document.getElementById("config");

// Para los nombres
const configname = document.getElementById("configname");
const configname__input = document.getElementById("configname__input");
const configname__button = document.getElementById("configname__button");

// Para las imagenes
const configimage = document.getElementById("configimage");

// Para la configuración de las parejas
const configgames__foods = document.getElementById("configgames__foods");
const configgames__operations = document.getElementById("configgames__operations");
const configgames__container = document.getElementById("configgames__container");

// Juego
const game = document.getElementById("game");
const game__grid = document.getElementById("game__grid");
const finishgame = document.getElementById("finishgame");
const finishgame__button = document.getElementById("finishgame__button");

// -----------------------------------------------------------------------------------
// Variables

const select = configname.children[1]
let boardId = ''
const imagesGame = ['','','','','','','','','','','','']
let lastPosition = ''

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------

//FUNCTIONS
/**
 * function to create a element from tagName and className given as parameter
 * 
 * @param {string} tag 
 * @param {string} clas 
 * @returns HTMLELEMENT
 */
const createElement = (tag,clas) => {
  const element = document.createElement(tag)
  element.classList.add(clas)
  return element
}/**
 * function to create number of option and insert all into a element select from the DOM
 */
const loadSelect = () => {
  fragmentOption = document.createDocumentFragment()
  names.forEach(name => {
    const option = createElement('OPTION','configname__option')
    option.value = name
    option.name = name
    option.label = name
    fragmentOption.appendChild(option)
  });
  // console.log(fragmentOption.children)
  select.appendChild(fragmentOption)
}
/**
 * function to generate images from configavatars elements to build a path for each images
 * and inseert them into DOM
 */
const loadAvatars = () => {
  const parent = configimage.children[1]
  parent.appendChild(loadImages('configimage__img',configavatars,8,'configavatars'))
}
/**
 * function to create images and set src value based on parameters
 * 
 * @param {string} clas 
 * @param {Array} array 
 * @param {imt} number 
 * @param {string} folder 
 * @returns 
 */
const loadImages = (clas,array,number,folder) => {
  let newArray = [...array]
  fragmentImages = document.createDocumentFragment()
  for (let i = 0; i < number; i++) {
    const position = Math.floor(Math.random() * newArray.length)
    const image = createElement('IMG',clas)
    image.src = './assets/images/'+folder+'/'+
    newArray[position] +
    '.png'
    newArray.splice(position,1)
    fragmentImages.appendChild(image)
  }
  return fragmentImages
}
/**
 * function to fill elements from DOM with images created by calling function
 */
const loadBoards = () => {
  configgames__operations.appendChild(loadImages('configgames__imgoperators',
  operators,6,'operators'))
  configgames__foods.appendChild(loadImages('configgames__imgfoods',
  foods,6,'foods'))
}
/**
 * fucntion to load all elements to begin the configuration
 */
const loadElements = () => {
  //LOAD OPTION IN SELECT
  loadSelect()
  //LOAD AVATAR IMAGES
  loadAvatars()
  //LOAD BOARD GAME
  loadBoards()
}
/**
 * function to put name chosse by users into data__time to show to user
 * 
 * @param {string} name 
 */
const putName = (name) => {
  data.classList.remove('displaynone')
  data__titlename.classList.remove('displaynone')
  data__name.textContent = name
}
/**
 * function to load a typing name into select set it as value
 *  for select and calling fucntion putName()
 */
const loadName = () => {
  if(configname__button.previousElementSibling.value !== ''){
    putName(configname__button.previousElementSibling.value)
    const option = createElement('OPTION','configname__option')
    option.name = configname__button.previousElementSibling.value
    option.value = configname__button.previousElementSibling.value
    option.label = configname__button.previousElementSibling.value
    configname__button.previousElementSibling.value = ''
    select.prepend(option)
    select.value = option.value
  }
}
/**
 * function to set choseen avatar image by user and set its src into dats__img.src 
 * to show through screen
 * 
 * @param {event} event 
 */
const putAvatar = (event) => {
  const e = event.target
  if(e.tagName === 'IMG'){
    data.classList.remove('displaynone')
    data__img.classList.remove('displaynone')
    data__img.src = e.src
  }
}
/**
 * function to shaow animation as an error by give clas to element not selected in config
 * 
 * @returns boolena
 */
const elementSelected = () => {
  let choosen = true
  if(data__titlename.classList.contains('displaynone')){
    choosen = false
    configname.classList.add('configerror')
  }
  if(data__img.classList.contains('displaynone')){
    choosen = false
    configimage.classList.add('configerror')
  }
  return choosen
}
/**
 * fucntion to assign board elemtn choosen id into varible boardID
 * 
 * @param {event} event 
 */
const chooseBoard = (event) => {
  const e = event.target
  if(e.id === 'configgames__operations' || e.id === 'configgames__foods'){
    boardId = e.id
  }
  if(e.tagName === 'IMG'){
    boardId = e.parentElement.id
  }
  if(elementSelected()){
    startGame()
  }
}/**
function to create couple images into an array, this images are which are hidden behind the stars
 * 
 * @param {Array} elements 
 */
const loadImageArray = (elements) => {
  let images = []
  let folder = ''
  // let count = 0
  if(boardId == 'configgames__operations'){
    images = [...operators]
    folder = 'operators'
  }else{
    images = [...foods]
    folder = 'foods'
  }
  for (let j = 0; j < images.length; j++) {
    for (let i = 0; i < 2; i++) {
      let position = ''
      do{
        position = Math.floor(Math.random() * imagesGame.length)
      }while(imagesGame[position] != '')
      const hiddenImage = createElement('IMG','game__img')
      hiddenImage.src = './assets/images/'+folder+'/'+images[j]+'.png'
      imagesGame[position] = (hiddenImage)
    }
    
  }
  console.log('estos son los iamgenes aleatorias')
  Array.from(imagesGame).forEach(element => {
  
    console.log(element)
  });
}
/**
 * function to calling function to genreate couples card depending of images user chose
 */
const generateBoard = () => {
  let images = []
  if(boardId == 'configgames__operations'){
    loadImageArray(operators)
  }else{
    loadImageArray(foods)
  }

}
/**
 * function to emulate game start an calling function to create any necesary elements and to generate
 * screen change
 */
const startGame = () => {
  config.classList.add('config__hide')
  game.classList.add('game__show')
  generateBoard()
}
/**
 * funciton to give new src to an image given as parameter form source array iamgesGame
 * 
 * @param {HTMLImageElement} image 
 */
const showCard = (image) =>{
  let altStar = image.alt
  for (let i = 0; i < Array.from(imagesGame).length; i++) {
    if(i == altStar){
      image.src = Array.from(imagesGame)[i].src
    }
  }
  imagesGame.forEach(element => {
   
  });
  
}
/**
 * function to check if the card clicked is the first of a couple or not
 * 
 * @returns boolean
 */
const isFirst = () => {
  count = 0
  Array.from(game__grid.children).forEach(element => {
    if(element.getAttribute('src') == "./assets/images/estrella.png")
      count++
  });
  return count %2 != 0
}
/**
 * function to check is two cards clicked are the same or not
 * @param {int} lastPosition 
 * @param {int} position 
 * @returns boolean
 */
const checkCouple = (lastPosition,position) => {
  if(position == ''){
    return true
  }
  return (lastPosition.src == position.src)
}
/**
 * function to give star image src to elements given as parameters
 * 
 * @param {int} lastPosition 
 * @param {int} position 
 */
const hideCard = (lastPosition,position) =>{
  lastPosition.src = "./assets/images/estrella.png"
  position.src  = "./assets/images/estrella.png"
}
/**
 * function to check if all elements from grid__game have the same source
 * 
 * @returns boolean
 */
const checkGame = () => {
  let all = true
  Array.from(game__grid.children).forEach(element => {
    if(element.getAttribute('src') == "./assets/images/estrella.png"){
      all = false
    }
  });
  return all
}
/**
 * function to calling other function to show card and checking is couple matches
 * 
 * @param {event} event 
 */
const flipCard = (event) =>{
  let postion = ''
  let e = event.target
  if(e.tagName === 'IMG'){
    showCard(e)
    if(isFirst(e)){
      lastPosition = e
    }else{
      postion = e
    }
    if(!checkCouple(lastPosition,postion)){
      setTimeout(() => {
        hideCard(lastPosition,postion)
      },500)
      
      
    }
    if(checkGame()){
      finishgame.classList.add('finishgame__show')
    }
  }
}
//load elements when page start

document.addEventListener('DOMContentLoaded',loadElements())

select.addEventListener('change',() => {
  console.log('entra en la funcion')
  putName(select.value)
})
configname__button.addEventListener('click',loadName)
configimage.addEventListener('click',putAvatar)
configgames__container.addEventListener('click',chooseBoard)
//EVETNS FROM THE GAME
game__grid.addEventListener('click',flipCard)
finishgame__button.addEventListener('click',() => {
  location.reload()
})
// Para resetear las animaciones
configname.addEventListener("animationend", () => {
  configname.classList.remove("configerror");
});
configimage.addEventListener("animationend", () => {
  configimage.classList.remove("configerror");
});


