let currentMode = '.'; // default to open
let grid = [];
let map = null;

// Sound Effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const SOUNDS = {
    beep: () => playBeep(800, 0.1),
    click: () => playBeep(600, 0.05),
    launch: () => playDroneStart(),
    flying: () => playDroneFly(),
    success: () => playSuccess()
};

function playBeep(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playDroneStart() {
    // Drone startup sound - rising pitch
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 1);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
}

let flyingSoundInterval = null;

function playDroneFly() {
    // Continuous drone propeller sound
    if (flyingSoundInterval) clearInterval(flyingSoundInterval);
    
    flyingSoundInterval = setInterval(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 150 + Math.random() * 50;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }, 200);
}

function stopDroneFly() {
    if (flyingSoundInterval) {
        clearInterval(flyingSoundInterval);
        flyingSoundInterval = null;
    }
}

function playSuccess() {
    // Success melody
    const notes = [523, 659, 784, 1047]; // C, E, G, C (major chord)
    notes.forEach((freq, i) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, i * 150);
    });
}

// Initialize Map
function initMap() {
    if (map) {
        map.remove();
    }
    
    // Default to New York
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false
    }).setView([40.7128, -74.0060], 13);
    
    // Satellite view for more realistic look
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    
    // Alternative: Satellite imagery (uncomment if you prefer)
    // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //     maxZoom: 19,
    // }).addTo(map);
}

function changeMapLocation() {
    const location = document.getElementById('mapLocation').value.split(',');
    const lat = parseFloat(location[0]);
    const lng = parseFloat(location[1]);
    
    if (map) {
        map.setView([lat, lng], 13);
        SOUNDS.beep();
    }
}

// SVG Icons for cells
const SVG_ICONS = {
    drone: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="18" ry="10" fill="#00d4ff"/>
        <ellipse cx="50" cy="50" rx="14" ry="7" fill="#0a1628"/>
        <circle cx="50" cy="55" r="4" fill="#ff6b35"/>
        <line x1="32" y1="50" x2="15" y2="35" stroke="#00d4ff" stroke-width="3"/>
        <line x1="68" y1="50" x2="85" y2="35" stroke="#00d4ff" stroke-width="3"/>
        <line x1="32" y1="50" x2="15" y2="65" stroke="#00d4ff" stroke-width="3"/>
        <line x1="68" y1="50" x2="85" y2="65" stroke="#00d4ff" stroke-width="3"/>
        <ellipse cx="15" cy="35" rx="10" ry="3" fill="#00ff88" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 15 35" to="360 15 35" dur="0.1s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="85" cy="35" rx="10" ry="3" fill="#00ff88" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 85 35" to="360 85 35" dur="0.1s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="15" cy="65" rx="10" ry="3" fill="#00ff88" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 15 65" to="360 15 65" dur="0.1s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="85" cy="65" rx="10" ry="3" fill="#00ff88" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 85 65" to="360 85 65" dur="0.1s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx="35" cy="48" r="2" fill="#ff4757">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="65" cy="48" r="2" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
        </circle>
    </svg>`,
    
    flag: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="15" x2="25" y2="90" stroke="#00ff88" stroke-width="4" stroke-linecap="round"/>
        <path d="M25 15 L75 30 L25 45 Z" fill="#00ff88">
            <animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <circle cx="25" cy="90" r="6" fill="#ffcc00"/>
        <circle cx="25" cy="15" r="3" fill="#ff6b35"/>
    </svg>`,
    
    building: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="25" width="70" height="70" fill="#ff4757" rx="3"/>
        <rect x="20" y="30" width="60" height="60" fill="#c0392b" rx="2"/>
        <!-- Windows -->
        <rect x="25" y="35" width="12" height="12" fill="#ffcc00" opacity="0.8"/>
        <rect x="44" y="35" width="12" height="12" fill="#2c3e50"/>
        <rect x="63" y="35" width="12" height="12" fill="#ffcc00" opacity="0.6"/>
        <rect x="25" y="52" width="12" height="12" fill="#2c3e50"/>
        <rect x="44" y="52" width="12" height="12" fill="#ffcc00" opacity="0.9"/>
        <rect x="63" y="52" width="12" height="12" fill="#2c3e50"/>
        <!-- Door -->
        <rect x="40" y="70" width="20" height="20" fill="#2c3e50" rx="1"/>
        <circle cx="55" cy="80" r="2" fill="#ffcc00"/>
        <!-- Antenna -->
        <line x1="70" y1="25" x2="70" y2="12" stroke="#ff4757" stroke-width="2"/>
        <circle cx="70" cy="10" r="3" fill="#ff4757">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/>
        </circle>
    </svg>`
};

function createGrid() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    const container = document.getElementById('grid-container');

    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${cols}, 90px)`;
    grid = [];
    
    // Initialize map if not already done
    if (!map) {
        initMap();
    }
    
    SOUNDS.beep();

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const div = document.createElement('div');
            div.classList.add('cell', 'open');
            div.dataset.row = r;
            div.dataset.col = c;
            div.style.height = '90px';
            div.style.width = '90px';

            div.onclick = () => {
                toggleCell(div);
            };

            container.appendChild(div);
            row.push('.');
        }
        grid.push(row);
    }

    updateGridStructureView();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initMap();
    createGrid();
});

