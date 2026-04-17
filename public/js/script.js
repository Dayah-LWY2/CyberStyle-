// DOM Elements for the sidebar and menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.sidebar .close-btn');
const submenuLink = document.querySelector('.sidebar .submenu > a');
const submenu = document.querySelector('.sidebar .submenu');

// Open the sidebar when the hamburger menu is clicked
hamburgerMenu.addEventListener('click', () => {
    sidebar.classList.add('active');
});

// Close the sidebar when the close button is clicked
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Toggle the dropdown menu when "Shop All" is clicked
submenuLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default action of anchor tag
    submenu.classList.toggle('active');
});

// Close the sidebar when clicking outside of it
window.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && event.target !== hamburgerMenu) {
        sidebar.classList.remove('active');
    }
});

// Form submission handling
document.getElementById('product-form')?.addEventListener('submit', function(event) {
    var targetButton = event.submitter;
    var action = targetButton.getAttribute('data-action');
    this.action = action;
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript loaded");

    const carousel = document.querySelector(".carousel-inner");
    const carouselItems = document.querySelectorAll(".carousel-item");
    let carouselIndex = 0;
    const totalCarouselItems = carouselItems.length;

    // Carousel functionality
    if (totalCarouselItems > 0) {
        carousel.style.width = `${100 * totalCarouselItems}%`;

        function slideToNext() {
            console.log("Sliding to index: " + carouselIndex);
            carouselIndex = (carouselIndex + 1) % totalCarouselItems;
            carousel.style.transform = `translateX(-${carouselIndex * 100}%)`;
        }

        setInterval(slideToNext, 3000);
    } else {
        console.error("No carousel items found");
    }

    // Image slider functionality for thumbnails
    const thumbnails = document.querySelectorAll(".thumbnail");
    const mainImage = document.getElementById("main-product-image");

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener("click", function() {
                mainImage.src = this.src;
            });
        });

        let imageIndex = 0;
        const totalImages = thumbnails.length;

        function updateMainImage() {
            console.log("Updating main image to index: " + imageIndex);
            imageIndex = (imageIndex + 1) % totalImages;
            mainImage.src = thumbnails[imageIndex].src;
        }

        setInterval(updateMainImage, 3000);
    } else {
        console.error("Thumbnails or main image not found");
    }

    // FAQ section functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isVisible = answer.classList.contains('open');

            // Close all other answers
            faqQuestions.forEach(item => {
                const ans = item.nextElementSibling;
                if (ans !== answer) {
                    ans.style.maxHeight = null;
                    ans.classList.remove('open');
                    item.classList.remove('active');
                    item.querySelector('.icon').textContent = '+';
                }
            });

            // Toggle the selected answer
            if (isVisible) {
                answer.style.maxHeight = null;
                answer.classList.remove('open');
                question.classList.remove('active');
                question.querySelector('.icon').textContent = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.classList.add('open');
                question.classList.add('active');
                question.querySelector('.icon').textContent = 'x';
            }
        });
    });

    // Search bar functionality
    const searchBar = document.getElementById('search-bar');
    const filterOptions = document.getElementById('filter-options');
    const suggestionBox = document.getElementById('suggestion-box');

    // Function to fetch autocomplete suggestions
    const fetchSuggestions = async (query) => {
        if (!query) {
            suggestionBox.innerHTML = '';
            suggestionBox.style.display = 'none';
            return;
        }

        try {
            const response = await fetch(`/autocomplete?q=${encodeURIComponent(query)}`);
            const suggestions = await response.json();
            displayDropdown(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    // Function to display suggestions in the dropdown
    const displayDropdown = (suggestions) => {
        suggestionBox.innerHTML = '';
        
        if (suggestions.length === 0) {
            suggestionBox.style.display = 'none';
            return;
        }

        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.classList.add('dropdown-item');
            suggestionElement.textContent = suggestion.name;
            suggestionElement.addEventListener('click', () => {
                window.location.href = suggestion.url;
            });
            suggestionBox.appendChild(suggestionElement);
        });

        suggestionBox.style.display = 'block';
    };

    // Event listener for input in the search bar
    searchBar.addEventListener('input', function() {
        const query = this.value.trim();
        fetchSuggestions(query);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (!suggestionBox.contains(event.target) && event.target !== searchBar) {
            suggestionBox.style.display = 'none';
        }
    });

    // Handle form submission via Enter key
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event) {
        suggestionBox.style.display = 'none';
    });

    // Stock functionality
    try {
        var stockDataElement = document.getElementById('stock-data');
        if (stockDataElement) {
            var stockData = JSON.parse(stockDataElement.value);
            var sizeSelect = document.getElementById('size-select');
            var stockDisplay = document.getElementById('stock-display');
            var quantityInput = document.getElementById('quantity');
            var increaseBtn = document.getElementById('increaseQty');
            var decreaseBtn = document.getElementById('decreaseQty');
            var addToCartBtn = document.getElementById('add-to-cart-btn');
            var buyNowBtn = document.getElementById('buy-now-btn');

            var selectedSizeStock = 0;

            // Handle size selection
            sizeSelect.addEventListener('change', function () {
                var selectedSize = sizeSelect.value;

                if (stockData[selectedSize]) {
                    selectedSizeStock = stockData[selectedSize];
                    stockDisplay.textContent = 'Stock Available: ' + selectedSizeStock;
                    increaseBtn.disabled = false;
                    decreaseBtn.disabled = true; // Initial quantity is 1
                    quantityInput.value = 1;
                    addToCartBtn.disabled = false;
                    buyNowBtn.disabled = false;
                } else {
                    stockDisplay.textContent = 'Please select a valid size';
                    increaseBtn.disabled = true;
                    decreaseBtn.disabled = true;
                    addToCartBtn.disabled = true;
                    buyNowBtn.disabled = true;
                }
            });

            increaseBtn.addEventListener('click', function () {
                var currentQuantity = parseInt(quantityInput.value);
                
                if (currentQuantity < selectedSizeStock) {
                    quantityInput.value = currentQuantity + 1;
                    decreaseBtn.disabled = false; // Enable decrease button
                }
                
                if (parseInt(quantityInput.value) === selectedSizeStock){
                    increaseBtn.disabled = true; // Disable increase button when max stock is reached
                }
            });

            decreaseBtn.addEventListener('click', function() {
                var currentQuantity = parseInt(quantityInput.value);

                if(currentQuantity > 1) {
                    quantityInput.value = currentQuantity - 1;
                    increaseBtn.disabled = false; // Enable increase button
                }

                if(parseInt(quantityInput.value) === 1) {
                    decreaseBtn.disabled = true; // Disable decrease button when quantity is 1
                }
            });
        }
    } catch (error) {
        console.error("Error in stock functionality:", error);
    }

    // Profile edit functionality
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const genderInput = document.getElementById('gender');
    const dobInput = document.getElementById('dob');
    const addressInput = document.getElementById('address');
    const passwordInput = document.getElementById('password');

    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const inputs = [usernameInput, emailInput, phoneInput, genderInput, dobInput, addressInput, passwordInput];

    // Check if the elements are correctly selected
    console.log('Edit button:', editBtn);
    console.log('Save button:', saveBtn);
    console.log('Inputs:', inputs);

    // Enable editing when Edit button is clicked
    editBtn.addEventListener('click', () => {
        console.log("Edit button clicked");
        inputs.forEach(input => {
            input.disabled = false;  // Enable each input
            console.log(input.id + ' is enabled');
        });

        editBtn.classList.add('profile-hidden');  // Hide the Edit button
        saveBtn.classList.remove('profile-hidden');  // Show the Save button
    });

    // Save functionality
    saveBtn.addEventListener('click', () => {
        const updatedData = {
            username: usernameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            gender: genderInput.value,
            dob: dobInput.value,
            address: addressInput.value,
            password: passwordInput.value
        };

        console.log("Updated Data:", updatedData);

        fetch('/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                inputs.forEach(input => input.disabled = true);  // Disable inputs again after saving
                saveBtn.classList.add('profile-hidden');  // Hide Save button
                editBtn.classList.remove('profile-hidden');  // Show Edit button
                alert('Profile updated successfully!');
            } else {
                alert('Error updating profile.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving your profile.');
        });
    });
});


