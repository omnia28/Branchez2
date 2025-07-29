// script.js

// === Layout Page Logic ===
// window.addEventListener('DOMContentLoaded', () => {
//     const layoutAnimationVideo = document.getElementById('layout-animation-video');
//     const layoutVideoSource = document.getElementById('layout-video-source');
//     const layoutPageBody = document.querySelector('.layout-page');

//     const shellBreakSound = new Audio('https://freesound.org/data/previews/321/321151_5482392-lq.mp3');
//     shellBreakSound.volume = 0.7;

//     if (layoutPageBody && layoutAnimationVideo && layoutVideoSource) {
//         const isMobileOrTablet = window.matchMedia("(max-width: 768px)").matches;
//         const selectedVideo = isMobileOrTablet ? 'cracked_mobile.mp4' : 'cracked_desktop.mp4';

//         layoutVideoSource.src = selectedVideo;
//         layoutAnimationVideo.load();
//         layoutAnimationVideo.style.display = 'block';
//         layoutAnimationVideo.muted = false;

//         let clickCount = 0;
//         let isPlaying = false;
//         let targetTime = null;
//         let allowPause = true;

//         layoutAnimationVideo.addEventListener('timeupdate', () => {
//             if (allowPause && isPlaying && targetTime !== null && layoutAnimationVideo.currentTime >= targetTime) {
//                 layoutAnimationVideo.pause();
//                 isPlaying = false;
//                 console.log(`Paused at ${layoutAnimationVideo.currentTime.toFixed(2)}s`);
//             }
//         });

//         const handleClick = (e) => {
//             e.preventDefault();

//             shellBreakSound.currentTime = 0;
//             shellBreakSound.play().catch(err => console.error("Sound error:", err));

//             clickCount++;

//             if (clickCount === 1) {
//                 targetTime = 0.80;
//                 allowPause = true;
//             } else if (clickCount === 2) {
//                 targetTime = 1.80;
//                 allowPause = true;
//             } else if (clickCount === 3) {
//                 targetTime = 2.80;
//                 allowPause = true;
//             } else if (clickCount === 4) {
//                 targetTime = null;
//                 allowPause = false;
//                 layoutAnimationVideo.onended = () => {
//                     window.location.href = 'home.html';
//                 };
//             } else {
//                 return;
//             }

//             isPlaying = true;
//             layoutAnimationVideo.play().catch(err => console.warn("Playback error:", err));
//         };

//         layoutPageBody.addEventListener('click', handleClick);
//         layoutPageBody.addEventListener('touchend', handleClick);
//     }
// });

window.addEventListener('DOMContentLoaded', () => {
    const layoutAnimationVideo = document.getElementById('layout-animation-video');
    const layoutVideoSource = document.getElementById('layout-video-source');
    const layoutPageBody = document.querySelector('.layout-page');

    const shellBreakSound = new Audio('https://freesound.org/data/previews/321/321151_5482392-lq.mp3');
    shellBreakSound.volume = 0.7;

    let clickCount = 0;
    let isPlaying = false;
    let targetTime = null;
    let allowPause = true;


    function getSelectedVideo() {
        return window.matchMedia("(max-width: 768px)").matches
            ? 'cracked_mobile.mp4'
            : 'cracked_desktop.mp4';
    }


    function updateVideoSourceIfNeeded() {
        const currentSrc = layoutVideoSource.src.split('/').pop(); // get file name
        const newSrc = getSelectedVideo();

        if (currentSrc !== newSrc) {
            layoutVideoSource.src = newSrc;
            layoutAnimationVideo.load();
            console.log("Changed video source to:", newSrc);
        }
    }

    if (layoutPageBody && layoutAnimationVideo && layoutVideoSource) {
        layoutAnimationVideo.style.display = 'block';
        layoutAnimationVideo.muted = false;


        layoutVideoSource.src = getSelectedVideo();
        layoutAnimationVideo.load();


        window.addEventListener('resize', () => {
            updateVideoSourceIfNeeded();
        });

        layoutAnimationVideo.addEventListener('timeupdate', () => {
            if (allowPause && isPlaying && targetTime !== null && layoutAnimationVideo.currentTime >= targetTime) {
                layoutAnimationVideo.pause();
                isPlaying = false;
                console.log(`⏸ Paused at ${layoutAnimationVideo.currentTime.toFixed(2)}s`);
            }
        });

        const handleClick = (e) => {
            e.preventDefault();

            shellBreakSound.currentTime = 0;
            shellBreakSound.play().catch(err => console.error("Sound error:", err));

            clickCount++;

            if (clickCount === 1) {
                targetTime = 0.80;
                allowPause = true;
            } else if (clickCount === 2) {
                targetTime = 1.80;
                allowPause = true;
            } else if (clickCount === 3) {
                targetTime = 2.80;
                allowPause = true;
            } else if (clickCount === 4) {
                targetTime = null;
                allowPause = false;
                layoutAnimationVideo.onended = () => {
                    window.location.href = 'home.html';
                };
            } else {
                return;
            }

            isPlaying = true;
            layoutAnimationVideo.play().catch(err => console.warn("Playback error:", err));
        };

        layoutPageBody.addEventListener('click', handleClick);
        layoutPageBody.addEventListener('touchend', handleClick);
    }
});




