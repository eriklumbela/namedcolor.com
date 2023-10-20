function changeTitle(color){
  color = color.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
  document.title = color
}

function changeBackground(color){
  let body = document.getElementById('body')
  body.style.background = color
}

function randomColorList(){
  let colorArray = CSS_COLOR_NAMES
  for (let i = colorArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colorArray[i], colorArray[j]] = [colorArray[j], colorArray[i]];
  }
  window.localStorage.setItem('colorList', JSON.stringify(colorArray))
}

randomColorList()

function generateFavicon(color) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 16;
  const context = canvas.getContext("2d");
  context.fillStyle = color;
  context.fillRect(0, 0, 16, 16);
  const imageUrl = canvas.toDataURL();
  
  const link = document.createElement("link");
  link.setAttribute("rel", "icon");
  document.querySelector("head").appendChild(link);

  link.type = "image/x-icon";
  link.href=imageUrl;
};

function addColorToLocalStorageColorList(color){
  window.localStorage.setItem('currentColor', color)
}

function setColorName(color){
  color = color.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
  document.getElementById('color-name').innerText = color
}

function htmlColorChanges(color){
  generateFavicon(color)
  changeBackground(color) 
  changeTitle(color) 
  setColorName(color)
}

function setDownloadHref(color, type){
  download = document.getElementById(`${type}-download`)
  color = color.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  download.setAttribute('href', `/${type}s/${color}.${type}`)
}

function setDownloadHrefs(color){
  setDownloadHref(color, 'svg')
  setDownloadHref(color, 'html')
}

function setColor(color){
  addColorToLocalStorageColorList(color)
  htmlColorChanges(color)
  setDownloadHrefs(color)
}

function backForward(direction){
  const currentColor = window.localStorage.getItem('currentColor')
  const colorList = JSON.parse(window.localStorage.getItem('colorList'))

  let currentColorIndex = colorList.indexOf(currentColor)
  let color
  if (direction == 'back'){
    currentColorIndex--
    if (currentColorIndex == -1){
      currentColorIndex = colorList.length-1
    }
  } else {
    currentColorIndex++
    if (currentColorIndex == (colorList.length)){
      currentColorIndex = 0
    }
  }
  color = colorList[currentColorIndex]
  setColor(color)

  if(!paused()) resetTimer()
}

function back(){
  backForward('back')
}

function forward(){
  backForward()
}


function setRandomColor(){
  randomColorList()
  const color = JSON.parse(window.localStorage.getItem('colorList'))[0]
  setColor(color)
}

const interval = 8000

setRandomColor()
let intervalId = setInterval(forward, interval)

function resetTimer(){
  clearInterval(intervalId)
  intervalId = setInterval(forward, interval)
}

const backLink = document.getElementById('back');
backLink.addEventListener('click', function (){
  back()
})

const forwardLink = document.getElementById('forward');
forwardLink.addEventListener('click', function (){
  forward()
})

function paused(){
  return body.classList.contains('paused')
}

const playPause = document.getElementById('play-pause');
playPause.addEventListener('click', function (){
  body.classList.toggle('paused')
  if (paused()) {
    clearInterval(intervalId)
  } else {
    resetTimer()
  }
})

const refresh = document.getElementById('refresh')
refresh.addEventListener('click', function(){
  setRandomColor()
})

const observer = new MutationObserver(() => {
  if (paused()) {
    playPause.innerText = '▶︎'
  } else {
    playPause.innerText = '||'
  }
})

observer.observe(body, {attributes: true})