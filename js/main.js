(() => {
    // console.log("JS file is connected")

    //Hotspot Annotation
    const hotspots = document.querySelectorAll(".Hotspot");

    const infoBoxes = [
        {
            title: "Noise Cancelling Buds",
            text: "Find your focus with our noise-cancelling buds. Designed for all-day comfort, they create a perfect acoustic seal that silences distractions, leaving only you and your high-fidelity, immersive audio.",
            image: "images/buds.png",
            alt: "Noise Cancelling Buds Image"
        },
        {
            title: "Quaker Mic",
            text: "With our precision-engineered Quaker Mic, your voice is the only thing they'll hear. Enjoy crystal-clear, professional-grade call quality, no matter where you are.",
            image: "images/mic.png",
            alt: "Quaker Mic Image"
        },
        {
            title: "Open Speaker",
            text: "Our Open Speaker design provides a revolutionary audio experience. It enhances your music while naturally blending in the world around you, ensuring you stay present and safe.",
            image: "images/speaker.png",
            alt: "Open Speaker Image"
        },
        {
            title: "Utility Back",
            text: "The intuitive Utility Back puts complete control at your fingertips. Customize every tap and swipe to effortlessly manage your music, answer calls, or activate your voice assistant.",
            image: "images/utility.png",
            alt: "Utility Back Image"
        }
    ]

    //X-ray divisor
    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");
    //explode view
    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");

    //Srub-Scroll Trigger
    canvas.width= 1920;
    canvas.height = 1080;
    const frameCount = 383;
    const images = [];
    const buds = {
        frame: 0
    }

    //hamburger menu
    const menu = document.querySelector("#menu");
    const hamburger = document.querySelector("#hamburger");
    const closeButton = document.querySelector("#close");
    const menuLinks = document.querySelectorAll("#menu nav ul li a")
    //console.log(hotspots);

    //functions

    //HOTSPOT ANNOTATION
    function loadInfo(){
        infoBoxes.forEach((infoBox, index)=>{
           let selected = document.querySelector(`#hotspot-${index+1}`);
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
        gsap.to(selected, {duration: 1, autoAlpha: 1})
    }

    function hideInfo() {
         const selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, {duration: 1, autoAlpha: 0})
    }

    hotspots.forEach(function(hotspot){
        hotspot.addEventListener("mouseenter", showInfo);
        hotspot.addEventListener("mouseleave", hideInfo);
    });

    //X-RAY Slider
    function moveDivisor() {
        divisor.style.width = `${slider.value}%`;
    }

    function resetSlider(){
        slider.value = 50;
    }
    slider.addEventListener("input", moveDivisor);
    window.addEventListener("load", resetSlider);

    for(let i=0; i<frameCount; i++) {
        const img = new Image();
        img.src = `images/explode_view/Main_Animation${(i+1).toString().padStart(3, '0')}.webp`;
        images.push(img);
    }
    console.log(images);

    gsap.to(buds, {
        frame: frameCount-1,
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view", 
            pin: true,
            scrub: 1,
            start: "top top",
            markers: true
        },
        onUpdate: render
        
    })

    images [0].addEventListener("load", render);
    function render() {
    
        console.log(images[buds.frame]); 
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0,0);

    }

    //Hamburger Menu
    function toggleMenu(){
        menu.classList.toggle("open");
    }

    closeButton.addEventListener("click", toggleMenu);

    menuLinks.forEach(link=>{
        link.addEventListener("click", toggleMenu);
    })

    hamburger.addEventListener("click", toggleMenu);

})();