from constants import ALPHANUMERIC_CHARS, API_KEY
from youtube_video import YouTubeVideo
import json
import urllib.request
import random
from http.client import HTTPResponse

def random_string(length: int) -> str:
    
    """
    Generates a random string of a specified length.

    Args:

        int length: the length of the string to generate.

    Returns:

        a string of characters chosen randomly.
    """

    random_str: str = ""

    for _ in range(length): 

        random_str += random.choice(ALPHANUMERIC_CHARS)

    return random_str

def random_video_search() -> str:

    """
    Generates a URL for an HTTP request for the 
    YouTube Search API to search for a YouTube video.

    Args:

        None

    Returns:

        A URL for an HTTP request for a YouTube search.
    """

    random_video_query: str = random_string(3)

    return "https://www.googleapis.com/youtube/v3/search?key={}&maxResults={}&part=snippet&type=video&q={}".format(API_KEY,1,random_video_query)

def youtube_video_data(youtube_search_api_request: str) -> dict:

    """
    Generates a JSON object storing data from
    a YouTube video from the given API request.

    Args:

        str youtube_search_api_request: the HTTP request for a YouTube video search.

    Returns:

        a dictionary storing YouTube video data.
    """

    youtube_url_response: HTTPResponse = urllib.request.urlopen(youtube_search_api_request)

    youtube_video_info: bytes = youtube_url_response.read()

    youtube_video_encoding: str = youtube_url_response.info().get_content_charset('utf-8')

    return json.loads(youtube_video_info.decode(youtube_video_encoding, errors='ignore')) 

def get_video_id(youtube_video_data: dict) -> str:

    """
    Retrieves a YouTube video's ID from a dictionary
    containing YouTube video data.

    Args:

        dict youtube_video_data: the YouTube video we want the ID of.

    Returns:

        the ID of the YouTube video associated with the JSON object.
    """

    return youtube_video_data["items"][0]["id"]["videoId"]

def retrieve_random_youtube_video() -> YouTubeVideo:

    """
    Retrieves a random video from YouTube.

    Args:

        None

    Returns:

        A random YouTube video.
    """

    youtube_search_api_request: str = random_video_search()

    random_video_data: dict = youtube_video_data(youtube_search_api_request)

    random_video_id: str = get_video_id(random_video_data)

    return YouTubeVideo(random_video_id)