from random_video_generation import *
from typing import TextIO
import csv

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
            "video_id",
            "title",
            "description",
            "likes",
            "views",
            "date_published",
            "publisher",
            "child_friendly",
            "nsfw_word_count",
            "violent_word_count",
            "swear_word_count",
        ])
        
        return file_object

    else:

        return open(filename, "a", newline='')

def place_youtube_videos_in_csv_file(num_videos: int, filename: str, overwrite: bool = False) -> None:

    """
    Places a set number of random YouTube videos into a CSV file. Also
    provides the option to overwrite the file with the newly generated videos
    or simply append them to the start of the file. YouTube videos are stored
    in the file according to the following format:

    video_id,title,description,likes,views,date_published,publisher,child_friendly,nsfw_word_count,violent_word_count,swear_word_count

    Data types are str, str, str, int, int, str, str, bool, int, int, and int respectively.

    Separate videos, as well as individual video features, are not separated by newlines or whitespace.

    Args:

        int num_videos: the number of videos to add.

        str filename: the name of the file to place the video data in. This
        must be a CSV file.

        bool overwrite: whether to overwrite file contents.

    Returns:

        None
    """

    check_if_file_is_csv(filename)

    youtube_video_data_file: TextIO

    if overwrite:

        youtube_video_data_file = open(filename, "w")

        file_object_writer = csv.writer(youtube_video_data_file)

        file_object_writer.writerow([
            "video_id",
            "title",
            "description",
            "likes",
            "views",
            "date_published",
            "publisher",
            "child_friendly",
            "nsfw_word_count",
            "violent_word_count",
            "swear_word_count",
        ])

    else:

        youtube_video_data_file = open(filename, "a")

    for _ in range(num_videos):

        youtube_video_info: YouTubeVideo = retrieve_random_youtube_video()

        youtube_video_data_file_writer = csv.writer(youtube_video_data_file)

        youtube_video_data_file_writer.writerow([

            youtube_video_info.video_id,

            youtube_video_info.title,

            youtube_video_info.description,

            youtube_video_info.likes,

            youtube_video_info.views,

            youtube_video_info.date_published,

            youtube_video_info.publisher,

            youtube_video_info.child_friendly,

            youtube_video_info.nsfw_word_count,

            youtube_video_info.violent_word_count,

            youtube_video_info.swear_word_count

        ])

if __name__ == "__main__":

    place_youtube_videos_in_csv_file(5000, "youtube_video_data.csv")