// Popup functionality
function showPopupMessage(type) {
    // Show different messages based on the type (logged in or logged out)
    let popup = document.getElementById(type + '-popup');
    
    if (popup) {
        popup.classList.add('show');

        // Hide the popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }
}

// Call the function when the page loads
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('loggedIn') === 'true') {
        showPopupMessage('logged-in');
    } else if (params.get('loggedOut') === 'true') {
        showPopupMessage('logged-out');
    } else if (params.get('signedUp') === 'true') {
        showPopupMessage('signed-up');
    }
};

function validateReviewForm() {
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    if (!rating || !comment) {
alert('All fields are required.');
        return false;
    }

    if (rating < 1 || rating > 5) {
        alert('Rating must be between 1 and 5.');
        return false;
    }

    return true;
}

function updateTotal() {
    const useRewardsCheckbox = document.getElementById('useRewards');
    const totalAmountElement = document.getElementById('totalAmount');
    const rewardsPointsElement = document.getElementById('rewardsPoints');
    const pointsAddedElement = document.getElementById('pointsAdded'); // Always display points added
    const deductionElement = document.getElementById('deduction'); // Element to display RM deduction
    const pointsDeductedElement = document.getElementById('pointsDeducted'); // Element to display points deducted

    const cartItems = document.querySelectorAll('.products-table tbody tr');
    let totalAmount = 0;
    const shippingCost = 5.90; // Shipping cost

    const rewardsPoints = Math.round(parseFloat(rewardsPointsElement.innerText)) || 0;

    // Recalculate the total based on cart items
    cartItems.forEach(item => {
        const priceText = item.cells[2].innerText.replace('RM', '').trim(); // Access price cell
        const quantityText = item.cells[3].innerText.trim(); // Access quantity cell

        const price = parseFloat(priceText);
        const quantity = parseInt(quantityText);

        if (!isNaN(price) && !isNaN(quantity)) {
            totalAmount += price * quantity;
        }
    });

    totalAmount += shippingCost;

    // Calculate discount based on checkbox
    let discount = 0;
    let pointsDeducted = 0;
    if (useRewardsCheckbox.checked) {
        discount = Math.min(rewardsPoints * 0.01, totalAmount); // Maximum RM deduction
        pointsDeducted = Math.floor(discount / 0.01); // Convert RM discount to points
    } else {
        // Set to 0 if not checked
        discount = 0;
        pointsDeducted = 0;
    }

    const updatedTotal = totalAmount - discount;
    const finalTotal = Math.max(updatedTotal, 0);

    // Update the total amount in the HTML
    totalAmountElement.innerText = finalTotal.toFixed(2);

    // Display RM deduction and points deducted
    deductionElement.innerText = `RM ${discount.toFixed(2)}`; // Always show RM deducted (will show 0 if not checked)
    pointsDeductedElement.innerText = pointsDeducted; // Always show points deducted (will show 0 if not checked)

    // Always display points added
    const pointsAdded = Math.floor(totalAmount * 1); // Calculation for points added
    pointsAddedElement.innerText = pointsAdded; // Display points added

    // Update rewards points display
    rewardsPointsElement.innerText = Math.round(rewardsPoints);
}

// Add event listener to update the total when rewards checkbox is clicked
document.getElementById('useRewards').addEventListener('change', updateTotal);

// Initial total calculation on page load
updateTotal();

async function receiveProduct(productCode, purchaseDate) {
    try {
        // Send AJAX request to the backend
        const response = await fetch('/receive-product-ajax', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productCode, purchaseDate })
        });

        const data = await response.json();

        if (data.success) {
            // Find the product element
            const productElement = document.getElementById(`product-${productCode}`);
            
            // Update the button to "Rate Now" and adjust other relevant information
            const buttonHtml = `
                <a href="/product/${productCode}" class="rate-now-btn">Rate Now</a>
            `;
            const deliveryInfoHtml = `Delivered on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;

            // Update only the button and delivery status
            productElement.querySelector('.purchase-action').innerHTML = buttonHtml;
            productElement.querySelector('.delivery-status').innerHTML = deliveryInfoHtml;
        } else {
            console.error('Error receiving product:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
