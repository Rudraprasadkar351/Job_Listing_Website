# 🔍 JobFinder — Job Listing Website

A simple, clean job listing website with filters, job cards, and a detail modal.

---

## 📁 Project Structure

```
jobfinder/
│
├── index.html   → The structure of the page (HTML only)
├── style.css    → All the styling / colours / layout (CSS only)
├── script.js    → All the logic / filtering / interactivity (JS only)
└── README.md    → This file
```

---

## 🚀 How to Run

1. Download all 3 files into the **same folder**
2. Open `index.html` in any web browser
3. That's it — no installation needed!

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 Search Bar | Search jobs by title, company, or keyword |
| 📍 Location Filter | Filter by city or Remote |
| 💼 Category Filter | Filter by IT, Design, Marketing, etc. |
| ⭐ Experience Filter | Fresher, Mid-Level, Senior (checkboxes) |
| 🏷 Job Type Filter | Full-Time, Part-Time, Remote, Internship |
| ❌ Clear Filters | Reset all filters at once |
| 📄 Job Cards | Each job shown as a card with key info |
| 🔎 View Details | Click a card to open a full detail popup |
| ❤️ Save Job | Save/unsave jobs with a button |
| 📑 Pagination | 6 jobs per page with page buttons |
| 📱 Responsive | Works on mobile, tablet, and desktop |

---

## 🛠 Technologies Used

- **HTML5** — page structure
- **CSS3** — styling and responsive layout (Flexbox, Grid, Media Queries)
- **Vanilla JavaScript** — filtering, rendering, modal, pagination

---

## 📖 How the Code Works (for your presentation)

### index.html
- Contains only the **structure** of the page
- Links to `style.css` in the `<head>`
- Links to `script.js` at the bottom of `<body>`

### style.css
- Divided into clear sections: Header, Sidebar, Cards, Modal, Toast, Responsive
- Uses comments like `/* ─── HEADER ─── */` to explain each part

### script.js
- Divided into 10 clearly labelled sections
- **Section 1:** Job data (array of 9 jobs)
- **Section 2:** State variables (current page, saved jobs)
- **Section 3:** `applyFilters()` — filters jobs based on user input
- **Section 4:** `clearFilters()` — resets all inputs
- **Section 5:** `render()` — draws cards and pagination on screen
- **Section 6:** `buildCard()` — builds HTML for one job card
- **Section 7:** `toggleSave()` — save/unsave a job
- **Section 8:** `openModal()` / `closeModal()` — detail popup
- **Section 9:** `showToast()` — small notification message
- **Section 10:** Initial page load

---

## 🌐 Deployment

Upload all 3 files to any of these platforms:
- **GitHub Pages** — free, just push to a repo and enable Pages
- **Netlify** — drag and drop the folder at netlify.com
- **Vercel** — import from GitHub at vercel.com
