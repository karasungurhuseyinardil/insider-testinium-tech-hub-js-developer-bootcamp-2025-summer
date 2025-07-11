// Elemanları seç
const timeInput = document.getElementById('timeInput');
const display   = document.getElementById('display');
const startBtn  = document.getElementById('startBtn');
const resetBtn  = document.getElementById('resetBtn');

let remaining = 0;     // Kalan süre
let timerId   = null;  // setInterval kimliği

// Ekrandaki yazıyı güncelle
function updateDisplay() {
  display.textContent = remaining > 0 ? remaining + ' sn' : 'Süre doldu!';
}

// Her saniye çalışacak fonksiyon
function tick() {
  remaining--;
  updateDisplay();

  if (remaining <= 0) {          // Süre bitti
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;   // Başlat yeniden etkin
  }
}

// Başlat butonu
startBtn.addEventListener('click', () => {
  if (timerId !== null) return;  // Zaten çalışıyorsa dur

  remaining = parseInt(timeInput.value, 10);

  if (isNaN(remaining) || remaining <= 0) {
    alert('Lütfen 1 veya daha büyük bir sayı girin.');
    return;
  }

  updateDisplay();
  startBtn.disabled = true;
  timerId = setInterval(tick, 1000);   // 1 sn aralıkla tick()
});

// Sıfırla butonu
resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  remaining = 0;
  display.textContent = '–';
  startBtn.disabled = false;
});
