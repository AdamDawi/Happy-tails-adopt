document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from Dog CEO API
    let dogApi = fetch("https://dog.ceo/api/breeds/image/random/6").then(
        (response) => response.json()
    );

    // Fetch data from Random User API
    let nameApi = fetch("https://randomuser.me/api/?results=6&inc=name") // Change to 6 to match the number of images
        .then((response) => response.json());

    // Wait for both requests to complete
    Promise.all([dogApi, nameApi])
        .then((responses) => {
            let dogData = responses[0];
            let nameData = responses[1];

            // Debug data
            console.log(dogData);
            console.log(nameData);

            // Process dog images and names
            let images = dogData.message;
            let names = nameData.results;
            let dogList = document.getElementById("dog-list");
            dogList.innerHTML = ""; // Clear the content of the dogList element

            images.forEach((imageUrl, index) => {
                // Create a div for gutter spacing
                let div = document.createElement("div");
                div.className = "col-md-6 col-lg-4 bg-body-tertiary";

                // Create a container for the image and name
                let card = document.createElement("div");
                card.className = "dog-card";

                // Create an img element and set its src to the image URL
                let img = document.createElement("img");
                console.log(imageUrl); // Debug the image URL
                img.src = imageUrl;
                img.alt = "Random Dog Image"; // Set the alt attribute
                img.className = "img-of-dog";

                // Create a p element for the name
                let nameElement = document.createElement("p");
                let user = names[index];
                nameElement.textContent = user.name.first;
                nameElement.className = "name-of-dog";

                // Button adopt me
                let button = document.createElement("button");
                button.textContent = "Adopt me";
                button.className = "btn btn-outline-primary";

                // Button with heart icon
                let heartButton = document.createElement("button");
                heartButton.className = "heart-button";
                heartButton.innerHTML = "<i class='fas fa-heart'></i>"; // Font Awesome heart icon

                // Div for name and button
                let bottomDiv = document.createElement("div");
                bottomDiv.className = "bottom-card";
                bottomDiv.appendChild(nameElement);
                bottomDiv.appendChild(button);

                // Append elements to card
                card.appendChild(img);
                card.appendChild(heartButton);
                card.appendChild(bottomDiv);

                // Append card to container div
                div.appendChild(card);

                // Add container div to dogList
                dogList.appendChild(div);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
