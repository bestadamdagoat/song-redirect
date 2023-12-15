addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // HTML content with the message and auto-redirection
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="5;url=${await getRandomVideoUrl()}">
      </head>
      <body>
        <p>This project has been discontinued, redirecting to a cool song in 5 seconds...</p>
      </body>
    </html>
  `;

  // Create a response with the HTML content
  const response = new Response(htmlContent, {
    headers: { "Content-Type": "text/html" },
  });

  return response;
}

async function getRandomVideoUrl() {
  // YouTube playlist URL
  const playlistUrl = 'https://www.youtube.com/playlist?list=PL74mp_YF6e9Ur59VN8piYl6XfS7aSZj5s';

  // Fetch the playlist page to get the list of videos
  const playlistResponse = await fetch(playlistUrl);
  if (!playlistResponse.ok) {
    return 'https://www.youtube.com'; // Default URL in case of an error
  }

  const playlistHtml = await playlistResponse.text();

  // Parse the HTML to extract video IDs
  const videoIds = playlistHtml.match(/"videoId":"([^"]+)"/g).map((match) => match.match(/"videoId":"([^"]+)"/)[1]);

  // Choose a random video from the playlist
  const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];

  // Return the URL of the random video
  return `https://www.youtube.com/watch?v=${randomVideoId}`;
}
