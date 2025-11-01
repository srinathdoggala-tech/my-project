# Student Registration Form — Learnings and Code Explanation

## 🔍 Learnings

- Understood the basic structure of HTML5.
- Learned to build and structure HTML forms.
- Applied HTML5 validations using attributes like `required`, `type`, `pattern`, etc.
- Used `submit` and `reset` buttons for form control.
- Practiced organizing files within a project directory.
- Worked with Git to track changes.
- Successfully pushed the project to an existing GitHub repository.

## 🧠 Code Explanation (index.html)

- **Form Structure:**
  - The form is built using `<form>`, `<label>`, and `<input>` elements.
  - Input fields include validations such as `required`, `type="email"`, and custom `pattern` rules.

- **Validation:**
  - Client-side validation is handled through built-in HTML5 attributes.
  - Example: `type="email"` ensures the email format is correct.
  - Example: `pattern="[A-Za-z\s]+"` allows only alphabetic characters for name fields.

- **Buttons:**
  - `<button type="submit">`: Triggers form submission.
  - `<button type="reset">`: Clears all input fields.
