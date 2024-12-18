let currentIndex = {
    slider1: 0,
    slider2: 0
};

let autoSlideTimers = {}; // Objek untuk menyimpan interval otomatis
let pauseTimers = {}; // Objek untuk menyimpan timer jeda

function moveSlider(direction, sliderId) {
    const slider = document.getElementById(sliderId);
    const track = slider.querySelector('.slider-track');
    const totalImages = track.children.length;

    currentIndex[sliderId] += direction;

    if (currentIndex[sliderId] < 0) {
        currentIndex[sliderId] = totalImages - 1;
    } else if (currentIndex[sliderId] >= totalImages) {
        currentIndex[sliderId] = 0;
    }

    track.style.transform = `translateX(-${currentIndex[sliderId] * 100}%)`;

    // Jika tombol panah ditekan, jeda otomatis slider selama 10 detik
    pauseAutoSlide(sliderId, 10000); // 10 detik = 10000 ms
}

// Fungsi untuk memulai slider otomatis
function startAutoSlide(sliderId, intervalTime) {
    // Hentikan interval sebelumnya jika ada
    if (autoSlideTimers[sliderId]) clearInterval(autoSlideTimers[sliderId]);

    // Buat interval baru
    autoSlideTimers[sliderId] = setInterval(() => {
        moveSlider(1, sliderId); // Pindahkan slider ke kanan otomatis
    }, intervalTime);
}

// Fungsi untuk menjeda slider otomatis
function pauseAutoSlide(sliderId, pauseTime) {
    // Hentikan interval otomatis
    if (autoSlideTimers[sliderId]) {
        clearInterval(autoSlideTimers[sliderId]);
        autoSlideTimers[sliderId] = null;
    }

    // Jika ada timer jeda sebelumnya, hentikan
    if (pauseTimers[sliderId]) clearTimeout(pauseTimers[sliderId]);

    // Atur timer jeda baru untuk melanjutkan slider otomatis
    pauseTimers[sliderId] = setTimeout(() => {
        const intervalTime = sliderId === 'slider1' ? 3000 : 5000; // 3 detik untuk slider1, 5 detik untuk slider2
        startAutoSlide(sliderId, intervalTime);
    }, pauseTime);
}

// Jalankan slider otomatis saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    startAutoSlide('slider1', 3000); // Slider 1 berjalan otomatis setiap 3 detik
    startAutoSlide('slider2', 5000); // Slider 2 berjalan otomatis setiap 5 detik
});

// Intersection Observer untuk animasi
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}

const options = { threshold: 0.5 };
const observer = new IntersectionObserver(handleIntersection, options);
const fadeElements = document.querySelectorAll('.fade-in');

fadeElements.forEach(element => observer.observe(element));

function goToLink(url) {
    window.location.href = url;
}
