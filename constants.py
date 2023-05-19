import os

ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"

SWEAR_WORDS: set = {
    "fuck",
    "shit",
    "dick",
    "ass",
    "piss",
    "pussy",
}

NSFW_WORDS: set = {
    "sex",
    "sexual",
    "sexy",
    "dick",
    "pussy",
    "rape",
}

VIOLENT_WORDS: set = {
    "assault",
    "kill",
    "murder",
    "rape",
    "death",
    "murder",
}

API_KEY: str = os.environ.get("YOUTUBE_DATA_API_KEY")