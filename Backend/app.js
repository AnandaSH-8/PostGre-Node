const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./dbConnection')

app.use(express.json()) 
app.use(cors()) 
app.use(express.static('public'))

const port = 3000;

//Post Method
app.post('/addTodo',async(req,res)=>{
    try {
      const {description} = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
        )
      res.json(newTodo.rows[0]);
    } catch (error) {
      console.error(error,'IS AT LINE NUMBER 16');
    }
})

// Get method all

app.get('/getTodos',async(req,res)=>{
  try {
      const result = await pool.query('SELECT * FROM todo');
      res.send({data:result.rows})
  } catch (error) {
    console.log(error,'IS AT LINE NUMBER 31');
  }
})

// Get method single
app.get('/getTodo/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    const result = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`)
    res.json(result.rows[0])
  } catch (error) {
    console.log(error,'IS AT LINE NUMBER 42');
  }

})

//Put method one
app.put('/updateTodo/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    const {description} = req.body;
    const result = await pool.query(`UPDATE todo SET description = $1  WHERE todo_id = ${id}`,[description])
    res.json("Successfully Updated")
  } catch (error) {
    console.log(error,'IS AT LINE NUMBER 56');
  }
})

//Delete method one
app.delete('/deleteTodo/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    const result = await pool.query(`DELETE FROM todo WHERE todo_id = ${id}`)
    res.json("Successfully Deleted")
  } catch (error) {
    console.log(error,'IS AT LINE NUMBER 56');
  }

})


app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
})