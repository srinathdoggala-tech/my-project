import React from "react";

// Base Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age); // call Person constructor
    this.course = course;
  }

  // Override method
  getInfo() {
    return `${super.getInfo()}, Course: ${this.course}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  // Override method
  getInfo() {
    return `${super.getInfo()}, Subject: ${this.subject}`;
  }
}

export default function App() {
  // Create instances
  const student = new Student("Alice", 20, "Computer Science");
  const teacher = new Teacher("Mr. Smith", 40, "Mathematics");

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Person Class Hierarchy</h1>
      <h2>Student Info</h2>
      <p>{student.getInfo()}</p>
      <h2>Teacher Info</h2>
      <p>{teacher.getInfo()}</p>
    </div>
  );
}
