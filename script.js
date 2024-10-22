// Initions les variable constante :
const btnAjouterObj = document.getElementById("btnAjouter")
const btnAnnuler = document.getElementById("btnAnnuler")
const btnAchater = document.getElementById("btnAchat")

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
document.getElementById("lesPersonnages").addEventListener("click", () => {
    // Condition qui affiche les personne dans le bon endroit.

    if (document.getElementById("lesPersonnages").value === "personJack"){
        person1.afficheAttribut();

    }else if(document.getElementById("lesPersonnages").value === "personLuffy"){
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
    this.cout = cout;
}
// Créer  un objet Magasin et l'afficher.
let objetMagasin1 = new ObjetMagasin("GrosMarteau", "67", "60", 5000)
let objetMag2 = new ObjetMagasin("Casque", "70", "55", 6700)

// Ajouter les objet dans la listes
listesObjetMag.push(objetMagasin1)
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
btnAjouterObj.addEventListener("click", function (event) {
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
btnAnnuler.addEventListener("click", function () {
    document.querySelector("form").reset();
});


/*
La Methode Acheter : elle fonctionn
 */


