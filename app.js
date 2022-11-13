const express = require('express')
const uuid = require('uuid');
const fs = require('fs');
const app = express()
let port = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => {
        return el.id === String(id);
    });
    if (requiredIndex === -1) {
        return false;
    };
    return !!arr.splice(requiredIndex, 1);
};

app.get('/notes', (req, res) => {
    res.sendFile('notes.html', { root: "public" });
})
app.get('/api/notes', (req, res) => {
    res.sendFile('db.json', { root: "db" });
})
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    try {
      let db = fs.readFileSync('db/db.json');
      let json = JSON.parse(db);
      if (removeById(json, id)) {
        fs.writeFileSync('db/db.json', JSON.stringify(json));
      }
      res.json(json);
    } catch (err) {
      console.log(err);
    }
  });

app.post('/api/notes', function (req, res, next) {
    try {
        let db = fs.readFileSync('db/db.json');
        let json = JSON.parse(db);
        req.body.id = uuid.v4();
        json.push(req.body);
        fs.writeFileSync('db/db.json', JSON.stringify(json));
        console.log('successfully read /db/db.json');
    } catch (err) {
        // handle the error
    }
    res.json(req.body)
})


app.get('*', (req, res) => {
    res.sendFile('index.html', { root: "public" });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
