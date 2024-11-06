//fullpage////////////////////////////////////////////////////////////////////////////////////////////////
fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true,
    navigationPosition: 'left',
    slidesNavigation: true,
    // navigationTooltips: ['Home', 'Shop by Category', 'Latest Stories', 'Our Story', 'Our Community'],
    showActiveTooltip: false,
    slidesNavPosition: 'bottom',
    controlArrows: false,
    afterRender: function () {
        const tooltips = document.querySelectorAll('.fp-tooltip');
        tooltips.forEach(tooltip => {
            tooltip.style.color = '#384150';
        });
    }
});
//OVERLAY////////////////////////////////////////////////////////////////////////////////////////////////
// Function to open the overlay
function openOverlay(section) {
    console.log("Opening overlay:", section);
    document.getElementById(section + 'Overlay').style.display = "block";
}

// Function to close the overlay
function closeOverlay(section) {
    document.getElementById(section + 'Overlay').style.display = "none";
}

//shop Overlay=============================================================================================
// Function to show image on hover
function showImage(imageId) {
    document.getElementById(imageId).style.opacity = '1';
}

// Function to hide image when hover is removed
function hideImage(imageId) {
    document.getElementById(imageId).style.opacity = '0';
}
//contact us overlay========================================================================================
// Function to handle the form submission
function sendMessage() {
    // Get values from the input fields
    const name = document.querySelector("#contactOverlay sl-input[placeholder='Name']").value;
    const email = document.querySelector("#contactOverlay sl-input[placeholder='Email']").value;
    const message = document.querySelector("#contactOverlay sl-textarea").value;

    // Alert for empty fields
    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    // Placeholder for form submission logic
    console.log("Message Sent!", { name, email, message });

    // Show success message
    alert("Thank you, " + name + "! Your message has been sent.");

    // Optionally, clear the form fields after sending
    document.querySelector("#contactOverlay sl-input[placeholder='Name']").value = "";
    document.querySelector("#contactOverlay sl-input[placeholder='Email']").value = "";
    document.querySelector("#contactOverlay sl-textarea").value = "";
}

// Event listener for the button
document.querySelector("#contactOverlay sl-button").addEventListener("click", sendMessage);


// SECTION 2////////////////////////////////////////////////////////////////////////////////////////////////
// Define SVG polygon points for morphing shapes
const shapeOnePoints = "683 53.3 877.02 53.3 1020 219 1225.07 219 1225.07 384.07 1042.68 714.83 481 714.83 141.32 482.33 141.32 310.18 422 310.18 422 108.8 683 108.8 683 53.3";
const shapeTwoPoints = "682.68 79 876.7 79 952.68 174.7 1192.68 247.7 1224.75 409.77 1011.68 689.7 416.68 652.7 141 508.03 141 335.88 394.68 304.7 421.68 134.49 589.68 129.7 682.68 79";
const shapeThreePoints = "682.68 60.3 902.68 88 1019.68 226 1127.68 259 1224.75 391.07 1172.68 708 493.68 678 141 489.33 141 317.18 299.68 180 421.68 115.8 613.68 80 682.68 60.3";
const shapeFourPoints = "682.68 59 876.7 59 973.68 119.7 1147.68 231.7 1224.75 389.77 1011.68 669.7 382.68 708.7 141 488.03 141 315.88 347.68 244.7 421.68 114.49 597.68 72.7 682.68 59";

