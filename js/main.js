//Select Elements
let progressBar = document.querySelector(".progress");
let linksHolder = document.querySelector("nav ul");
let links = document.querySelectorAll("header nav ul li a");
let burgerIcon = document.querySelector("header nav i");
let sections = document.querySelectorAll(".section");
let landing = document.querySelector(".landing");
let images = ["landing1.jpg", "landing2.jpg", "landing3.jpg"];
let indicatorsHolder = document.querySelector(".indicators");
let rightBtn = document.querySelector(".right-arrow");
let leftBtn = document.querySelector(".left-arrow");
let scrollBtn = document.querySelector("button.scroll");
let statsSection = document.querySelector(".stats")
let stats = document.querySelectorAll(".stats .box .number");
let testimonials = document.querySelector(".testimonials");
let skillProgress = document.querySelectorAll(".skill span");


//Navbar Functions 
links.forEach((link) => {
    link.onclick = (e) => {
        removeActiveLink();
        e.target.parentElement.classList.add("active");
        if (e.target.textContent.toLowerCase() === "home") {
            window.scrollTo({
                top: 0,
            });
        }
        else {
            document.querySelector(`.${e.target.textContent.toLowerCase()}`).scrollIntoView();
        }
    }
}
);

burgerIcon.onclick = function (e) {
    this.classList.toggle("active");
}

linksHolder.onclick = (e) => {
    e.stopPropagation();
}

document.onclick = (e) => {

    if (burgerIcon.classList.contains("active")) {
        if (e.target !== burgerIcon && e.target !== linksHolder) {
            burgerIcon.classList.remove("active");
        }

    }
}

//set Images Counter
let currentImg = 1;
let numOfImgs = images.length;

//Create Indicators
for (let i = 0; i < images.length; i++) {
    let li = document.createElement("li");
    li.dataset.number = i + 1;
    indicatorsHolder.appendChild(li);
}
let indicators = document.querySelectorAll(".indicators li");
indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
        currentImg = parseInt(e.target.dataset.number);
        sliderControl();
    })
})
rightBtn.onclick = rightArrowAction;
leftBtn.onclick = leftArrowAction;

sliderControl();




function sliderControl() {
    rightBtn.classList.remove("disable");
    leftBtn.classList.remove("disable");
    //Remove Active Class From All indicators
    indicators.forEach((indicator) => {
        if (indicator.classList.contains("active")) {
            indicator.classList.remove("active");
        }
    })
    //Add active Class On Current Indicator
    indicators[currentImg - 1].classList.add("active");
    landing.style.backgroundImage = `url(images/${images[currentImg - 1]})`;
    if (currentImg === numOfImgs) {
        rightBtn.classList.add("disable");
    }
    if (currentImg === 1) {
        leftBtn.classList.add("disable");
    }
}




//Increase Stats Numbers & Scroll To Top &Progress On Scroll & Skills Progress
let increase = false;
let progressValue = Number((100 / sections.length).toFixed(2));
let reachedTestimonials = false;
window.onscroll = () => {
    //Progress On Scroll
    if (window.scrollY < sections[0].offsetTop) {
        progressBar.style.width = "0";
        // Add Active Class On Home Link
        removeActiveLink();
        document.querySelector("header nav ul li a[href='#']").parentElement.classList.add("active");
    }
    for (let i = 0; i < sections.length; i++) {
        if (window.scrollY >= sections[i].offsetTop) {
            progressBar.style.width = `${Number(((100 / sections.length) * (i + 1)).toFixed(2))}%`;
        }

    }
    // Scroll To Top
    if (window.scrollY >= 1500) {
        scrollBtn.classList.add("up");
        scrollBtnEvent(scrollBtn);
    }
    else {
        scrollBtn.classList.remove("up");
    }
    // Increase Stats Numbers
    if (!increase) {
        if (window.scrollY >= statsSection.offsetTop) {
            stats.forEach((stat) => {
                increaseNumbers(stat);
            }
            );
            increase = true;
        }
    }
    // Skills Progress
    if (!reachedTestimonials) {
        if (window.scrollY >= testimonials.offsetTop) {
            for (let i = 0; i < skillProgress.length; i++) {
                skillProgress[i].style.width = skillProgress[i].dataset.progress;
                skillProgress[i].classList.add("run");
            }
        }

    }
}




//Functions
function removeActiveLink() {
    links.forEach((l) => {
        if (l.parentElement.classList.contains("active")) {
            l.parentElement.classList.remove("active");
        }
    });
}
function rightArrowAction() {
    if (currentImg === numOfImgs) {

    } else {

        currentImg++;
        sliderControl();

    }
}


function leftArrowAction() {
    if (currentImg === 1) {

    } else {

        currentImg--;
        sliderControl();

    }
}
function scrollBtnEvent(btn) {
    btn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
}

function increaseNumbers(num) {
    let counterInterval = setInterval(() => {

        if (num.textContent < Number(num.dataset.stat)) {
            if (Number.isInteger(Number(num.dataset.stat))) {
                num.textContent++;
            } else {
                num.textContent = (Number(num.textContent) + 0.001).toFixed(3);
            }
        }
        else {
            clearInterval(counterInterval);
        }
    }, 0.1 / num.dataset.stat);
}


