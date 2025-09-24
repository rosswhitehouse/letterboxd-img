const canvasEl = document.getElementById('canvas')
const canvas = canvasEl.getContext('2d')
const defaultCanvasHeight = document.getElementById('canvas').height

function setCanvas(height = defaultCanvasHeight) {
    canvasEl.height = height
    canvas.textAlign = 'center'
    canvas.font = 'bold 16px Tahoma, Helvetica, sans-serif'
    canvas.fillStyle = 'white'
}

function updateCanvas(event) {
    event.preventDefault()
    canvas.clearRect(0, 0, 300, 500)

    // Title
    canvas.textAlign = 'center'
    canvas.font = 'bold 16px Tahoma, Helvetica, sans-serif'
    canvas.fillStyle = 'white'
    const string =  document.getElementById('name').value
    const strLen = string.length
    let strLines = []
    let newLine = ''
    if (strLen <= 35) {
        setCanvas()
        canvas.fillText(document.getElementById('name').value, 150, 430)
    } else {
        string.split(' ').forEach(word => {
            // if it would be too long, start a new line
            if ((newLine.length + word.length + 1) > 35) {
                strLines.push(newLine)
                newLine = word
            } else {
                newLine === '' ? newLine += word : newLine += ' ' + word
            }
        })
        strLines.push(newLine)
        setCanvas(defaultCanvasHeight + (8 * strLines.length))
        strLines.forEach((line, i) => {
            canvas.fillText(line, 150, 430 + (i*16))
        })
    }

    // Image
    const img = new Image(200, 300)
    img.src = document.getElementById('img').value
    img.onload = function() {
        canvas.drawImage(img, 25, 0, 250, 400)
    }

    // Stars
    const stars = '⭐️'.repeat(parseInt(document.getElementById('rating').value))
    const top = !strLines.length ? 460 : 460 + ((strLines.length - 1) * 16)
    canvas.fillText(stars, 150, top)

    if (!!document.getElementById('img').value && !!string) {
        const canvasUrl = canvasEl.toDataURL()
        const button = document.querySelector('a.download')
        button.href = canvasUrl
        button.download = 'letterboxd_img'
        button.classList.remove('disabled')
    }
}

function prefillCanvas(event) {
    event.preventDefault()
    document.getElementById('name').value = 'Spirited Away'
    document.getElementById('rating').value = 4
    document.getElementById('img').value = 'https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_.jpgmazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_.jpg'
}

document.querySelector('button.generate').addEventListener('click', updateCanvas)
document.querySelector('button.demo').addEventListener('click', prefillCanvas)