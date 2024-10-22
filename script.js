

// Initions les variable constante :
const btnAjouterObj = document.getElementById("btnAjouter")
const btnAnnuler = document.getElementById("btnAnnuler")
const btnAchater = document.getElementById("btnAchat")

// Gestion d'événement du bouton "Ajouter"
btnAjouterObj.addEventListener("click", function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs du formulaire
    const nom = document.getElementById("nomObjet").value;
    const pOffensive = document.getElementById("pOffensive").value;
    const pDefensive = document.getElementById("pDefensive").value;
    const prix = document.getElementById("cout").value;

    // Vérifier si les champs sont remplis
    if (nom && pOffensive && pDefensive && prix) {
        // Sélectionner le tableau
        const tableau = document.querySelector("table tbody");

        // Créer une nouvelle ligne et ses cellules
        const newLigne = tableau.insertRow();
        const cel0 = newLigne.insertCell(0);
        const cel1 = newLigne.insertCell(1);
        const cel2 = newLigne.insertCell(2);
        const cel3 = newLigne.insertCell(3);
        const cel4 = newLigne.insertCell(4);

        // Ajouter le contenu du formulaire dans les cellules
        cel0.textContent = nom;
        cel1.textContent = pOffensive;
        cel2.textContent = pDefensive;
        cel3.textContent = `${prix} 00$`;

        // Ajouter un bouton "Supprimer" dans la dernière cellule
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        cel4.appendChild(checkbox);

        // Réinitialiser le formulaire après ajout
        document.querySelector("form").reset();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
});

// Gestion d'événement du bouton "Annuler" pour réinitialiser les champs
btnAnnuler.addEventListener("click", function () {
    document.querySelector("form").reset();
});

// Gestion d'événement du "btnCheter" une personne achete