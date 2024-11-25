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
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span");
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}`;
    // On place le texte à l'intérieur du span.
    spanScore.innerText = affichageScore;
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier,
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition");
    zoneProposition.innerText = proposition;
}

/**
 * Cette fonction construit et affiche l'email.
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score.
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
    location.href = mailto;
}

/**
 * Cette fonction vérifie si un nom valide a bien été saisie
 * @param {string} nom : le nom du joueur
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error(`Le nom "${nom}" n'est pas assez long`);
    }
}

/**
 * Cette fonction vérifie si l'addresse email a le bon format
 * @param {string} email : l'addresse emaail du destinataire
 */
function validerEmail(email) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (!regex.test(email)) {
        throw new Error(`L'addresse email "${email}" n'est pas valide`);
    }
}

/**
 * Cette fonction affiche le message d'erreur dans le formulaire popup
 * @param {string} message
 */
function afficherMessageErreur(message) {
    const msg = `Une erreur est survenue : ${message}`;
    let popup = document.querySelector(".popup");
    // let txt = popup.appendChild(document.createElement("span"))
    popup.innerHTML += `<span>${msg}</span>`;
}

/**
 * Cette fonction gère le formulaire de partage de score
 * @param {string} score : le score du joueur
 */
function gererFormulaire(score) {
    // Gestion de l'événement submit sur le boutton "envoyer"
    let form = document.querySelector(".popup form");
    form.addEventListener("submit", (event) => {
        try {
            event.preventDefault();

            let fieldNom = document.getElementById("nom");
            let nom = fieldNom.value;
            validerNom(nom);

            let fieldEmail = document.getElementById("email");
            let email = fieldEmail.value;
            validerEmail(email);

            let emailScore = `de ${score}`;
            afficherEmail(nom, email, emailScore);
        } catch (error) {
            afficherMessageErreur(error.message);
        }
    });
}

/**
 * Cette fonction lance le jeu.
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup();
    let score = 0;
    let i = 0;
    let listeProposition = listeMots;

    let btnValiderMot = document.getElementById("btnValiderMot");
    let inputEcriture = document.getElementById("inputEcriture");

    afficherProposition(listeProposition[i]);

    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++;
        }
        i++;
        afficherResultat(score, i);
        inputEcriture.value = "";
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini");
            btnValiderMot.disabled = true;
        } else {
            afficherProposition(listeProposition[i]);
        }
    });

    // Gestion de l'événement change sur les boutons radios.
    let listeBtnRadio = document.querySelectorAll(".optionSource input");
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots.
            if (event.target.value === "1") {
                listeProposition = listeMots;
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases;
            }
            // Et on modifie l'affichage en direct.
            afficherProposition(listeProposition[i]);
        });
    }

    gererFormulaire(score);

    afficherResultat(score, i);
}
