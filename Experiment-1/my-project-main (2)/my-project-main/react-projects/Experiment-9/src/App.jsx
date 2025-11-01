import React, { useState } from "react";
import "./App.css";
import { Student, Teacher } from "../script.js";

function App() {
  const [showScriptCode, setShowScriptCode] = useState(false);

  const scriptJsCode = `export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return \`Name: \${this.name}, Age: \${this.age}\`;
  }
}

export class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  displayInfo() {
    return \`Name: \${this.name}, Age: \${this.age}, Course: \${this.course}\`;
  }
}

export class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return \`Name: \${this.name}, Age: \${this.age}, Subject: \${this.subject}\`;
  }
}

const student1 = new Student("Kartik", 19, "Computer Science");
console.log(student1.displayInfo());

const teacher1 = new Teacher("Dr. Sharma", 45, "Artificial Intelligence");
console.log(teacher1.displayInfo());`;

  const student = new Student("Kartik", 19, "Computer Science");
  const teacher = new Teacher("Dr. Sharma", 45, "Artificial Intelligence");

  return (
    <div className="container">
      <h1>Inheritance Demo</h1>
      <p>{student.displayInfo()}</p>
      <p>{teacher.displayInfo()}</p>

      <button
        onClick={() => setShowScriptCode((prev) => !prev)}
        style={{
          marginTop: "12px",
          padding: "6px 14px",
          cursor: "pointer",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px"
        }}
      >
        {showScriptCode ? "Hide script.js Code" : "Show script.js Code"}
      </button>

      {showScriptCode && (
        <pre
          style={{
            marginTop: "10px",
            background: "#f5f5f5",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "6px",
            overflowX: "auto"
          }}
        >
          {scriptJsCode}
        </pre>
      )}
    </div>
  );
}

export default App;
