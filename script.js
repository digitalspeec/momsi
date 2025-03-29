document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const playBtn = document.getElementById('playBtn');
    const gallery = document.getElementById('gallery');
    const navButtons = document.getElementById('navButtons');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const videoContainer = document.getElementById('videoContainer');
    
    // Image data - REPLACE THESE WITH YOUR ACTUAL IMAGES AND MESSAGES
    const images = [
        {
            src: 'img/3m.jpg', // Replace with your image URL
            message: "Mum, you make every day brighter just by being you. I love you!"
        },
        {
            src: 'img/2m.jpg', // Replace with your image URL
            message: "Your love and laughter light up my life. Thank you for everything!"
        },
        {
            src: 'img/1m.jpg', // Replace with your image URL
            message: "Happy Mother's Day to the one who fills my world with joy!"
        },
        {
            src: 'img/4m.jpg', // Replace with your image URL
            message: "You're the heartbeat of our family—forever grateful for your love!"
        },
        {
            src: 'img/9m.jpg', // Replace with your image URL
            message: "Through every laugh and every moment, you make my life better. Happy Mother's Day!"
        },
        {
            src: 'img/8m.jpg', // Replace with your image URL
            message: "Thank you, Mum, for all the warmth and happiness you bring into my life!"
        },
        {
            src: 'img/7m.jpg', // Replace with your image URL
            message: "Every smile from you feels like a gift. Love you more than you know!"
        }
    ];
    
    let currentSlide = 0;
    let slides = [];
    let intervalId = null;
    
    // Initialize the gallery
    function initGallery() {
        gallery.innerHTML = '';
        
        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            if (index === 0) slide.classList.add('active');
            
            slide.innerHTML = `
                <img src="${image.src}" alt="Beautiful Mum">
                <div class="message">${image.message}</div>
            `;
            
            gallery.appendChild(slide);
        });
        
        slides = document.querySelectorAll('.slide');
    }
    
    // Show slide
    function showSlide(index) {
        // Wrap around if at beginning or end
        if (index >= slides.length) {
            // If we've reached the end, show the video
            showVideo();
            return;
        }
        
        if (index < 0) {
            index = slides.length - 1;
        }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    // Auto-play slides
    function autoPlay() {
        intervalId = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 3000); // Change slide every 3 seconds
    }
    
    // Show video
    function showVideo() {
        clearInterval(intervalId);
        gallery.style.display = 'none';
        navButtons.style.display = 'none';
        videoContainer.style.display = 'block';
        
        // Here you would add code to play the video automatically
        // For now it's just a placeholder
        
    }
    
    // Event listeners
    playBtn.addEventListener('click', function() {
        initGallery();
        gallery.style.display = 'block';
        navButtons.style.display = 'flex';
        playBtn.style.display = 'none';
        autoPlay();
    });
    
    prevBtn.addEventListener('click', function() {
        clearInterval(intervalId);
        showSlide(currentSlide - 1);
        autoPlay();
    });
    
    nextBtn.addEventListener('click', function() {
        clearInterval(intervalId);
        showSlide(currentSlide + 1);
        autoPlay();
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    gallery.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    gallery.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next
            clearInterval(intervalId);
            showSlide(currentSlide + 1);
            autoPlay();
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous
            clearInterval(intervalId);
            showSlide(currentSlide - 1);
            autoPlay();
        }
    }
});