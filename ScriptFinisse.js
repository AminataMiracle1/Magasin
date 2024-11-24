/**
 * La partie du tableau
 * Afficher le tableau avec du Jquerry
 * Le tableau contient du objets.
 */
listesObjetMag = []
function ObjetMagasin(nomObjet = "", puissanObjet = "", defenseObjet = "", cout= 0) {
    this.nom = nomObjet;
    this.puissanObjet = puissanObjet;
    this.defenseObjet = defenseObjet;
    this.cout = cout
    this
    // Une fonction qui affiche les objets du magasin.
    function afficheTableau(){
        // Récupere le tableau
        const $tableauBody = $("table body");
        listesObjetMag.forEach(objet =>{
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
            $cel3.text(`${objet.cout.toFixed(2)}$`);

            // Ajouter la cellule checkbox
            const $checkbox = $("<input>").attr("type", "checkbox");
            $cel4.append($checkbox);

            // Ajouter la nouvelle ligne complètement au tableau
            $nouvelLigne.append($cel0, $cel1, $cel2, $cel3, $cel4);
            $tableauBody.append($nouvelLigne);
        })
    }
}
listesObjetMag = []
let objetMag1 = new ObjetMagasin("GrosMarteau", "67", "60", 50)
let objetMag2 = new ObjetMagasin("Casque", "70", "55", 67)

listesObjetMag.push(objetMag1)
listesObjetMag.push(objetMag2)

objetMag1.afficheTableau()



