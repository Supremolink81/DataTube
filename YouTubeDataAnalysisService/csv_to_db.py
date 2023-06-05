import supabase
import os
import csv
import api_to_csv
from typing import TextIO
from dotenv import load_dotenv

def add_csv_data_to_db(filename: str, db_name: str) -> None:

    """
    Adds data from a CSV file stored on disk into a PostgreSQL database.

    Args:

        str csv_filename: the name of the CSV file.

        str db_name: the name of the PostgreSQL database.

    Returns:

        None
    """

    supabase_url: str = os.getenv("SUPABASE_URL")
    supabase_key: str = os.getenv("SUPABASE_PRIVATE_KEY")
    supabase_client: supabase.client.Client = supabase.client.create_client(supabase_url, supabase_key)

    database: supabase.client.SyncRequestBuilder = supabase_client.table(db_name)

    api_to_csv.check_if_file_is_csv(filename)

    csv_file: TextIO = open(filename, "r")

    csv_reader: csv.DictReader = csv.DictReader(csv_file)

    print(csv_reader.line_num)

    for csv_row in csv_reader:

        print(csv_row)

        insert_row_request: supabase.client.AsyncQueryRequestBuilder = database.insert(csv_row)

        insert_row_request.execute()

if __name__ == "__main__":

    load_dotenv()

    add_csv_data_to_db("youtube_video_data.csv", "YouTube Videos")