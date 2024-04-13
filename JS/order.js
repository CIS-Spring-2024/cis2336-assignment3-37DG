let numOfBites = 3;
let numOfMeals = 3;

let finalOrder = [
    0,  // bite 1
    0,  // bite 2
    0,  // bite 3
    0,  // meal 1
    0,  // meal 2
    0   // meal 3
];

// This JS file is split into sections for readability.

/* NAVIGATION LINKS */

let links = document.querySelectorAll("#navbar a");

// Mouse hover interactions
links.forEach(element => {
    element.addEventListener("mouseover", function(e) {
        this.style.color = "lightgray";
    });
    element.addEventListener("mouseout", function(e) {
        this.style.color = "";
    })
});

/* TABS */

let tabtitles = document.querySelectorAll("#tabselect h1");
let tab1 = document.querySelector("#tab1");
let tab2 = document.querySelector("#tab2");

// Default tab settings
tabtitles[0].style.color = "black";
tab1.style.display = "block";
tab2.style.display = "none";

// Tab interactions
tabtitles.forEach(title => {
    // Mouse hover interactions
    title.addEventListener("mouseover", function(e) {
        this.style.backgroundColor = "rgb(121, 226, 195)";
    });
    title.addEventListener("mouseout", function(e) {
        this.style.backgroundColor = "";
    });

    // Changing tabs
    title.addEventListener("click", function(e) {

        // Close details pane when changing tabs
        document.querySelector("#openitem").style.display = "none";
        document.querySelector("#checkout").style.display = "none";
        document.querySelector("#tabs").style.display = "block";

        // Styling clicked tab title and showing tab
        if (this.textContent == "BITES") {
            tabtitles[0].style.color = "black";
            tab1.style.display = "block";

            tabtitles[1].style.color = "";
            tab2.style.display = "none";
        } else {
            tabtitles[0].style.color = "";
            tab1.style.display = "none";

            tabtitles[1].style.color = "black";
            tab2.style.display = "block";
        }
        
    });
});

/* DYNAMIC MENUS */

let menuList = [];

// Uses itemInformationProvider function to retrieve information such as
// names and descriptions of menu items and places the items onto the page
for (let i = 0; i < numOfBites + numOfMeals; i++) {
    // menuOrder object template
    const menuOrder = {name:"Title", img:"../Image/clipart.avif", sdesc:"Description", ldesc:"Description", id:-1};
    // Provides item name, image, short description, and long description
    itemInformationProvider(i, menuOrder);

    // Creating menu item container
    const orderDiv = document.createElement("div");

    // Creating item image with provided link
    const orderImg = document.createElement("img");
    orderImg.src = menuOrder.img;

    // Creating item title with provided name
    const orderTitle = document.createElement("h3");
    orderTitle.appendChild(document.createTextNode(menuOrder.name));

    // Creating short item description with provided short description
    const orderDesc = document.createElement("p");
    orderDesc.appendChild(document.createTextNode(menuOrder.sdesc));

    // Placing all elements into the menu item container
    orderDiv.appendChild(orderImg);
    orderDiv.appendChild(orderTitle);
    orderDiv.appendChild(orderDesc);
    orderDiv.className = "orderitem";
    orderDiv.id = i;

    // Place menu item onto page
    // Lower id objects are bites; Higher are meals
    if (i < numOfBites) {
        tab1.appendChild(orderDiv);
    } else {
        tab2.appendChild(orderDiv);
    }

    // Add menu item to menuList for future reference
    menuList.push(menuOrder);
}

/* DETAILS PANE */

let orderItems = document.querySelectorAll(".orderitem");
let detailPane = document.querySelector("#openitem");


// showMenuItem takes a menu item's id and fills the detail pane with the 
// required information.
function showMenuItem(id) {
    detailPane.querySelector("#imgblock img").src = menuList[id].img;
    detailPane.querySelector("#wordblock h3").textContent = menuList[id].name;
    detailPane.querySelector("#wordblock p").textContent = menuList[id].ldesc;
}

let itemId = -1;

