const readline = require('readline');

// CLI interface setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employees = []; // In-memory array to store employees

function showMenu() {
    console.log(`
Employee Management System
1. Add Employee
2. List Employees
3. Remove Employee
4. Exit
`);

    rl.question("Enter your choice: ", (choice) => {
        switch (choice.trim()) {
            case '1':
                addEmployee();
                break;
            case '2':
                listEmployees();
                break;
            case '3':
                removeEmployee();
                break;
            case '4':
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please select 1-4.");
                showMenu();
        }
    });
}

function addEmployee() {
    rl.question("Enter employee name: ", (name) => {
        rl.question("Enter employee ID (e.g., E101): ", (id) => {
            if (employees.find(emp => emp.id === id)) {
                console.log("An employee with that ID already exists.");
            } else {
                employees.push({ name, id });
                console.log("Employee added successfully.");
            }
            showMenu();
        });
    });
}

function listEmployees() {
    if (employees.length === 0) {
        console.log("No employees to display.");
    } else {
        console.log("\nEmployee List:");
        employees.forEach((emp, index) => {
            console.log(`${index + 1}. Name: ${emp.name}, ID: ${emp.id}`);
        });
    }
    showMenu();
}

function removeEmployee() {
    rl.question("Enter the ID of the employee to remove: ", (id) => {
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            employees.splice(index, 1);
            console.log("Employee removed.");
        } else {
            console.log("Employee not found.");
        }
        showMenu();
    });
}

// Start the application
showMenu();
