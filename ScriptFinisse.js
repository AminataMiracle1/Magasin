/**
 * La partie du tableau
 * Afficher le tableau avec du Jquerry
 * Le tableau contient du objets.
 */
function Magasin (){
    this.listesObjetMag = []
    this.afficheObjet = function (){

        // Récupere le tableau
        const $tableauBody = $("table tbody");
        for(let objet of this.listesObjetMag){
            console.log(objet.nom)
            // Ajouter une nouvelle ligne du tableau
            const $nouvelLigne = $("<tr></tr>")
            const $cel0 = $("<td></td>")
            const $cel1 = $("<td></td>")
            const $cel2 = $("<td></td>")
            const $cel3 = $("<td></td>")
            const $cel4 = $("<td></td>")

            // Mettre les éléments dans les cellules.
            $cel0.text(objet.nom);
            $cel1.text(objet.puissanObjet);
            $cel2.text(objet.defenseObjet);
            $cel3.text(`${objet.cout.toFixed(2) + "$"}`);

            // Ajouter la cellule checkbox
            const $checkbox = $("<input>").attr("type", "checkbox");
            $cel4.append($checkbox);

            // Ajouter la nouvelle ligne complètement au tableau
            $nouvelLigne.append($cel0, $cel1, $cel2, $cel3, $cel4);
            $tableauBody.append($nouvelLigne);

            console.log("Nouvelle", $nouvelLigne);
        }
    }
}
// Créer un objet est c'est description
function Objet(nomObjet = "", puissanObjet = "", defenseObjet = "", cout= 0) {
    this.nom = nomObjet;
    this.puissanObjet = puissanObjet;
    this.defenseObjet = defenseObjet;
    this.cout = cout
}

// Instancier des objet
let objetMag1 = new Objet("GrosMarteau", "67", "60", 50)
let objetMag2 = new Objet("Casque", "70", "55", 67)

// Instancier un Magasin
let magasin = new Magasin();

// Ajouter des objet dans magasin
magasin.listesObjetMag.push(objetMag1, objetMag2)

console.log(magasin.listesObjetMag)
// Afficher les objet du magasin
magasin.afficheObjet()

function ajouterObjet (){
    // Récupere les valeurs du formulaire.
    let $nom = $("#nomObjet").val();
    let $pOffensive = $("#pOffensive").val();
    let $pDefensive = $("#pDefensive").val();
    let $cout = $("#cout").val();
    // Crééer  un objet
    const objet  = new Objet($nom, $pOffensive, $pDefensive, $cout)
    // Ajouter l'objet dans la listes des objets du Magasin
    magasin.listesObjetMag.push(objet)

    console.log(magasin.listesObjetMag)
    magasin.afficheObjet()

}

// gestion d'événement du btn Ajouter
$("#btnAjouter").on("click", ajouterObjet)



