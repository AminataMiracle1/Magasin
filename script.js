// Initions les variable constante :
const btnAjouterObj = $("#btnAjouter")
const btnAnnuler = $("#btnAnnuler")
const btnAchater = $("#btnAchater")

// Créer une liste personnages
let listsPersonnages= []
let listesObjetMag = []

//Gestion des personnages : objet Personnage :
/*
Quand une personne est selectioné :
elle affiche ses attribut.
Il faut créer un objet personne
 */

function Personnage(attaque = "", defensive = "", argent = 0) {
    this.attaque = attaque;
    this.defensive = defensive;
    this.argent = argent;

    // une fonction qui affiche les attribut dans la section
    this.afficheAttribut = function () {
        document.getElementById("totalAttaque").textContent = this.attaque;
        document.getElementById("totalDefensive").innerHTML = this.defensive;
       document.getElementById("totalArgent").innerHTML = this.argent.toString();
    }
}
// Initialiser les personnes
person1 = new Personnage("25" , "67", 60000)
person2 = new Personnage("56" , "90", 50000)
person1.afficheAttribut()

// Ajouter les personnes dans la listes personnages
listsPersonnages.push(person1)
listsPersonnages.push(person2)

// afficher les attribut du personnage.
$("#lesPersonnages").click(() => {
    // Condition qui affiche les personne dans le bon endroit.

    if ($("#lesPersonnages").val() === "personJack"){
        person1.afficheAttribut();

    }else if($("#lesPersonnages").val() === "personLuffy"){
        person2.afficheAttribut();
    }

})

/*
Objet Magasin Gestion
 */
function ObjetMagasin(nomObjet = "", puissanObjet = "", defenseObjet = "", cout= 0) {
    this.nom = nomObjet;
    this.puissanObjet = puissanObjet;
    this.defenseObjet = defenseObjet;
    this.cout = parseFloat(cout);
}
// Créer  un objet Magasin et l'afficher.
let objetMag1 = new ObjetMagasin("GrosMarteau", "67", "60", 50)
let objetMag2 = new ObjetMagasin("Casque", "70", "55", 67)

// Ajouter les objet dans la listes
listesObjetMag.push(objetMag1)
listesObjetMag.push(objetMag2)

// Creer une fonction  qui affiche le tableau :
/*
Prendre les elements du tableau pour les affichés dans le tableau
 */
afficheTableau()
function afficheTableau(){
    // Récuper le tableau
    const tableauBody = document.querySelector("table tbody");
    // Faire une boucle qui affiche les element du tableau jusquà cela fini de vider la liste
    listesObjetMag.forEach(objet => {
        // Creer une ligne et des cellules
        const newLigne = tableauBody.insertRow();
        const cel0 = newLigne.insertCell(0);
        const cel1 = newLigne.insertCell(1);
        const cel2 = newLigne.insertCell(2);
        const cel3 = newLigne.insertCell(3);
        const cel4 = newLigne.insertCell(4);

        // Mettre element dans les cellules
        cel0.textContent  = objet.nom;
        cel1.textContent = objet.puissanObjet;
        cel2.textContent = objet.defenseObjet;
        cel3.textContent = `${objet.cout.toFixed(2) + "$"}`;

        // Ajouter la cellucele checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        cel4.appendChild(checkbox);
    })
}

/*
Maintenant ici nous devons plus Faire la gestion de validation avant de les mettres
Puis il faut ajouter dans le listes magasin
Maintenant appeller la fonction Afficher tableau qui parcours la listes pour les afficher
 */


// Gestion d'événement du bouton "Ajouter"
btnAjouterObj.click(function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs du formulaire
    const nom = document.getElementById("nomObjet").value;
    const pOffensive = document.getElementById("pOffensive").value;
    const pDefensive = document.getElementById("pDefensive").value;
    const prix = document.getElementById("cout").value;
    // Créer un nouvelle objet Magasin
    let objetMagasin = new ObjetMagasin(nom, pDefensive,pDefensive , prix);

    // Vérifier si les champs sont remplis
    if ((nom.length) < 3 )
        alert("Nom doit être superiere à 3 lettre");
    else if (pOffensive <= 50 && pOffensive <= 100){
        alert("La puissance offensive doit être plus de 50 et inferière à 100");
    }else if (pDefensive <= 50 && pDefensive <= 100){
        alert("La puissance Defensive doit être plus de 50 et inferière à 100");
    }else if (prix <= 0){
        alert("Le prix doit être plus que 0$");
    }else{
        // Ajouter l'objet dans la list objetMagasin
        listesObjetMag.push(objetMagasin);

        // Afficher le tableau
        afficheTableau();
        // Réinitialiser le formulaire après ajout
        document.querySelector("form").reset();
    }
});


// Gestion d'événement du bouton "Annuler" pour réinitialiser les champs
/*btnAnnuler.addEventListener("click", function () {
    document.querySelector("form").reset();
});*/


/*
La Methode Acheter: les point à traiter
un objet personne acheter un objet Magasin.
Algorithme :
Requirement :
avoir de l'argent : verifier s'il a assez d'argent
personne peu acheter plusieur objet tant qu'il a de l'argent.

comportement attendu Magasin :
-  Quand on achet : l'objet disparait
- des messages aleotoire s'affiche
 */

btnAchater.addEventListener("click", function () {
    const selectedCharacter = document.getElementById("lesPersonnages").value;
    let currentCharacter;

    // Determine which character is selected
    if (selectedCharacter === "personJack") {
        currentCharacter = person1;
    } else if (selectedCharacter === "personLuffy") {
        currentCharacter = person2;
    }

    let totalCost = 0;

    // Loop through the checkboxes to calculate total cost
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const item = listesObjetMag[index];
            totalCost += item.cout; // Update the cost based on selected items
        }
    });

    // Check if the character has enough money
    if (currentCharacter.argent >= totalCost) {
        // Deduct the total cost from the character's money
        currentCharacter.argent -= totalCost;

        // Remove purchased items from the store
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                listesObjetMag.splice(index, 1);
                checkbox.checked = false; // Uncheck the box
            }
        });

        // Refresh the display of items in the store
        afficheTableau();

        // Update the character's attributes
        currentCharacter.afficheAttribut();

        alert("Achat réussi !");
    } else {
        alert("Fonds insuffisants !");
    }
});


