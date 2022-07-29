const Todo = require('../models/todo-db');

function index(req, res) {
  res.render('todos/index', {
    todos: Todo.getAll()
  });
}

function show(req, res) {
 	res.render('todos/show', {
		todo: Todo.getOne(req.params.id)
 	});
}

function create (req, res) {
	Todo.create(req.body);
	res.redirect('/todos');
}

function deleteTodo(req, res) {
	Todo.deleteOne(req.params.id);
	res.redirect('/todos');
}

function edit (req, res) {
	res.render('todos/edit', {
		todo: Todo.getOne(req.params.id)
	});
}

function update (req, res) {
	todo: Todo.update(req.body);
	res.redirect('/todos');
}

module.exports = {
  index,
	show,
	create,
	delete: deleteTodo,
	edit,
	update
};