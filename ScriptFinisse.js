/**
 * l'objet des magasin
 * @param id
 * @param nomObjet
 * @param puissanObjet
 * @param defenseObjet
 * @param cout
 * @constructor
 */
// Crée un objet avec ses propriétés
function ObjetMag(id=0, nomObjet = "", puissanObjet = "", defenseObjet = "", cout = 0) {
    this.nom = nomObjet;
    this.puissanObjet = puissanObjet;
    this.defenseObjet = defenseObjet;
    this.cout = parseFloat(cout);
    this.id = id
}
function Magasin() {
    this.listesObjetMag = [];
    /**
     * Afficher les objets du magasin
     */
    this.afficheObjet = function () {
        // Récupère le tableau
        const $tableauBody = $("table tbody");
        $tableauBody.empty();  // On vide le tableau physique
        let iD = 0
        // Ajouter chaque objet du magasin dans le tableau
        for (let objet of this.listesObjetMag) {
            iD++
            // Créer une nouvelle ligne dans le tableau
            const $nouvelleLigne = $("<tr></tr>");
            const $cel0 = $("<td></td>").text(objet.nom);
            const $cel1 = $("<td></td>").text(objet.puissanObjet);
            const $cel2 = $("<td></td>").text(objet.defenseObjet);
            const $cel3 = $("<td></td>").text(`${objet.cout.toFixed(2)} $`);

            // Ajouter la cellule checkbox
            const $checkbox = $("<input>").attr("id", `${iD}`).attr("name", "achat").attr("type", "checkbox");
            const $cel4 = $("<td></td>").append($checkbox);


            // Ajouter la nouvelle ligne au tableau
            $nouvelleLigne.append($cel0, $cel1, $cel2, $cel3, $cel4);
            $tableauBody.append($nouvelleLigne);
        }
    };

    /**
     * Ajouter un objet au magasin
     */
    this.ajouterObjet = function () {
        // Récupère les valeurs du formulaire
        let $nom = $("#nomObjet").val();
        let $pOffensive = $("#pOffensive").val();
        let $pDefensive = $("#pDefensive").val();
        let $cout = parseFloat($("#cout").val()).toFixed(2);

        // Vérification simple des champs (validez les données ici)
        if ($nom.length < 3) {
            alert("Le nom doit être supérieur à 3 caractères.");
            return;
        }
        if ($pOffensive < 50 || $pOffensive > 100) {
            alert("La puissance offensive doit être entre 50 et 100.");
            return;
        }
        if ($pDefensive < 50 || $pDefensive > 100) {
            alert("La puissance défensive doit être entre 50 et 100.");
            return;
        }
        if ($cout <= 0) {
            alert("Le prix doit être supérieur à 0 $.");
            return;
        }
        // Crée un nouvel objet
        let objet = new ObjetMag($nom, $pOffensive, $pDefensive, $cout);

        // Ajoute l'objet à la liste du magasin
        this.listesObjetMag.push(objet);

        console.log("Liste des objets :", this.listesObjetMag);

        // Affiche les objets mis à jour
        this.afficheObjet();
    };
}

/**
 * Classe personnages
 * @param nom
 * @param attaque
 * @param defense
 * @param argent
 * @param image
 * @constructor
 */
let listPersonnage = []
function Personnage(nom, attaque, defense, argent, image){
    this.nomPer = nom;
    this.attaquePer = attaque;
    this.defensePer = defense;
    this.argentPer = parseFloat(argent);
    this.imagePer = image;
    // une fonction qui affiche les personnages quand on choisi le personnage
    //
    this.affichePer = function (){
        // les divs d affichage
        let totalAttaque = $("#totalAttaque")
        let totalDefensive = $("#totalDefensive")
        let totalArgent = $("#totalArgent")
        // Affecter les variables recut a leur place
        totalAttaque.text(this.attaquePer);
        totalDefensive.text(this.defensePer);
        totalArgent.text((this.argentPer).toFixed(2) + " $")
    }

    this.attaqueAcheter = function (objetOffens) {
        this.attaquePer += objetOffens;
    }

    this.defensiveAcheter = function (objetDeffensive) {
        this.defensePer += objetDeffensive;
    }

    this.argentAcheter = function (objetCout) {
        this.argentPer -= objetCout;
    }

    // Afficher l'équipement acheter  : créer l'endroit
    this.afficheObjet = function (ObjetAcheter) {
        // Select l'endoit ou nous voulons afficher
        let equipementAffiche  = $(".equipementAffiche")
        // ajouter une liste dans le div
        equipementAffiche.append(`<ul>\`${ObjetAcheter}\`</ul>`);
    }


}
/*************************************************************
 *  Main de l'application
 *  **********************************************************
 */


// Instancier un magasin
let magasin = new Magasin();

// Instancier des objets
let objetMag1 = new ObjetMag( 1,"GrosMarteau", "67", "60", 78);
let objetMag2 = new ObjetMag(2,"Casque", "70", "55", 67);

//Instancier Personnages :
let person1 = new Personnage("personJack", "12", "5", 350, "img/jack.png");
let person2 = new Personnage("personLuffy", "45", "80", 3000, "img/luffy.png");
person1.affichePer()

listPersonnage.push(person1 , person2)
// Ajouter des objets au magasin
magasin.listesObjetMag.push(objetMag1, objetMag2);

// Afficher les objets du magasin
magasin.afficheObjet();

// Gestion de l'événement pour le bouton Ajouter
$("#btnAjouter").on("click", function () {
    magasin.ajouterObjet();  // Appelle la méthode pour ajouter un objet
});

// Gestion de l'evenement de l'affiche des personnages.
$("#lesPersonnages").on("change", function () {
    let selectedValue = $("#lesPersonnages").val().trim().toLowerCase();
    for (let element of listPersonnage) {
        if (String(element.nomPer) === String($("#lesPersonnages").val())) {
            console.log("Condition satisfaite");
            element.affichePer();
            break;
        }
    }
});

$("#btnAchat").on("click", function () {
    // On récupère la personne dans la boucle et le retourner
    let personActuelle = $("#lesPersonnages").val();
    let personAchat;
    let ObjetCout = []
    for (let person of listPersonnage) {
        if (personActuelle === person.nomPer) {
            personAchat = person.nomPer;
            console.log(personAchat);
        }
    }
    // Récupérer les objet acheter
    let objets = $("input[type='checkbox']");
    for (let objetClik of objets) {
        if (objetClik.checked) {
            console.log("Condition satisfait", objetClik)
            console.log("Condition satisfait", objetClik.id)
            // Comparer l'id de l'objet clické au au ID des objet qui se trouve dans la liste d'objet
            // utiliser un find une méthode Jquery
        }

    }


})
