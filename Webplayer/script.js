// YouTube IFrame Player API
// https://developers.google.com/youtube/iframe_api_reference

let player;
let timeInterval;

// 1. Load the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    console.log("YouTube API Ready");
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE', // Initial placeholder video
        playerVars: {
            'playsinline': 1,
            'controls': 0, // Hide default controls for a cleaner look? Or keep them? Let's keep 0 for full API control feel, but maybe 1 is safer for user interaction. Let's do 1 but customize via CSS if needed. Actually user asked for API control, so 1 is fine.
             // 'controls': 1 is default.
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 3. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log("Player Ready");
    updateStatus("Ready to Jam");
}

// 4. The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        startTimer();
        updateStatus("Playing");
    } else {
        stopTimer();
        if(event.data == YT.PlayerState.PAUSED) updateStatus("Paused");
        if(event.data == YT.PlayerState.ENDED) updateStatus("Ended");
    }
}

function startTimer() {
    stopTimer();
    timeInterval = setInterval(() => {
        const time = window.jamGetTime();
        const display = document.getElementById('time-display');
        if(display) display.innerText = time.toFixed(2) + "s";
    }, 100);
}

function stopTimer() {
    clearInterval(timeInterval);
}

function updateStatus(msg) {
    const el = document.getElementById('status-text');
    if(el) el.innerText = msg;
}

// --- Bridge API ---

// Loads a video by ID and starts playing at a specific time (in seconds)
window.jamLoad = function(videoId, startAt = 0) {
    if(player && player.loadVideoById) {
        player.loadVideoById({
            videoId: videoId,
            startSeconds: startAt
        });
        return "Loading " + videoId;
    }
    return "Player not ready";
};

// Plays the video
window.jamPlay = function() {
    if(player && player.playVideo) {
        player.playVideo();
        return "Playing";
    }
    return "Player not ready";
};

// Pauses the video
window.jamPause = function() {
    if(player && player.pauseVideo) {
        player.pauseVideo();
        return "Paused";
    }
    return "Player not ready";
};

// Seeks to a specific time in seconds
window.jamSeek = function(seconds) {
    if(player && player.seekTo) {
        player.seekTo(seconds, true);
        return "Seeking to " + seconds;
    }
    return "Player not ready";
};

// Returns the current time in seconds
window.jamGetTime = function() {
    if(player && player.getCurrentTime) {
        return player.getCurrentTime();
    }
    return 0;
};

// Expose internal player for advanced debugging if needed
window.jamPlayer = function() {
    return player;
};