function toggleCell(cell) {
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    const states = ['.', 'X', 'S', 'G'];
    const classes = ['open', 'block', 'start', 'goal'];

    let currentState = grid[row][col];
    let nextIndex = (states.indexOf(currentState) + 1) % states.length;
    let nextState = states[nextIndex];

    // Reset all other S or G if needed
    if (nextState === 'S') resetOther('S');
    if (nextState === 'G') resetOther('G');

    grid[row][col] = nextState;
    cell.className = `cell ${classes[nextIndex]}`;

    // Add SVG icons
    if (nextState === 'S') {
        cell.innerHTML = SVG_ICONS.drone;
        SOUNDS.beep();
    } else if (nextState === 'G') {
        cell.innerHTML = SVG_ICONS.flag;
        SOUNDS.beep();
    } else if (nextState === 'X') {
        cell.innerHTML = SVG_ICONS.building;
        SOUNDS.click();
    } else {
        cell.innerHTML = '';
        SOUNDS.click();
    }

    updateGridStructureView();
}

// resetinng others on multiple clicks turn by turn 
function resetOther(type) {
    const container = document.getElementById('grid-container').children;
    for (let i = 0; i < container.length; i++) {
        const cell = container[i];
        const r = cell.dataset.row;
        const c = cell.dataset.col;
        if (grid[r][c] === type) {
            grid[r][c] = '.';
            cell.className = 'cell open';
            cell.textContent = '';
        }
    }
    // ✅ Update after clearing old S or G
    updateGridStructureView();
}

function submitGrid() {
    const algorithm = document.getElementById('algorithm').value;
    
    // Validate that we have a start and goal
    let hasStart = false;
    let hasGoal = false;
    
    for (let row of grid) {
        for (let cell of row) {
            if (cell === 'S') hasStart = true;
            if (cell === 'G') hasGoal = true;
        }
    }
    
    if (!hasStart || !hasGoal) {
        showErrorModal('Please set both a Start (S) and Goal (G) position on the grid!');
        return;
    }

    // Send data to backend via AJAX
    $.ajax({
        url: '/solve/',  // This URL should match your Django path
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')  // Include CSRF token
        },
        data: {
            algorithm: algorithm,
            grid: JSON.stringify(grid)
        },
        success: function (response) {
            console.log("Response:", response);
            
            if (response.success === false) {
                showErrorModal(response.error || 'No path found!');
                return;
            }
            
            if (response.path) {
                resetGridColors();
                highlightPath(response.path); // animate on grid
                if (response.tree) {
                    renderSearchTree(response.tree); // show the tree
                }
            } else {
                showErrorModal('No path found!');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error details:", xhr, status, error);
            let errorMsg = 'Error sending data to backend.';
            
            if (xhr.status === 0) {
                errorMsg = 'Cannot connect to server. Make sure Django server is running!';
            } else if (xhr.status === 404) {
                errorMsg = 'Server endpoint not found (404). Check URL configuration.';
            } else if (xhr.status === 500) {
                errorMsg = 'Server error (500). Check Django console for details.';
            } else if (xhr.responseJSON && xhr.responseJSON.error) {
                errorMsg = xhr.responseJSON.error;
            }
            
            showErrorModal(errorMsg);
        }
    });
}

function showErrorModal(message) {
    const modal = document.createElement('div');
    modal.className = 'delivery-modal';
    modal.style.borderColor = '#ff4757';
    modal.innerHTML = `
        <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff4757" stroke-width="3"/>
            <line x1="30" y1="30" x2="70" y2="70" stroke="#ff4757" stroke-width="5" stroke-linecap="round"/>
            <line x1="70" y1="30" x2="30" y2="70" stroke="#ff4757" stroke-width="5" stroke-linecap="round"/>
        </svg>
        <h2 style="color: #ff4757;">ERROR</h2>
        <p>${message}</p>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
    }, 4000);
}


function highlightPath(path) {
    // Highlight the path cells with professional animation
    path.forEach((coord, index) => {
        const row = coord[0];
        const col = coord[1];
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

        if (cell && !cell.classList.contains('start') && !cell.classList.contains('goal')) {
            setTimeout(() => {
                cell.classList.add('path-highlight');
                // Add waypoint marker
                if (!cell.innerHTML) {
                    cell.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2" style="width:50%; height:50%;">
                        <circle cx="12" cy="12" r="8" opacity="0.5"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>`;
                }
            }, 150 * index);
        }
    });

    // Start animated countdown
    setTimeout(() => {
        showCountdown(path);
    }, path.length * 150 + 500);
}


