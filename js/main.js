(() => {
    // console.log("JS file is connected")
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
    //console.log(hotspots);

    //functions

    function loadInfo(){
        infoBoxes.forEach((infoBox, index)=>{
           //console.log(index+1);
           //selected  will be the infoBox on our page, eg. hotspot-1, hotspot-2 .etc.
           let selected = document.querySelector(`#hotspot-${index+1}`);
           console.log(selected);
        
           //let's create an h2
           const titleElement = document.createElement('h2');
           //lets populate an h2
            titleElement.textContent = infoBox.title;

            //lets create a p
            const textElement = document.createElement('p');
            //lets populate a p
            textElement.textContent = infoBox.text;

            //lets create an img
            const imageElement = document.createElement('img');
            imageElement.src = infoBox.image;
            imageElement.alt = infoBox.alt;

            selected.appendChild(imageElement);
            //lets add the h2 to the selected hotspot
            selected.appendChild(titleElement);
            //lets add the p to the selected hotspot
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

})();