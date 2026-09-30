# JamRoom

JamRoom is an experimental synchronized music-listening project built around the idea of letting multiple users share the same playback experience.

The repository currently includes a browser-based YouTube player interface together with separate mobile-app and API components.

## Core Idea

Instead of every user independently starting a song, JamRoom is designed around shared playback state:

```text
Room / session state
        ↓
   Current track
        ↓
 Playback position
        ↓
 Synchronized clients
```

The goal is to make joining a room feel more like listening to music together than simply sharing a link.

## Web Player

The included web player uses the **YouTube IFrame Player API** and exposes a small JavaScript bridge for controlling playback.

Available functions include:

```js
window.jamLoad(videoId, startAt)
window.jamPlay()
window.jamPause()
window.jamSeek(seconds)
window.jamGetTime()
```

This makes it possible for another application layer to remotely control:

- which video is loaded
- whether playback is active
- the current timestamp
- seeking and synchronization

## Repository Structure

```text
JamRoom/
├── MobileApp/          # Mobile application component
├── Webplayer/
│   ├── jam.html        # Browser player UI
│   ├── script.js       # YouTube API + control bridge
│   └── style.css
├── jamroom-api/        # Backend/API component
└── README.md
```

`MobileApp` and `jamroom-api` are included as linked repository components.

## Running the Web Player

From the repository:

```bash
cd Webplayer
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/jam.html
```

The page provides basic controls for loading, playing, pausing, restarting, seeking, and reading the current playback time.

## Tech

- JavaScript
- HTML / CSS
- YouTube IFrame Player API
- Mobile client component
- Backend API component

## Why I Built It

JamRoom started from the question:

> How can multiple devices feel like they are listening to the same song together?

Building it involves problems around real-time state, playback synchronization, client/server communication, and integrating third-party media APIs.

## Status

JamRoom is an experimental project. The current repository captures the player and component structure rather than a finished consumer product.
