window.addEventListener('load', function(){
  const container = document.getElementById("container");
  const canvas = document.getElementById("canvas1");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  let audioSource;
  let analyser;

  container.addEventListener('click', function() {
    const audio1 = document.getElementById("audio1");
    audio1.src = 'musica.mp3';
    audio1.play();
    const audioContext = new AudioContext();
    console.log(audioSource)
    if (!audioSource) {
      audioSource = audioContext.createMediaElementSource(audio1);
      analyser = audioContext.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioContext.destination);
    }

    analyser.fftSize = 1024;
    console.log(analyser.fftSize)
    const bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    const dataArray = new Uint8Array(bufferLength);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const angleIncrement = (Math.PI * 2) / bufferLength;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        const frequency = i * audioContext.sampleRate / analyser.fftSize;
        const amplitude = dataArray[i] / 255;
        const angle = i * angleIncrement;

        const x = centerX + radius * Math.cos(angle) * amplitude;
        const y = centerY + radius * Math.sin(angle) * amplitude;

        const hue = mapRange(frequency, 20, 400, 240, 0); // Mapeia frequência para o tom de cor (azul a vermelho)
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

        const barSize = 2 + (amplitude * 50); // Ajuste o tamanho das barras conforme necessário
        ctx.fillRect(x, y, barSize, barSize);
      }

      requestAnimationFrame(animate);
    }

    function mapRange(value, fromMin, fromMax, toMin, toMax) {
      return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    }

    animate();
  });
});