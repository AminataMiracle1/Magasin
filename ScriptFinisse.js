const API = 'https://67471d4e38c8741641d575cd.mockapi.io/objetMagasin'

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
    this.attaquePer = parseInt(attaque);
    this.defensePer = parseInt(defense) ;
    this.argentPer = parseFloat(argent);
    this.imagePer = image;
    this.equipements = []

    // Afficher l'équipement acheter  : créer l'endroit
    this.afficheObjet = function () {
        // Select l'endoit ou nous voulons afficher
        let equipementAffiche  = $("#equipementAffiche")
        equipementAffiche.empty(); // nous vidons le tag html avant de réafficher.
        for(let element of this.equipements) {
            // ajouter une liste dans le div
            equipementAffiche.append(`<li>${element}</li>`);
        }
    }
    this.attaqueAcheter = function (objetOffens) {
        this.attaquePer = parseInt(this.attaquePer) + objetOffens;
    }
    this.defensiveAcheter = function (objetDeffensive) {
        this.defensePer = parseInt(this.defensePer) + objetDeffensive;
    }
    this.argentAcheter = function (objetCout) {
        this.argentPer = this.argentPer - objetCout;
    }
}
/**
 * l'objet des magasin
 * @param id
 * @param nomObjet
 * @param puissanObjet
 * @param defenseObjet
 * @param cout
 */
// Crée un objet avec ses propriétés
function ObjetMag(id = 0, nomObjet= "", puissanObjet = 0, defenseObjet = 0, cout = 0) {
    this.id = id;
    this.nom = nomObjet;
    this.puissanObjet = parseFloat(puissanObjet);
    this.defenseObjet = parseFloat(defenseObjet);
    this.cout = parseFloat(cout);
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
}

/*************************************************************
 *  Main de l'application
 *  **********************************************************
 */

// une fonction qui affiche les personnages quand on choisi le personnage
function afficherPersonnage (Personnage) {
    // Récupere la ou je veut ajouter
    let totalAttaque = $("#totalAttaque")
    let totalDefensive = $("#totalDefensive")
    let totalArgent = $("#totalArgent")
    let imgPers = $("#imagePerson")
    // Affecter les variables recut a leur place
    totalAttaque.text(Personnage.attaquePer);
    totalDefensive.text(Personnage.defensePer);
    totalArgent.text((Personnage.argentPer).toFixed(2) + " $")
    imgPers.attr("src", Personnage.imagePer)

}
function storagePersonnage (Personnage) {
    //mettre en mémoir personnage
    localStorage.setItem();
}
// Gestion de l'evenement de l'affiche des personnages.
$("#lesPersonnages").on("change", function () {
    // à vrai dire je peux utiliser ici find
    /*
        for (let element of listPersonnage) {
        if (String(element.nomPer) === String($("#lesPersonnages").val())) {
            element.affichePer();
            break;
        }
    }
     */
    let personAff = listPersonnage.find(person => person.nomPer ===String($("#lesPersonnages").val()))
    personAff.affichePer();
    personAff.afficheObjet();
});
// Instancier un magasin
let magasin = new Magasin();

// Instancier des objets
/*let objetMag1 = new ObjetMag(1, "GrosMarteau", 56, 60, 80);
let objetMag2 = new ObjetMag(2, "Casque", 69, 80, 88);
let objetMag3 = new ObjetMag(3, "Marteau", 97, 62, 98);
let objetMag4 = new ObjetMag(4, "Épée", 87, 40, 28);*/

//Instancier Personnages :
let person1 = new Personnage("personJack", 12, 5, 350, "img/Jacques le pirate.png");
let person2 = new Personnage("personLuffy", 45, 80, 3000, "img/rey la jedi.jpg");
person1.affichePer()

listPersonnage.push(person1 , person2)
// Ajouter des objets au magasin
//magasin.listesObjetMag.push(objetMag1, objetMag2, objetMag3, objetMag4);

// Afficher les objets du magasin
magasin.afficheObjet();
/**
 * Ajouter un objet au magasin
 */
function btnAjouter() {
    // Gestion de l'événement pour le bouton Ajouter
    $("#btnAjouter").on("click", function (event) {
        event.preventDefault()
        // Récupère les valeurs du formulaire
        let $nom = $("#nomObjet").val();
        let $pOffensive = $("#pOffensive").val();
        let $pDefensive = $("#pDefensive").val();
        let $cout = parseFloat($("#cout").val()).toFixed(2);
        // Vérification simple des champs (validez les données ici)
        if ($nom.length < 3) {
            $(".nomObj").show();
        }
        else{
            $("#nomValide").show()
        }
        if ($pOffensive < 50 || $pOffensive > 100) {
            $(".offenseObj").show()
        }else{
            $("#offensValid").show()
        }
        if ($pDefensive < 50 || $pDefensive > 100) {

            $(".deffObj").show()
        }
        else{
            $("#deffValid").show()
        }
        if ($cout <= 0) {
            $("#coutValid").show()
        }else{
            $(".coutObj").show()
        }
        // Crée un nouvel objet et son ID
        let ID = 1
        for (let element of magasin.listesObjetMag){
            ID++
            console.log("ID", ID)
        }
        let objet = new ObjetMag(ID, $nom, $pOffensive, $pDefensive, $cout);
        // Ajoute l'objet à la liste du magasin
        magasin.listesObjetMag.push(objet);
        // Appeller la méthode post et ajouter la nouvelle objet dans le server
        requettePost(objet)
        console.log("Liste des objets :", magasin.listesObjetMag);
        // Affiche les objets mis à jour
        magasin.afficheObjet()
    });
}
btnAjouter()

