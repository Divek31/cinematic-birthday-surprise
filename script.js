// --- Navigation Logic ---
function transitionTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    target.classList.add('active');

    if (pageId === 'curtain-page') {
        setTimeout(() => {
            document.getElementById('stage').classList.add('open');
            startSparkles('message-card');
        }, 1000);
    }
    if (pageId === 'gallery-page') {
        startGalleryEffects();
    }
}

// --- Heart Particles (Shared) ---
function createHeart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const heart = document.createElement('div');
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-10vh';
    heart.style.color = 'var(--accent)';
    heart.innerHTML = '❤️';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animation = `floatHeart ${Math.random() * 3 + 3}s linear forwards`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

setInterval(() => createHeart('particle-container'), 300);
setInterval(() => createHeart('slider-particles'), 400);

// --- Slider Logic ---
function nextStep(step) {
    document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    document.getElementById(`dot-${step}`).classList.add('active');
}

function finishSlider() {
    transitionTo('celebration-page');
}

// --- Celebration Flow ---
let celebStep = 1;
function celebFlow() {
    const btn = document.getElementById('celeb-master-btn');
    const hint = document.getElementById('celeb-hint');
    const page = document.getElementById('celebration-page');
    const lights = document.getElementById('fairy-lights-container');

    if (celebStep === 1) {
        page.classList.add('bright');
        lights.style.opacity = '1';
        hint.innerText = "Music makes it better...";
        btn.innerText = "🎵 Play Music";
        celebStep = 2;
    } else if (celebStep === 2) {
        const audio = document.getElementById('birthday-audio');
        audio.play().catch(() => { });
        hint.innerText = "Let the colors fly!";
        btn.innerText = "🎈 Fly Balloons";
        celebStep = 3;
    } else if (celebStep === 3) {
        spawnBalloons(document.body);
        hint.innerText = "Almost there...";
        btn.innerText = "✨ Bring the Cake";
        celebStep = 4;
    } else {
        transitionTo('cake-page');
        startCandleBlow();
    }
}

// --- Realistic Balloons Logic ---
function spawnBalloons(targetContainer) {
    const colorGradients = [
        ['#ff2d55', '#800020'], ['#74b9ff', '#0984e3'],
        ['#55efc4', '#00b894'], ['#ffeaa7', '#fdcb6e'],
        ['#a29bfe', '#6c5ce7'], ['#ff9ff3', '#f368e0']
    ];

    const interval = setInterval(() => {
        const b = document.createElement('div');
        const shine = document.createElement('div');
        b.classList.add('balloon');
        shine.classList.add('balloon-shine');
        const gradient = colorGradients[Math.floor(Math.random() * colorGradients.length)];
        b.style.left = Math.random() * 95 + 'vw';
        b.style.background = `radial-gradient(circle at 70% 30%, ${gradient[0]}, ${gradient[1]})`;
        b.style.boxShadow = `inset -10px -10px 20px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)`;
        b.appendChild(shine);
        targetContainer.appendChild(b);
        setTimeout(() => b.remove(), 8000);
    }, 400);
    setTimeout(() => clearInterval(interval), 6000);
}

// --- Gallery Special Effects ---
function startGalleryEffects() {
    const container = document.getElementById('gallery-bg-elements');
    // Spawn continuous balloons in background of gallery
    setInterval(() => {
        if (document.getElementById('gallery-page').classList.contains('active')) {
            spawnBalloons(container);
        }
    }, 8000);

    // Random sparkles in gallery
    setInterval(() => {
        if (document.getElementById('gallery-page').classList.contains('active')) {
            const s = document.createElement('div');
            s.classList.add('gallery-sparkle');
            s.style.width = s.style.height = (Math.random() * 6 + 2) + 'px';
            s.style.top = Math.random() * 100 + '%';
            s.style.left = Math.random() * 100 + '%';
            container.appendChild(s);
            setTimeout(() => s.remove(), 2000);
        }
    }, 200);
}

function startSparkles(targetId) {
    const card = document.getElementById(targetId);
    setInterval(() => {
        const s = document.createElement('div');
        s.classList.add('sparkle-particle');
        s.style.width = s.style.height = (Math.random() * 4 + 2) + 'px';
        s.style.top = Math.random() * 100 + '%';
        s.style.left = Math.random() * 100 + '%';
        card.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    }, 50);
}

