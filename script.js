const playButton = document.createElement('div');
playButton.textContent = 'Clique para reproduzir';
playButton.style.cursor = 'pointer';
document.body.appendChild(playButton);

const audioInput = document.createElement('input');
audioInput.type = 'file';
audioInput.accept = 'audio/*';
document.body.appendChild(audioInput);

const audioPlayer = new Audio();
audioPlayer.controls = true;
document.body.appendChild(audioPlayer);

playButton.addEventListener('click', () => {
    audioPlayer.play();
});

audioInput.addEventListener('change', () => {
    const selectedAudio = audioInput.files[0];
    if (selectedAudio) {
        const audioURL = URL.createObjectURL(selectedAudio);
        audioPlayer.src = audioURL;
        playButton.style.display = 'block';
    }
});
