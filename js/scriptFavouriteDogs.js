document.addEventListener("DOMContentLoaded", function () {
  modal();
  displayListOfFavouriteDogs();
});

function modal() {
  const adoptModal = document.getElementById("adoptModal");
  adoptModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget; // Button that triggered the modal
    const dogName = button.getAttribute("data-dog-name"); // Extract info from data-* attributes

    // Update the modal's content.
    const modalTitle = adoptModal.querySelector(".modal-title");
    const modalBody = adoptModal.querySelector(".modal-body");

    modalTitle.textContent = "Adopt " + dogName;
    modalBody.textContent = "Are you sure you want to adopt " + dogName + "?";
  });
}

function deleteFavouriteDog(dogName, dogImg) {
    let list = JSON.parse(localStorage.getItem("list"));

    for (let i = 0; i < list.length; i++) {
        let dog = list[i];

        //if this is dog to delete
        if (dog.name === dogName && dog.image === dogImg) {
            if (confirm("Usunąć psa z listy?")) {
                //delete from list
                list.splice(i, 1);

                localStorage.setItem("list", JSON.stringify(list));

                displayListOfFavouriteDogs();
            }
            break;
        }
    }
}

function displayListOfFavouriteDogs(){
    let dogList = document.getElementById("dog-list");
  dogList.innerHTML = ""; // Clear the content of the dogList element
  let list = JSON.parse(localStorage.getItem("list"));
  if (list == null || list.length==0) {
    dogList.innerHTML +=
      "<p class='centered-text'>Your list is empty! Let's go and add some dogs.</p>";
  }
  list.forEach((el) => {
    // Create a div for gutter spacing
    let div = document.createElement("div");
    div.className = "col-md-6 col-lg-4";

    // Create a container for the image and name
    let card = document.createElement("div");
    card.className = "dog-card";

    // Create an img element and set its src to the image URL
    let img = document.createElement("img");
    img.src = el.image;
    img.alt = "Random Dog Image"; // Set the alt attribute
    img.className = "img-of-dog";

    // Create a p element for the name
    let nameElement = document.createElement("p");
    nameElement.textContent = el.name;
    nameElement.className = "name-of-dog";

    // Button adopt me
    let button = document.createElement("button");
    button.textContent = "Adopt me";
    button.className = "btn btn-outline-primary";
    button.setAttribute("data-bs-toggle", "modal"); // Add data-bs-toggle attribute
    button.setAttribute("data-bs-target", "#adoptModal"); // Add data-bs-target attribute
    button.setAttribute("data-dog-name", el.name); // Add data-dog-name attribute

    // Button with heart icon
    let xButton = document.createElement("button");
    xButton.className = "top-button";
    xButton.innerHTML = "<i class='fa-solid fa-xmark'></i>"; // Font Awesome heart icon
    xButton.setAttribute("data-dog-name", el.name); // Add data-dog-name attribute
    xButton.setAttribute("data-dog-img", el.image); // Add data-dog-img attribute

    // Add event listener for x button
    xButton.addEventListener("click", function () {
      const dogName = this.getAttribute("data-dog-name");
      const dogImg = this.getAttribute("data-dog-img");
      deleteFavouriteDog(dogName, dogImg);
    });

    // Div for name and button
    let bottomDiv = document.createElement("div");
    bottomDiv.className = "bottom-card";
    bottomDiv.appendChild(nameElement);
    bottomDiv.appendChild(button);

    // Append elements to card
    card.appendChild(img);
    card.appendChild(xButton);
    card.appendChild(bottomDiv);

    // Append card to container div
    div.appendChild(card);

    // Add container div to dogList
    dogList.appendChild(div);
  });
}
