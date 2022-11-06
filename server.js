import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import express, { json } from "express";
import { engine } from "express-handlebars";
import {
  getCours,
  getCoursInscris,
  inscrireCoursServer,
  deleteCours,
  addCours,
} from "./model/cours.js";

//Creation du serveur
let app = express();

app.engine(
  "handlebars",
  engine({
    helpers: {
      afficheArgent: (nombre) => {
        let date = new Date(nombre);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let format = day + "/" + month + "/" + year;
        return format;
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

//Ajout de middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(express.static("public"));

//Routes
app.get("/", async (request, response) => {
  response.render("inscription", {
    titre: "Inscription",
    style: ["/css/style.css"],
    scripts: ["/js/cours.js"],
    cours: await getCours(),
  });
});
app.get("/compte", async (request, response) => {
  response.render("compte", {
    titre: "Compte",
    style: ["/css/style.css"],
    scripts: ["/js/compte.js"],
    inscris: await getCoursInscris(),
  });
});
app.get("/administrateur", async (request, response) => {
  response.render("administrateur", {
    titre: "Administrateur",
    style: ["/css/style2.css"],
    scripts: ["/js/administrateur.js"],
    cours: await getCours(),
  });
});
app.patch("/administrateur", async (request, response) => {
  let id = await deleteCours(request.body.id);
  console.log("deleted successfully at row :" + id);
  response.status(200).end();
});
app.post("/administrateur", async (req, response) => {
  let id = await addCours(
    req.body.nom,
    req.body.description,
    req.body.capacite,
    req.body.date_debut,
    req.body.nb_cours
  );
  console.log("inserted successfully at row :" + id);
  response.status(201).json({ id: id });
});
app.post("/cours", async (req, response) => {
  let id = await inscrireCoursServer(req.body.id);
  console.log("inserted successfully at row :" + id);
  response.status(201).json({ id: id });
});
app.patch("/cours", async (request, response) => {
  let id = await deleteCours(request.body.id);
  console.log("deleted successfully at row :" + id);
  response.status(200).end();
});
// Demarrer le serveur
app.listen(process.env.PORT);
console.log("Serveur demarre: http://localhost:" + process.env.PORT);
