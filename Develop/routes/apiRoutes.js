const fs = require('fs');
const path = require('path');
const db = require("../db/db.json");
console.log(db);

module.exports = (app) => {
    app.get("/api/notes", function(req, res) {
        res.json(db);
    });

    app.post("/api/notes", function(req, res) {
        db.push(req.body);
        // Add id for each note
        db.forEach((item, i) => {
            item.id = i + 1;
        });
        fs.writeFile("./db/db.json", JSON.stringify(db), function() {
            res.json(db);
        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        var id = req.params.id;
        // Delete note from array
        db.splice(id - 1, 1);
        // Assign new ids to remaining notes
        db.forEach((item, i) => {
            item.id = i + 1;
        });
        fs.writeFile("./db/db.json", JSON.stringify(db),
            res.json(notes));
    });
};