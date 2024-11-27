function Magasin() {
    this.listesObjetMag = [];
    /**
     * Afficher les objets du magasin
     */
    this.afficheObjet = function () {
        // Récupère le tableau
        const $tableauBody = $("table tbody");
        $tableauBody.empty();  // On vide le tableau physique

        // Ajouter chaque objet du magasin dans le tableau
        for (let objet of this.listesObjetMag) {
            // Créer une nouvelle ligne dans le tableau
            const $nouvelleLigne = $("<tr></tr>");
            const $cel0 = $("<td></td>").text(objet.nom);
            const $cel1 = $("<td></td>").text(objet.puissanObjet);
            const $cel2 = $("<td></td>").text(objet.defenseObjet);
            const $cel3 = $("<td></td>").text(`${objet.cout.toFixed(2)} $`);

            // Ajouter la cellule checkbox
            const $checkbox = $("<input>").attr("type", "checkbox");
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
        let objet = new Objet($nom, $pOffensive, $pDefensive, $cout);

        // Ajoute l'objet à la liste du magasin
        this.listesObjetMag.push(objet);

        console.log("Liste des objets :", this.listesObjetMag);

        // Affiche les objets mis à jour
        this.afficheObjet();
    };
}

/**
 * l'objet des magasin
 * @param nomObjet
 * @param puissanObjet
 * @param defenseObjet
 * @param cout
 * @constructor
 */
// Crée un objet avec ses propriétés
function ObjetMag(nomObjet = "", puissanObjet = "", defenseObjet = "", cout = 0) {
    this.nom = nomObjet;
    this.puissanObjet = puissanObjet;
    this.defenseObjet = defenseObjet;
    this.cout = parseFloat(cout);
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
function Personnage(nom, attaque, defense, argent, image){
    this.nomPer = nom;
    this.attaquePer = attaque;
    this.defensePer = defense;
    this.argentPer = parseFloat(argent);
    this.imagePer = image;
}

/*************************************************************
 *  Main de l'application
 *  **********************************************************
 */
// Instancier des objets
let objetMag1 = new ObjetMag("GrosMarteau", "67", "60", 78);
let objetMag2 = new ObjetMag("Casque", "70", "55", 67);

// Instancier un magasin
let magasin = new Magasin();

//Instancier Personnages :
let person1 = new Personnage("Jacques le prirate", "12", "5", 350, "img/jack.png");
let person2 = new Personnage("Luffy", "45", "80", 30000, "img/luffy.png");

// Ajouter des objets au magasin
magasin.listesObjetMag.push(objetMag1, objetMag2);

// Afficher les objets du magasin
magasin.afficheObjet();

// Gestion de l'événement pour le bouton Ajouter
$("#btnAjouter").on("click", function () {
    magasin.ajouterObjet();  // Appelle la méthode pour ajouter un objet
});
