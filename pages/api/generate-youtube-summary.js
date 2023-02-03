const https = require('https');
const { spawn } = require('child_process');
const { Configuration, OpenAIApi } = require('openai');

const MAX_CHARACTERS = 3500;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function getVideoIdFromUrl(url) {
  console.log("url: " + url);
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    console.log("Url Extracted as: " + match[2])
    return match[2];
  }
  console.log("Url Extracted as: Null")
  return null;
}

export default async function (req, res) {
  const { youtubeUrl } = req.body;
  // Extract the video ID from the URL
  const videoId = getVideoIdFromUrl(youtubeUrl);
  if (!videoId) {
    res.status(400).json({ message: 'Invalid YouTube URL.' });
    return;
  }

  // Run the transcript_downloaded.py script and pass in the video ID as a command line argument
  const script = spawn('python', ['./scripts/transcript_downloader.py', videoId]);

  let transcript = '';
  script.stdout.on('data', (data) => {
    transcript += data;
    transcript = transcript.substring(0, MAX_CHARACTERS);
  });

  script.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    res.status(500).json({ message: 'Error fetching transcript.' });
  });

  script.on('close', async (code) => {
    console.log(`child process exited with code ${code}`);

    if (code === 0) {
      //console.log(`The transcript of maximum ${MAX_CHARACTERS} characters coming from python is: ${transcript}`)
      console.log(`What is sent to OpenAI: ${transcript}`)
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize this YoutTube transcript in blog format, but keep it to one or two paragraphs.  Return everything as HTML: ${transcript}`,
        temperature: 0,
        max_tokens: 3000,
      });
      console.log(`Retured from OpenAI: ${completion.data.choices[0].text}`)
      res.status(200).json({ result: completion.data.choices[0].text });
    } else {
      res.status(500).json({ message: 'Error fetching transcript.' });
    }
  });
}
