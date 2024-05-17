document.addEventListener("DOMContentLoaded", function () {
  // Obsługa zdarzenia kliknięcia na downloadButton:
  var downloadButton = document.getElementById("download-button");
  downloadButton.addEventListener(
    "click",
    function () {
      // Fetch danych z API Dog CEO
      let dogApi = fetch("https://dog.ceo/api/breeds/image/random/6").then(
        (response) => response.json()
      );

      // Fetch danych z API Random User
      let nameApi = fetch("https://randomuser.me/api/?results=6&inc=name") // Zmiana na 3, aby zgadzało się z liczbą obrazów
        .then((response) => response.json());

      // Równoległe oczekiwanie na oba zapytania
      Promise.all([dogApi, nameApi])
        .then((responses) => {
          let dogData = responses[0];
          let nameData = responses[1];

          // Debugowanie danych
          console.log(dogData);
          console.log(nameData);

          // Przetwarzanie obrazów psów i imion
          let images = dogData.message;
          let names = nameData.results;
          let dogList = document.getElementById("dog-list");
          dogList.innerHTML = ""; // Wyczyszczenie zawartości elementu dogList

          images.forEach((imageUrl, index) => {
            // Tworzenie kontenera dla obrazu i imienia
            let container = document.createElement("div");
            container.style.marginBottom = "20px"; // Stylizacja kontenera (opcjonalne)
            container.className = "col-md-6 col-lg-4";

            // Tworzenie elementu img i ustawienie jego src na URL obrazu
            let img = document.createElement("img");
            console.log(imageUrl); // Debugowanie URL obrazu
            img.src = imageUrl;
            img.alt = "Random Dog Image"; // Ustawienie atrybutu alt
            img.className = "img-of-dog";
            container.appendChild(img);

            // Tworzenie elementu p dla imienia
            let nameElement = document.createElement("p");
            let user = names[index];
            nameElement.textContent = `${user.name.first}`;
            nameElement.style.textAlign = "Center";
            nameElement.className = "name-of-dog";
            container.appendChild(nameElement);

            // Dodanie kontenera do elementu dogList
            dogList.appendChild(container);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    false
  );
});
