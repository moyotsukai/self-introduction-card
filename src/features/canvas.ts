const imageSize = 600

type Vec2 = {
  x: number,
  y: number
}

type ItemPosition = Vec2 & {
  align: "left" | "right"
}

const itemPositions: ItemPosition[] = [
  { x: 50, y: 80, align: "left" },
  { x: 1280, y: 650, align: "left" },
  { x: 620, y: 490, align: "right" },
  { x: 1200, y: 250, align: "left" },
  { x: 80, y: 940, align: "left" },
  { x: 1810, y: 900, align: "right" },
  { x: 800, y: 120, align: "left" },
  { x: 220, y: 670, align: "left" },
  { x: 1770, y: 380, align: "right" },
  { x: 700, y: 200, align: "right" },
  { x: 1850, y: 65, align: "right" },
  { x: 1200, y: 810, align: "left" },
  { x: 110, y: 300, align: "left" },
  { x: 720, y: 780, align: "right" },
  { x: 1330, y: 500, align: "left" },
  { x: 1260, y: 155, align: "left" },
  { x: 30, y: 400, align: "left" },
  { x: 970, y: 980, align: "left" },
  { x: 490, y: 580, align: "right" },
  { x: 550, y: 30, align: "left" },
  { x: 1890, y: 750, align: "right" },
  { x: 900, y: 980, align: "right" },
  { x: 960, y: 30, align: "left" },
  { x: 20, y: 850, align: "left" },
  { x: 1880, y: 590, align: "right" },
  { x: 1910, y: 290, align: "right" },
  { x: 10, y: 180, align: "left" },
  { x: 1700, y: 990, align: "right" },
  { x: 740, y: 880, align: "right" },
  { x: 660, y: 390, align: "right" }
]

export const drawGradation = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d")
  if (!context) { return }
  let lineargradient = context.createLinearGradient(0, canvas.height + 200, canvas.width - 400, 0)
  let lineargradient2 = context.createLinearGradient(0, -400, canvas.width, canvas.height + 200)
  lineargradient.addColorStop(0, '#0066ff')
  lineargradient.addColorStop(1, '#00f2ff')
  lineargradient2.addColorStop(0, 'rgba(255,255,255,0)')
  lineargradient2.addColorStop(1, '#ffd000')
  drawUselessText(canvas)
  context.fillStyle = lineargradient
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = lineargradient2
  context.fillRect(0, 0, canvas.width, canvas.height)
}

const drawUselessText = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d")
  if (!context) { return }
  context.font = "50px NotoSansJPBold"
  context.fillStyle = "rgb(0, 0, 0, 0)"
  context.fillText("", 0, 0)
}

export const drawImageFrame = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d")
  if (!context) { return }
  context.lineWidth = 10
  context.strokeStyle = "#fff"
  context.stroke()
  context.ellipse(canvas.width / 2, canvas.height / 2, imageSize / 2, imageSize / 2, 0, 0, Math.PI * 2)
}


export const drawImage = ({ canvas, file }: { canvas: HTMLCanvasElement, file: File }) => {
  const context = canvas.getContext("2d")
  if (!context) { return }
  const objectURL = URL.createObjectURL(file)
  context.save()
  context.beginPath()
  context.arc(canvas.width / 2, canvas.height / 2, imageSize / 2, 0, Math.PI * 2)
  context.clip()
  const image = new Image()
  image.src = objectURL
  image.onload = () => {
    context.beginPath()
    if (image.height > image.width) {
      const width = imageSize
      const height = image.height * imageSize / image.width
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height)
    } else {
      const width = image.width * imageSize / image.height
      const height = imageSize
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height)
    }
    context.restore()
  }
}

export const drawName = ({ canvas, name }: { canvas: HTMLCanvasElement, name: string }) => {
  const context = canvas.getContext("2d")
  if (!context) { return }
  context.font = "65px NotoSansJPBold"
  const textWidth = context.measureText(name).width + 50
  context.fillStyle = '#000'
  const namePosition: Vec2 = { x: canvas.width / 2, y: canvas.height / 2 + imageSize / 2 + 90 }
  createRoundRectPath(canvas, namePosition.x - textWidth / 2, namePosition.y - 70, textWidth, 90, 25)
  context.fill()
  context.textAlign = "center"
  context.fillStyle = "#fff"
  context.fillText(name, namePosition.x, namePosition.y)
}

export const drawItem = ({ canvas, item, index }: { canvas: HTMLCanvasElement, item: string, index: number }) => {
  const context = canvas.getContext("2d")
  if (!context) { return }
  context.font = "50px NotoSansJPBold"
  const textWidth = context.measureText(item).width + 50
  context.fillStyle = 'rgba(255, 255, 255, 0.8)'
  const position = itemPositions[index % itemPositions.length]
  if (position.align === "left") {
    createRoundRectPath(canvas, position.x, position.y, textWidth, 80, 25)
    context.fill()
    context.textAlign = "left"
    context.fillStyle = "#3381ff"
    context.fillText(item, position.x + 25, position.y + 58)
  } else {
    createRoundRectPath(canvas, position.x - textWidth, position.y, textWidth, 80, 25)
    context.fill()
    context.textAlign = "right"
    context.fillStyle = "#3381ff"
    context.fillText(item, position.x - 25, position.y + 58)
  }
}

const createRoundRectPath = (canvas: HTMLCanvasElement, x: number, y: number, w: number, h: number, r: number) => {
  const context = canvas.getContext("2d")
  if (!canvas || !context) { return }
  context.beginPath()
  context.moveTo(x + r, y)
  context.lineTo(x + w - r, y)
  context.arc(x + w - r, y + r, r, Math.PI * (3 / 2), 0, false)
  context.lineTo(x + w, y + h - r)
  context.arc(x + w - r, y + h - r, r, 0, Math.PI * (1 / 2), false)
  context.lineTo(x + r, y + h)
  context.arc(x + r, y + h - r, r, Math.PI * (1 / 2), Math.PI, false)
  context.lineTo(x, y + r)
  context.arc(x + r, y + r, r, Math.PI, Math.PI * (3 / 2), false)
  context.closePath()
}