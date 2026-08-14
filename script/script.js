document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarLinks = document.querySelectorAll(".sidebar-links a");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function () {
            sidebar.classList.add("active");
        });
    }

    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener("click", function () {
            sidebar.classList.remove("active");
        });
    }

    if (sidebarLinks && sidebar) {
        sidebarLinks.forEach(link => {
            link.addEventListener("click", function () {
                sidebar.classList.remove("active");
            });
        });
    // Services Tabs Filtering
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabBtns && tabContents) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const targetTab = this.getAttribute("data-tab");

                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove("active"));
                // Add active class to clicked button
                this.classList.add("active");

                // Hide all tab contents and show targeted one
                tabContents.forEach(content => {
                    if (content.id === targetTab) {
                        content.classList.add("active");
                    } else {
                        content.classList.remove("active");
                    }
                });
            });
        });
    }

    // Hero Slideshow
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 2500);
    }

    // Stats Counter Animation
    const statsSection = document.querySelector(".calicut-stats-section");
    const statNumbers = document.querySelectorAll(".stat-number");
    
    if (statsSection && statNumbers.length > 0) {
        let animated = false;
        
        const startCounter = () => {
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const duration = 1500;
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Smooth quadratic out easing
                    const easeProgress = progress * (2 - progress);
                    const value = Math.floor(easeProgress * target);
                    
                    counter.textContent = value;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCounter);
            });
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    startCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(statsSection);
    }

    // Lightbox Modal for Experience Grid
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const popImages = document.querySelectorAll(".pop-image");
    
    if (lightboxModal && lightboxImg && lightboxClose) {
        popImages.forEach(img => {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightboxModal.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });
        
        const closeLightbox = () => {
            lightboxModal.classList.remove("active");
            document.body.style.overflow = "";
        };
        
        lightboxClose.addEventListener("click", closeLightbox);
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
        
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
                closeLightbox();
            }
        });
    }

    // Reviews Carousel Slider
    const track = document.getElementById("reviewsTrack");
    const prevBtn = document.getElementById("prevReviewBtn");
    const nextBtn = document.getElementById("nextReviewBtn");
    
    if (track) {
        const originalCards = Array.from(track.children);
        const totalOriginals = originalCards.length;

        // Clone first 3 cards and append to track for infinite scroll effect
        const clonesToAppend = 3;
        for (let i = 0; i < clonesToAppend; i++) {
            const clone = originalCards[i].cloneNode(true);
            track.appendChild(clone);
        }

        let currentIndex = 0;
        let isTransitioning = false;

        function updateSlider(animate = true) {
            if (animate) {
                track.style.transition = "transform 0.5s ease-in-out";
            } else {
                track.style.transition = "none";
            }
            
            const visibleCards = window.innerWidth <= 768 ? 1 : 3;
            track.style.transform = `translateX(-${currentIndex * (100 / visibleCards)}%)`;
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updateSlider(true);
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            if (currentIndex === 0) {
                currentIndex = totalOriginals;
                updateSlider(false);
                // Force reflow
                track.offsetHeight;
                
                currentIndex = totalOriginals - 1;
                updateSlider(true);
            } else {
                currentIndex--;
                updateSlider(true);
            }
        }

        track.addEventListener("transitionend", () => {
            isTransitioning = false;
            if (currentIndex >= totalOriginals) {
                currentIndex = 0;
                updateSlider(false);
            }
        });

        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
        if (prevBtn) prevBtn.addEventListener("click", prevSlide);

        // Auto loop every 3.5 seconds
        let autoPlayInterval = setInterval(nextSlide, 3500);

        const sliderContainer = document.querySelector(".reviews-slider-container");
        if (sliderContainer) {
            sliderContainer.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
            sliderContainer.addEventListener("mouseleave", () => {
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(nextSlide, 3500);
            });
        }

        window.addEventListener("resize", () => {
            updateSlider(false);
        });

        updateSlider(false);
    }
}});
