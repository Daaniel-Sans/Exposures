# 🎞️ Exposures - Personal Visual Diary

> **Exposures** is an interactive visual diary designed to showcase a curated collection of my personal photographs and different video compositions / Edits (one, for now) with an "analogical" aesthetic. 

The application dynamically reads structured photographic metadata (including location, year, description, and emotional mood tags) from a mock database in **JSON** format. It features instantaneous client-side category filtering, an interactive modal expansion window (*Lightbox*) with cyclic navigation loops, and an immersive automated presentation mode (*Rolls*) packed with individual slide duration variables and a synchronized cinematic background audio score.

---

📖 **Live Deployment Link:** [Deployment Link Pending](#)

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

## ✅ Requirements Compliance

### Bootstrap 5 Architecture & Aesthetics

| Requirement | Compliance |
|-----------|-------------|
| Official Component Usage | ✅ Generated card components strictly adhere to the native `.card`, `.card-img-top`, and `.card-body` DOM hierarchy. |
| Custom Framework Overrides | ✅ Custom backgrounds, square framing, and specialized borders are injected safely via CSS without interrupting responsive grid workflows. |
| Elimination of Anti-patterns | ✅ Refined high-specificity CSS class coupling to entirely eliminate destructive `!important` declarations. |

### Advanced Dynamic JavaScript

| Requirement | Compliance |
|-----------|-------------|
| Asynchronous Data Fetching | ✅ Implemented `async/await` syntax wrapped around the native Fetch API for instant data streams. |
| Reactive UI Filtering | ✅ Centralized event listener delegation to slice memory collections and re-render the view without reloading the page. |
| Continuous Index Loops | ✅ Algorithmic boundary checks built into both the Lightbox and Slideshow components to handle infinite forward/backward navigation. |
| Multimedia Lifecycle | ✅ Native media handle configuration managing play/pause states, track synchronization, and ARIA-compliant audio muting. |

### Persistence & Deployment Lifecycle

| Requirement | Compliance |
|-----------|-------------|
| Structured Database | ✅ Standalone `db.json` tracking schema attributes per entry (mood, category, custom duration, CDN paths). |
| Environment Auto-detection | ✅ Dynamic conditional testing on `window.location.hostname` to cleanly switch between the local port and Vercel. |
| Production Serverless Fix | ✅ Routed requests through a decoupled cloud function environment to circumvent Vercel's ephemeral disk state limitations. |

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

### 1. Local Development Environment
To run this project locally on your machine, ensure you have [Node.js](https://nodejs.org/) installed:

1. Clone or download the Exposures repository to your local directory.
2. Open your terminal at the root directory of the project and install the local mock server dependency:
   ```bash
   npm install
   ```
3. Boot up the local database server:
   ```bash
   npm run server
   ```
   *The mock database engine will now listen actively at `http://localhost:3000/frames`.*
4. Serve `index.html` using a static browser tool like **Live Server** in VS Code. The core script (`app.js`) will detect the localhost domain automatically and fetch from port 3000 seamlessly.

### 2. Cloud Production Deployment (Vercel)
To successfully deploy the project bypassing Vercel's persistent server restrictions, follow these deployment steps:

1. Commit and push all your updated code changes (including the newly created `api/frames.js` and `vercel.json` files) to your connected GitHub repository:
   ```bash
   git add .
   git commit -m "feat: setup serverless functions and proxy routing rules for deployment"
   git push origin main
   ```
2. Log into your cloud dashboard account at [Vercel](https://vercel.com/) using your GitHub credentials.
3. Click on the **"Add New"** dropdown button and select **"Project"**.
4. Import your specific `exposures` project repository from the visible list.
5. Leave all framework preset settings at their default values (Vercel automatically analyzes the root static files and links the serverless lambda functions folder seamlessly).
6. Click on the **"Deploy"** button. Once completed, Vercel will output your production live URL link to share.

---

## 👤 Author

- **[Daaniel-Sans]** - 
