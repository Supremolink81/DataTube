import video_generation
from youtube_video import YouTubeVideo
from typing import TextIO
import csv
import random
import pandas as pd
import asyncio
import playwright.async_api

ALPHANUMERIC_CHARS: str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"

def random_string(length: int) -> str:

    """
    Returns a randomly generated string of a specified 
    length consisting of alphanumeric characters.

    Args:

        int length: the length of the string

    Returns:

        A randomly generated string of the given length.
    """

    return "".join([random.choice(ALPHANUMERIC_CHARS) for _ in range(length)])

def check_if_file_is_csv(filename: str) -> None:

    """
    Checks if a filename corresponds to a CSV file, and throws
    an AssertionError if not.

    Args:

        str filename: the name of the file to check.

    Returns:

        None
    """

    assert len(filename) >= 4 and filename[-4:] == '.csv', "file name entered must be a CSV file."

def make_file_object(filename: str, overwrite: bool) -> TextIO:

    """
    Creates a file object referencing a file stored on disk,
    with an option to either overwrite the file or append the
    contents to what is already present.

    Args:

        str filename: the name of the file.

        bool overwrite: whether to overwrite file contents.

    Returns:

        a file object referencing a file.
    """

    if overwrite:

        file_object: TextIO = open(filename, "w", newline='')

        file_object_writer = csv.writer(file_object)

        file_object_writer.writerow([
            "id",
            "title",
            "description",
            "likes",
            "views",
            "comments",
            "date_published",
            "publisher",
        ])
        
        return file_object

    else:

        return open(filename, "a", newline='')
    
def remove_duplicates_from_csv(filename: str) -> None:

    """
    Removes duplicate entries in-place from a CSV file.

    Args:

        str filename: the CSV file to remove duplicates from.

    Returns:

        None
    """

    check_if_file_is_csv(filename)

    csv_as_dataframe: pd.DataFrame = pd.read_csv(filename, index_col=False, encoding="windows-1252")

    csv_as_dataframe = csv_as_dataframe.drop_duplicates(subset="id")

    csv_as_dataframe.to_csv(filename, index=False)

    print("Duplicates Removed.")

async def place_youtube_videos_in_csv_file(num_queries: int, filename: str, overwrite: bool = False) -> None:

    """
    Places a set number of videos from a variety of search queries into a CSV file.
    YouTube videos are stored in the file according to the following format:

    video_id,title,description,likes,views,date_published,publisher,child_friendly,nsfw_word_count,violent_word_count,swear_word_count

    Data types are str, str, str, int, int, str, str, bool, int, int, and int respectively.

    Separate videos, as well as individual video features, are not separated by newlines or whitespace.

    Args:

        int num_queries: the number of queries to perform.

        str filename: the name of the file to place the video data in. This
        must be a CSV file.

        bool overwrite: whether to overwrite file contents.

    Returns:

        None
    """

    check_if_file_is_csv(filename)

    async with playwright.async_api.async_playwright() as playwright_instance:

        firefox_instance: playwright.async_api.Browser = await playwright_instance.firefox.launch(headless=False)

        youtube_page: playwright.async_api.Page = await firefox_instance.new_page()

        await youtube_page.goto("https://www.youtube.com/")

        youtube_video_data_file: TextIO = make_file_object(filename, overwrite)

        iterations: int = 0

        while iterations < num_queries:
            
            try:

                youtube_search_query: str = random_string(2)

                youtube_video_info: YouTubeVideo = await video_generation.retrieve_youtube_video_from_search(youtube_search_query, youtube_page)

                youtube_video_data_file_writer = csv.writer(youtube_video_data_file)

                youtube_video_data_file_writer.writerow([

                    youtube_video_info.id,

                    youtube_video_info.title,

                    youtube_video_info.description,

                    youtube_video_info.likes,

                    youtube_video_info.views,

                    youtube_video_info.comments,

                    youtube_video_info.date_published,

                    youtube_video_info.channel,

                ])

                print(f"Video {iterations+1} generated: " + str(youtube_video_info))

                iterations += 1

            except playwright.async_api.TimeoutError:

                print("Video Loading Unsuccessful, Retrying.")

        await firefox_instance.close()

    remove_duplicates_from_csv(filename)

if __name__ == "__main__":

    asyncio.run(place_youtube_videos_in_csv_file(150, "YouTubeDataAnalysisService/youtube_video_data.csv", overwrite=False))