let sounds = [];
let buttons = [];
let soundFiles = ['sound/sound1.mp3', 'sound/sound2.mp3', 'sound/sound3.mp3', 'sound/sound4.mp3', 'sound/sound5.mp3'];
let isPlaying = []; // Array to keep track of which sound is currently playing
let videos = []; // Array to hold video elements

function preload() {
  // Load sounds
  for (let i = 0; i < soundFiles.length; i++) {
    sounds[i] = loadSound(soundFiles[i], 
      () => console.log(`Loaded ${soundFiles[i]}`), 
      () => console.error(`Failed to load ${soundFiles[i]}`)
    );
    isPlaying[i] = false; // Initialize all sounds as not playing
  }

  // Load videos
  for (let i = 1; i <= 5; i++) {
    let video = createVideo([`video${i}.mp4`]);
    video.hide(); // Hide videos initially
    video.loop(); // Set videos to loop
    videos.push(video);
    select('#video-container').child(video); // Add video to the container
  }
}

function setup() {
  noCanvas();
  createButtons();
}

function createButtons() {
  const buttonContainer = select('#buttons-container');
  for (let i = 0; i < soundFiles.length; i++) {
    buttons[i] = createButton(`Play/Stop Sound ${i + 1}`);
    buttons[i].parent(buttonContainer); // Append buttons to the buttons-container
    buttons[i].mousePressed(() => toggleSound(i));
  }
}

function toggleSound(index) {
  if (sounds[index]) {
    if (isPlaying[index]) {
      sounds[index].stop(); // Stop the sound if it's currently playing
      isPlaying[index] = false;
    } else {
      sounds[index].loop(); // Play the sound in loop if it's not currently playing
      isPlaying[index] = true;
    }
    updateVideo(); // Update the video based on the number of sounds playing
  } else {
    console.error('Sound at index', index, 'is undefined or not loaded');
  }
}

function updateVideo() {
  // Count the number of sounds currently playing
  let playingCount = isPlaying.filter(playing => playing).length;

  // Stop and hide all videos
  for (let video of videos) {
    video.stop();
    video.hide();
  }

  // Play and show the appropriate video based on the number of sounds playing
  if (playingCount > 0 && playingCount <= videos.length) {
    let video = videos[playingCount - 1]; // Select the video based on the count
    video.show(); // Make the video visible
    video.size(select('#video-container').width, select('#video-container').height); // Resize video to fit the container
    video.position(0, 0); // Ensure the video is positioned correctly
    video.play(); // Play the video
  }
}
