function showMessage(formId, message) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert(message);
        form.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showMessage("contactForm", "Message sent successfully!");
    showMessage("donationForm", "Thank you for your donation!");
});

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;

        const increment = target / 100;

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
});

const stories = [
    {
        title: "Community Tech Hub",
        text: "We trained over 200 students in digital skills."
    },
    {
        title: "Small Business Growth",
        text: "A local business increased revenue by 60%."
    },
    {
        title: "School Connectivity",
        text: "We connected rural schools to the internet."
    }
];

let currentStory = 0;

function showStory() {
    document.getElementById("storyTitle").innerText = stories[currentStory].title;
    document.getElementById("storyText").innerText = stories[currentStory].text;
}

function nextStory() {
    currentStory = (currentStory + 1) % stories.length;
    showStory();
}

function prevStory() {
    currentStory = (currentStory - 1 + stories.length) % stories.length;
    showStory();
}

document.addEventListener("DOMContentLoaded", showStory);

function toggleInfo() {
    const info = document.getElementById("extraInfo");
    info.style.display = info.style.display === "none" ? "block" : "none";
}

function scrollToDonate() {
    window.location.href = "donate.html";
}