# Simple Discord music bot

A very simple Discord music bot written in TypeScript.

## Features

- Play music from YouTube, SoundCloud, Spotify, and more
- Queue system
- Volume control
- Pause, resume, skip, stop
- Loop, shuffle

## Installation

### Using node

Requirements: `Node.js`, `npm`, `ffmpeg`

1. Clone the repository
2. Install dependencies: `npm install`
3. Build and run the project: `npm run start`

### Using Docker

1. Clone the repository
2. Build the Docker image: `docker build -t discord-music-bot .`
3. Run the Docker container, passing the bot token as an environment variable: `docker run -d -e BOT_TOKEN=your_bot_token discord-music-bot`

## Configuration

Create a `.env` file in the root directory of the project with the following content:

```env
BOT_TOKEN=your_bot_token
```

Replace `your_bot_token` with your Discord bot token.

### Changing `responses.json`

Using the `responses.json` file, you can customize the bot's responses.  

To edit it using a Docker container, you can enter the container's shell, navigate to `/usr/src/app`, and edit the file using `nano` or `vim`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.