// Clicking a menu item opens the detail pane for that item
orderItems.forEach(orderItem => {
    // Mouse  hover interactions
    orderItem.addEventListener("mouseover", function(e) {
        this.style.backgroundColor = "rgb(121, 226, 195)";
    });
    orderItem.addEventListener("mouseout", function(e) {
        this.style.backgroundColor = "";
    });

    // Placing item information into detail pane and revealing it
    orderItem.addEventListener("click", function(e) {
        // Filling in image, title, and description
        showMenuItem(this.id);
        // Filling in order amount
        document.querySelector("#additem p").textContent = finalOrder[this.id];
    
        // Ensuring the right buttons are disabled
        if (finalOrder[this.id] <= 0) {
            detailPane.querySelector("#incbtn").disabled = false;
            detailPane.querySelector("#decbtn").disabled = true;
        } else if (finalOrder[this.id] >= 10) {
            detailPane.querySelector("#incbtn").disabled = true;
            detailPane.querySelector("#decbtn").disabled = false;
        }
        // Revealing detail pane
        document.querySelector("#openitem").style.display = "block";
        document.querySelector("#tabs").style.display = "none";
        itemId = this.id;
    });
});

/* ORDERING */

// Buttons interaction

detailPane.querySelectorAll("#additem button").forEach(button => {
    button.addEventListener("mouseover", function(e) {
        this.style.backgroundColor = "gray";
    });
    button.addEventListener("mouseout", function(e) {
        this.style.backgroundColor = "";
    });
});

// Allowing buttons to modify (and limit) order value
let decbtn = detailPane.querySelector("#decbtn");
let incbtn = detailPane.querySelector("#incbtn");
incbtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    // Orders must be 10 or less
    finalOrder[itemId]++;
    if (finalOrder[itemId] >= 10) {
        this.disabled = true;
        decbtn.disabled = false;
        finalOrder[itemId] = 10;
    } else {
        this.disabled = false;
        decbtn.disabled = false;
    }

    // Setting shown order amount
    detailPane.querySelector("#additem p").textContent = finalOrder[itemId];
});
decbtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    // Orders must be 0 or more
    finalOrder[itemId]--;
    if (finalOrder[itemId] <= 0) {
        this.disabled = true;
        incbtn.disabled = false;
        finalOrder[itemId] = 0;
    } else {
        this.disabled = false;
        incbtn.disabled = false;
    }

    // Setting shown order amount
    detailPane.querySelector("#additem p").textContent = finalOrder[itemId];
});

/* EXIT */

document.querySelectorAll(".exit").forEach(button => {
    button.addEventListener("mouseover", function() {
        this.style.backgroundColor = "rgb(121, 226, 195)";
    })
    button.addEventListener("mouseout", function() {
        this.style.backgroundColor = "";
    })
    button.addEventListener("click", function(e) {
        e.preventDefault();

        button.parentNode.style.display = "none";
        document.querySelector("#tabs").style.display = "block";
        document.querySelector("#orderSubmit").style.display = "";

    })
})

/* CHECKOUT */

// Button interactions
document.querySelector("#orderSubmit").addEventListener("mouseover", function(e) {
    this.style.backgroundColor = "rgb(121, 226, 195)";
});
document.querySelector("#orderSubmit").addEventListener("mouseout", function(e) {
    this.style.backgroundColor = "";
});
// Most of the work is done when the user clicks the checkout button
document.querySelector("#orderSubmit").addEventListener("click", function(e) {
    e.preventDefault();

    // Create a list of items the user has selected
    const summary = document.querySelectorAll(".summary");
    let hiddenItems = 0;
    for (let i = 0; i < menuList.length; i++) {
        summary[i].querySelector(".itemLabel").textContent = menuList[i].name + ": ";
        if (finalOrder[i] > 0) {
            summary[i].style.display = "";
            summary[i].querySelector(".itemNum").textContent = finalOrder[i];
            console.log(finalOrder[i]);
        } else {
            summary[i].style.display = "none";
            hiddenItems++;
        }
    }
    // Notify user if they have not selected any items
    if (hiddenItems == finalOrder.length) {
        summary[0].style.display = "";
        summary[0].querySelector(".itemLabel").textContent = "No items to checkout.";
        summary[0].querySelector(".itemNum").style.display = "none";
        summary[0].querySelector(".remBtn").style.display = "none";
        document.querySelector("#checkoutSubmit").disabled = true;
    } else {
        summary[0].querySelector(".itemNum").style.display = "";
        summary[0].querySelector(".remBtn").style.display = "";
        document.querySelector("#checkoutSubmit").disabled = false;
    }

    // Hide the other panes and only show checkout (hide checkout button too)
    document.querySelector("#checkout").style.display = "block";
    document.querySelector("#openitem").style.display = "none";
    document.querySelector("#tabs").style.display = "none";
    document.querySelector("#orderSubmit").style.display = "none";
});

