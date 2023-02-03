# YouTube Video Transcript Summarizer

A web application that summarizes YouTube video transcripts.

## Technologies used
- Node.js
- Python
- OpenAI API
- Next.js (for UI)

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Vercel account (for hosting the app)
- OpenAI API key

### Installing the required packages

1. Clone the repository:

git clone https://github.com/dmaiolo/youtube-transcript-summarization.git

2. Install the required packages by running:

npm install

3. Create a `.env` file in the root directory and add your OpenAI API key:

echo "OPENAI_API_KEY=<your-api-key>" > .env


### Deploying to Vercel

1. Connect your Git repository to Vercel:
- Log in to Vercel and go to the dashboard.
- Choose `Import Project`.
- Select the Git repository where your project is hosted.

2. Set the environment variables:
- Go to your Vercel project settings.
- Navigate to the `Environment Variables` section.
- Add the `OPENAI_API_KEY` environment variable with the value of your OpenAI API key.

3. Deploy the app:
- In the Vercel dashboard, go to the `Overview` section.
- Click the `Deploy` button.
- Wait for the build process to complete.

Your app should now be live and accessible at the URL provided by Vercel.

### Deploying to AWS

1. Set up a Node.js environment on AWS:
- Launch an EC2 instance with Amazon Linux 2.
- Connect to the instance via SSH.
- Install Node.js and npm by running:

curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs

2. Clone the repository:

git clone https://github.com/dmaiolo/youtube-transcript-summarization.git

3. Install the required packages:

cd dmaiolo/youtube-transcript-summarization
npm install

4. Set the environment variables:
- Create a `.env` file in the root directory and add your OpenAI API key:

echo "OPENAI_API_KEY=<your-api-key>" > .env

5. Start the app:

Your app should now be running on the EC2 instance. You can access it by visiting the public DNS or IP address of the instance in your web browser.

## Using the app

1. Enter the YouTube video URL in the input field.
2. Click the `Generate Summary` button.
3. Wait for the summary to be generated.
4. The summarized transcript will be displayed on the page.

## Author

David Maiolo
Date: Feb 3, 2023