// === Home Page Logic ===
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the home page
    if (document.querySelector('.home-page-wrapper')) {
        // Mobile Navigation Toggle
        const mobileNavToggle = document.getElementById('mobileNavToggle');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const closeMobileNav = document.getElementById('closeMobileNav');
        const mobileLoginIcon = document.getElementById('mobileLoginIcon');

        if (mobileNavToggle && mobileNavOverlay) {
            mobileNavToggle.addEventListener('click', function () {
                mobileNavOverlay.style.width = '100%';
            });
        }

        if (closeMobileNav) {
            closeMobileNav.addEventListener('click', function () {
                mobileNavOverlay.style.width = '0';
            });
        }

        if (mobileLoginIcon) {
            mobileLoginIcon.addEventListener('click', function () {
                window.location.href = 'entry/login.html';
            });
        }

        // Desktop Login Button
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', function () {
                window.location.href = 'entry/login.html';
            });
        }

        // Animated Photo on Scroll
        const animatedPhoto = document.getElementById('animated-photo');
        const section1 = document.getElementById('section1');
        const section2 = document.getElementById('section2'); // Ensure section2 is correctly identified

        if (animatedPhoto && section1 && section2) {
            // Generate array of image paths (100.gif to 132.gif)
            const imageFrames = [
                'Comp 100.gif',
                'Comp 101.gif',
                'Comp 102.gif',
                'Comp 103.gif',
                'Comp 104.gif',
                'Comp 105.gif',
                'Comp 106.gif',
                'Comp 107.gif',
                'Comp 108.gif',
                'Comp 109.gif',
                'Comp 110.gif',
                'Comp 111.gif',
                'Comp 112.gif',
                'Comp 113.gif',
                'Comp 114.gif',
                'Comp 115.gif',
                'Comp 116.gif',
                'Comp 117.gif',
                'Comp 118.gif',
                'Comp 119.gif',
                'Comp 120.gif',
                'Comp 121.gif',
                'Comp 122.gif',
                'Comp 123.gif',
                'Comp 124.gif',
                'Comp 125.gif',
                'Comp 126.gif',
                'Comp 127.gif',
                'Comp 128.gif',
                'Comp 129.gif',
                'Comp 130.gif',
                'Comp 132.gif',
            ];

            let currentFrameIndex = -1; // Use -1 to ensure the first frame loads on initialization

            // --- Preloading Images for Smoothness ---
            function preloadAllAnimationImages() {
                const preloadPromises = imageFrames.map(src => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => resolve();
                        img.onerror = () => {
                            console.warn(`Failed to preload image: ${src}`);
                            reject(new Error(`Failed to preload ${src}`));
                        };
                    });
                });

                Promise.allSettled(preloadPromises).then(results => {
                    console.log('All scroll animation images attempted to preload.');
                });
            }

            // --- Core Animation Logic ---
            function updateAnimationFrame() {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;

                const animationStartPoint = 0;

                let totalAnimationScrollRange; // Example: Animation completes over 1.5 times the viewport height
                if (window.innerWidth <= 768) {
                    totalAnimationScrollRange = windowHeight * 2.5; // Longer animation scroll range for mobile
                } else {
                    totalAnimationScrollRange = windowHeight * 0.5; // Default for desktop
                }

                // Ensure a minimum length (e.g., at least half a viewport height)
                if (totalAnimationScrollRange <= 0 || isNaN(totalAnimationScrollRange)) {
                    console.warn("Calculated animation scroll range is non-positive or NaN. Setting to 0.5 * windowHeight as fallback.");
                    totalAnimationScrollRange = windowHeight * 0.25; // Default to half a viewport height
                }

                const animationEndPoint = animationStartPoint + totalAnimationScrollRange;

                // Calculate scroll progress (0 to 1) within the defined animation range
                let scrollProgress = 0;
                if (scrollPosition >= animationStartPoint && scrollPosition <= animationEndPoint) {
                    scrollProgress = (scrollPosition - animationStartPoint) / totalAnimationScrollRange;
                } else if (scrollPosition > animationEndPoint) {
                    scrollProgress = 1; // Ensure last frame is shown if scrolled past the end point
                }
                // If scrollPosition < animationStartPoint, scrollProgress remains 0 (first frame)

                // Clamp the progress to ensure it's always between 0 and 1
                scrollProgress = Math.max(0, Math.min(1, scrollProgress));

                // Determine which image frame to show based on the calculated progress
                const frameIndex = Math.floor(scrollProgress * (imageFrames.length - 1));
                const clampedFrameIndex = Math.max(0, Math.min(imageFrames.length - 1, frameIndex)); // Ensure index is within bounds

                if (clampedFrameIndex !== currentFrameIndex) {
                    currentFrameIndex = clampedFrameIndex;
                    animatedPhoto.src = imageFrames[currentFrameIndex];
                    // console.log(`Setting animatedPhoto.src to: ${imageFrames[currentFrameIndex]} (Frame: ${currentFrameIndex})`); // For debugging
                }
            }

            // --- Initialization ---

            // Preload all images immediately on page load for a smoother animation
            preloadAllAnimationImages();

            // Set the initial image source to the first frame
            animatedPhoto.src = imageFrames[0];
            currentFrameIndex = 0; // Update currentFrameIndex to match

            // Attach scroll listener, debounced with requestAnimationFrame for performance
            window.addEventListener('scroll', () => {
                requestAnimationFrame(updateAnimationFrame);
            });

            // Call updateAnimationFrame once on load to set the correct initial frame
            // in case the user loads the page mid-scroll.
            updateAnimationFrame();

            // Add a resize listener to re-evaluate section positions if the layout changes
            window.addEventListener('resize', () => {
                requestAnimationFrame(updateAnimationFrame);
            });
        }

        // --- Scroll-based Photo Animation (Div-2: Services to Div-3) ---
        // const servicesAnimatedPhoto = document.getElementById('services-animated-photo');
        // const section3 = document.getElementById('section3');

        // const servicesToTrustedAnimationFrames = [
        //     '1.png',
        //     '2.png',
        //     '3.png',
        //     '4.png',
        //     '5.png',
        //     '6.png',
        //     '7.png',
        //     '8.png',
        //     '9.png',
        //     '10.png',
        //     '11.png',
        //     '12.png',
        //     '13.png',
        //     '14.png'
        // ];

        // // Preload all images to ensure consistent sizing
        // function preloadImages() {
        //     servicesToTrustedAnimationFrames.forEach(src => {
        //         const img = new Image();
        //         img.src = src;
        //         // Set the same dimensions for all preloaded images
        //         img.width = servicesAnimatedPhoto.width;
        //         img.height = servicesAnimatedPhoto.height;
        //     });
        // }

        // let currentServicesToTrustedFrameIndex = 0;
        // const scrollPerFrameServicesToTrusted = window.innerHeight * 0.5;
        // const totalAnimationScrollHeightServicesToTrusted = servicesToTrustedAnimationFrames.length * scrollPerFrameServicesToTrusted;

        // if (section2) {
        //     section2.style.minHeight = `${totalAnimationScrollHeightServicesToTrusted + window.innerHeight}px`;
        // }

        // const updateServicesToTrustedAnimationFrame = () => {
        //     if (!servicesAnimatedPhoto || !section2 || !section3) return;

        //     const scrollRelativeToSection2 = window.scrollY - section2.offsetTop;
        //     const animationProgress = Math.max(0, Math.min(1, scrollRelativeToSection2 / totalAnimationScrollHeightServicesToTrusted));

        //     const frameIndex = Math.floor(animationProgress * (servicesToTrustedAnimationFrames.length - 1));

        //     if (frameIndex !== currentServicesToTrustedFrameIndex) {
        //         // Maintain the same dimensions when changing images
        //         const currentWidth = servicesAnimatedPhoto.width;
        //         const currentHeight = servicesAnimatedPhoto.height;

        //         servicesAnimatedPhoto.style.opacity = '0';

        //         setTimeout(() => {
        //             servicesAnimatedPhoto.src = servicesToTrustedAnimationFrames[frameIndex];
        //             // Explicitly set dimensions to prevent fluctuations
        //             servicesAnimatedPhoto.width = currentWidth;
        //             servicesAnimatedPhoto.height = currentHeight;
        //             servicesAnimatedPhoto.style.opacity = '1';
        //             currentServicesToTrustedFrameIndex = frameIndex;
        //         }, 100);
        //     }
        // };

        // // Initialize
        // if (servicesAnimatedPhoto && section2 && section3) {
        //     // Set initial dimensions
        //     servicesAnimatedPhoto.width = window.innerWidth * 0.75;
        //     servicesAnimatedPhoto.height = window.innerHeight * 0.75;

        //     preloadImages();

        //     window.addEventListener('scroll', () => {
        //         requestAnimationFrame(updateServicesToTrustedAnimationFrame);
        //     });

        //     // Handle window resize to maintain consistent sizing
        //     window.addEventListener('resize', () => {
        //         servicesAnimatedPhoto.width = window.innerWidth * 0.75;
        //         servicesAnimatedPhoto.height = window.innerHeight * 0.75;
        //     });

        //     updateServicesToTrustedAnimationFrame();
        // }

        const servicesAnimatedPhoto = document.getElementById('services-animated-photo');
        // const section2 = document.getElementById('section2');
        const section3 = document.getElementById('section3');

        // Check if the user is on a mobile device
        const isMobile = window.innerWidth <= 768;

        // Generate correct frame names based on device type
        const servicesToTrustedAnimationFrames = Array.from({ length: 12 }, (_, i) =>
            `nest${i} - ${isMobile ? 'mobile' : 'desktop'}.png`
        );

        // Set initial image based on device
        if (servicesAnimatedPhoto) {
            servicesAnimatedPhoto.src = servicesToTrustedAnimationFrames[0];
        }

        // Preload all images
        function preloadImages() {
            servicesToTrustedAnimationFrames.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }

        let currentServicesToTrustedFrameIndex = 0;
        const scrollPerFrameServicesToTrusted = window.innerHeight * 0.5;
        const totalAnimationScrollHeightServicesToTrusted =
            servicesToTrustedAnimationFrames.length * scrollPerFrameServicesToTrusted;

        if (section2) {
            section2.style.minHeight = `${totalAnimationScrollHeightServicesToTrusted + window.innerHeight}px`;
        }

        const updateServicesToTrustedAnimationFrame = () => {
            if (!servicesAnimatedPhoto || !section2 || !section3) return;

            const scrollRelativeToSection2 = window.scrollY - section2.offsetTop;
            const animationProgress = Math.max(0, Math.min(1, scrollRelativeToSection2 / totalAnimationScrollHeightServicesToTrusted));

            const frameIndex = Math.floor(animationProgress * (servicesToTrustedAnimationFrames.length - 1));

            if (frameIndex !== currentServicesToTrustedFrameIndex) {
                servicesAnimatedPhoto.style.opacity = '0';

                setTimeout(() => {
                    servicesAnimatedPhoto.src = servicesToTrustedAnimationFrames[frameIndex];
                    servicesAnimatedPhoto.style.opacity = '1';
                    currentServicesToTrustedFrameIndex = frameIndex;
                }, 100);
            }
        };

        // Initialize
        if (servicesAnimatedPhoto && section2 && section3) {
            preloadImages();

            window.addEventListener('scroll', () => {
                requestAnimationFrame(updateServicesToTrustedAnimationFrame);
            });

            updateServicesToTrustedAnimationFrame();
        }




        // Video Modal
        const watchJourneyBtn = document.getElementById('watchJourneyBtn');
        const videoModal = document.getElementById('videoModal');
        const closeVideoBtn = document.getElementById('closeVideoBtn');
        const journeyVideo = document.getElementById('journeyVideo');

        if (watchJourneyBtn && videoModal) {
            watchJourneyBtn.addEventListener('click', function () {
                videoModal.style.display = 'flex';
                journeyVideo.play();
            });

            closeVideoBtn.addEventListener('click', function () {
                videoModal.style.display = 'none';
                journeyVideo.pause();
                journeyVideo.currentTime = 0;
            });

            window.addEventListener('click', function (event) {
                if (event.target === videoModal) {
                    videoModal.style.display = 'none';
                    journeyVideo.pause();
                    journeyVideo.currentTime = 0;
                }
            });
        }

        // Header background change on scroll
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(13, 13, 13, 0.9)';
                } else {
                    header.style.backgroundColor = 'transparent';
                }
            }
        });

        // --- Portfolio Download Logic (Div-4) ---
        const downloadPortfolioBtn = document.getElementById('downloadPortfolioBtn');
        if (downloadPortfolioBtn) {
            downloadPortfolioBtn.addEventListener('click', function () {
                const emailInput = document.getElementById('emailInput');
                const phoneInput = document.getElementById('phoneInput');
                const agreeCheckbox = document.getElementById('agreeCheckbox');

                // Basic validation
                if (!emailInput.value || !phoneInput.value) {
                    alert('Please enter both your email and phone number.');
                    return;
                }
                if (!agreeCheckbox.checked) {
                    alert('You must agree to receive marketing communications to download the portfolio.');
                    return;
                }

                // In a real application, you would send this data to a server
                // and then trigger the download. For this example, we'll directly
                // trigger a download of a placeholder PDF.
                console.log('Email:', emailInput.value);
                console.log('Phone:', phoneInput.value);
                console.log('Agreed to marketing:', agreeCheckbox.checked);

                // Create a dummy anchor element to trigger download
                const downloadLink = document.createElement('a');
                downloadLink.href = 'https://drive.google.com/file/d/1bF3fGo-d1_ixFlDOXENebxnEwtDaesvE/view?usp=sharing'; // Placeholder PDF URL
                downloadLink.download = 'Branchez_Portfolio.pdf'; // Suggested filename for download
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                alert('Thank you! Your portfolio download should begin shortly.'); // Use a custom modal in production
            });
        }
    }
    const container = document.getElementById('trustedByLogos');
    const originalOrder = Array.from(container.children);

    const newOrder = [
        5, 26, 17,
        22, 20, 15,
        6, 16, 12,
        18, 25, 8,
        11, 14, 31,
        10, 9, 19,
        28, 27, 7,
        34, 32, 13,
        1, 35, 2,
        23, 21, 29,
        33, 24
    ];

    const reorderLogos = (toMobile) => {
        container.classList.add('fade-out');

        setTimeout(() => {
            if (toMobile) {
                const logos = Array.from(container.querySelectorAll('img'));
                const sortedLogos = newOrder.map(i => logos.find(img => img.dataset.index == i)).filter(Boolean);
                container.innerHTML = '';
                sortedLogos.forEach(img => container.appendChild(img));
            } else {
                container.innerHTML = '';
                originalOrder.forEach(el => container.appendChild(el));
            }

            container.classList.remove('fade-out');
            container.classList.add('fade-in');

            setTimeout(() => {
                container.classList.remove('fade-in');
            }, 500);
        }, 500);
    };

    let isMobileView = window.innerWidth <= 768; // ✅ التعديل هنا
    reorderLogos(isMobileView);

    window.addEventListener('resize', () => {
        const nowMobile = window.innerWidth <= 768; // ✅ والتعديل هنا كمان
        if (nowMobile !== isMobileView) {
            isMobileView = nowMobile;
            reorderLogos(isMobileView);
        }
    });
});

