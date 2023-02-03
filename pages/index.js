import Head from "next/head";
import React from "react";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    const response = await fetch("/api/generate-youtube-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtubeUrl }),
      });
  
    const data = await response.json();
    setResult(data.result.replaceAll("\n", "<br />"));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>YouTube Video Transcript Summarizer</title>
        <link rel="icon" href="/car.png" />
      </Head>

      <main className={styles.main}>
        <h3>YouTube Video Transcript Summarizer</h3>
        <form onSubmit={onSubmit}>
          <label>YouTube Video URL</label>
          <input
            type="text"
            name="youtubeUrl"
            placeholder="Enter the YouTube video URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <input type="submit" value="Generate Summary" />
        </form>
        {loading && (
          <div>
            <h3>Generating Summary...</h3>
            <img src="/loading.webp" className={styles.loading} />
          </div>
        )}
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}