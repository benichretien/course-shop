console.log("hello javascript");
/* POUR SUPPRIMER LES COURS  */
let formu = document.querySelectorAll("#form_cours");
console.log(formu);
for (let i = 0; i < formu.length; i++) {
  formu[i].addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("testing");
    const obj = { ...e.currentTarget.dataset };
    console.log(obj.id);
    let data = {
      id: obj.id,
    };
    fetch("/administrateur", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    formu[i].parentNode.removeChild(formu[i]);
  });
}
/* POUR SEND LE FORMU D'INSCRIPTION DES COURS */
let form_inscription = document.getElementById("form_inscription");
let nom = document.getElementById("nom_cours");
let description_cours = document.getElementById("description_cours");
let capacite_cours = document.getElementById("capacite_cours");
let date_debut = document.getElementById("date_debut");
let nb_cours = document.getElementById("nb_cours");
console.log(form_inscription);

const addCours = async (e) => {
  e.preventDefault();
  let data = {
    nom: nom.value,
    description: description_cours.value,
    capacite: capacite_cours.value,
    date_debut: date_debut.value,
    nb_cours: nb_cours.value,
  };
  let response = await fetch("/administrateur", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Couldn't send to server-status:" + response.status);
  }
};
form_inscription.addEventListener("submit", addCours);
