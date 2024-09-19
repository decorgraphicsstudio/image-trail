Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.3,
});

Shery.makeMagnet(".magnet");

Shery.hoverWithMediaCircle(".hover-target" /* Element to target.*/, {
    // images: ["image1.jpg", "image2.jpg", "image3.jpg"] /*OR*/,
    videos: ["1.mp4",],
});

Shery.textAnimate(".main-text-box h2", {
    style: 2,
    y: 10,
    delay: 0.1,
    duration: 2,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 0.1,
});

gsap.from(".second h2", {
    scrollTrigger: {
        trigger: ".second h2",    // Trigger the animation on the h2 element
        start: "top 90%",         // Animation starts when h2 is 80% down the viewport
        end: "top 80%",           // Animation ends when h2 is 60% down
        scrub: 0,                 // Smoothly scrub the animation based on scroll
    },
    opacity: 0,                 // Fade the h2 in
    y: -50,                       // Move it to its original position (from 20px)
    scale: 1.5,
    duration: 0.05,                // Duration of the animation
    ease: "cubic-bezier(0.23, 1, 0.32, 1)"  // Smooth easing curve
});

Shery.textAnimate(".r_b_box p", {
    style: 1,
    y: 0,
    delay: 0.05,
    duration: 1,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
});

Shery.textAnimate(".r_b_box p", {
    style: 1,
    y: 0,
    delay: 0.05,
    duration: 1,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
});

gsap.from(".nlink", {
    stagger: .1,
    y: 10,
    duration: 0.1,
    ease: Power2,
    opacity: 0
})

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".items");
    let imgIndex = 1;
    let animationTimeout = null;
    let currentlyPlaying = false;

    function loadImage(src, callback) {
        const img = new Image();
        img.src = src;
        img.onload = () => callback(img);
        img.onerror = () => console.error(`Failed to load image: ${src}`);
    }

    function addNewItem(x, y) {
        const newItem = document.createElement("div");
        newItem.className = "item";
        newItem.style.left = `${x - 75}px`;  // Center the image horizontally
        newItem.style.top = `${y - 75}px`;   // Center the image vertically

        const imgSrc = `./img${imgIndex}.jpg`;
        imgIndex = (imgIndex % 15) + 1; // Cycle through images

        // Load and append the image
        loadImage(imgSrc, (img) => {
            img.alt = 'Dynamic Image';
            newItem.appendChild(img);
            container.appendChild(newItem);

            // Animate image appearing
            gsap.fromTo(newItem,
                {
                    scale: 0.7,  // Start smaller
                    opacity: 1   // Start hiddena
                },
                {
                    scale: 1,    // End at normal size
                    opacity: 1,  // End fully visible
                    duration: 0.4,
                    ease: "power1.in"
                }
            );

            manageItemLimit();
        });
    }

    function manageItemLimit() {
        const items = container.querySelectorAll(".item");
        if (items.length > 10) {
            // Hide older images
            items.forEach((item, index) => {
                if (index < items.length - 10) {
                    // Apply animation to hide old items
                    console.log("hi");
                    
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.3,
                        ease: "power1.out",
                        onComplete: () => {
                            if (item.parentNode) {
                                item.parentNode.removeChild(item);
                            }
                        }
                    });
                }
            });
        }
    }

    function startAnimation() {
        if (currentlyPlaying || container.children.length === 0) return;
        currentlyPlaying = true;

        gsap.to(".item", {
            y: -1000,  // Move up (negative y-direction)
            scale: 0.5,
            opacity: 0,
            duration: 0.7,
            stagger: 0.03,
            ease: "power1.out",
            onComplete: function () {
                this.targets().forEach((item) => {
                    if (item.parentNode) {
                        item.parentNode.removeChild(item);
                    }
                });
                currentlyPlaying = false;
            },
        });
    }

    container.addEventListener("mousemove", function (event) {
        clearTimeout(animationTimeout);
        addNewItem(event.pageX, event.pageY);
        animationTimeout = setTimeout(startAnimation, 100);
    });
});

document.querySelector(".main-text-box").addEventListener("mouseover", function () {
    document.querySelector(".main-video").style.zIndex = "1";
    gsap.to(".main-video", {
        opacity: 1,
        delay: 0.5,
        duration: 1,
        ease: Power3,
    })
})

document.querySelector(".main-text-box").addEventListener("mouseleave", function () {
    gsap.to(".main-video", {
        opacity: 0,
        duration: 1,
        ease: Power3,
        onComplete: function () {
            document.querySelector(".main-video").style.zIndex = "-1";
        }
    })
})