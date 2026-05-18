let allFrames = [];
let filteredFrames = [];
let currentLightboxIndex = 0;
let currentSlideshowIndex = 0;
let slideshowInterval = null;

const cardsContainer = document.getElementById('cardsContainer');
const filterButtonsContainer = document.getElementById('filterButtons');
const slideshowBtn = document.getElementById('slideshowBtn');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const slideshow = document.getElementById('slideshow');
const slideshowImg = document.getElementById('slideshowImg');
const slideshowTitle = document.getElementById('slideshowTitle');
const slideshowMeta = document.getElementById('slideshowMeta');
const slideshowClose = document.getElementById('slideshowClose');
const slideshowPrev = document.getElementById('slideshowPrev');
const slideshowNext = document.getElementById('slideshowNext');
const slideshowAudio = document.getElementById('slideshowAudio');

document.addEventListener('DOMContentLoaded', () => {
    fetchFrames();
    initFilters();
    initLightboxEvents();
    initSlideshowEvents();
});

async function fetchFrames() {
    try {
        const response = await fetch('http://localhost:3000/frames');
        if (!response.ok) throw new Error('Network response was not ok');
        
        allFrames = await response.json();
        allFrames.sort((a, b) => (a.order_slideshow || 0) - (b.order_slideshow || 0));
        
        filteredFrames = [...allFrames];
        renderCards(filteredFrames);
    } catch (error) {
        console.error('Error fetching frames:', error);
        cardsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-danger">Error loading visual diary. Please ensure JSON Server is running.</p>
            </div>
        `;
    }
}

function renderCards(frames) {
    cardsContainer.innerHTML = '';
    
    if (frames.length === 0) {
        cardsContainer.innerHTML = '<div class="col-12 text-center text-muted py-5"><p>No frames found in this category.</p></div>';
        return;
    }

    frames.forEach((frame, index) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-lg-4';

        col.innerHTML = `
            <div class="card frameCard h-100 border-0 bg-transparent" data-index="${index}">
                <div class="cardImageWrapper">
                    <span class="cardCategory">${frame.category}</span>
                    <img src="${frame.image}" class="card-img-top" alt="${frame.title}" loading="lazy">
                    <h3 class="cardTitle">${frame.title}</h3>
                </div>
                <div class="card-body cardBody px-2">
                    <span class="cardDateStamp">${frame.location}, ${frame.year}</span>
                    <p class="card-text cardDescription">${frame.description}</p>
                    ${frame.mood ? `<span class="cardMood">Mood: ${frame.mood}</span>` : ''}
                </div>
            </div>
        `;

        col.querySelector('.frameCard').addEventListener('click', () => {
            openLightbox(index);
        });

        cardsContainer.appendChild(col);
    });
}

function initFilters() {
    filterButtonsContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filterBtn')) return;

        document.querySelectorAll('.filterBtn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');
        
        if (category === 'all') {
            filteredFrames = [...allFrames];
        } else {
            filteredFrames = allFrames.filter(frame => frame.category.toLowerCase() === category.toLowerCase());
        }

        renderCards(filteredFrames);
    });
}

function initLightboxEvents() {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightboxInner')) {
            closeLightbox();
        }
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = filteredFrames.length - 1;
    if (currentLightboxIndex >= filteredFrames.length) currentLightboxIndex = 0;
    updateLightboxContent();
}

function updateLightboxContent() {
    const frame = filteredFrames[currentLightboxIndex];
    if (!frame) return;

    lightboxImg.src = frame.image;
    lightboxImg.alt = frame.title;
    lightboxTitle.textContent = frame.title;
    lightboxDescription.textContent = frame.description;
    
    lightboxMeta.innerHTML = `
        <span class="lbValue"><strong class="text-uppercase">Loc:</strong> <span class="lbAccent">${frame.location}</span></span>
        <span class="lbValue"><strong class="text-uppercase">Year:</strong> <span>${frame.year}</span></span>
        <span class="lbValue"><strong class="text-uppercase">Type:</strong> <span>${frame.category}</span></span>
    `;
}

function initSlideshowEvents() {
    slideshowBtn.addEventListener('click', startSlideshow);
    slideshowClose.addEventListener('click', stopSlideshow);
    slideshowPrev.addEventListener('click', () => navigateSlideshow(-1));
    slideshowNext.addEventListener('click', () => navigateSlideshow(1));
}

function startSlideshow() {
    const slideshowTargets = allFrames.filter(f => f.show !== false);
    if (slideshowTargets.length === 0) return;

    currentSlideshowIndex = 0;
    slideshow.classList.add('active');
    document.body.style.overflow = 'hidden';

    slideshowPrev.style.display = 'none';
    slideshowNext.style.display = 'none';

    slideshowAudio.currentTime = 0;
    slideshowAudio.play().catch(error => {
        console.log("Audio playback delayed:", error);
    });

    showSlide(true);
}

function stopSlideshow() {
    slideshow.classList.remove('active');
    document.body.style.overflow = '';
    slideshowAudio.pause();
    clearTimeout(slideshowInterval);
    
    slideshowPrev.style.display = 'none';
    slideshowNext.style.display = 'none';
}

function navigateSlideshow(direction) {
    clearTimeout(slideshowInterval);

    const slideshowTargets = allFrames.filter(f => f.show !== false);
    currentSlideshowIndex += direction;
    
    if (currentSlideshowIndex < 0) currentSlideshowIndex = slideshowTargets.length - 1;
    if (currentSlideshowIndex >= slideshowTargets.length) currentSlideshowIndex = 0;
    
    showSlide(false);
}

function showSlide(isAuto) {
    const slideshowTargets = allFrames.filter(f => f.show !== false);
    const frame = slideshowTargets[currentSlideshowIndex];
    if (!frame) return;

    slideshowImg.classList.remove('visible');
    
    setTimeout(() => {
        slideshowImg.src = frame.image;
        slideshowImg.alt = frame.title;
        slideshowTitle.textContent = frame.title;
        slideshowMeta.textContent = `${frame.location} — ${frame.year}`;
        
        slideshowImg.classList.add('visible');

        const currentDuration = frame.duration || 5000;

        if (isAuto) {
            slideshowInterval = setTimeout(() => {
                const nextIndex = currentSlideshowIndex + 1;
                
                if (nextIndex >= slideshowTargets.length) {
                    currentSlideshowIndex = 0;
                    
                    slideshowPrev.style.display = 'block';
                    slideshowNext.style.display = 'block';
                    
                    showSlide(false);
                } else {
                    currentSlideshowIndex = nextIndex;
                    showSlide(true);
                }
            }, currentDuration);
        }

    }, 250);
}