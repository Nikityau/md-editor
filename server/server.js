const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const marked = require('marked')

const forms = multer()

const app = express()

app.use(cors())
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(forms.array())

app.get('/test', (req, res) => {
    res.send('test')
})

app.post('/md-parse', (req, res) => {
    const {params} = req.body
    const parsedText = marked.marked.parse(params.mdText)

    res.setHeader('Content-type', 'text/html')

    res.send(parsedText)
})

app.listen(3000, 'localhost', () => {
    console.log('PORT:3000')
})