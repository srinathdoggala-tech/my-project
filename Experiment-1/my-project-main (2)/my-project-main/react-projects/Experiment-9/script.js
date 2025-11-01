export class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

export class Student extends Person {
    constructor(name, age, course) {
        super(name, age);
        this.course = course;
    }
    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}, Course: ${this.course}`;
    }
}

export class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`;
    }
}

const student1 = new Student("Kartik", 19, "Computer Science");
console.log(student1.displayInfo());

const teacher1 = new Teacher("Dr. Sharma", 45, "Artificial Intelligence");
console.log(teacher1.displayInfo());
