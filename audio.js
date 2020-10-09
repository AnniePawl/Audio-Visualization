// Button Global Variables
let started = false
let playing = false
let audio
// Analyser Global Variables -----------------------
let analyser
let frequencyArray
// Canvas Global Variables -------------------------
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const centerX = 300 / 2
const centerY = 300 / 2
const radius = 50

// Load Audio 
function startAudio(audioFile) {
  if (!started && !playing) {

    started = true
    playing = true

    audio = new Audio()
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    // Audio File
    audio.src = audioFile
    // analyser ----------------------------------
    analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    frequencyArray = new Uint8Array(analyser.frequencyBinCount)

    // --------------------------------------------

    audio.play()
    render()
  }

  else if (playing) {
    playing = false
    audio.pause()
  }

  else {
    playing = true
    audio.play()
  }
}

// Play Button (Classical)-----------------------------------
const playButton = document.getElementById('play-button')
playButton.addEventListener('click', (e) => {
  playButton.innerHTML = !playing ? 'pause' : 'classical'
  startAudio('./sound-files/new-dawn.mp3')
})
// Play Button2 -----------------------------------
const playButton2 = document.getElementById('play-button2')
playButton2.addEventListener('click', (e) => {
  startAudio('./sound-files/jazzå.mp3')
})
// Play Button3 -----------------------------------
const playButton3 = document.getElementById('play-button3')
playButton3.addEventListener('click', (e) => {
  startAudio('bird-whistling-a.wav')
})
// Play Button4 -----------------------------------
const playButton4 = document.getElementById('play-button4')
playButton4.addEventListener('click', (e) => {
  startAudio('bird-whistling-a.wav')
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
    const barLength = frequencyArray[i] / 255 * 500
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