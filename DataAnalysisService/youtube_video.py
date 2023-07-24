from anyascii import anyascii
import playwright
import playwright.async_api
import time

def get_likes_from_label_text(label_text: str) -> int:

    """
    Returns the number of likes embedded in a like button's label text.

    Like button label texts are of the form "like this video along with # people",
    so basic substring indexing is all that is needed to extract the value as a string.

    At that point, commas are removed, and the value is cast to an integer.

    Args:

        str label_text: the text containing the likes count.

    Returns:

        the amount of likes embedded in the text.
    """

    return int(label_text[27:label_text.find(" ", 27)].replace(",", ""))

def get_views_from_text(text: str) -> int:

    """
    Extracts the amount of views from a collection
    of HTML text of the form "# views".

    Args:

        str text: the text to extract views from.

    Returns:

        The number of views. 
    """

    return text.replace(",","")[:-6]

def get_video_length_in_seconds(length_text: str) -> int:

    """
    Returns the length of a YouTube video in seconds
    given the inner text of an element storing the 
    video length.

    Args:

        str length_text: the text to get the length from.

    Returns:

        The length of the video.
    """

    parts: list[str] = length_text.split(":")

    factor: int = 1

    total_length: int = 0

    for i in range(2, -1, -1):

        total_length += factor * parts[i]

        factor *= 60

    return total_length

class YouTubeVideo:

    """
    Storage class for features of a YouTube video.

    Uses a video's ID and YouTube's Data API
    to retrieve YouTube video data.

    All Unicode characters are either converted to their
    ASCII counterparts, or if none exist, the best possible
    approximation is attempted using anyascii: see 
    https://github.com/anyascii/anyascii for more information
    """

    id: str
    title: str
    description: str
    likes: int
    views: int
    comments: int
    date_published: str
    channel: str

    async def load_from_page(self, video_page: playwright.async_api.Page):

        if "shorts" in video_page.url:

            raise playwright.async_api.TimeoutError("YouTube shorts are invalid")

        self.id = video_page.url[video_page.url.find("v=")+2:]

        title_element: playwright.async_api.Locator = video_page.locator("h1.ytd-watch-metadata").first

        title_text: str = await title_element.inner_text(timeout=4000)

        self.title = anyascii(title_text)

        show_more: playwright.async_api.Locator = video_page.locator('//*[@id="snippet"]')

        await show_more.click(timeout=4000)

        time.sleep(0.5)

        await video_page.wait_for_load_state("networkidle")

        description_element: playwright.async_api.Locator = video_page.locator("//*[@id='description-inline-expander']/yt-attributed-string/span")

        description_text: str = await description_element.inner_text(timeout=2000)

        self.description = anyascii(description_text)

        likes_element: playwright.async_api.Locator = video_page.locator("//*[@id='segmented-like-button']/ytd-toggle-button-renderer/yt-button-shape/button").first

        try:

            likes_label: str = await likes_element.get_attribute("aria-label", timeout=4000)

            self.likes = get_likes_from_label_text(likes_label)

        except ValueError:

            self.likes = 0

        views_element: playwright.async_api.Locator = video_page.locator('//*[@id="info"]/span[1]')

        views_text: str = await views_element.inner_text(timeout=4000)

        self.views = get_views_from_text(views_text)

        await show_more.scroll_into_view_if_needed(timeout=4000)

        await video_page.wait_for_load_state("networkidle")

        comments_element = video_page.locator("//*[@id='count']/yt-formatted-string/span[1]").first

        try:

            comments_text: str = await comments_element.inner_text(timeout=3000)

            self.comments = int(comments_text.replace(",", ""))

        # commentd disabled
        except:

            self.comments = 0

        upload_element: playwright.async_api.Locator = video_page.locator("//*[@id='info']/span[3]")

        self.date_published = await upload_element.inner_text(timeout=4000)

        if "Premiered" in self.date_published:

            self.date_published = self.date_published[11:]

        elif "Streamed live on" in self.date_published:

            self.date_published = self.date_published[17:]

        elif "Streamed live" in self.date_published:

            self.date_published = self.date_published[14:]

        channel_element: playwright.async_api.Locator = video_page.locator("#upload-info #channel-name a").first
        
        channel_text: str = await channel_element.inner_text(timeout=4000)

        self.channel = anyascii(channel_text)

        #category_element: playwright.async_api.Locator = video_page.locator('#info #metadata-container .ytd-metadata-row-renderer:nth-child(1) span:nth-child(2)').first

        #self.category = await category_element.inner_text()

    def __eq__(self, other: object) -> bool:
        
        return type(other) == YouTubeVideo and self.id == other.id
    
    def __str__(self) -> str:

        return self.title + " by " + self.channel