function initFairyLights() {
    const container = document.getElementById('fairy-lights-container');
    const path = document.getElementById('wire-path');
    const pathLength = path.getTotalLength();
    const bulbCount = 25;
    for (let i = 0; i <= bulbCount; i++) {
        const distance = (i / bulbCount) * pathLength;
        const point = path.getPointAtLength(distance);
        const bulb = document.createElement('div');
        bulb.classList.add('bulb-teardrop');
        bulb.style.left = `${(point.x / 1000) * 100}%`;
        bulb.style.top = `${point.y}px`;
        bulb.style.setProperty('--d', `${0.5 + Math.random() * 2}s`);
        container.appendChild(bulb);
    }
}

window.onload = () => {
    initFairyLights();
};

// --- MUSIC PLAYER LOGIC ---
let isMusicPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('birthday-audio');
    const btn = document.getElementById('music-toggle-btn');
    if (!audio) return;
    
    if (isMusicPlaying) {
        audio.pause();
        btn.innerText = "🔇";
        isMusicPlaying = false;
    } else {
        audio.play().catch(() => {});
        btn.innerText = "🔊";
        isMusicPlaying = true;
    }
}

// Hook into existing audio play in celebFlow to sync icons
const audioEl = document.getElementById('birthday-audio');
if (audioEl) {
    audioEl.addEventListener('play', () => {
        const btn = document.getElementById('music-toggle-btn');
        if (btn) btn.innerText = "🔊";
        isMusicPlaying = true;
    });
    audioEl.addEventListener('pause', () => {
        const btn = document.getElementById('music-toggle-btn');
        if (btn) btn.innerText = "🔇";
        isMusicPlaying = false;
    });
}

// --- CANDLE BLOW LOGIC ---
let audioContext;
let analyser;
let micStream;
let blowDetectionRaf;
let candlesOut = false;

async function startCandleBlow() {
    if (candlesOut) return;
    
    try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(micStream);
        microphone.connect(analyser);
        analyser.fftSize = 512;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let blowDuration = 0;

        function detectBlow() {
            if (candlesOut) return;
            
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for(let i=0; i<bufferLength; i++) {
                sum += dataArray[i];
            }
            let average = sum / bufferLength;

            // Threshold for blowing sound (adjust as needed, usually around 35-45)
            if (average > 35) {
                blowDuration++;
                if (blowDuration > 10) { // Require sustained blow
                    extinguishCandles();
                    return; // Stop detection
                }
            } else {
                blowDuration = 0;
            }
            blowDetectionRaf = requestAnimationFrame(detectBlow);
        }
        detectBlow();
    } catch(err) {
        console.warn("Microphone access denied or not supported.", err);
        // Fallback: update hint text
        const hint = document.getElementById('mic-hint');
        if(hint) hint.innerHTML = "Microphone access blocked. <br>Please <b>tap the cake</b> to blow out the candles!";
    }
}

function extinguishCandlesFallback() {
    if (!candlesOut) extinguishCandles();
}

function extinguishCandles() {
    if (candlesOut) return;
    candlesOut = true;
    
    if (blowDetectionRaf) cancelAnimationFrame(blowDetectionRaf);
    
    // Stop mic tracks
    if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
    }

    // Extinguish flames sequentially
    const f1 = document.getElementById('flame1');
    const f2 = document.getElementById('flame2');
    const f3 = document.getElementById('flame3');
    
    if (f1) f1.classList.add('extinguished');
    setTimeout(() => { if (f2) f2.classList.add('extinguished'); }, 200);
    setTimeout(() => { if (f3) f3.classList.add('extinguished'); }, 400);

    // Show next button
    setTimeout(() => {
        const nextBtn = document.getElementById('cake-next-btn');
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }, 1500);
}

// --- DYNAMIC MUSIC SELECTION ---
function changeVibe(src) {
    const audio = document.getElementById('birthday-audio');
    if (!audio) return;
    audio.src = src;
    audio.load();
    document.getElementById('audio-status').innerText = "Vibe selected! It will play beautifully when the lights turn on.";
}

function handleCustomAudio(event) {
    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        const audio = document.getElementById('birthday-audio');
        if (audio) {
            audio.src = objectURL;
            audio.load();
            document.getElementById('audio-status').innerText = `Custom track loaded: ${file.name}`;
            
            const select = document.getElementById('vibe-select');
            const customOption = document.createElement('option');
            customOption.text = "Your Custom Setup 🎵";
            customOption.value = objectURL;
            select.add(customOption);
            select.value = objectURL;
        }
    }
}
