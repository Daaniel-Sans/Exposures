# 🎞️ Exposures - Personal Visual Diary

> **Exposures** is an interactive visual diary designed to showcase a curated collection of my personal photographs and different video compositions / Edits (one, for now) with an "analogical" aesthetic. 

The application dynamically reads structured photographic metadata (including location, year, description, and emotional mood tags) from a mock database in **JSON** format. It features instantaneous client-side category filtering, an interactive modal expansion window (*Lightbox*) with cyclic navigation loops, and an immersive automated presentation mode (*Rolls*) packed with individual slide duration variables and a synchronized cinematic background audio score.

---

**Live Deployment Link:** <a href="https://exposuresss.vercel.app" target="_blank" rel="noopener noreferrer">https://exposuresss.vercel.app</a>

---

## 🎬 Demo

> The primary user interface showcases a dark, minimalist layout inspired by different effects and elements related to analog photography, such as grain, light leaks, flash lighting, or film rolls. Users can filter imagery instantly through categorization buttons (Street, Summer, Travel, etc.) or shift into the dedicated "Rolls" mode, which dynamically re-flows the photo gallery into a series of film strips. These strips display thumbnails representing the different video compositions / edits I have created with my photographs. Although only one roll is currently available, my intention is to add more in the future with different vibes or themes. Clicking the master action button on each roll activates an automated presentation displaying the original sizes of the photos. This mode seamlessly matches fading transitions to custom image timers while streaming background ambient audio.


https://github.com/user-attachments/assets/4d510d7b-ed1b-4cc5-a56f-bfb45c00a688



---

## 🛠️ Technologies Used

| Technology | Version | Description |
|------------|---------|-------------|
| **HTML5** | Standard | Semantic markup architecture for the diary grid, overlay nodes, and media controls. |
| **CSS3** | Standard | Custom properties (variables), Grid/Flexbox structural layouts, responsive media queries, and transition animations. |
| **Bootstrap** | 5.3.3 | Global responsive grid system framework and strict implementation of the layout Card component. |
| **Vanilla JavaScript** | ES6+ | Client-side DOM manipulation, reactive state management, asynchronous fetch pipelines, and cyclic event loops. |
| **JSON Server** | 1.0.0-beta | Mock REST API server binary used to host and serve the database locally during development. |
| **Vercel Serverless** | Node.js | Serverless Cloud Infrastructure handling asynchronous API routing and execution inside the production environment. |

---

## 🗂️ File Structure

```
exposures/
├── api/
│   └── frames.js       ← Node.js Serverless Function serving data in production (Vercel)
├── index.html          ← Application structural blueprint and CDN framework integration
├── style.css           ← Global design token variables, custom UI sheets, and transitions
├── app.js              ← Core interactive layer (filtering, Lightbox, Slideshow loops, environment handler)
├── db.json             ← Structured photo database array for the local JSON Server instance
├── vercel.json         ← Reverse-proxy routing map and URL rewrite configuration for production
└── package.json        ← Project metadata manifest and npm automation run scripts
```
---

## 📋 Project Briefing & Specifications

This project was developed in compliance with the academic guidelines and technical requirements outlined below:

### 🎯 Overview & Project Description
The objective is to build a high-fidelity visual catalog/landing page framework. The interface must dynamically read and render data structurally using a sequence of component cards populated by an asynchronous local data stream (`json-server`).

* **Theme:** 100% Free choice (Analog Photography & Cinematic Visual Diary selected).
* **Aesthetics:** High-level custom styling, curated design systems, and strict visual coherence throughout the interface layout.

### 📦 Structural Content Requirements
* **Minimum Threshold:** At least 10 active data card nodes deployed inside the database.
* **Schema Granularity:** Each database entry object must feature a minimum of 5 distinct key-value descriptive properties.
* **Semantic Naming Conventions:** Clean, project-specific metadata keys (avoiding generic naming architectures like `item1`, `data`, etc.).

### 🎨 Design & Layout Guidelines
* **Framework Requirement:** Mandatory architecture using the official **Bootstrap Card component hierarchy** (`.card`, `.card-img-top`, `.card-body`).
* **Style Restrictions:** * ❌ Strictly prohibited use of inline CSS formatting rules.
    * ❌ No decoupled or non-coherent visual layouts.
    * ✔ Mandatory inclusion of professional custom web typography (Google Fonts framework integration).
    * ✔ Custom design tokens, including specialized color palettes and complex background gradients.

### 🧪 Media Asset Management
* **Cloud Hosting Pipelines:** All imagery, thumbnails, and visual backgrounds must be uploaded, securely managed, and fetched from the **Cloudinary CDN infrastructure**.
* **Asset Boundaries:** ❌ No local file-path image hosting is allowed inside the final repository branch.

