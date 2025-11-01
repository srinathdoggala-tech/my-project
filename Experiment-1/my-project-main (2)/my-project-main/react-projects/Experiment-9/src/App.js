import React, { useState } from "react";
import "./index.css";

function App() {
    const [showCode, setShowCode] = useState(false);
    const [showScriptCode, setShowScriptCode] = useState(false);

    const fullCode = `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getDetails() {
    return \`\${this.name}, \${this.age} years old\`;
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  getDetails() {
    return \`\${super.getDetails()}, Grade: \${this.grade}\`;
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
  getDetails() {
    return \`\${super.getDetails()}, Subject: \${this.subject}\`;
  }
}
`;
    const scriptJsCode = `class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    displayInfo() {
        console.log(\\\`Name: \${this.name}, Age: \${this.age}\\\`);
    }
}

class Student extends Person {
    constructor(name, age, course) {
        super(name, age);
        this.course = course;
    }

    displayInfo() {
        console.log(\\\`Name: \${this.name}, Age: \${this.age}, Course: \${this.course}\\\`);
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    displayInfo() {
        console.log(\\\`Name: \${this.name}, Age: \${this.age}, Subject: \${this.subject}\\\`);
    }
}

const student1 = new Student("Kartik", 19, "Computer Science");
student1.displayInfo();

const teacher1 = new Teacher("Dr. Sharma", 45, "Artificial Intelligence");
teacher1.displayInfo();`;

    return (
        <div>
            <section>
                <h2>Example Output</h2>
                {/* ...existing code... */}
            </section>
            <button
                className="toggle-code-btn"
                onClick={() => setShowCode((prev) => !prev)}
            >
                {showCode ? "Hide Code" : "Show Full Implementation"}
            </button>
            {showCode && (
                <pre className="code-block">{fullCode}</pre>
            )}

            <button
                className="toggle-code-btn"
                onClick={() => setShowScriptCode((prev) => !prev)}
            >
                {showScriptCode ? "Hide script.js" : "Show script.js Code"}
            </button>
            {showScriptCode && (
                <pre className="code-block">{scriptJsCode}</pre>
            )}
            {/* ...existing code... */}
        </div>
    );
}

export default App;