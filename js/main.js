(() => {
    // ------------------------------------------------------------------------
    // 1. VARIABLES
    // ------------------------------------------------------------------------

    // Mobile Menu Elements
    const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
    const mobileMenu = document.querySelector("#mobile-menu");
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    // Hotspot & 3D Model Elements
    const hotspots = document.querySelectorAll(".Hotspot");

    const infoBoxes = [
        {
            title: "Noise Cancelling Buds",
            text: "Find your focus with our noise-cancelling buds. Designed for all-day comfort.",
            image: "images/buds.png",
            alt: "Noise Cancelling Buds"
        },
        {
            title: "Quaker Mic",
            text: "Crystal-clear, professional-grade call quality, no matter where you are.",
            image: "images/mic.png",
            alt: "Quaker Mic"
        },
        {
            title: "Open Speaker",
            text: "Revolutionary audio that keeps you connected to your environment.",
            image: "images/speaker.png",
            alt: "Open Speaker"
        },
        {
            title: "Utility Back",
            text: "Complete control at your fingertips with customizable gestures.",
            image: "images/utility.png",
            alt: "Utility Back"
        }
    ];

    // X-Ray Elements
    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");

    // Explode View Elements
    const canvas = document.querySelector("#explode-view");
    const context = canvas ? canvas.getContext("2d") : null;
    const frameCount = 383;
    const images = [];
    const buds = { frame: 0 };
    canvas.width = 1920;
    canvas.height = 1080;

    // Fade Animation Elements
    const fadeElements = document.querySelectorAll('.fade-in');


    // ------------------------------------------------------------------------
    // 2. FUNCTIONS
    // ------------------------------------------------------------------------

    // --- Mobile Menu Functions ---
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
    }

    // --- Hotspot Functions ---
    function loadInfo() {
        infoBoxes.forEach((infoBox, index) => {
            let selected = document.querySelector(`#hotspot-${index + 1}`);
            console.log(selected);

            const titleElement = document.createElement('h2');
            titleElement.textContent = infoBox.title;

            const textElement = document.createElement('p');
            textElement.textContent = infoBox.text;

            const imageElement = document.createElement('img');
            imageElement.src = infoBox.image;
            imageElement.alt = infoBox.alt;

            selected.appendChild(imageElement);
            selected.appendChild(titleElement);
            selected.appendChild(textElement);
        });
    }

    loadInfo();

    function showInfo() {
        console.log(`#${this.slot}`);
        const selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, { duration: 1, autoAlpha: 1 })
    }

    function hideInfo() {
        const selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, { duration: 1, autoAlpha: 0 })
    }

    // --- X-Ray Functions ---
    function moveDivisor() {
        divisor.style.width = `${slider.value}%`;
    }

    function resetSlider() {
        slider.value = 50;
        moveDivisor();
    }

    // --- Explode View Functions ---
    function render() {
        if (context && images[buds.frame]) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[buds.frame], 0, 0);
        }
    }


    // ------------------------------------------------------------------------
    // 3. EXECUTION / EVENT LISTENERS
    // ------------------------------------------------------------------------

    // 1. Mobile Menu Logic
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // 2. Hotspots Logic
    // Attach interaction listeners
    hotspots.forEach(hotspot => {
        hotspot.addEventListener("mouseenter", showInfo);
        hotspot.addEventListener("mouseleave", hideInfo);
    });

    // 3. X-Ray Logic
    if (divisor && slider) {
        slider.addEventListener("input", moveDivisor);
        window.addEventListener("load", resetSlider);
    }

    // 4. Explode View Logic
    // Preload Images
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `images/explode_view/Main_Animation${(i + 1).toString().padStart(3, '0')}.webp`;
        images.push(img);
    }

    // Initialize ScrollTrigger
    if (canvas) {
        gsap.to(buds, {
            frame: frameCount - 1,
            snap: "frame",
            scrollTrigger: {
                trigger: "#explode-view",
                pin: true,
                scrub: 1,
                start: "top top",
            },
            onUpdate: render
        });

        // Initial render
        if (images.length > 0) {
            images[0].addEventListener("load", render);
        }
    }

    // 5. Fade-in Animation Logic
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach((el) => fadeObserver.observe(el));

})();