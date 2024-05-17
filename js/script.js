document.addEventListener("DOMContentLoaded", function () {
    // Obsługa zdarzenia kliknięcia na b1:
    var but1 = document.getElementById("b1");
    but1.addEventListener(
      "click",
      function () {
        // Fetch danych z API Dog CEO
        let dogApi = fetch("https://dog.ceo/api/breeds/image/random/3")
          .then((response) => response.json());
  
        // Fetch danych z API Random User
        let nameApi = fetch("https://randomuser.me/api/?results=3&inc=name")  // Zmiana na 3, aby zgadzało się z liczbą obrazów
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
            let s1 = document.getElementById("s1");
            s1.innerHTML = "";  // Wyczyszczenie zawartości elementu s1
  
            images.forEach((imageUrl, index) => {
              // Tworzenie kontenera dla obrazu i imienia
              let container = document.createElement("div");
              container.style.marginBottom = "20px";  // Stylizacja kontenera (opcjonalne)
  
              // Tworzenie elementu img i ustawienie jego src na URL obrazu
              let img = document.createElement("img");
              console.log(imageUrl);  // Debugowanie URL obrazu
              img.src = imageUrl;
              img.alt = "Random Dog Image"; // Ustawienie atrybutu alt
              img.style.maxWidth = "100%";  // Stylizacja obrazu (opcjonalne)
              container.appendChild(img);
  
              // Tworzenie elementu p dla imienia
              let nameElement = document.createElement("p");
              let user = names[index];
              nameElement.textContent = `${user.name.first}`;
              container.appendChild(nameElement);
  
              // Dodanie kontenera do elementu s1
              s1.appendChild(container);
            });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
      false
    );
  });
  