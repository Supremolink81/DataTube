from youtube_video import YouTubeVideo
import playwright.async_api
import asyncio
import time

async def retrieve_youtube_video_from_search(search_query: str, youtube_page: playwright.async_api.Page) -> YouTubeVideo:

    """
    Retrieves a list of videos from YouTube using the given search query.

    Args:

        str search_query: the query to search for.

        int num_videos: the amount of video links to get.

    Returns:

        A list of YouTube video objects corresponding to the data in the YouTube video. 
    """

    await youtube_page.get_by_placeholder("Search").click(timeout=3000)
    await youtube_page.get_by_placeholder("Search").fill(search_query, timeout=3000)
    await youtube_page.get_by_placeholder("Search").press("Enter", timeout=3000)

    await youtube_page.wait_for_load_state("networkidle", timeout=4000)

    await youtube_page.locator("ytd-video-renderer").first.locator("#dismissible").click(timeout=4000)

    time.sleep(2.5)

    await youtube_page.wait_for_url("https://www.youtube.com/watch?v=***********", timeout=3000)

    print("Video ID loaded.")

    await youtube_page.wait_for_load_state("networkidle", timeout=4000)

    youtube_video_info: YouTubeVideo = YouTubeVideo()

    await youtube_video_info.load_from_page(youtube_page)

    return youtube_video_info

if __name__ == "__main__":

    with open("youtube_video_data.sql", "r") as f:

        s = ""

        for line in f.readlines():

            s += line.replace("\\'", "\\''").replace("\\'''", "''")

        with open("youtube_video_data1.sql", "w") as f2:

            f2.write(s)