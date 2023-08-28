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
      audio1.src = 'musica.mp3'
      audio1.play();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log(audioSource)
      if (!audioSource) {
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
      }
  
      analyser.fftSize = 256;  // Aumentei o tamanho da FFT para obter mais resolução
      console.log(analyser.fftSize)
      const bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);

      const dataArray = new Uint8Array(bufferLength);

      const barWidth = (canvas.width / bufferLength);
      let barHeight;
      let x = 0;

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x = 0;
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * 3;  // Ajuste o multiplicador para melhorar a visibilidade
          
          const red = 0;
          const green = i / bufferLength * 255; // Ajuste para criar uma variação de cor
          const blue = 255 - i / bufferLength * 255; // Ajuste para criar uma variação de cor

          ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
        requestAnimationFrame(animate);
      }

      animate();
    });
});
