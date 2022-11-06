console.log("welcome javascript");
/* patch */
let formu = document.querySelectorAll("form");
/*-------------PATCH COURS------------- */
for (let i = 0; i < formu.length; i++) {
  formu[i].addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("clicker");
    const obj = { ...e.currentTarget.dataset };
    console.log(obj.id);
    let data = {
      id: obj.id,
    };
    fetch("/cours", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    formu[i].parentNode.removeChild(formu[i]);
  });
}
/*--------------FIN PATCH COURS */