// Create generic div template for each item
let checkoutMenu = document.querySelector("#orderSummary");
for (let i = 0; i < numOfBites + numOfMeals; i++) {
    let itemDiv = document.createElement("div");
    itemDiv.className = "summary";

    let itemLabel = document.createElement("p");
    itemLabel.textContent = "Item " + (i + 1) + ": ";
    itemLabel.className = "itemLabel";
    let itemNum = document.createElement("p");
    itemNum.textContent = 0;
    itemNum.className = "itemNum";
    let remBtn = document.createElement("button");
    remBtn.textContent = "X";
    remBtn.className = "remBtn";
    remBtn.id = i;

    itemDiv.appendChild(itemLabel);
    itemDiv.appendChild(itemNum);
    itemDiv.appendChild(remBtn);

    checkoutMenu.appendChild(itemDiv);
}

// Checkout confirm button interactions
document.querySelector("#checkoutSubmit").addEventListener("mouseover", function(e) {
    this.style.backgroundColor = "rgb(121, 226, 195)";
});
document.querySelector("#checkoutSubmit").addEventListener("mouseout", function(e) {
    this.style.backgroundColor = "";
});
document.querySelector("#checkoutSubmit").addEventListener("click", function(e) {
    e.preventDefault();

    // Extra form validation for redundancy
    for (num of finalOrder) {
        if (num < 0 || num > 10) {
            alert("Invalid order amounts. Minimum of 0 and Maximum of 10 allowed.");
        }
    }

    alert("Order Confirmed. It will take around 5 minutes to prepare. Please remember to provide payment during pickup!");
    
});

// Remove button interactions
document.querySelectorAll(".remBtn").forEach(btn => {
    btn.addEventListener("mouseover", function() {
        this.style.color = "rgb(200, 0, 0)";
    });
    btn.addEventListener("mouseout", function() {
        this.style.color = "";
    });
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        this.parentNode.style.display = "none";
        finalOrder[this.id] = 0;

        let hiddenItems = 0;
        let summary = document.querySelectorAll(".summary");
        summary.forEach(item => {
            if (item.style.display == "none") {
                hiddenItems++;
            }
        })
        if (hiddenItems == finalOrder.length) {
            summary[0].style.display = "";
            summary[0].querySelector(".itemLabel").textContent = "No items to checkout.";
            summary[0].querySelector(".itemNum").style.display = "none";
            summary[0].querySelector(".remBtn").style.display = "none";
            document.querySelector("#checkoutSubmit").disabled = true;
        } else {
            summary[0].querySelector(".itemNum").style.display = "";
            summary[0].querySelector(".remBtn").style.display = "";
            document.querySelector("#checkoutSubmit").disabled = false;
        }    
    });
});


/* MISC */

// Ideally this information would be delivered via a backend
// WebAPI, but creating such an API has not been covered yet. 
// As such, we present an alternative:

