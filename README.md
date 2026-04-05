# 🚁 Drone Delivery Pathfinder

[![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Django Version](https://img.shields.io/badge/django-4.0+-brightgreen.svg)](https://www.djangoproject.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Drone Delivery Pathfinder** is a highly interactive, web-based mission planning visualization tool built with Django. It allows users to simulate and visualize how various search and pathfinding algorithms navigate a drone through a city environment to deliver packages while avoiding obstacles.

---

## ✨ Features

*   **Interactive Mission Grid:** Dynamically create custom grid sizes (e.g., 5x5, 10x10) for your drone airspace.
*   **Custom Obstacle Placement:** Click on grid cells to toggle between Empty Space, Obstacles (Buildings 🏢), Start points (Drone 🚁), and Goal points (Flag 🎯).
*   **Multiple Pathfinding Algorithms:** Compare and contrast the efficiency of different traversal algorithms:
    *   **A\* Search:** Optimal heuristic-based pathfinding (Recommended).
    *   **Breadth-First Search (BFS):** Guarantees the shortest path in unweighted grids.
    *   **Depth-First Search (DFS):** Fast, deep exploration tree algorithm.
    *   **Uniform Cost Search (UCS):** Cost-based optimal routing.
    *   **Best-First Search:** Purely heuristic-based greedy approach.
*   **Rich Animations & UI:** Features a professional "Mission Control" interface, responsive SVG drone graphics, path visualizations, and a search tree visualizer.
*   **Real-time Analytics:** View simulated metrics like GPS tracking, battery life, and signal strength.

---

## 🛠️ Technology Stack

*   **Backend:** Python, Django
*   **Frontend:** HTML5, CSS3, JavaScript
*   **Database:** SQLite (Default Django DB configuration)

---

## 🚀 Installation & Setup

Follow these instructions to get the project up and running on your local machine.

### 1. Prerequisites
Make sure you have Python (3.8+) installed on your system.

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd Drone_Delivery
```

### 3. Create a Virtual Environment (Recommended)
```bash
# Windows
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies
Ensure Django is installed in your virtual environment:
```bash
pip install django
```
*(If a `requirements.txt` file is present in future updates, use `pip install -r requirements.txt`)*

### 5. Apply Migrations
Prepare the database for the application:
```bash
python manage.py migrate
```

### 6. Run the Development Server
```bash
python manage.py runserver
```

The application will now be accessible at **http://127.0.0.1:8000/**.

---

## 🎮 How to Use

1.  **Launch the App:** Open your web browser and navigate to `http://127.0.0.1:8000/`.
2.  **Generate Grid:** Enter your desired number of rows and columns, then click **Create Grid**.
3.  **Design the Airspace:** Click on the grid cells to cycle through the available cell types:
    *   *Click 1:* Obstacle (Building) 🏢
    *   *Click 2:* Start Position (Drone) 🚁 (exactly one required)
    *   *Click 3:* Goal Position (Package Destination) 🎯 (exactly one required)
    *   *Click 4:* Empty Space
4.  **Select an Algorithm:** Choose your preferred pathfinding algorithm from the dropdown menu (e.g., A* Search).
5.  **Launch Mission:** Click the **Launch Mission** button. A countdown will begin, and you can watch the drone navigate the optimal route to its destination! 🎉

---

## 📁 Project Structure

```text
Drone_Delivery/
│
├── dronepathfinder/        # Main Django project configuration folder
│   ├── settings.py         # Project settings
│   ├── urls.py             # Main URL routing
│   └── wsgi.py / asgi.py   # Gateway interfaces
│
├── pathfinder/             # The core Django application
│   ├── algorithms.py       # Core pathfinding logic (A*, BFS, DFS, etc.)
│   ├── views.py            # API and page rendering views
│   ├── models.py           # Database models
│   └── urls.py             # App-specific routing
│
├── static/                 # Static assets (CSS, JS, Images)
│   ├── css/styles.css      # UI Styling
│   └── js/script.js        # Frontend grid interaction and animation logic
│
├── templates/              # HTML templates
│   ├── base.html           # Master layout
│   └── home.html           # Main application interface
│
├── manage.py               # Django execution script
└── README.md               # Project documentation
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](#) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created for visualizing complex algorithms through fun, interactive drone simulation.* 🚁✨