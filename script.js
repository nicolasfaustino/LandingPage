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

    setInterval(showNextItem, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
    const loginDiv = document.getElementById("loginDiv");

    async function loadLoginModal() {
        try {
            const response = await fetch("login/index.html");
            const modalHTML = await response.text();

            document.body.insertAdjacentHTML("beforeend", modalHTML);

            const loginDialog = document.getElementById("login");
            const btnFechar = document.getElementById("btnFechar");

            loginDialog.showModal();

            btnFechar.addEventListener("click", () => {
                loginDialog.close();
            });
        } catch (error) {
            console.error("Erro ao carregar o modal de login:", error);
        }
    }

    loginDiv.addEventListener("click", (event) => {
        event.preventDefault();
        loadLoginModal();
    });
});
