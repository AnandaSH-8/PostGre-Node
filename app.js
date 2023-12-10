const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json()) 
app.use(cors()) 
app.use(express.static('public'))

const port = 3000

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
})