const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
    console.log("Get request")
    res.send(`<h2> Hello world</h2>`)   
})

app.listen(port, () => {
    console.log(`Server started at port  ${port}`)
})