document.addEventListener("DOMContentLoaded", function () {
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
            div.className = "adoption-form";

            let img = document.createElement("img");
            img.src = el.dogImage;
            img.alt = el.dogName;
            img.className = "dog-image";

            let namePara = document.createElement("p");
            namePara.textContent = "Adopter's Name: " + el.adopterName;

            let emailPara = document.createElement("p");
            emailPara.textContent = "Adopter's Email: " + el.adopterEmail;

            let dogNamePara = document.createElement("p");
            dogNamePara.textContent = "Dog's Name: " + el.dogName;

            let reasonPara = document.createElement("p");
            reasonPara.textContent = "Reason for Adoption: " + el.adoptionReason;

            let petsPara = document.createElement("p");
            petsPara.textContent = "Other Pets: " + el.otherPets;

            let homePara = document.createElement("p");
            homePara.textContent = "Type of Home: " + el.homeType;


            div.appendChild(img);
            div.appendChild(namePara);
            div.appendChild(emailPara);
            div.appendChild(dogNamePara);
            div.appendChild(reasonPara);
            div.appendChild(petsPara);
            div.appendChild(homePara);

            formsList.appendChild(div);
        });
    }
}