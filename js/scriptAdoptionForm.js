document.addEventListener("DOMContentLoaded", function () {
  //initialazing listeners
  modal();
  displayListOfAdoptionForms();
});

function displayListOfAdoptionForms() {
  let formsList = document.getElementById("forms-list");
  formsList.innerHTML = ""; // Clear the content of the formsList element
  let list = JSON.parse(localStorage.getItem("adoptions"));

  if (list == null || list.length == 0) {
    formsList.innerHTML +=
      "<p class='centered-text'>Your list is empty! Let's go and adopt a dog.</p>";
  } else {
    list.forEach((el) => {
      let div = document.createElement("div");
      div.className = "col-md-6 col-lg-4";

      let card = document.createElement("div");
      card.className = "dog-card";

      let img = document.createElement("img");
      img.src = el.dogImage;
      img.alt = el.dogName;
      img.className = "img-of-dog";

      //form fields
      // strong change text thick
      let namePara = document.createElement("p");
      namePara.innerHTML = "<strong>Adopter's Name:</strong> " + el.adopterName;

      let emailPara = document.createElement("p");
      emailPara.innerHTML =
        "<strong>Adopter's Email:</strong> " + el.adopterEmail;

      let dogNamePara = document.createElement("p");
      dogNamePara.innerHTML = "<strong>Dog's Name:</strong> " + el.dogName;

      let reasonPara = document.createElement("p");
      reasonPara.innerHTML =
        "<strong>Reason for Adoption:</strong> " + el.adoptionReason;

      let petsPara = document.createElement("p");
      petsPara.innerHTML = "<strong>Other Pets:</strong> " + el.otherPets;

      let homePara = document.createElement("p");
      homePara.innerHTML = "<strong>Type of Home:</strong> " + el.homeType;

      //edit button
      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "btn btn-outline-primary";
      editButton.setAttribute("data-bs-toggle", "modal"); //add data-bs-toggle attribute
      editButton.setAttribute("data-bs-target", "#adoptionModal"); //add data-bs-target attribute
      editButton.setAttribute("data-dog-name", el.dogName); //add data-dog-name attribute
      editButton.setAttribute("data-dog-img", el.dogImage); //add data-dog-img attribute

      //delete button
      let deleteButton = document.createElement("button");
      deleteButton.className = "top-button";
      deleteButton.innerHTML = "<i class='fa-solid fa-xmark'></i>"; //font Awesome X icon
      deleteButton.setAttribute("data-dog-name", el.dogName); //add data-dog-name attribute
      deleteButton.setAttribute("data-dog-img", el.dogImage); //add data-dog-img attribute

      //add event listener for delete button
      deleteButton.addEventListener("click", function () {
        const dogName = this.getAttribute("data-dog-name");
        const dogImg = this.getAttribute("data-dog-img");
        deleteForm(dogName, dogImg, true);
      });

      //div for form fields with text
      let bottomDiv = document.createElement("div");
      bottomDiv.className = "bottom-card bottom-card-form";

      bottomDiv.appendChild(namePara);
      bottomDiv.appendChild(emailPara);
      bottomDiv.appendChild(dogNamePara);
      bottomDiv.appendChild(reasonPara);
      bottomDiv.appendChild(petsPara);
      bottomDiv.appendChild(homePara);
      bottomDiv.appendChild(editButton);

      //append elements to card
      card.appendChild(deleteButton);
      card.appendChild(img);
      card.appendChild(bottomDiv);

      //append card to container div
      div.appendChild(card);

      //add container div to form list
      formsList.appendChild(div);
    });
  }
}

function modal() {
  const adoptModal = document.getElementById("adoptionModal");
  //the function will be called when the button that opens the modal is clicked
  editListener(adoptModal);
  //the function will be called when the button that sumbit form is clicked
  sumbitListener(adoptModal);
}

function editListener(adoptModal) {
  adoptModal.addEventListener("show.bs.modal", function (event) {
    //we dont have button which clicked to open modal and we must get it from related target
    const button = event.relatedTarget;
    let list = JSON.parse(localStorage.getItem("adoptions"));

    //searching for 
    if (list != null && list.length != 0) {
      const dogName = button.getAttribute("data-dog-name");
      const dogImg = button.getAttribute("data-dog-img");
      for (let i = 0; i < list.length; i++) {
        let form = list[i];

        //if this is form we are clicked button
        if (form.dogName === dogName && form.dogImage === dogImg) {
          //add all properties from adoption form to edit form
          const adopterNameInput = document.getElementById("adopterName");
          const adopterEmailInput = document.getElementById("adopterEmail");
          const dogNameInput = document.getElementById("dogName");
          const adoptionReasonInput = document.getElementById("adoptionReason");
          const homeTypeInput = document.getElementById("homeType");
          const otherPetsInput = document.querySelector(
            "input[name='otherPets'][value=" + form.otherPets + "]"
          );
          dogNameInput.value = form.dogName;
          adopterNameInput.value = form.adopterName;
          adopterEmailInput.value = form.adopterEmail;
          adoptionReasonInput.value = form.adoptionReason;
          homeTypeInput.value = form.homeType;
          otherPetsInput.checked = true;

          break;
        }
      }
      //add img data to button on form
      const buttonSubmit = document.getElementById("sub");
      buttonSubmit.setAttribute("data-dog-img", dogImg);
    }
  });
}

function sumbitListener(adoptModal) {
  adoptModal.addEventListener("submit", function (e) {
    //button by default send form
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

    //creating an adoption object
    const adoption = {
      adopterName,
      adopterEmail,
      dogName,
      adoptionReason,
      otherPets,
      homeType,
      dogImage,
    };

    //deleting existing form
    deleteForm(dogName, dogImage, false);

    //retrieving the adoption list from localStorage
    let adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
    //adding a new adoption to the list
    adoptions.push(adoption);
    localStorage.setItem("adoptions", JSON.stringify(adoptions));
    alert("Adoption form edited successfully!");

    //clearing the form
    adoptionForm.reset();

    //close modal
    const modalInstance = bootstrap.Modal.getInstance(adoptModal);
    modalInstance.hide();
    displayListOfAdoptionForms();
  });
}
//isButtonClicked is needed if we want confirm window to appear 
function deleteForm(dogName, dogImg, isButtonClicked) {
  let list = JSON.parse(localStorage.getItem("adoptions"));

  for (let i = 0; i < list.length; i++) {
    let form = list[i];

    //if this is form to delete
    if (form.dogName === dogName && form.dogImage === dogImg) {
      if (isButtonClicked) {
        if (confirm("Delete dog from list?")) {
          //delete from list
          list.splice(i, 1);
          localStorage.setItem("adoptions", JSON.stringify(list));
          displayListOfAdoptionForms();
          break;
        }
      } else {
        //delete from list
        list.splice(i, 1);
        localStorage.setItem("adoptions", JSON.stringify(list));
        break;
      }
    }
  }
}
