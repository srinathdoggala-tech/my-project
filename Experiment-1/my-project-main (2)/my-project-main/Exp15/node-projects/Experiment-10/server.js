const express = require('express');
const app = express();
const port = 3000;
const readline = require('readline');

const handleGet = (req, res) => {
    res.send({
        url: req.url,
        method: req.method
    })
}
app.get('/', handleGet);

app.post('/submit', (req, res) => {
    res.send('Data submitted!');
});

const handleUpdate = (req, res) => {
    res.send('Data updated');
}

app.patch('/update', handleUpdate);

const handleDelete = (req, res) => {
    res.send('Data Deleted');
}

app.delete('/delete', handleDelete);

const employees = [];

function showMenu() {
	console.log('\nEmployee Management System');
	console.log('1. Add Employee');
	console.log('2. List Employees');
	console.log('3. Remove Employee');
	console.log('4. Exit');
}

function listEmployees() {
	if (employees.length === 0) {
		console.log('No employees found.');
		return;
	}
	console.log('\nEmployee List:');
	employees.forEach((e, i) => {
		console.log(`${i + 1}. Name: ${e.name}, ID: ${e.id}`);
	});
}

function addEmployee(name, id) {
	employees.push({ id, name });
}

function removeEmployeeById(id) {
	const idx = employees.findIndex(e => e.id === id);
	if (idx === -1) return null;
	const [removed] = employees.splice(idx, 1);
	return removed;
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function promptChoice() {
	rl.question('\nEnter your choice: ', (choice) => {
		switch (choice.trim()) {
			case '1':
				return promptAdd(() => { showMenu(); promptChoice(); });
			case '2':
				listEmployees();
				return promptChoice();
			case '3':
				return promptRemove(() => { showMenu(); promptChoice(); });
			case '4':
				rl.close();
				return;
			default:
				console.log('Invalid choice. Please enter 1, 2, 3, or 4.');
				return promptChoice();
		}
	});
}

function promptAdd(done) {
	rl.question('Enter employee name: ', (name) => {
		const n = name.trim();
		if (!n) {
			console.log('Name is required.');
			return promptAdd(done);
		}
		rl.question('Enter employee ID: ', (id) => {
			const i = id.trim();
			if (!i) {
				console.log('ID is required.');
				return promptAdd(done);
			}
			if (employees.some(e => e.id === i)) {
				console.log(`Employee with ID ${i} already exists.`);
				return done();
			}
			addEmployee(n, i);
			console.log(`Employee ${n} (ID: ${i}) added successfully.`);
			done();
		});
	});
}

function promptRemove(done) {
	rl.question('Enter employee ID to remove: ', (id) => {
		const i = id.trim();
		if (!i) {
			console.log('ID is required.');
			return done();
		}
		const removed = removeEmployeeById(i);
		if (removed) {
			console.log(`Employee ${removed.name} (ID: ${removed.id}) removed successfully.`);
		} else {
			console.log(`No employee found with ID: ${i}`);
		}
		done();
	});
}

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
	showMenu();
	promptChoice();
});

rl.on('close', () => {
	console.log('Exiting Employee CLI.');
	process.exit(0);
});

process.on('SIGINT', () => {
	rl.close();
});