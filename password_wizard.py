import random

numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=", "|", ":", "/", "?"]
letters_conversion_hash = {
    "a": ["@", "4"],
    "b": ["6", "8"],
    "e": ["3"],
    "i": ["!", "1"],
    "l": ["7"],
    "o": ["0"],
    "p": ["9"],
    "s": ["$", "5"],
    "t": ["+"],
    "v": ["^"],
    "x": ["%"],
    "z": ["2"]
}


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
    word1_spliced = char_splice(word1, symbol1, number1)
    
    update_password = f"{word1_spliced}{number2}{word2}{symbol2}"
    final_password = random_upcase(update_password)
    print(f"Your new random password is: {final_password}")

def strong_password(base_password: str) -> str:
    shifted_password = caesarian_shift(base_password)
    random_upcase(shifted_password)

    symbol1 = random.choice(symbols)
    number1 = random.choice(numbers)
    spliced_password = char_splice(shifted_password, symbol1, number1)
    print(f"Your base password has been transformed.\nYour new password is: {spliced_password}")

def caesarian_shift(base_word: str) -> str:
    base_word = base_word.lower()
    encrypted_word = ""
    shift = random.randint(1, 25)
    for letter in base_word:
        if letter in letters:
            letter_index = letters.index(letter)
            shifted_index = (letter_index + shift) % 26
            encrypted_word += letters[shifted_index]
        else:
            encrypted_word += letter
    return encrypted_word

def random_upcase(password: str) -> str:
    password_chars = list(password)
    random_index = random.randint(0, len(password_chars) - 1)
    password_chars[random_index] = password_chars[random_index].upper()
    return ''.join(password_chars)

def char_splice(word: str, symbol: str, number: str) -> str:
    position = random.randint(1, len(word) - 1)
    word = word[:position] + symbol + word[position:]
    position = random.randint(1, len(word) - 1)
    new_word = word[:position] + number + word[position:]
    return new_word


# Main Logic
print("Welcome to the password wizard!\n\nFrom this application you'll be able to generate a random password, or you'll have the option to use your own 'base' password that we can mix with some classic security mixers to make a very strong password.\n")

password_type = None
while password_type is None:
    password_type = input("What would you like to do?\n1) Create a random password.\n2) Create a password from a 'base' value.\n")

    if password_type == "1":
        simple_password()
        break

    elif password_type == "2":
        base_password = ""
        while len(base_password) < 6:
            base_password = input("\nThis option will utilize a cipher to scramble your base word into something hackers are extremely unlikely to guess.\nWhat do you want your password's base word or phrase to be?\n").lower().strip()
            if len(base_password) < 6:
                print("Please choose a longer 'base' password or consider using a phrase.\nA minimum of 6 characters is recommended for enhanced security.")
        strong_password(base_password)
        break

    else:
        print("Invalid choice. Please select 1 or 2.")
        password_type = None

