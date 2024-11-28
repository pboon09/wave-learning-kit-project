export function drawSineWaveGraph(canvasId, wave) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with id "${canvasId}" not found.`);
    return;
  }
  const ctx = canvas.getContext("2d");

  const maxTime = 5.5; // Maximum time in seconds
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Margins for better visibility
  const marginLeft = 50;
  const marginBottom = 40;
  const marginTop = 40;

  // Function to draw grid lines
  function drawGrid() {
    ctx.strokeStyle = "#bbb";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // Vertical grid lines (time increments)
    for (let t = 0; t <= maxTime; t += 0.5) {
      const x = marginLeft + (t / maxTime) * (canvasWidth - marginLeft);
      ctx.beginPath();
      ctx.moveTo(x, marginTop);
      ctx.lineTo(x, canvasHeight - marginBottom);
      ctx.stroke();
    }

    // Horizontal grid lines (y-axis increments)
    for (let y = -8; y <= 8; y++) {
      const yPos = (canvasHeight - marginBottom) / 2 - (y / 10) * ((canvasHeight - marginBottom - marginTop) / 2);
      ctx.beginPath();
      ctx.moveTo(marginLeft, yPos);
      ctx.lineTo(canvasWidth, yPos);
      ctx.stroke();
    }

    ctx.setLineDash([]); // Reset dashes
  }

  // Function to draw axes with arrows
  function drawAxes() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // X-axis (Time)
    ctx.moveTo(marginLeft, (canvasHeight - marginBottom) / 2);
    ctx.lineTo(canvasWidth, (canvasHeight - marginBottom) / 2);
    // Arrow for X-axis
    ctx.lineTo(canvasWidth - 10, (canvasHeight - marginBottom) / 2 - 5);
    ctx.moveTo(canvasWidth, (canvasHeight - marginBottom) / 2);
    ctx.lineTo(canvasWidth - 10, (canvasHeight - marginBottom) / 2 + 5);

    // Y-axis (Meters)
    ctx.moveTo(marginLeft, canvasHeight - marginBottom);
    ctx.lineTo(marginLeft, marginTop);
    // Arrow for Y-axis
    ctx.lineTo(marginLeft - 5, marginTop + 10);
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft + 5, marginTop + 10);

    ctx.stroke();
  }

  // Function to add labels to the axes
  function drawLabels() {
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";

    // X-axis labels
    for (let t = 1; t <= maxTime; t++) {
      const x = marginLeft + (t / maxTime) * (canvasWidth - marginLeft);
      ctx.fillText(`${t}`, x - 10, (canvasHeight - marginBottom) / 2 + 25);
    }

    // Y-axis labels
    for (let y = -10; y <= 10; y += 2) {
      if (y === 0 || y === -10 || y === 10) continue;
      const yPos = (canvasHeight - marginBottom) / 2 - (y / 10) * ((canvasHeight - marginBottom - marginTop) / 2);
      ctx.fillText(`${y}`, marginLeft - 30, yPos + 5);
    }

    // Axis titles
    ctx.font = "22px Arial";
    ctx.fillText("x(s)", canvasWidth - 40, (canvasHeight - marginBottom) / 2 + 30);
    ctx.fillText("y(m)", marginLeft - 20, marginTop - 20);
  }

  // Function to draw a single sine wave with velocity
  let phaseShift = 0; // Initial phase shift
  let time = 0; // Time accumulator for animation

  function drawSineWave(amplitude, frequency, color, velocity) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    const midY = (canvasHeight - marginBottom) / 2;

    // Calculate phase shift based on velocity and time
    phaseShift = velocity * time;

    for (let x = marginLeft; x < canvasWidth; x++) {
      const timeX = ((x - marginLeft) / (canvasWidth - marginLeft)) * maxTime;
      const y = amplitude * Math.sin(2 * Math.PI * frequency * timeX - phaseShift); // Apply phase shift to sine function
      const yPos = midY - (y / 10) * ((canvasHeight - marginBottom - marginTop) / 2);
      if (x === marginLeft) {
        ctx.moveTo(x, yPos);
      } else {
        ctx.lineTo(x, yPos);
      }
    }

    ctx.stroke();
  }

  // Clear canvas and draw everything
  function render() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas
    drawGrid(); // Draw grid
    drawAxes(); // Draw axes with arrows
    drawLabels(); // Draw axis labels and titles

    // Draw sine wave with moving effect based on velocity
    drawSineWave(wave.amplitude, wave.frequency, wave.color, wave.velocity);

    // Increment time to simulate animation
    time += 0.1; // Adjust the speed of animation by changing this value
  }

  // Continuous rendering to animate the wave movement
  function animate() {
    render();
    requestAnimationFrame(animate); // Call animate on the next frame
  }

  // Start the animation loop
  animate();
}