/**
 * Une fonction qui récupère la personne qui achete
 */
function personAchete() {
    // On récupère la personne dans la boucle et le retourner
    let personActuelle = $("#lesPersonnages").val();
    let personAchat = listPersonnage.find(person => person.nomPer === personActuelle)
    return personAchat
}
/**
 * Une fonctionne qui récupère les objets acheter
 */
function recupObjetAcheter() {
    // Variable récupérer l'objet
    let objetRecup = [];
    // Récupérer les objets acheter.
    let objetsClick = $("input[type='checkbox']:checked");
    objetsClick.each(function (){
        // Récupérer les id
        let objetID = parseInt(this.id)
        // On compare le ID au liste d'objet de la listes des magasin.
        let objetAchat = magasin.listesObjetMag.find(objetMag =>objetMag.id === objetID);
        if(objetAchat){
            // Ajouter l'objet clicke dans la liste
            objetRecup.push(objetAchat)
        }
    })
    // returner la liste d'objet acheter
    return objetRecup
}
$("#btnAchat").on("click", function () {
    // Récuperer la personne
    let personAchat = personAchete()
    console.log(personAchat)
    // Récuperer la listes d'objet acheter
    let objetRecup = recupObjetAcheter()
    /*
    Calculer le total du caractère des l'objets achéter
    // Calculer le somme de l'objet avec reduce somme = est la variable qui
    accumule et obj et l'objet dans le tableau
     */
    let totalCout = objetRecup.reduce((somme, obj) => somme + obj.cout, 0);
    let totalAttaque = objetRecup.reduce((somme, obj) => somme + parseFloat(obj.puissanObjet), 0);
    let totalDeff = objetRecup.reduce((somme, obj) => somme + parseFloat(obj.defenseObjet), 0);

    // Vérifier si la personne a assez d'argent pour acheter
    if(totalCout > personAchat.argentPer){
        alert("Vous n'avez pas assez d'argent")
    }else {
        // Appliquer les changements au personnage
        personAchat.attaqueAcheter(parseInt(totalAttaque))
        personAchat.defensiveAcheter(parseInt(totalDeff))
        personAchat.argentAcheter(parseInt(totalCout))
        // Maintenant il faut ajouter le nom des objet dans la lis
        for (let objetNom of objetRecup){
            console.log("nom", objetNom.nom )
            personAchat.equipements.push(objetNom.nom)
        }
        personAchat.afficheObjet()
        // Afficher les nouvelles stats
        personAchat.affichePer()
        // Supprimer les objets achetés du magasin utilise filter et includes on supprimes tout les
        // contenut dans listes d'objet récupérer
        magasin.listesObjetMag = magasin.listesObjetMag.filter(objet => !objetRecup.includes(objet))
        // afficher le tableau
        magasin.afficheObjet()
    }
})

////////////////////////////////////////// Intégration de la synchronisation Ajax //////////////////////////////////////////
// Une fonction qui cree un un objet;
function createObjetMagasin(objet){
    console.log("TEST", objet.nomObjet)
    let obj = new ObjetMag(objet.noObjet, objet.nomObjet, objet.puissanObjet, objet.defenseObjet, objet.cout);
    return obj
}
/**
Asynchrone pour recevoir les données
 */
function requetteGet(){
    fetch(API, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    }).then(res => {
        // Récuperer les objets du server
        if (!res.ok) {
            throw new Error("Je ne trouve pas les elements")
        }else {
            return res.json()
        }
        // handle error
    }).then(objetMock => {
        console.log("sdagfgshj", objetMock);
        // nous transformons donné recu en des objets magasin puis les ajouter dans la listes magasin
        for (let objet of objetMock) {
            magasin.listesObjetMag.push(createObjetMagasin(objet));
        }
        magasin.afficheObjet();

    }).catch(error => {
        // handle error
        console.error(error);
    })
}
requetteGet()
/**
 * Méthode pour ajouter des donnés dans le serveur utiliser La fonction ajouter.
 */
function requettePost(fichierJson){
    fetch(API, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(fichierJson)
    }).then(res => {
        if (!res.ok) {
            throw new Error("Peut pas écrire sur serveur")
        }else{
            return res.json();
        }
    }).catch(error => {
        // handle error
        console.error(error);
    })
}

