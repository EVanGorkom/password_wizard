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
Your generated password is: cheese09tribunal+
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

