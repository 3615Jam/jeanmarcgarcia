/**
 * ==========================================
 * SUBMIT FORM USING FETCH :
 *
 * Lors de la soumission du formulaire de contact,
 * ce script empêche le changement de page (vers une page vide).
 * ==========================================
 */

function fetchpost() {
    // (A) GET FORM DATA
    let data = new URLSearchParams();
    data.append("input_email", document.getElementById("input_email").value);
    data.append("input_message", document.getElementById("input_message").value);

    // (B) FETCH
    fetch("contact_form.php", {
        method: "post",
        body: data,
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            // console.log(text);
            // alert("C'est bien envoyé ! Merci ;)");
            // si tout se passe correctement, on cache la modal du formulaire ...
            let modalForm = bootstrap.Modal.getInstance(document.getElementById("contact_form_modal"));
            modalForm.hide();
            // ... et on affiche la modal d'envoi avec succès pendant 3 secondes avant de la cacher
            let modalSuccess = new bootstrap.Modal(document.getElementById("contact_form_modal_success"));
            modalSuccess.show();
            setTimeout(function () {
                modalSuccess.hide();
            }, 3000);
        })
        .catch(function (error) {
            console.log(error);
            // alert("Oups ! Il y a eu une erreur, veuillez recommencer svp...");
            // en cas d'erreur, on affiche une modal informative ("veuillez recommencer") pendant 3 secondes
            let modalFail = new bootstrap.Modal(document.getElementById("contact_form_modal_fail"));
            modalFail.show();
            setTimeout(function () {
                modalFail.hide();
            }, 3000);
        });

    // (C) PREVENT HTML FORM SUBMIT
    return false;
}

/**
 * ==========================================
 * Afficher âge en fonction de la date du jour
 * ==========================================
 */

let birthday = new Date("February 13, 1982");
let today = new Date();
let difference = today - birthday;
let age = Math.trunc(difference / (1000 * 60 * 60 * 24 * 365.25));
// console.log(age);
document.getElementById("age").textContent = age + " ans";
