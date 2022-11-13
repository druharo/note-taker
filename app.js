const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/notes', (req, res) => {
    res.sendFile('notes.html', { root: "public" });
})
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: "public" });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})