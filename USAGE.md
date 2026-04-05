# 🚁 Drone Mission Planner - Usage Guide

## ✅ Server is Running!

The Django development server is now running at:
**http://127.0.0.1:8000/**

## 🎮 How to Use

1. **Open your browser** and navigate to: `http://127.0.0.1:8000/`

2. **Create the Grid:**
   - Set the number of rows and columns
   - Click "CREATE GRID" button

3. **Set Up the Mission:**
   - Click on cells to cycle through states:
     - **First click**: Empty cell → Obstacle (Building) 🏢
     - **Second click**: Obstacle → Start (Drone) 🚁
     - **Third click**: Start → Goal (Flag) 🎯
     - **Fourth click**: Goal → Empty cell (back to start)
   
   - You need at least:
     - **One Start (S)** - Where the drone launches from
     - **One Goal (G)** - Where the package is delivered

4. **Choose Algorithm:**
   - **A* Search** - Optimal pathfinding (Recommended)
   - **Breadth-First Search** - Shortest path
   - **Depth-First Search** - Fast exploration
   - **Uniform Cost Search** - Cost-based
   - **Best-First Search** - Heuristic-based

5. **Launch Mission:**
   - Click "LAUNCH MISSION" button
   - Watch the countdown: 3... 2... 1... GO!
   - The drone will fly along the optimal path
   - Confetti celebration when delivered! 🎉

## 🎨 Features

- **Professional UI** - Mission Control style interface
- **SVG Graphics** - Smooth animated drone with spinning propellers
- **Realistic Map** - City grid background with streets and buildings
- **Color-Coded Status** - GPS, Battery, Signal indicators
- **Path Visualization** - See the drone's flight path
- **Search Tree** - Visualize how the algorithm explores the map

## 🔧 Troubleshooting

### If you see "Error sending data to backend":

1. **Make sure the Django server is running** (you should see it in the console)
2. **Check the browser console** (F12) for detailed error messages
3. **Verify you've set both Start (S) and Goal (G)** on the grid

### To restart the server:

```powershell
cd "e:\Downloads\Drone_Delivery_pathfinder-main"
.\venv\Scripts\Activate.ps1
cd Drone_Delivery_pathfinder-main
python manage.py runserver
```

## 🎯 Tips

- **Start simple** - Try a 5x5 grid first
- **Add obstacles** - Make it challenging by blocking some paths
- **Compare algorithms** - Try different algorithms on the same grid
- **Watch the tree** - The search tree shows how the algorithm explores

## 🛑 To Stop the Server

Press `Ctrl+C` in the terminal where the server is running.

---

**Enjoy your professional drone simulation! 🚁✨**