// Define the loadScene function
function loadScene() {
    // Reset visibility of items to trigger animation
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translate(0, 0)';
    });

    const tl = gsap.timeline({ delay: 0.5 });

    // Adjust animations based on screen size
    const isSmallScreen = window.innerWidth < 769;

    if (isSmallScreen) {
        // Smaller screen animation adjustments
        tl.to('.category-item1', { opacity: 1, x: 0, y: 0, duration: 0, ease: 'power1.out' })
            .to('.category-item2', { opacity: 1, x: 0, duration: 0, ease: 'power1.out' }, '-=0.4')
            .to('.category-item3', { opacity: 1, y: 0, duration: 0, ease: 'power1.out' }, '-=0.4')
            .to('.category-item4', { opacity: 1, x: 0, y: 0, duration: 0, ease: 'power1.out' }, '-=0.4')
            .to('.category-item5', { opacity: 1, y: 0, x: 0, duration: 0, ease: 'power1.out' }, '-=0.4');
    } else
        // Normal screen animation
        tl.to('.category-item1', { opacity: 1, x: 5, y: -100, duration: 1, ease: 'power1.out' })
            .to('.category-item2', { opacity: 1, x: 100, duration: 1, ease: 'power1.out' }, '-=0.8')
            .to('.category-item3', { opacity: 1, y: -60, duration: 1, ease: 'power1.out' }, '-=0.8')
            .to('.category-item4', { opacity: 1, x: 100, y: 100, duration: 1, ease: 'power1.out' }, '-=0.8')
            .to('.category-item5', { opacity: 1, y: 90, x: 50, duration: 1, ease: 'power1.out' }, '-=0.8');
}

// Create the IntersectionObserver instance to trigger both animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger the loadScene animation
            loadScene();

            // Start SVG morphing animation
            anime.timeline({
                autoplay: true,
                direction: "alternate",
                loop: false // No looping
            })
                .add({
                    targets: "#animatedPolygon",
                    points: [
                        { value: shapeOnePoints },
                        { value: shapeTwoPoints }
                    ],
                    easing: "easeInOutQuad",
                    duration: 600,
                    offset: 0
                })
                .add({
                    targets: "#animatedPolygon",
                    points: [
                        { value: shapeTwoPoints },
                        { value: shapeThreePoints }
                    ],
                    easing: "easeInOutQuad",
                    duration: 400,
                    offset: 400
                })
                .add({
                    targets: "#animatedPolygon",
                    points: [
                        { value: shapeThreePoints },
                        { value: shapeFourPoints }
                    ],
                    easing: "easeInOutQuad",
                    duration: 600,
                    offset: 800
                })
                .add({
                    targets: "#animatedPolygon",
                    points: [
                        { value: shapeOnePoints },
                    ],
                    easing: "easeInOutQuad",
                    duration: 900,
                    offset: 0
                });
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of section2 is in the viewport
});

// Target the section2 element to observe
observer.observe(document.getElementById('section2'));

//SECTION4////////////////////////////////////////////////////////////////////////////////////////////////

let currentSlide = 1;

function showSlide(slideNumber) {
    // Hide the current slide
    document.getElementById("slid" + currentSlide).style.display = "none";

    // Update current slide
    currentSlide = slideNumber;

    // Show the new slide
    document.getElementById("slid" + currentSlide).style.display = "flex";
}

//section4b/////////////////////////////////////////////////////////////////////////////////////////////////
const container = document.querySelector('.mouse-dragging');
const carousel = container.querySelector('sl-carousel');
const toggle = container.querySelector('sl-switch');

toggle.addEventListener('sl-change', () => {
    carousel.toggleAttribute('mouse-dragging', toggle.checked);
});


//section6 or footer/////////////////////////////////////////////////////////////////////////////////////////
// Subscribe functionality
document.addEventListener("DOMContentLoaded", function () {
    // Getting the subscribe button and email input elements
    const subscribeButton = document.getElementById("subscribeButton");
    const emailInput = document.getElementById("emailInput");

    //click event listener to the subscribe button
    subscribeButton.addEventListener("click", function () {
        //Getting the email input value
        const email = emailInput.value;

        //email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return; // Exit the function if the email is invalid
        }

        console.log("Subscribed with email:", email);

        // thank you message
        alert("Thank you for subscribing!");

        // Clearing the input data
        emailInput.value = "";
    });
});


