function changeTitle(color){
  color = color.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
  document.title = color
}

function changeBackground(color){
  let namedColor = document.getElementsByClassName('namedColor')[0]
  namedColor.style.background = color;
}

function getRandomColor(){
  const colors = Object.entries(CSS_COLOR_NAMES)
  return colors[Math.floor(Math.random()*colors.length)][0];
}
function generateFavicon(color) {
  // set up a little favicon-sized canvas and fill it with the chosen color
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 16;
  const context = canvas.getContext("2d");
  context.fillStyle = color;
  context.fillRect(0, 0, 16, 16);
  // get a base64 image URL from the canvas content
  const imageUrl = canvas.toDataURL();
  
  // remove existing favicon links
  // document.querySelectorAll("[rel~='icon']").forEach(el=>el.remove())
  
  // create a new one
  const link = document.createElement("link");
  link.setAttribute("rel", "icon");
  document.querySelector("head").appendChild(link);

  link.type = "image/x-icon";
  // point the favicon link at the generated URL
  link.href=imageUrl;
};

function setPage(){
  const color = getRandomColor()
  generateFavicon(color)
  changeBackground(color) 
  changeTitle(color) 
}

window.addEventListener("load", () => setPage());
setInterval(setPage, 8000)