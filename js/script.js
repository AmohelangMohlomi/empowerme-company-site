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