### ⚙️ Core Technical Stack
* **HTML5:** Structural layout and markup architecture.
* **CSS3:** Bespoke visual design layout tokens and adaptive rendering sheets.
* **JavaScript (ES6+):** Reactive logic execution and async DOM manipulation pipelines.
* **Bootstrap 5.3:** Base UI structural framework grid mapping.
* **JSON Server:** Dynamic mock database API streaming simulation.

### 📡 Functional Logic Requirements
* Asynchronous fetching pipelines implemented using native JavaScript `async/await` syntax.
* Dynamic rendering architectures reading fluidly from the API data source directly into targeted DOM insertion wrappers.
* Client-side reactivity handling data streams without full-page reloads.

### 🧑‍💻 Code Quality Standards
* **Language Constraint:** 100% of the codebase (source code, variables, function targets, routing points, and documentation) written strictly in English.
* **Casing Policy:** Mandatory use of standard `camelCase` naming conventions across all variable declarations, functions, and active classes.
* Modular, DRY (Don't Repeat Yourself), cleanly decoupled script components.

### 🌐 Version Control & Deployment Lifecycle
* Continuous git interaction with granular, semantic version tracking commits.
* Cloud deployment hosting setup via production-ready environments (**Vercel** infrastructure mapping).


---

## 📷 Photographic Data Model (Metadata Schema)

Every photograph or "frame" managed by the database and processed by `app.js` follows a strict object schema structure:

| Attribute | Type | Description |
|----------|------|-------------|
| `id` | Number | Unique numeric key identifying the specific photograph. |
| `title` | String | Artistic conceptual name given to the piece. |
| `location` | String | Geographical metadata showing where the photo was taken (City, Country). |
| `year` | String | Calendar year corresponding to the photograph capture date. |
| `category` | String | Classification tag used by the filtering system (e.g., Street, Summer, Travel, People). |
| `mood` | String | Qualitative emotional descriptor assigned to the scene's aesthetic vibe. |
| `description` | String | Short editorial story or journal memory providing literary context to the image. |
| `show` | Boolean | Conditional flag enabling or disabling the asset inside the automated slideshow loop. |
| `order_slideshow` | Number | Sorting priority value enforcing strict sequential rendering inside the player. |
| `image` | String | Absolute secure URI pointing to the asset's hosting location on the Cloudinary CDN. |
| `duration` | Number | Custom view time interval (written in milliseconds) specified for that particular frame. |

---

## 💾 JSON Persistence (Production Serverless Function)

While local development relies on standard file streams from `json-server`, the production environment on Vercel serves identical, static-safe database records via an autonomous Node.js lambda function located at `api/frames.js`:

```javascript
const frames = [ /* ... fully structured array of photographic objects ... */ ];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(frames);
}
```

Transparent, seamless endpoint routing is commanded by the project map configuration inside `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/frames", "destination": "/api/frames" }
  ]
}
```

---

## 🎛️ Interface Actions & Control Bindings

| Interface Element | Event Trigger | Application Behavior |
|------------------|----------------|----------------------|
| **Photo Card Node** | `click` | Records active collection index, injects metadata into target nodes, and deploys the Lightbox while pinning background viewport scroll. |
| **Category Filter Button** | `click` | Alters active visual states, executes an array slice filter in memory, and triggers an instantaneous re-render. |
| **"Rolls" Mode Switch** | `click` | Hides standard grid layouts, toggles container visibilities, and flushes elements out into a continuous filmstrip track. |
| **Slideshow Trigger** | `click` | Transitions application into full-screen theater mode, starts audio playback from scratch, and registers an asynchronous timer sequence. |
| **Mute Control Button** | `click` | Inverts the `.muted` attribute state on the audio element and updates accessible text readers via ARIA labels. |
| **Lightbox Backdrop Overlay** | `click` | Evaluates event propagation bubbling targets to safely dismiss modal views on outside clicks. |

---

## ▶️ How to Run & Deploy

Follow these steps to clone the repository and run the project locally on your machine.

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and Git installed on your system.

### 1. Clone the Repository
Open your terminal and run the following command to clone the project:
```bash
git clone https://github.com/Daaniel-Sans/Exposures.git
```

### 2. Install Dependencies
Navigate into the project directory and install the local mock server (`json-server`):
```bash
cd Exposures
npm install
```

### 3. Start the Mock Database Server
Launch the local API execution environment:
```bash
npm run server
```
*The database engine will boot up and actively listen for image asset queries at `http://localhost:3000/frames`.*

### 4. Launch the Application
Open `index.html` using a local static server tool (such as the **Live Server** extension in VS Code). 

> 💡 **Note on Media Assets:** The core script (`app.js`) automatically detects your local environment, fetches data from port 3000, and renders the images. All high-resolution photographic files are hosted externally on a secure Cloudinary CDN, meaning they will load instantly without requiring local media downloads.

---

## 👤 Author

- **[Daaniel-Sans]** - 
