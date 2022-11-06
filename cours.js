/**
 * Permet a l'admin de rajouter un cours sur le serveur
 * @param {*} id_cours
 * @param {*} nom
 * @param {*} description
 * @param {*} capacite
 * @param {*} date_debut
 * @param {*} nb_cours
 */
console.log("test javascript");
let form_cours = document.getElementsByClassName("form_cours");
let btn_inscrire = document.getElementsByClassName("btn_inscrire");
let basket = [];
let formu = document.querySelectorAll("form");
/*-------------SEND FORM COURS ID TO SERVER------------- */
for (let i = 0; i < formu.length; i++) {
  formu[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const obj = { ...e.currentTarget.dataset };
    console.log(obj.id);
    let data = {
      id: obj.id,
    };
    fetch("/cours", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    formu[i].lastElementChild.lastElementChild.firstElementChild.innerHTML =
      "Inscris";
  });
}

// const checkCoursServeur = (event) => {
//   let data = {
//     id: event.currentTarget.dataset.dataid,
//   };
//   fetch("/cours", {
//     method: "PATCH",
//     header: { "Content-type": "application/json" },
//     body: JSON.stringify(data),
//   });
// };
