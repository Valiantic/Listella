const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// GET all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single todo by id
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE A new todo 
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = await Todo.create({ title });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

// UPDATE a todo
router.put('/id', async (req, res) => {
    try {
        const { title } = req.body;
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            todo.title = title;
            await todo.save();
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// DELETE a todo 
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            await todo.destroy();
            res.json({ message: 'Todo deleted' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