// Takes menu item id and menuOrder object and places item information into
// the menuOrder object
function itemInformationProvider(id, item) {
    switch (id) {
        case 0:
            item.name = "Thick-cut Fries";
            item.img = "../Image/steakfries.jpg";
            item.sdesc = "Large steak fries";
            item.ldesc = "These large, fluffy french fries will rocket you into the sky and leave you craving more. NOTE: A small order contains 5 fries while a large order contains 12. An order can be unsalted on request.";
            break;
        case 1:
            item.name = "Voyager Calzone";
            item.img = "../Image/calzone.jpg"
            item.sdesc = "Travel-sized calzone"
            item.ldesc = "Our Voyager Calzone consists of crispy bread on the outside and pepperoni, tomato sauce, and mozzarella cheese on the inside. NOTE: As with most calzones, the insides tend to be very hot. Be careful taking that first bite!";
            break;
        case 2:
            item.name = "Palm Sliders";
            item.img = "../Image/sliders.jpg";
            item.sdesc = "Two burgers that fit in your hand";
            item.ldesc = "Two sliders, one for each hand (or to share). The Voyager classic style includes American cheese and a slice of jalapeño, though these can be removed if desired.";
            break;
        case 3:
            item.name = "Grilled Chicken Salad";
            item.img = "../Image/salad.jpg";
            item.sdesc = "Romaine lettuce, vegetables, and grilled chicken";
            item.ldesc = "Counting calories? This salad will make you feel healthier without sacrificing taste. Salad includes romaine lettuce, chopped spinach, chopped arugula, shredded feta cheese, avocado, and diced grilled chicken. Optionally comes with dijon-lemon, cilantro, or tangy vinaigrette dressings.";
            break;
        case 4:
            item.name = "Hearty Burger & Fries";
            item.img = "../Image/burger.jpg";
            item.sdesc = "Burger with 1/2lbs patty and classic french fries";
            item.ldesc = "Our hearty burger is the epitome of pleasure food. A 1/2lbs beef patty sizzled to perfection with melty American cheese on top is enough to make anyone's mouth water. Add some lettuce, pickles, and crisp tomatoes, and we promise you'll be coming back for more. The fries are crispy and easy to eat, giving you a break between chowing on meaty perfection. NOTE: All toppings can be removed on request.";
            break;
        case 5:
            item.name = "Spicy Meatball Sub";
            item.img = "../Image/meatballsub.jpg";
            item.sdesc = "Meatball and mozzarella sandwich with a kick.";
            item.ldesc = "For those desiring some heat, our meatball sub packs a punch. Five meatballs in a hoagie bun with chopped green onions, melty mozzarella cheese and a drizzle of our special spicy sauce will satiate that appetite and get you crying tears of joy (and spiciness). NOTE: A less spicy and no spice option is available for those opposed to mouth fires.";
            break;
        default:
            break;
    }
}

/* Adapt page for use on a mobile device */

// Check if view window starts small
if (window.innerWidth < 820) {
    document.querySelectorAll(".orderitem").forEach(item => {
        if (item == document.querySelector("#additem"))
        item.style.display = "block";
        item.style.width = "auto";
        item.style.height = "fit-content";
    });
    document.querySelectorAll("#openitem *").forEach(item => {
        item.style.display = "block";
        item.style.width = "auto";
        item.style.height = "auto";
        item.style.margin = "auto";
        item.style.textAlign = "center";

    });
    document.querySelectorAll("#additem").forEach(item => {
        item.style.display = "";
        item.style.width = "";
        item.style.height = "";
        item.style.margin = "";
        item.style.textAlign = "";
    })
    document.querySelectorAll("#additem *").forEach(item => {
        item.style.display = "";
        item.style.width = "";
        item.style.height = "";
        item.style.margin = "";
        item.style.textAlign = "";
    })
    document.querySelector("#orderSummary").style.maxWidth = "100%";

}
// Check if view window becomes small or vice versa
window.onresize = () => {
    if (window.innerWidth < 820) {
        document.querySelectorAll(".orderitem").forEach(item => {
            if (item.className != "#additem") {
                item.style.display = "block";
                item.style.width = "auto";
                item.style.height = "fit-content";
            }

        });
        document.querySelectorAll("#openitem *").forEach(item => {
            item.style.display = "block";
            item.style.width = "auto";
            item.style.height = "auto";
            item.style.margin = "auto";
            item.style.textAlign = "center";
    
        });
        document.querySelectorAll("#additem").forEach(item => {
            item.style.display = "";
            item.style.width = "";
            item.style.height = "";
            item.style.margin = "";
            item.style.textAlign = "";
        });
        document.querySelectorAll("#additem *").forEach(item => {
            item.style.display = "";
            item.style.width = "";
            item.style.height = "";
            item.style.margin = "";
            item.style.textAlign = "";
        });
        document.querySelector("#orderSummary").style.maxWidth = "100%";
    } else {
        document.querySelectorAll(".orderitem").forEach(item => {
            item.style.display = "";
            item.style.width = "";
            item.style.height = "";
        });
        document.querySelectorAll("#openitem *").forEach(item => {
            item.style.display = "";
            item.style.width = "";
            item.style.height = "";
            item.style.margin = "";
            item.style.textAlign = "";
    
        });
        document.querySelector("#orderSummary").style.maxWidth = "";
    }
}