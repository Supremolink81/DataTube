export const Home: React.FC<{}> = () => {
    return (
        <div id="home-page">

            <h1 className="page-title">Home</h1>

            <div className="rhombus page-rhombus" id="about-rhombus"></div>

            <h2 id="about-title">About</h2>

            <div className="rhombus text-rhombus" id="about-paragraph-rhombus-1"></div>

            <p>
                Welcome to DataTube, a site where you can analyze YouTube video data! 
                This page will give you descriptions of pages, and brief tutorials on how
                to navigate them.
            </p>

            <p>
                The site itself has over 1000 YouTube videos at its disposal for analysis,
                as well as a data report that shows major insights we can get from the data. <br />
                While this info is on the Data Report page, if you wish to do 
                your own exploration, the Data Query section is for you!
            </p>

            <p>
                If you wish to return to a query you have already done, visit the Query History 
                page, where all data queries you have made are stored, starting with the most
                recent ones at the top of the page.<br /><br />
            </p>

            <p>
                Of course, in order for the site to remember your past queries, you have to make
                an account with us through the Sign Up page.<br /><br />
            </p>

            <div className="rhombus text-rhombus" id="about-paragraph-rhombus-2"></div>

        </div>
    );
}