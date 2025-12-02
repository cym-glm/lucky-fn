import { rgba } from '@/utils/color'

export function useElementStyle(element, person, index, patternList, patternColor, cardColor, cardSize, textSize, mod = 'default', type = 'add') {
  if (patternList.includes(index + 1) && mod === 'default') {
    element.style.backgroundColor = rgba(patternColor, Math.random() * 0.2 + 0.8)
  }
  else if (mod === 'sphere' || mod === 'default') {
    element.style.backgroundColor = rgba(cardColor, Math.random() * 0.5 + 0.25)
  }
  else if (mod === 'lucky') {
    element.style.backgroundColor = rgba(cardColor, 0.8)
  }
  element.style.border = `1px solid ${rgba(cardColor, 0.25)}`
  element.style.boxShadow = `0 0 12px ${rgba(cardColor, 0.5)}`
  element.style.width = `${cardSize.width}px`
  element.style.height = `${cardSize.height}px`
  element.className = mod === 'lucky' ? 'lucky-element-card' : 'element-card'
  if (type === 'add') {
    element.addEventListener('mouseenter', (ev) => {
      const target = ev.target
      target.style.border = `1px solid ${rgba(cardColor, 0.75)}`
      target.style.boxShadow = `0 0 12px ${rgba(cardColor, 0.75)}`
    })
    element.addEventListener('mouseleave', (ev) => {
      const target = ev.target
      target.style.border = `1px solid ${rgba(cardColor, 0.25)}`
      target.style.boxShadow = `0 0 12px ${rgba(cardColor, 0.5)}`
    })
  }
  element.children[0].style.fontSize = `${textSize * 0.5}px`
  if (person.uid) element.children[0].textContent = person.uid
  element.children[1].style.fontSize = `${textSize}px`
  element.children[1].style.lineHeight = `${textSize * 3}px`
  element.children[1].style.textShadow = `0 0 12px ${rgba(cardColor, 0.95)}`
  if (person.name) element.children[1].textContent = person.name
  element.children[2].style.fontSize = `${textSize * 0.5}px`
  if (person.department || person.identity) {
    element.children[2].innerHTML = `${person.department ? person.department : ''}<br/>${person.identity ? person.identity : ''}`
  }
  element.children[2].style.fontSize = textSize * 0.5 + 'px'
  if (person.department || person.identity) {
    element.children[2].innerHTML = `${person.department ? person.department : ''}<br/>${person.identity ? person.identity : ''}`
  }
  element.children[3].src = person.avatar
  return element
}

export function useElementPosition(element, count, totalCount, cardSize, windowSize, cardIndex) {
  let xTable = 0
  let yTable = 0
  const centerPosition = { x: 0, y: windowSize.height / 2 - cardSize.height / 2 }
  const specialPosition = [2, 4, 7, 9]
  if (!specialPosition.includes(totalCount) || (totalCount > 5 && cardIndex < 5)) {
    const index = cardIndex % 5
    if (index === 0) {
      xTable = centerPosition.x
      yTable = centerPosition.y - Math.floor(cardIndex / 5) * (cardSize.height + 60)
    }
    else {
      xTable = index % 2 === 0 ? Math.ceil(index / 2) * (cardSize.width + 100) : -Math.ceil(index / 2) * (cardSize.width + 100)
      yTable = centerPosition.y - Math.floor(cardIndex / 5) * (cardSize.height + 60)
    }
  }
  else {
    const index = cardIndex % 5
    if (index === 0) {
      xTable = centerPosition.x + (cardSize.width + 100) / 2
      yTable = centerPosition.y - Math.floor(cardIndex / 5) * (cardSize.height + 60)
    }
    else {
      xTable = index % 2 === 0 ? Math.ceil(index / 2) * (cardSize.width + 100) + (cardSize.width + 100) / 2 : -(Math.ceil(index / 2) * (cardSize.width + 100)) + (cardSize.width + 100) / 2
      yTable = centerPosition.y - Math.floor(cardIndex / 5) * (cardSize.height + 60)
    }
  }
  return { xTable, yTable }
}
