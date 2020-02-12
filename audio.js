// analyser Global Variables -----------------------
let analyser
let frequencyArray
// Canvas Global Variables -------------------------
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const centerX = 300 / 2
const centerY = 300 / 2
const radius = 300 / 2

// Load Audio 
function startAudio() {
  const audio = new Audio()
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  // Audio File
  audio.src = 'bird-whistling-a.wav'
  // analyser ----------------------------------
  analyser = audioContext.createAnalyser()
  const source = audioContext.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioContext.destination)
  frequencyArray = new Uint8Array(analyser.frequencyBinCount)
  // --------------------------------------------

  audio.play()
}

// Play Button -----------------------------------
const playButton = document.getElementById('play-button')
playButton.addEventListener('click', (e) => {
  startAudio()
  render()
})

//  Rendering Audio -------------------------------
// Process: clear canvas, get array of frequency values from analyser, draw shape influenced by frequency
function render() {
  // Clears canvas and creates circle in center 
  ctx.clearRect(0, 0, 300, 300)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = 'red'
  ctx.stroke()
  // -----------------------------------------------
  const bars = 200
  const step = Math.PI * 2 / bars

  // Get array of frequency values
  analyser.getByteFrequencyData(frequencyArray)

  // Draw shape influenced by frequency
  frequencyArray.forEach((f, i) => {
    const barLength = frequencyArray[i] * 0.5
    const x1 = (Math.cos(step * i) * radius) + centerX
    const y1 = (Math.sin(step * i) * radius) + centerY
    const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
    const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
  })

  ctx.stroke()
  // ---------------------------------------

  requestAnimationFrame(render)

}