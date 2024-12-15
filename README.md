# Password Wizard

A Python-based password generator that creates random or enhanced passwords for improved security. Users can choose to generate a completely random password or provide a "base" password that will be enhanced with additional characters for added complexity.

## Features
- **Random Password Generator**: Generates a password using a random word from a word bank, combined with numbers and symbols.
- **Custom Base Password**: Enhances a user-provided base password with added security elements.
- **User-Friendly Interface**: Text-based interface to guide the user through the password creation process.

## Requirements
- Python 3.6 or higher
- A `words.txt` file containing a list of words, with each word on its own line.

## Installation
1. Clone this repository or download the source files.
2. Ensure that the `words.txt` file is in the same directory as `password_generator.py`.

## Usage
1. Run the `password_generator.py` script:
   ```bash
   python3 password_generator.py
   ```
2. Follow the prompts to either:
   - Generate a random password.
   - Create a password from a base value.

## Example Word Bank
Ensure your `words.txt` file contains a variety of words for random password generation. Example contents:
```
apple
banana
cherry
dragonfruit
elderberry
fig
grape
honeydew
```

## Sample Outputs
### Random Password
```
Your generated password is: ch33setRi6un@l
```

### Enhanced Base Password
Input: `secure123`  
Output: `secure1234&`

## File Structure
```
password-generator/
│
├── password_generator.py   # Main script
├── words.txt            # Word bank file
└── README.md               # Documentation
```

## Future Enhancements
- Add an option to specify password length and complexity requirements.
- Implement a graphical user interface (GUI).
- Support saving generated passwords to a file.


---
---
---

# React + TypeScript + Vite

`npm run dev`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
