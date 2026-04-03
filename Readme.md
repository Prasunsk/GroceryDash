# 🛒 GroceryDash

> **A High-Performance Quick-Commerce MERN Stack Application**

GroceryDash is a full-stack e-commerce platform designed for **speed** and **intelligence**. It features:
- 🔧 Robust backend for managing automated order lifecycles
- ⚛️ Dynamic React frontend with responsive UI
- 🤖 Built-in AI recommendation engine powered by Google Gemini
- 📍 Smart logistics with real-time delivery estimation

---

## 🚀 Key Features

- **Smart Logistics** - Implements Euclidean distance algorithms to calculate delivery times from the central warehouse to the user's coordinates.
- **AI-Powered Recommendations** - Integrates Google Gemini 1.5 Flash to provide personalized product suggestions based on a user's unique order history.
- **Automated Order Lifecycle** - Uses Mongoose middleware and asynchronous "watchers" to transition orders from Pending to Shipped and Delivered automatically.
- **Secure Authentication** - Full JWT (JSON Web Token) implementation with protected routes and custom middleware.
- **Modern UI** - A responsive, grid-based shopping experience built with React and optimized for high-density product catalogs.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Vite, SCSS/Tailwind |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| AI | Google Gemini API |
| DevOps | Dotenv, JWT, Config |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/GroceryDash.git
cd GroceryDash
```

### 2. Setup Environment Variables
Create a `.env` file in the `/server` directory:
```plaintext
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_ai_key
```

### 3. Install Dependencies
```bash
# In /Application Server
npm install

# In /Order Processing
npm install

# In /Frontend
npm install
```

### 4. Run the Application
```bash
# Start Application Server
npm start

# Start Order Processing
node server.js

# Start Frontend
npm run dev
```
Open browser: http://localhost:5173/
---

## 🧠 Engineering Highlights

### Logistics Engine
The app calculates delivery efficiency by treating the map as a coordinate system.

$$Distance = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

This distance is then mapped to a dynamic delivery time, ensuring users get realistic expectations based on their "location" relative to the Raghunathpur warehouse.

### AI Contextualization
Unlike static "Featured Products," GroceryDash sends the user's past purchase data to the Gemini API. The AI analyzes patterns (e.g., "User buys flour and sugar") and suggests logical additions (e.g., "Baking powder or Vanilla extract"), creating a personalized shopping "concierge."

---

## 📜 License

Distributed under the MIT License. See LICENSE for more information.
