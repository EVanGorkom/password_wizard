import random

numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=", "|", ":", "/", "?"]
letters_conversion_hash = {
    "a": ["@", "4"],
    "b": ["6", "8"],
    "e": ["3"],
    "i": ["!", "1"],
    "l": ["|", "7"],
    "o": ["0"],
    "p": ["9"],
    "s": ["$", "5"],
    "t": ["+"],
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
    altered_word1 = char_replacement(word1)
    altered_word2 = char_replacement(word2)
    final_word1 = random_upcase(altered_word1)
    final_word2 = random_upcase(altered_word2)
    final_password = f"{final_word1}{final_word2}"
    print(f"Your new random password is: {final_password}")

def strong_password(base_password: str) -> str:
    shifted_password = caesarian_shift(base_password)
    upcased_password = random_upcase(shifted_password)

    symbol1 = random.choice(symbols)
    number1 = random.choice(numbers)
    spliced_password = char_splice(upcased_password, symbol1, number1)
    print(f"Your base password has been transformed.\nYour new password is: {spliced_password}")

def random_password() -> str:
    i = 0
    j = 0
    base_password = ""
    while i < 10:
        base_password += random.choice(letters)
        i += 1

    while j < 3:
        base_password = char_splice(base_password, random.choice(symbols), random.choice(numbers))
        j += 1

    k = random.randint(2, 5)
    l = 0

    while l != k:
        base_password = random_upcase(base_password)
        l += 1


    print(base_password)


# Helper methods
def char_replacement(base_password: str) -> str:
    password_chars = list(base_password)
    replacement_count = 0

    while replacement_count < 2:
        index = random.randint(0, len(password_chars) - 1)
        char = password_chars[index]
        if char in letters_conversion_hash:
            password_chars[index] = random.choice(letters_conversion_hash[char])
            replacement_count += 1
    return ''.join(password_chars)

def caesarian_shift(base_password: str) -> str:
    base_password = base_password.lower()
    encrypted_word = ""
    shift = random.randint(1, 25)
    for letter in base_password:
        if letter in letters:
            letter_index = letters.index(letter)
            shifted_index = (letter_index + shift) % 26
            encrypted_word += letters[shifted_index]
        else:
            encrypted_word += letter
    return encrypted_word

def random_upcase(base_password: str) -> str:
    password_chars = list(base_password)
    random_index = random.randint(0, len(password_chars) - 1)
    password_chars[random_index] = password_chars[random_index].upper()
    return ''.join(password_chars)

def char_splice(base_password: str, symbol: str, number: str) -> str:
    position = random.randint(1, len(base_password) - 1)
    base_password = base_password[:position] + symbol + base_password[position:]
    position = random.randint(1, len(base_password) - 1)
    new_password = base_password[:position] + number + base_password[position:]
    return new_password


# Main Logic
print("Welcome to the password wizard!\n\nFrom this application you'll be able to generate a random password, or you'll have the option to use your own 'base' password that we can mix with some classic security mixers to make a very strong password.\n")

password_type = None
while password_type is None:
    password_type = input("What would you like to do?\n1) Create a simpler random password.\n2) Create a password from a 'base' value.\n3) Create a very strong random password.\n")

    if password_type == "1":
        simple_password()
        break

    elif password_type == "2":
        base_password = ""
        while len(base_password) < 7:
            base_password = input("\nThis option will utilize a cipher to scramble your base word into something hackers are extremely unlikely to guess.\nWhat do you want your password's base word or phrase to be?\n").lower().strip()
            if len(base_password) < 7:
                print("Please choose a longer 'base' password or consider using a phrase.\nA minimum of 7 characters is required for enhanced security.")
        strong_password(base_password)
        break

    elif password_type == "3":
        random_password()
        break

    else:
        print("Invalid choice. Please select 1 or 2.")
        password_type = None

