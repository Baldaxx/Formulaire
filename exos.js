const form = document.querySelector("#monFormulaire"); 
const usernameEl = document.querySelector("#username");

// Fonction qui vérifie si la valeur d'un input est vide
function estVide(elementValue) {
    if(elementValue == ""){
        return false
    }else{
        return true
    }
}

// Fonction de vérification de taille
function estEntre(length, min, max) {
    if(length < min || length > max){
        return false
    }else{
        return true
    }
}

// Réecriture en ternaire
// const isBetween2 = (length, min, max) => length < min || length > max ? false : true

// Fonction qui valide le nom en interdisant certains mots et n'autorisant que les lettres
function leNomValide(elementValue) {
    const re = new RegExp("^(?!.*\\b(afpa|root|deus)\\b)[a-zA-Z]+$");
    return re.test(elementValue);
}

// Fonction pour afficher les erreurs en rouge
function showError(input, message) {
    const champsDeFormulaire = input.parentElement;
    champsDeFormulaire.classList.remove("success");
    champsDeFormulaire.classList.add("error");
    const erreur = champsDeFormulaire.querySelector(".error-message");
    erreur.textContent = message;
    erreur.style.display = "block"; 
}

// Fonction pour indiquer qu'un élément est valide en vert
function showSuccess(input) {
    const champsDeFormulaire = input.parentElement;
    champsDeFormulaire.classList.remove("error");
    champsDeFormulaire.classList.add("success");
    const erreur = champsDeFormulaire.querySelector(".error-message");
    erreur.style.display = "none"; 
}

// Vérification de l'âge
function verifieAge(dobEl) {
    const today = new Date();
    const dob = new Date(dobEl.value);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (age > 21 || (age === 21 && monthDiff > 0) || (age === 21 && monthDiff === 0 && dayDiff >= 0)) {
        showSuccess(dobEl);
        return true;
    } else {
        showError(dobEl, "Vous devez avoir plus de 21 ans.");
        return false;
    }
}

// Ajout de l'écouteur d'événement au formulaire
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#monFormulaire'); 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const min = 3; 
        const max = 15; 
        const usernameEl = document.querySelector('#username');
        const dobEl = document.querySelector('#dob');
        const passwordEl = document.querySelector('#password');
        let valid = true;

        if (estVide(usernameEl.value.trim()) || !leNomValide(usernameEl.value.trim()) || !estEntre(usernameEl.value.trim().length, min, max)) {
            showError(usernameEl, "Nom d'utilisateur pas valide, vide ou la longueur n'est pas entre " + min + " et " + max + " caractères.");
            valid = false;
        } else {
            showSuccess(usernameEl);
        }

        if (!leMotDePasseValide(passwordEl.value.trim())) {
            showError(passwordEl, "Mot de passe pas valide !");
            valid = false;
        } else {
            showSuccess(passwordEl);
        }

        if (!verifieAge(dobEl)) {
            valid = false; 
        } else {
            showSuccess(dobEl);
        }

        if (valid) {
            console.log('Formulaire valide !');
        }
    });
});
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};

