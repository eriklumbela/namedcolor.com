function createColorListItem(color){
  const colorlist = document.getElementById('colorList')
  const listItem = document.createElement('li')
  const svgLink = document.createElement('a')
  const htmlLink = document.createElement('a')

  const colorFormatWithSpace = formatColorString(color, ' ')
  const colorFormatWithDash = formatColorString(color, '-')

  svgLink.href = `/svgs/${colorFormatWithDash}.svg`
  svgLink.innerText = `svg`
  svgLink.setAttribute('target', '_blank')
  htmlLink.href = `/htmls/${colorFormatWithDash}.html`
  htmlLink.innerText = `html`
  htmlLink.setAttribute('target', '_blank')

  listItem.innerHTML = `${colorFormatWithSpace} (`
  listItem.append(svgLink)
  listItem.append('/')
  listItem.append(htmlLink)
  listItem.append(')')

  colorlist.append(listItem)
}

function formatColorString(color, separator){
  return color.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase()
}


function createAllColorListItems(){
  Object.entries(CSS_COLOR_NAMES).forEach(color => {
    createColorListItem(color[0])
  });
}

createAllColorListItems()
