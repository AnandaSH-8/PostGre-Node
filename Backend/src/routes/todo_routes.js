const express = require('express');
const router = express.Router();
const todoMethods = require("../modules/todo_modules")

//Post Method
router.post('/addTodo',async(req,res)=>{
    const result = await todoMethods.addTodos(req.body);
    res.json(result);
})

// Get method all
router.get('/getTodos',async(req,res)=>{
    const result = await todoMethods.getAllTodos();
    res.send(result)
})

// Get method single
router.get('/getTodo/:id', async(req,res)=>{
    const result = await todoMethods.getTodo(req);
    res.json(result)
})

//Put method one
router.put('/updateTodo/:id', async(req,res)=>{
    await todoMethods.updateTodo(req);
    res.json("Successfully Updated")
})

//Delete method one
router.delete('/deleteTodo/:id', async(req,res)=>{
    await todoMethods.deleteTodo(req);
    res.json("Successfully Deleted")
})

module.exports = router;