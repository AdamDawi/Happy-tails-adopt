document.addEventListener("DOMContentLoaded", function () {
  modal();
  // Fetch data from Dog CEO API
  let dogApi = fetch("https://dog.ceo/api/breeds/image/random/12").then(
    (response) => response.json()
  );

  // Fetch data from Random User API
  let nameApi = fetch("https://randomuser.me/api/?results=12&inc=name").then(
    (response) => response.json()
  );

  // Wait for both requests to complete
  Promise.all([dogApi, nameApi])
    .then((responses) => {
      let dogData = responses[0];
      let nameData = responses[1];

      // Process dog images and names
      let images = dogData.message;
      let names = nameData.results;
      let dogList = document.getElementById("dog-list");
      dogList.innerHTML = ""; // Clear the content of the dogList element

      images.forEach((imageUrl, index) => {
        // Create a div for gutter spacing
        let div = document.createElement("div");
        div.className = "col-md-6 col-lg-4";

        // Create a container for the image and name
        let card = document.createElement("div");
        card.className = "dog-card";

        // Create an img element and set its src to the image URL
        let img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Random Dog Image"; // Set the alt attribute
        img.className = "img-of-dog";

        // Create a p element for the name
        let nameElement = document.createElement("p");
        let user = names[index];
        let dogName = user.name.first;
        nameElement.textContent = dogName;
        nameElement.className = "name-of-dog";

        // Button adopt me
        let button = document.createElement("button");
        button.textContent = "Adopt me";
        button.className = "btn btn-outline-primary";
        button.setAttribute("data-bs-toggle", "modal"); // Add data-bs-toggle attribute
        button.setAttribute("data-bs-target", "#adoptionModal"); // Add data-bs-target attribute
        button.setAttribute("data-dog-name", dogName); // Add data-dog-name attribute
        button.setAttribute("data-dog-img", imageUrl); // Add data-dog-img attribute

        // Button with heart icon
        let heartButton = document.createElement("button");
        heartButton.className = "top-button";
        heartButton.innerHTML = "<i class='fas fa-heart'></i>"; // Font Awesome heart icon
        heartButton.setAttribute("data-dog-name", dogName); // Add data-dog-name attribute
        heartButton.setAttribute("data-dog-img", imageUrl); // Add data-dog-img attribute

        // Add event listener for heart button
        heartButton.addEventListener("click", function () {
          const dogName = this.getAttribute("data-dog-name");
          const dogImg = this.getAttribute("data-dog-img");
          addFavouriteDog(dogName, dogImg);
          console.log(`Favorite dog: ${dogName}, Image: ${dogImg}`);
        });

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

// function modal() {
//   const adoptModal = document.getElementById("adoptionModal");
//   adoptModal.addEventListener("show.bs.modal", function (event) {
//     const button = event.relatedTarget; // Button that triggered the modal
//     const dogName = button.getAttribute("data-dog-name"); // Extract info from data-* attributes

//     // Update the modal's content.
//     const modalTitle = adoptModal.querySelector(".modal-title");
//     const modalBody = adoptModal.querySelector(".modal-body");

//     modalTitle.textContent = "Adopt " + dogName;
//     modalBody.textContent = "Are you sure you want to adopt " + dogName + "?";
//   });
// }

function addFavouriteDog(name, image) {
  //new object
  let dog = {};
  dog.name = name;
  dog.image = image;

  let list = JSON.parse(localStorage.getItem("list"));
  if (list === null) list = [];
  //check if dog is on the list
  let exists = list.some((d) => d.name === name && d.image === image);
  if (!exists) {
    list.push(dog); //add new object to list

    //save list to local storage
    localStorage.setItem("list", JSON.stringify(list));

    //show toast
    let toast = new bootstrap.Toast(document.getElementById("favoriteToast"));
    toast.show();
  }
}

function modal() {
  const adoptModal = document.getElementById("adoptionModal");
  // Funkcja, która będzie wywoływana po kliknięciu przycisku otwierającego modal
  
  adoptModal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget;
        const dogName = button.getAttribute("data-dog-name");
        const dogImg = button.getAttribute("data-dog-img");
        console.log(dogName);
        console.log(dogImg);
        const dogNameInput = document.getElementById('dogName');
        dogNameInput.value = dogName;

        const buttonSubmit = document.getElementById('sub');
        buttonSubmit.setAttribute("data-dog-img", dogImg);
    });

  adoptModal.addEventListener("submit", function (e) {
    e.preventDefault();

    // Pobieranie wartości z formularza
    const adopterName = document.getElementById("adopterName").value;
    const adopterEmail = document.getElementById("adopterEmail").value;
    const dogName = document.getElementById("dogName").value;
    const adoptionReason = document.getElementById("adoptionReason").value;
    const otherPets = document.querySelector(
      'input[name="otherPets"]:checked'
    ).value;
    const homeType = document.getElementById("homeType").value;

    console.log("Hello world!");
    console.log(adopterName);
    console.log(dogName);
    console.log(document.getElementById("sub").getAttribute("data-dog-img"));

    // Tworzenie obiektu adopcji
    const adoption = {
      adopterName,
      adopterEmail,
      dogName,
      adoptionReason,
      otherPets,
      homeType
    };

    // Pobieranie listy adopcji z localStorage
    let adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];

    // Sprawdzanie, czy już istnieje taka adopcja
    const existingAdoption = adoptions.find(
      (adopt) =>
        adopt.dogName === dogName && adopt.adopterEmail === adopterEmail
    );

    if (existingAdoption) {
      alert("This adoption entry already exists.");
    } else {
      // Dodawanie nowej adopcji do listy
      adoptions.push(adoption);
      localStorage.setItem("adoptions", JSON.stringify(adoptions));
      alert("Adoption request submitted successfully!");

      // Czyszczenie formularza
      adoptionForm.reset();

      // Zamknięcie modala
      const adoptionModal = new bootstrap.Modal(
        document.getElementById("adoptionModal")
      );
      adoptionModal.hide();
    }
  });
}
