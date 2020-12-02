const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')

app.use(json())
app.use(express.urlencoded({extended: false}))
app.use('/', route)

app.listen(port, () => {
    console.log(`Fire Insurance app listening at http://localhost:${port}`)
})