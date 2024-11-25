/*********************************************************************************
 *
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu.
 *
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    console.log("Votre score est de " + score + " sur " + nbMotsProposes);
    let zoneScore = document.querySelector("zoneScore span");
    zoneScore.textContent = `${score} / ${nbMotsProposes}`;
}

function afficherProposition(mot) {
    let zoneProposition = document.querySelector(".zoneProposition");
    console.log(zoneProposition);
    zoneProposition.textContent = mot;
}

function resetInputEcriture() {
    let inputEcriture = document.getElementById("inputEcriture");
    console.log(inputEcriture);
    inputEcriture.value = "";
}

/**
 * Cette fonction lance le jeu.
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    let score = 0;
    let nbMotsProposes = 0;
    let listePropositions = listeMots;

    let i = 0;
    console.log(listePropositions[i]);
    afficherProposition(listePropositions[i]);
    nbMotsProposes++;

    let btnValiderMot = document.getElementById("btnValiderMot");
    btnValiderMot.addEventListener("click", () => {
        if (listeMots[i] == inputEcriture.textContent) {
            score++;
        }
        afficherResultat(score, nbMotsProposes);

        i++;
        console.log(i, "Boutton clicker !");
        if (i < listePropositions.length) {
            afficherProposition(listePropositions[i]);
            nbMotsProposes++;
        } else {
            afficherProposition("Le jeu est fini");
            btnValiderMot.disabled = true;
        }
        resetInputEcriture();
    });

    let inputEcriture = document.getElementById("inputEcriture");
    inputEcriture.addEventListener("keydown", (event) => {
        console.log(inputEcriture.value);
    });

    let listeOptionSource = document.querySelectorAll(
        'input[name="optionSource"]'
    );
    for (let index = 0; index < listeOptionSource.length; index++) {
        listeOptionSource[index].addEventListener("change", (event) => {
            console.log(event.target.value);
            if (event.target.value == "1") {
                listePropositions = listeMots;
            } else {
                listePropositions = listePhrases;
            }
            afficherProposition(listePropositions[i]);
        });
    }

    afficherResultat(score, nbMotsProposes);
}
