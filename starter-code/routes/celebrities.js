var express = require("express");
var celebritiesRouter = express.Router();
const Celebrity = require("./../models/celebrity");

// GET     /books
celebritiesRouter.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      const data = {
        allCelebrities: allCelebrities,
      };
      res.render("celebrities/index", data);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

celebritiesRouter.get("/:celebrityId", (req, res, next) => {
  Celebrity.findById(req.params.celebrityId)
    .then((foundCelebrity) => {
      const data = {
        foundCelebrity: foundCelebrity,
      };
      res.render("celebrities/show", data);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

celebritiesRouter.get("/new", (req, res, next) => {
  res.render("celebrities/new");
});

celebritiesRouter.post("/", (req, res, next) => {
  const { name, ocupation, catchPhrase } = req.body;

  Celebrity.create({ name, ocupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/celebrities");
    });
});

celebritiesRouter.post("/:celebrityId/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.celebrityId)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

module.exports = celebritiesRouter;
