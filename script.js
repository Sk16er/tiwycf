const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playlist = document.getElementById('playlist');

// Update the songs array to include all songs in the folder
const songs = [
    '01. Mithoon - Tum Hi Ho.opus',
    '01. Pritam - Gerua (From _Dilwale_).flac',
    '01. Pritam - Kesariya.flac',
    '02. Ankit Tiwari - Sunn Raha Hai.opus',
    '02. Jeet Gannguli - Hamari Adhuri Kahani (Title Track) [From _Hamari Adhuri Kahani_].flac',
    '02. Pritam - Shayad.flac',
    '03. Javed - Mohsin - Pal.flac',
    '03. Palak Muchhal - Chahun Main Ya Naa.opus',
    '03. Tanishk Bagchi - Bolna (From _Kapoor & Sons (Since 1921)_).flac',
    '04. A.R. Rahman - Enna Sona (From _OK Jaanu_).flac',
    '04. Tulsi Kumar - Hum Mar Jayenge.opus',
    '05. Palak Muchhal - Meri Aashiqui.opus',
    '05. Pritam - Hawayein (From _Jab Harry Met Sejal_).flac',
    '05. Pritam - Janam Janam (From _Dilwale_).flac',
    '06. Sharib Toshi - Bandeya  (From _Dil Juunglee_).flac',
    '06. Sharib Toshi - Saanson Ko (From _Zid_).flac',
    '06. Tulsi Kumar - Piya Aaye Na.opus',
    '07. Jeet Gannguli - Khamoshiyan (From _Khamoshiyan_).flac',
    '07. Mustafa Zahid - Bhula Dena.opus',
    '07. Pritam - Ae Dil Hai Mushkil Title Track (From _Ae Dil Hai Mushkil_).flac',
    '08. Arijit Singh - Aasan Nahin Yahan.opus',
    '08. Jawad Ahmed - Samjhawan.flac',
    '08. Jeet Gannguli - Teri Khushboo (From _Mr. X_)  (Male).flac',
    '09. Jeet Gannguli - Hamari Adhuri Kahani (Title Track) [From _Hamari Adhuri Kahani_].flac',
    '09. Jeet Gannguli - Muskurane (From _Citylights_)  (Romantic).flac',
    '09. Shreya Ghoshal - Sunn Raha Hai.opus',
    '1 Steal My Girl - One Direction.m4a',
    '1. Ameet Mandal - Taare Zameen Par.flac',
    '1. Calvin Harris - Summer.flac',
    '1. Lady Gaga - Die With A Smile.flac',
    '1. One Direction - Drag Me Down.flac',
    '10. Arijit Singh - Milne Hai Mujhse Aayi.opus',
    '10. Jawad Ahmed - Samjhawan (From _Humpty Sharma Ki Dulhania_).flac',
    '10. Tanishk Bagchi - Bolna (From _Kapoor & Sons (Since 1921)_).flac',
    '11. Mithoon - Aashiqui (The Love Theme).opus',
    '11. Pritam - Channa Mereya (From _Ae Dil Hai Mushkil_).flac',
    '12. Jeet Gannguli - Khamoshiyan (From _Khamoshiyan_).flac',
    '12. Pritam - Phir Le Aya Dil (From _Barfi!_)  (Reprise).flac',
    'one-direction_one-direction-what-makes-you-beautiful.mp3'
];

let currentSongIndex = 0;

// Load the first song
function loadSong(index) {
    audio.src = songs[index];
    highlightCurrentSong(index);
}

// Highlight the current song in the playlist
function highlightCurrentSong(index) {
    const items = playlist.querySelectorAll('li');
    items.forEach((item, i) => {
        item.style.fontWeight = i === index ? 'bold' : 'normal';
    });
}

// Play or pause the song
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.textContent = 'Pause';
    } else {
        audio.pause();
        playButton.textContent = 'Play';
    }
});

// Play the previous song
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
});

// Play the next song
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
});

// Populate the playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
    });
    playlist.appendChild(li);
});

// Add a button to toggle between light and dark modes
const toggleThemeButton = document.createElement('button');
toggleThemeButton.textContent = 'Toggle Theme';
document.body.appendChild(toggleThemeButton);

// Add event listener for theme toggle
let isDarkMode = false;
toggleThemeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.style.backgroundColor = isDarkMode ? '#333' : '#fff';
    document.body.style.color = isDarkMode ? '#fff' : '#000';

    // Update playlist text color
    const items = playlist.querySelectorAll('li');
    items.forEach(item => {
        item.style.color = isDarkMode ? '#fff' : '#000';
    });
    audio.style.backgroundColor = isDarkMode ? '#444' : '#eee';
    audio.style.color = isDarkMode ? '#fff' : '#000';
});

// Add functionality to reorder songs
const reorderButton = document.createElement('button');
reorderButton.textContent = 'Reorder Songs';
document.body.appendChild(reorderButton);

reorderButton.addEventListener('click', () => {
    const newOrder = prompt('Enter new order of songs as comma-separated indices (e.g., 2,0,1):');
    if (newOrder) {
        const indices = newOrder.split(',').map(Number);
        const reorderedSongs = indices.map(i => songs[i]).filter(Boolean);
        if (reorderedSongs.length === songs.length) {
            songs.length = 0;
            songs.push(...reorderedSongs);
            updatePlaylist();
        } else {
            alert('Invalid order. Please try again.');
        }
    }
});

// Update the playlist dynamically
function updatePlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audio.play();
        });
        playlist.appendChild(li);
    });
}

// Initial playlist update
updatePlaylist();

// Load the initial song
loadSong(currentSongIndex);

// Add a file input for uploading songs
const uploadButton = document.createElement('input');
uploadButton.type = 'file';
uploadButton.accept = 'audio/*';
uploadButton.multiple = true;
document.body.appendChild(uploadButton);

uploadButton.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        const url = URL.createObjectURL(file);
        songs.push(url);
    });
    updatePlaylist();
});

// Enable autoplay for the next song
audio.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
});

// Ensure the main player also changes theme
toggleThemeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.style.backgroundColor = isDarkMode ? '#333' : '#fff';
    document.body.style.color = isDarkMode ? '#fff' : '#000';

    // Update playlist and player styles
    const items = playlist.querySelectorAll('li');
    items.forEach(item => {
        item.style.color = isDarkMode ? '#fff' : '#000';
    });
    audio.style.backgroundColor = isDarkMode ? '#444' : '#eee';
    audio.style.color = isDarkMode ? '#fff' : '#000';
});

// Allow reordering songs dynamically
reorderButton.addEventListener('click', () => {
    const newOrder = prompt('Enter new order of songs as comma-separated indices (e.g., 2,0,1):');
    if (newOrder) {
        const indices = newOrder.split(',').map(Number);
        const reorderedSongs = indices.map(i => songs[i]).filter(Boolean);
        if (reorderedSongs.length === songs.length) {
            songs.length = 0;
            songs.push(...reorderedSongs);
            updatePlaylist();
        } else {
            alert('Invalid order. Please try again.');
        }
    }
});
