document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        console.log('showNextItem');
        carouselItems[currentIndex].classList.remove('active');
        console.log(currentIndex);
        currentIndex = (currentIndex + 1) % carouselItems.length;
        console.log(currentIndex);
        carouselItems[currentIndex].classList.add('active');
        console.log(currentIndex);
    }

    function showPreviousItem() {
        carouselItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        carouselItems[currentIndex].classList.add('active');
    }

    document.querySelector('.next').addEventListener('click', showNextItem);
    document.querySelector('.prev').addEventListener('click', showPreviousItem);

    // Optional: Auto-play functionality
    setInterval(showNextItem, 3000); // Change item every 3 seconds
});