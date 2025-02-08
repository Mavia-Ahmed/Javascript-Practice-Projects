document.addEventListener("DOMContentLoaded", function () {
    const imageWrapper = document.querySelector(".image-wrapper");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    // Sample Images (Replace with actual image URLs)
    let images = [
        "hd1.jpg",
        "hd3.jpg",
        "hd4.jpg",
        "hd5.jpg",
        "hd6.jpg",
        "hd7.jpg",
        "hd8.jpg",
        "hd9.jpg",
        "hd10.jpg",
        "hd11.jpg",
        "new2.jpg"
    ];

    let currentIndex = 0;
    const imagesPerPage = 6;

    function updateGallery() {
        imageWrapper.innerHTML = ""; // Clear current images
        const start = currentIndex * imagesPerPage;
        const end = start + imagesPerPage;
        const visibleImages = images.slice(start, end);

        visibleImages.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.classList.add("slider-image");
            imageWrapper.appendChild(img);
        });
    }

    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.ceil(images.length / imagesPerPage) - 1;
        }
        updateGallery();
    });

    nextBtn.addEventListener("click", function () {
        if ((currentIndex + 1) * imagesPerPage < images.length) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateGallery();
    });

    updateGallery(); // Show first set of images
});
