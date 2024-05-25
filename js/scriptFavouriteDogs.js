document.addEventListener("DOMContentLoaded", function () {
  //initialazing listeners
  modal();
  displayListOfFavouriteDogs();
});

function displayListOfFavouriteDogs() {
  let dogList = document.getElementById("dog-list");
  dogList.innerHTML = ""; //clear the content of the dogList element
  let list = JSON.parse(localStorage.getItem("list"));
  if (list == null || list.length == 0) {
    dogList.innerHTML +=
      "<p class='centered-text'>Your list is empty! Let's go and add some dogs.</p>";
  } else
    list.forEach((el) => {
      //create a div for gutter spacing
      let div = document.createElement("div");
      div.className = "col-md-6 col-lg-4";

      //create a container for the image,name and buttons
      let card = document.createElement("div");
      card.className = "dog-card";

      //create an img element and set its src to the image URL
      let img = document.createElement("img");
      img.src = el.image;
      img.alt = "Random Dog Image"; // Set the alt attribute
      img.className = "img-of-dog";

      //create a p element for the name
      let nameElement = document.createElement("p");
      nameElement.textContent = el.name;
      nameElement.className = "name-of-dog";

      //button adopt me
      let button = document.createElement("button");
      button.textContent = "Adopt me";
      button.className = "btn btn-outline-primary";
      button.setAttribute("data-bs-toggle", "modal"); //add data-bs-toggle attribute
      button.setAttribute("data-bs-target", "#adoptionModal"); //add data-bs-target attribute
      button.setAttribute("data-dog-name", el.name); //add data-dog-name attribute
      button.setAttribute("data-dog-img", el.image); //add data-dog-img attribute

      //delete button
      let deleteButton = document.createElement("button");
      deleteButton.className = "top-button";
      deleteButton.innerHTML = "<i class='fa-solid fa-xmark'></i>"; //font Awesome X icon
      deleteButton.setAttribute("data-dog-name", el.name); //add data-dog-name attribute
      deleteButton.setAttribute("data-dog-img", el.image); //add data-dog-img attribute

      //add event listener for delete button
      deleteButton.addEventListener("click", function () {
        const dogName = this.getAttribute("data-dog-name");
        const dogImg = this.getAttribute("data-dog-img");
        deleteFavouriteDog(dogName, dogImg);
      });

      //div for name and button
      let bottomDiv = document.createElement("div");
      bottomDiv.className = "bottom-card";
      bottomDiv.appendChild(nameElement);
      bottomDiv.appendChild(button);

      //append elements to card
      card.appendChild(img);
      card.appendChild(deleteButton);
      card.appendChild(bottomDiv);

      //append card to container div
      div.appendChild(card);

      //add container div to dog list
      dogList.appendChild(div);
    });
}

function modal() {
  const adoptModal = document.getElementById("adoptionModal");
  //the function will be called when the button that opens the modal is clicked
  adoptListener(adoptModal);
  //the function will be called when the button that sumbit form is clicked
  sumbitListener(adoptModal);
}

function adoptListener(adoptModal) {
  adoptModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const dogName = button.getAttribute("data-dog-name");
    const dogImg = button.getAttribute("data-dog-img");
    //add dog name to form
    const dogNameInput = document.getElementById("dogName");
    dogNameInput.value = dogName;
    //add img data to button on form
    const buttonSubmit = document.getElementById("sub");
    buttonSubmit.setAttribute("data-dog-img", dogImg);
  });
}

function sumbitListener(adoptModal) {
  adoptModal.addEventListener("submit", function (e) {
    e.preventDefault();

    //retrieving values ​​from a form
    const adopterName = document.getElementById("adopterName").value;
    const adopterEmail = document.getElementById("adopterEmail").value;
    const dogName = document.getElementById("dogName").value;
    const adoptionReason = document.getElementById("adoptionReason").value;
    const otherPets = document.querySelector(
      'input[name="otherPets"]:checked'
    ).value;
    const homeType = document.getElementById("homeType").value;
    const dogImage = document
      .getElementById("sub")
      .getAttribute("data-dog-img");
    // Select all checked checkboxes with type="checkbox"
    const checkedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    // Convert the NodeList of checked checkboxes to an array and their values
    let aspects = [];
    for(let i=0; i<checkedCheckboxes.length; i++){
        aspects.push(checkedCheckboxes[i].value);
    }

    // Remove the last element from the aspects list because it is value 'on'
    if (aspects.length > 0) {
      aspects.pop();
    }

    // Creating an adoption object
    const adoption = {
      adopterName,
      adopterEmail,
      dogName,
      adoptionReason,
      otherPets,
      homeType,
      dogImage,
      aspects,
    };

    //retrieving the adoption list from localStorage
    let adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];

    //checking if such adoption already exists
    const existingAdoption = adoptions.find(
      (adopt) => adopt.dogName === dogName && adopt.dogImage === dogImage
    );

    if (existingAdoption) {
      alert("This adoption entry already exists.");
    } else {
      //adding a new adoption to the list
      adoptions.push(adoption);
      localStorage.setItem("adoptions", JSON.stringify(adoptions));
      alert("Adoption request submitted successfully!");

      //clearing the form
      adoptionForm.reset();

      //close modal
      const modalInstance = bootstrap.Modal.getInstance(adoptModal);
      modalInstance.hide();
    }
  });
}

function deleteFavouriteDog(dogName, dogImg) {
  let list = JSON.parse(localStorage.getItem("list"));

  for (let i = 0; i < list.length; i++) {
    let dog = list[i];

    //if this is dog to delete
    if (dog.name === dogName && dog.image === dogImg) {
      if (confirm("Delete dog from list?")) {
        //delete from list
        list.splice(i, 1);

        localStorage.setItem("list", JSON.stringify(list));

        displayListOfFavouriteDogs();
      }
      break;
    }
  }
}
