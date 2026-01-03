$(document).ready(function() {
    // ============================================
    // CAROUSEL FUNCTIONALITY
    // ============================================
    const track = $('#carouselTrack');
    const slides = $('.carousel-slide');
    const thumbnails = $('.thumbnail');
    const prevBtn = $('#prevBtn');
    const nextBtn = $('#nextBtn');
    const carousel = $('.carousel-container');
    
    let currentIndex = 0;
    let isAnimating = false;
    const totalSlides = slides.length;
    let prevTranslate = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let startX = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let carouselDisabled = false; // disable interactions when featured is clicked

    // ============================================
    // UPDATE CAROUSEL POSITION
    // ============================================
    function updateCarousel(animate = true) {
        if (isAnimating) return;

        const carouselWidth = carousel.width();
        const offset = -currentIndex * carouselWidth;

        if (animate) {
            isAnimating = true;
            track.css('transition', 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        } else {
            track.css('transition', 'none');
        }

        track.css('transform', `translateX(${offset}px)`);

        // Update active thumbnail
        thumbnails.removeClass('active');
        thumbnails.eq(currentIndex).addClass('active');

        // Sync drag logic
        prevTranslate = offset;
    }

    // ============================================
    // FEATURED SLIDE CLICK DISABLE
    // ============================================
    const featuredSlide = $('.carousel-slide.featured');
    featuredSlide.on('click', function(e) {
        e.stopPropagation(); // stop bubbling
        carouselDisabled = true;

        // Optional: auto re-enable after 3s
        setTimeout(() => {
            carouselDisabled = false;
        }, 3000);
    });

    // ============================================
    // NAVIGATION BUTTONS
    // ============================================
    prevBtn.on('click', function() {
        if (isAnimating || (carouselDisabled && currentIndex === 0)) return;
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        stopAutoplay();
    });

    nextBtn.on('click', function() {
        if (isAnimating || (carouselDisabled && currentIndex === 0)) return;
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        stopAutoplay();
    });

    // Thumbnail click
    thumbnails.on('click', function() {
        if (isAnimating) return;
        currentIndex = parseInt($(this).data('index'));
        updateCarousel();
        stopAutoplay();
    });

    // Keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevBtn.click();
        else if (e.key === 'ArrowRight') nextBtn.click();
    });

    // ============================================
    // TOUCH / SWIPE SUPPORT
    // ============================================
    carousel.on('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    });

    carousel.on('touchmove', function(e) {
        touchEndX = e.touches[0].clientX;
    });

    carousel.on('touchend', function() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) nextBtn.click();
            else prevBtn.click();
        }
    });

    // ============================================
    // MOUSE DRAG SUPPORT
    // ============================================
    carousel.on('mousedown', function(e) {
        if (carouselDisabled && currentIndex === 0) return;
        isDragging = true;
        startX = e.pageX;
        carousel.css('cursor', 'grabbing');
        track.css('transition', 'none');
    });

    carousel.on('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.pageX;
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        track.css('transform', `translateX(${currentTranslate}px)`);
    });

    carousel.on('mouseup mouseleave', function() {
        if (!isDragging) return;
        isDragging = false;
        carousel.css('cursor', 'grab');

        const movedBy = currentTranslate - prevTranslate;
        const threshold = carousel.width() * 0.2;

        if (Math.abs(movedBy) > threshold) {
            if (movedBy < 0) currentIndex = (currentIndex + 1) % totalSlides;
            else currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }

        updateCarousel();
    });

    // ============================================
    // AUTO-PLAY (SKIP FEATURED)
    // ============================================
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(function() {
            if (currentIndex !== 0) {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    startAutoplay();
    carousel.on('mouseenter', stopAutoplay);
    carousel.on('mouseleave', startAutoplay);

    // ============================================
    // THUMBNAIL STRIP SMOOTH SCROLL
    // ============================================
    const thumbnailStrip = $('.thumbnail-strip');
    thumbnails.on('click', function() {
        const thumbnail = $(this);
        const stripWidth = thumbnailStrip.width();
        const thumbLeft = thumbnail.position().left;
        const thumbWidth = thumbnail.outerWidth();
        const currentScroll = thumbnailStrip.scrollLeft();

        const targetScroll = currentScroll + thumbLeft - (stripWidth / 2) + (thumbWidth / 2);

        thumbnailStrip.animate({ scrollLeft: targetScroll }, 300);
    });

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = $('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.each(function() { imageObserver.observe(this); });
    }

    // ============================================
    // WINDOW RESIZE HANDLER
    // ============================================
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateCarousel(false);
            prevTranslate = -currentIndex * carousel.width();
        }, 250);
    });

    // ============================================
    // DOWNLOAD BUTTON ANIMATION
    // ============================================
    const downloadBtn = $('.download-btn');
    downloadBtn.on('click', function(e) {
        e.preventDefault();
        const ripple = $('<span class="ripple"></span>');
        $(this).append(ripple);
        setTimeout(() => ripple.remove(), 600);
        console.log('Download initiated for WitchType');
    });

    // ============================================
    // PAUSE CAROUSEL ON TAB VISIBILITY CHANGE
    // ============================================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) track.css('transition', 'none');
        else track.css('transition', 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
    });
});

