# File: transcript_downloaded.py
# Author: [Your Name]
# Date: [Current Date]
# Description: This script uses the YouTubeTranscriptApi library to download transcripts for a given YouTube video and returns just the transcript text.

import sys 
import re
from youtube_transcript_api import YouTubeTranscriptApi

def get_transcript_text(video_id):
    """
    Given a YouTube video ID, this function will download the transcript
    for that video and return just the transcript text as a string.
    """
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join([part['text'] for part in transcript])
        text = re.sub(r'[^\w\.\?,!]', ' ', text)
        return text
    except Exception as e:
        print("Error: ", e)
        return None

if __name__ == "__main__":
    video_id = sys.argv[1]
    transcript_text = get_transcript_text(video_id)
    if transcript_text:
        print(transcript_text)
    else:
        print("Could not fetch transcript.")
