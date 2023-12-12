const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./dbConnection')

app.use(express.json()) 
app.use(cors()) 
app.use(express.static('public'))

const port = 3000;

app.post('/addTodo',async(req,res)=>{
    try {
      const {description} = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1)",
        [description]
        )
      res.json(newTodo);
    } catch (error) {
      console.error(error,'IS AT LINE NUMBER 16');
    }
})

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
})