export const DataReport: React.FC<{}> = () => {
    return (
        <>
            <h1 className="page-title">Data Report</h1>

            <h2 id="data-collection-header">Data Description And Collection</h2>

            <p>
                The data consists of information collected from YouTube videos. This information includes
                the video ID, title, description, the number of views, likes, and comments it has, the date
                it was published, and the name of the channel who published the video.
            </p>

            <p>
                To collect the data, I used a webdriver to simulate opening YouTube in the browser. Then, through
                this webdriver, I typed random queries into the search bar to emulate looking for random videos. These
                searches were 2 characters long each. After finding a video and clicking on it, the necessary data
                was extracted through analysis of the HTML of the page the video was on.
            </p>

            <p>
                There are a couple issues around the data collection though. For one, YouTube's video statistics are 
                not 100% accurate, so there may be slight discrepancies in, for example, the amount of comments listed
                and how many comments there actually are. Second, the choice to make search queries 2 characters long 
                was only to balance between video diversity and stability of searches and was not based on a specific
                heuristic. Third, due to Excel not supporting the Unicode character encoding, characters not compatible
                with ASCII, such as emojis, had to be converted with a semantic ASCII converter.
            </p>
        </>
    );
}