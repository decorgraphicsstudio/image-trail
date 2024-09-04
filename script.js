document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".items");
    let imgindex = 1;
    let animationTimeout = null;
    let currentlyPlaying = false;

    function addNewItem(x, y) {
        const newItem = document.createElement("div");
        newItem.className = "item";
        newItem.style.left = `${x - 75}px`;
        newItem.style.top = `${y - 100}px`;

        const img = document.createElement("img");
        img.src = `/img${imgindex}.jpg`;
        newItem.appendChild(img);
        imgindex = (imgindex % 15) + 1;  // Correcting the variable name here

        container.appendChild(newItem);
        manageItemLimit();
    }

    function manageItemLimit() {
        while (container.children.length > 20) {
            container.removeChild(container.firstChild);
        }
    }

    function startAnimation() {
        if (currentlyPlaying || container.children.length === 0) return;
        currentlyPlaying = true;

        gsap.to(".item", {
            y: 1000,
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            stagger: 0.025,
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
