from constants import *
from googleapiclient.discovery import build, Resource
from typing import Union

youtube_api: Resource = build("youtube", "v3", developerKey=API_KEY)

def count_matching_words(text: str, word_list: Union[list[str], set[str]]) -> int:

    """
    Counts how many occurences of the words contained in a given
    list occur in a given corups of text.

    Args:

        str text: the text to search.

        list word_list: the list of words to search for.

    Returns:

        the number of occurences of any word in the text.
    """

    word_occurences: int = 0

    if type(word_list) == list:

        word_collection: set = set(word_list)

    else:

        word_collection: list = word_list

    list_of_words_in_text: list[str] = text.split()

    for word in list_of_words_in_text:

        if word in word_collection:

            word_occurences += 1

    return word_occurences

class YouTubeVideo:

    """
    Storage class for features of a YouTube video.

    Uses a video's ID and YouTube's Data API
    to retrieve YouTube video data.

    Note: Unicode characters are deleted from the title, description
    and channel upon instantiation.
    """

    video_id: str
    title: str
    description: str
    likes: int
    views: int
    date_published: str
    publisher: str
    child_friendly: bool
    nsfw_word_count: int
    violent_word_count: int
    swear_word_count: int

    def __init__(self, video_id: str):

        self.load_from_id(video_id)

    def load_from_id(self, video_id: str):

        self.video_id = video_id

        # Retrieves a list of youtube videos (in this case, since we only provide 1 ID, only one video is returned)
        youtube_data_http_request = youtube_api.videos().list(id=video_id, part=["snippet", "statistics", "status"])

        youtube_data_response = youtube_data_http_request.execute()

        video_info: dict = youtube_data_response.get("items", [])[0]

        self.load_from_info(video_info)

    def load_from_info(self, video_info: dict):

        # need to convert from bytes type to str type each time we encode
        full_description: str = video_info["snippet"]["description"].encode("ascii", errors='ignore').decode("ascii")

        abbreviated_description: str = ""

        if len(full_description) <= 100:

            abbreviated_description = str(full_description)

        else:

            abbreviated_description = full_description[:100] + "..."

        video_tag_list: list[str] = []

        if "tags" in video_info["snippet"]:

            video_tag_list: list[str] = video_info["snippet"]["tags"]

            for i in range(len(video_tag_list)):

                video_tag_list[i] = video_tag_list[i].encode("ascii", errors='ignore').decode("ascii")

        self.title = video_info["snippet"]["title"].encode("ascii", errors='ignore').decode("ascii")

        self.description = abbreviated_description.encode("ascii", errors='ignore').decode("ascii")

        self.likes = video_info["statistics"]["likeCount"]

        self.views = video_info["statistics"]["viewCount"]

        self.date_published = video_info["snippet"]["publishedAt"]

        # Remove exact time from date (date format is YYYY-MM-DDTHH:MM:SS)
        self.date_published = self.date_published[:self.date_published.find("T")]

        self.publisher = video_info["snippet"]["channelTitle"].encode("ascii", errors='ignore').decode("ascii")

        # cast to int because we want a label of either 0 or 1 in the dataset
        self.child_friendly = int(video_info["status"]["madeForKids"])

        # "".join is faster than raw string concatenation, as new strings are not repeatedly
        # created; see https://stackoverflow.com/questions/3055477/how-slow-is-pythons-string-concatenation-vs-str-join
        # for more information.
        total_text_in_video: str = " ".join([self.title, full_description] + video_tag_list)

        self.swear_word_count = count_matching_words(total_text_in_video, NSFW_WORDS)

        self.violent_word_count = count_matching_words(total_text_in_video, SWEAR_WORDS)

        self.nsfw_word_count = count_matching_words(total_text_in_video, VIOLENT_WORDS)

    def __eq__(self, other: object) -> bool:
        
        return type(other) == YouTubeVideo and self.video_id == other.video_id
    
    def __str__(self) -> str:

        return self.title + " by " + self.publisher