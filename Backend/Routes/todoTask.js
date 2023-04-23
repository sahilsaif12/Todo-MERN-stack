const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')
// const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');


router.post("/addtodo",async (req, res) => {

    /// if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { user, text,inProgress,done,position,date } = req.body
        let todo = new Todo({
            user, text,inProgress,done,position,date
        })
        let savedTodo = await todo.save()
        res.json(savedTodo)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error accrued")
    }

})



router.get("/fetchtodos/:userId",async (req, res) => {
    try {
        let notes = await Todo.find({ user: req.params.userId, inProgress:false,done:false })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error accrued")
    }
})



router.put("/updatetodo/:id", async (req, res) => {
    const { user, text,inProgress,done,position,date } = req.body
    try {
        let newTodo = {}
        if (text) { newTodo.text = text }
        if (inProgress) { newTodo.inProgress = inProgress }
        if (done) { newTodo.done = done }
        if (position) { newTodo.position = position }
        if (date) { newTodo.date = date }
        if (user) { newTodo.user = user }

        let todo = await Todo.findById(req.params.id) /// finding with todo's id which has been passed in api endpoint (:id)
        if (!todo) {
            return res.status(404).send("Not found")
        }
        //req.params.id=particular note's id,  req.user.id=note's user id 
        /// Allow updating only if user owns this note
        if (todo.user.toString() !== req.body.user) {   // comparing between the user id associated to note's id and req user id which has been sent in header in a wrap of jsonWebToken
            return res.status(401).send("Not allowed")
        }
        let updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { $set: newTodo },{new:true})
        res.json({ updatedTodo })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error)
    }
})



router.delete("/deletetodo/:id", async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id) /// finding with todo's id which has been passed in api endpoint (:id)
        if (!todo) {
            return res.status(404).send("Not found")
        }
        //req.params.id=particular note's id,  req.user.id=note's user id 
        /// Allow updating only if user owns this note
        if (todo.user.toString() !== req.body.user) {   // comparing between the user id associated to note's id and req user id which has been sent in header in a wrap of jsonWebToken
            return res.status(401).send("Not allowed")
        }
        let deletedTodo = await Todo.findByIdAndDelete(req.params.id)
        res.json({success:"Note deleted" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error accrued")
    }
})

router.get("/inProgressTodos/:userId", async (req, res) => {
    try {
        let todos = await Todo.find({ user: req.params.userId, inProgress:true,done:false })
        res.json(todos)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error accrued")
    }
})

router.get("/doneTodos/:userId", async (req, res) => {
    try {
        let todos = await Todo.find({ user: req.params.userId, inProgress:false,done:true })
        res.json(todos)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error accrued")
    }
})
module.exports = router