function showCountdown(path) {
    const countdownScreen = document.getElementById('countdown-screen');
    const countText = document.getElementById('count-text');

    countdownScreen.style.display = 'flex';

    let count = 3;

    const interval = setInterval(() => {
        if (count > 0) {
            countText.textContent = count;
            countText.classList.remove('count-text');
            void countText.offsetWidth; // restart animation
            countText.classList.add('count-text');
            SOUNDS.beep(); // Beep on each count
            count--;
        } else if (count === 0) {
            countText.textContent = 'GO!';
            countText.classList.remove('count-text');
            void countText.offsetWidth;
            countText.classList.add('count-text');
            SOUNDS.launch(); // Launch sound
            count--;
        } else {
            clearInterval(interval);
            countdownScreen.style.display = 'none';
            moveDrone(path);
        }
    }, 1000); // 1 second per count
}

function moveDrone(path) {
    const drone = document.getElementById('drone-fly');

    // Start at the first cell
    const first = path[0];
    const firstCell = document.querySelector(`.cell[data-row="${first[0]}"][data-col="${first[1]}"]`);

    if (!firstCell) return;

    // Show and position drone
    const rect = firstCell.getBoundingClientRect();
    drone.style.display = 'block';
    drone.style.position = 'fixed';
    drone.style.left = (rect.left + rect.width/2 - 50) + 'px';
    drone.style.top = (rect.top + rect.height/2 - 50) + 'px';

    // Start flying sound
    SOUNDS.flying();

    let step = 1;

    const interval = setInterval(() => {
        if (step >= path.length) {
            clearInterval(interval);
            stopDroneFly();
            showDeliveryComplete();
            return;
        }

        const [row, col] = path[step];
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            const rect = cell.getBoundingClientRect();
            drone.style.left = (rect.left + rect.width/2 - 50) + 'px';
            drone.style.top = (rect.top + rect.height/2 - 50) + 'px';
        }

        step++;
    }, 1200);
}

function showDeliveryComplete() {
    // Success sound
    SOUNDS.success();
    
    // Launch confetti
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#00d4ff', '#00ff88', '#ffcc00', '#ff6b35']
    });
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'delivery-modal';
    modal.innerHTML = `
        <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#00ff88" stroke-width="3"/>
            <path d="M30 50 L45 65 L75 35" fill="none" stroke="#00ff88" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
                <animate attributeName="stroke-dasharray" from="0 100" to="100 0" dur="0.5s" fill="freeze"/>
            </path>
        </svg>
        <h2>MISSION COMPLETE</h2>
        <p>Package delivered successfully!</p>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
        clearAfterDelivery();
    }, 5000);
}

// Resets all grid items and set to "." white 
function resetGrid() {
    window.location.reload();
    console.log("Grid has been reset ✅");
}

// Cleaning the path after delivery 
function clearAfterDelivery() {
    const drone = document.getElementById('drone-fly');
    drone.style.display = 'none';
    
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        if (
            !cell.classList.contains('start') &&
            !cell.classList.contains('goal') &&
            !cell.classList.contains('block')
        ) {
            cell.className = 'cell open';
            cell.innerHTML = '';
            cell.classList.remove('path-highlight');
        }
    });
}

// for theoritical explaination 
function updateGridStructureView() {
    const formatted = grid.map(row =>
        '[' + row.map(cell => `'${cell}'`).join(', ') + ']'
    ).join(',\n');

    const finalString = '[\n' + formatted + '\n]';
    document.getElementById('grid-structure').textContent = finalString;
}

// for resetting the grid colors 
function resetGridColors() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (
            !cell.classList.contains('start') &&
            !cell.classList.contains('goal') &&
            !cell.classList.contains('block')
        ) {
            cell.classList.remove('path-highlight');
            cell.innerHTML = '';
        }
    });
}


function renderSearchTree(treeData) {
    new Treant({
        chart: {
            container: "#tree-container",
            connectors: {
                type: "step"
            },
            node: {
                HTMLclass: "nodeExample1"
            }
        },
        nodeStructure: treeData
    });
}

// CSRF Token helper (Django needs this)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

