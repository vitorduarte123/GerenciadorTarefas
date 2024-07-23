const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth'); // Middleware de autenticação

// Obter todas as tarefas do usuário logado
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ _id: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

// Criar nova tarefa
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        const existingTask = await Task.findOne({ title, user: req.user.id });
        if (existingTask) {
            return res.status(400).json({ error: 'Uma tarefa com este título já existe' });
        }

        const newTask = new Task({ title, description, user: req.user.id });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
});

// Atualizar tarefa
router.patch('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: id, user: req.user.id }, { completed }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});

// Deletar tarefa
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findOneAndDelete({ _id: id, user: req.user.id });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

module.exports = router;
