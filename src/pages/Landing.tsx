import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Landing() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = () => {
    if (!url) return;

    // TEMP mock (replace with API later)
    const fakeShort = "short.ly/" + Math.random().toString(36).substring(6);
    setShortUrl(fakeShort);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <Helmet>
        <title>Turain | Home</title>
      </Helmet>
      <h1>URL Shortener 🚀</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />

        <button onClick={handleShorten} style={{ marginLeft: "10px", padding: "10px" }}>
          Shorten
        </button>
      </div>

      {shortUrl && (
        <p style={{ marginTop: "20px" }}>
          Short URL: <strong>{shortUrl}</strong>
        </p>
      )}
    </div>
  );
}