document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('oscilloscope');
    const ctx = canvas.getContext('2d');

    const freqXInput = document.getElementById('freqX');
    const freqYInput = document.getElementById('freqY');
    const phaseShiftXInput = document.getElementById('phaseShiftX');
    const phaseShiftYInput = document.getElementById('phaseShiftY');
    const freqXDecreaseButton = document.getElementById('freqXDecrease');
    const freqXIncreaseButton = document.getElementById('freqXIncrease');
    const freqYDecreaseButton = document.getElementById('freqYDecrease');
    const freqYIncreaseButton = document.getElementById('freqYIncrease');
    const phaseXDecreaseButton = document.getElementById('phaseXDecrease');
    const phaseXIncreaseButton = document.getElementById('phaseXIncrease');
    const phaseYDecreaseButton = document.getElementById('phaseYDecrease');
    const phaseYIncreaseButton = document.getElementById('phaseYIncrease');
    const toggleRotationButton = document.getElementById('toggleRotation');

    const freqXValue = document.getElementById('freqXValue');
    const freqYValue = document.getElementById('freqYValue');
    const phaseShiftXValue = document.getElementById('phaseShiftXValue');
    const phaseShiftYValue = document.getElementById('phaseShiftYValue');

    let freqX = parseFloat(freqXInput.value);
    let freqY = parseFloat(freqYInput.value);
    let phaseShiftX = parseFloat(phaseShiftXInput.value);
    let phaseShiftY = parseFloat(phaseShiftYInput.value);
    const amplitude = 150;

    let rotating = false;
    let animationFrameId;
    let time = 0;

    // Draw Grid
    function drawGrid() {
        const gridSize = 50;
        const width = canvas.width;
        const height = canvas.height;

        ctx.strokeStyle = '#333'; //grid color
        ctx.lineWidth = 0.5;      //grid width

        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    // Draw Figure
    function drawLissajous() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();

        ctx.beginPath();
        const width = canvas.width;
        const height = canvas.height;
        const points = 1000;
        const step = (2 * Math.PI) / points;

        for (let t = 0; t <= 2 * Math.PI; t += step) {
            const x = amplitude * Math.sin(freqX * t + phaseShiftX + time) + width / 2;
            const y = amplitude * Math.sin(freqY * t + phaseShiftY + time) + height / 2;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = '#bdffff'; // line color
        ctx.lineWidth = 2;           // line thickness
        ctx.stroke();
    }

    // Control Rotation
    function startRotation() {
        function animate() {
            time += 0.01;
            drawLissajous();
            if (rotating) {
                animationFrameId = requestAnimationFrame(animate);
            }
        }
        animate();
    }

    function updateValues() {
        freqX = parseFloat(freqXInput.value);
        freqY = parseFloat(freqYInput.value);
        phaseShiftX = parseFloat(phaseShiftXInput.value);
        phaseShiftY = parseFloat(phaseShiftYInput.value);
    }

    function handleInputChange() {
        updateValues();
        freqXValue.textContent = freqX.toFixed(1);
        freqYValue.textContent = freqY.toFixed(1);
        phaseShiftXValue.textContent = phaseShiftX.toFixed(1);
        phaseShiftYValue.textContent = phaseShiftY.toFixed(1);
        drawLissajous();
    }

    freqXInput.addEventListener('input', handleInputChange);
    freqYInput.addEventListener('input', handleInputChange);
    phaseShiftXInput.addEventListener('input', handleInputChange);
    phaseShiftYInput.addEventListener('input', handleInputChange);

    // x freq buttons
    freqXDecreaseButton.addEventListener('click', () => {
        freqX = Math.max(1, freqX - 0.1);
        freqXInput.value = freqX.toFixed(1);
        handleInputChange();
    });

    freqXIncreaseButton.addEventListener('click', () => {
        freqX = Math.min(10, freqX + 0.1);
        freqXInput.value = freqX.toFixed(1);
        handleInputChange();
    });

    // y freq buttons
    freqYDecreaseButton.addEventListener('click', () => {
        freqY = Math.max(1, freqY - 0.1);
        freqYInput.value = freqY.toFixed(1);
        handleInputChange();
    });

    freqYIncreaseButton.addEventListener('click', () => {
        freqY = Math.min(10, freqY + 0.1);
        freqYInput.value = freqY.toFixed(1);
        handleInputChange();
    });

    // x phase buttons
    phaseXDecreaseButton.addEventListener('click', () => {
        phaseShiftX = Math.max(0, phaseShiftX - 0.1);
        phaseShiftXInput.value = phaseShiftX.toFixed(1);
        handleInputChange();
    });

    phaseXIncreaseButton.addEventListener('click', () => {
        phaseShiftX = Math.min(2 * Math.PI, phaseShiftX + 0.1);
        phaseShiftXInput.value = phaseShiftX.toFixed(1);
        handleInputChange();
    });

    // y phase buttons
    phaseYDecreaseButton.addEventListener('click', () => {
        phaseShiftY = Math.max(0, phaseShiftY - 0.1);
        phaseShiftYInput.value = phaseShiftY.toFixed(1);
        handleInputChange();
    });

    phaseYIncreaseButton.addEventListener('click', () => {
        phaseShiftY = Math.min(2 * Math.PI, phaseShiftY + 0.1);
        phaseShiftYInput.value = phaseShiftY.toFixed(1);
        handleInputChange();
    });

    // rotation button
    toggleRotationButton.addEventListener('click', () => {
        rotating = !rotating;
        if (rotating) {
            toggleRotationButton.textContent = 'Stop Rotation';
            startRotation();
        } else {
            toggleRotationButton.textContent = 'Start Rotation';
            cancelAnimationFrame(animationFrameId);
        }
    });

    // call functions to draw grid and curve
    drawGrid();
    drawLissajous();
});