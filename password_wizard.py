import random

numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", ":", "<", ">", "/", "?"]

print("Welcome to the password wizard!\n\nFrom this application you'll be able to generate a random password, or you'll have the option to use your own 'base' password that we can mix with some classic security mixers to make a very strong password.\n")

def get_random_word() -> str:
    try:
        with open("words.txt", "r") as file:
            words = file.readlines()
        words = [word.strip() for word in words]
        if not words:
            raise ValueError("The word bank is empty. Please populate it with words.")
        return random.choice(words)
    except FileNotFoundError:
        print(f"Error: The file at `words.txt` was not found.")
        return ""
    except ValueError as e:
        print(f"Error: {e}")
        return ""

def simple_password() -> str:
    word1 = get_random_word()
    word2 = get_random_word()
    symbol1 = random.choice(symbols)
    symbol2 = random.choice(symbols)
    number1 = random.choice(numbers)
    number2 = random.choice(numbers)
    final_password = f"{word1}{symbol1}{number1}{number2}{word2}{symbol2}"
    print(f"Your new random password is: {final_password}")

def strong_password(base_password: str) -> str:
    print("Test")


password_type = None
while password_type is None:
    password_type = input("What would you like to do?\n1) Create a random password.\n2) Create a password from a 'base' value.\n")

    if password_type == "1":
        simple_password()
        break

    elif password_type == "2":
        base_password = ""
        while len(base_password) < 6:
            base_password = input("What do you want your password's base word or phrase to be?\n").lower().strip()
            if len(base_password) < 6:
                print("Please choose a longer 'base' password or consider using a phrase.\nA minimum of 6 characters is recommended for enhanced security.")
        strong_password(base_password)
        break

    else:
        print("Invalid choice. Please select 1 or 2.")
        password_type = None

