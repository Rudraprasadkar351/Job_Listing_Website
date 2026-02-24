// ============================================
//  script.js — All JavaScript for JobFinder
// ============================================


// ════════════════════════════════════════
//  SECTION 1: JOB DATA
//  This array acts like a database or API response.
//  Each object {} represents one job listing.
// ════════════════════════════════════════

const JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "PixelCraft Studio",
    location: "San Francisco",
    category: "IT & Engineering",
    experience: "Mid-Level",
    type: "Full-Time",
    salary: "$95k – $120k",
    posted: "2 days ago",
    description: "Build fast and beautiful web interfaces using React and TypeScript.",
    responsibilities: [
      "Develop React components",
      "Collaborate with designers",
      "Write clean, testable code",
      "Participate in code reviews"
    ],
    requirements: [
      "3+ years with React",
      "TypeScript knowledge",
      "CSS / Tailwind",
      "Git workflow"
    ]
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Forma Labs",
    location: "Remote",
    category: "Design",
    experience: "Mid-Level",
    type: "Remote",
    salary: "$85k - $105k",
    posted: "1 day ago",
    description: "Shape product experiences from research to polished Figma prototypes.",
    responsibilities: [
      "User research",
      "Create wireframes and prototypes",
      "Usability testing",
      "Work with engineering team"
    ],
    requirements: [
      "3+ years UX experience",
      "Figma / Sketch",
      "Portfolio required",
      "Strong communication"
    ]
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "NeuralStack",
    location: "New York",
    category: "IT & Engineering",
    experience: "Senior",
    type: "Full-Time",
    salary: "$130k - $160k",
    posted: "3 days ago",
    description: "Build machine learning models and analytical pipelines for our platform.",
    responsibilities: [
      "Build and deploy ML models",
      "Analyse large datasets",
      "Present insights to stakeholders",
      "Maintain data pipelines"
    ],
    requirements: [
      "5+ years Data Science",
      "Python, SQL, TensorFlow",
      "Statistical modelling",
      "AWS / GCP"
    ]
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "Growthbase",
    location: "London",
    category: "Marketing",
    experience: "Senior",
    type: "Full-Time",
    salary: "£75k - £90k",
    posted: "5 days ago",
    description: "Lead our global marketing strategy and grow brand presence across digital channels.",
    responsibilities: [
      "Own content and growth strategy",
      "Manage a team of 5",
      "A/B testing and analytics",
      "SEO and paid campaigns"
    ],
    requirements: [
      "5+ years marketing",
      "Data-driven mindset",
      "Team management",
      "Strong writing skills"
    ]
  },
  {
    id: 5,
    title: "Product Manager",
    company: "Orbit Inc.",
    location: "Bangalore",
    category: "Product",
    experience: "Mid-Level",
    type: "Full-Time",
    salary: "$80k - $100k",
    posted: "1 day ago",
    description: "Define the roadmap for our core product and collaborate with engineering and design.",
    responsibilities: [
      "Define product roadmap",
      "Write user stories",
      "Prioritise backlog",
      "Gather customer feedback"
    ],
    requirements: [
      "3+ years PM experience",
      "Agile / Scrum",
      "Analytics tools",
      "Strong communication"
    ]
  },
  {
    id: 6,
    title: "Backend Engineer",
    company: "Cloudnode",
    location: "Remote",
    category: "IT & Engineering",
    experience: "Senior",
    type: "Remote",
    salary: "$120k - $150k",
    posted: "4 days ago",
    description: "Design scalable backend services handling millions of API requests per day.",
    responsibilities: [
      "Build REST & GraphQL APIs",
      "Optimise database performance",
      "Cloud infrastructure (AWS)",
      "Mentor junior engineers"
    ],
    requirements: [
      "5+ years Node.js / Python",
      "PostgreSQL / MongoDB",
      "Docker & Kubernetes",
      "CI/CD pipelines"
    ]
  },
  {
    id: 7,
    title: "Junior UI Developer",
    company: "WebWave",
    location: "Bangalore",
    category: "IT & Engineering",
    experience: "Fresher",
    type: "Internship",
    salary: "$20k - $30k",
    posted: "Today",
    description: "Start your career building modern web interfaces with great mentorship.",
    responsibilities: [
      "Build UI components",
      "Fix bugs",
      "Learn from senior engineers",
      "Write documentation"
    ],
    requirements: [
      "HTML, CSS, JavaScript basics",
      "Eager to learn",
      "React is a plus",
      "Good communication"
    ]
  },
  {
    id: 8,
    title: "Graphic Designer",
    company: "Forma Labs",
    location: "Remote",
    category: "Design",
    experience: "Fresher",
    type: "Part-Time",
    salary: "$35k - $50k",
    posted: "2 days ago",
    description: "Create stunning visuals for our marketing team — social posts, ads, and decks.",
    responsibilities: [
      "Design social media assets",
      "Maintain brand guidelines",
      "Create pitch deck templates",
      "Support marketing team"
    ],
    requirements: [
      "Adobe Illustrator / Photoshop",
      "Strong visual sense",
      "Portfolio required",
      "Open to feedback"
    ]
  },
  {
    id: 9,
    title: "Finance Analyst",
    company: "ClearFunds",
    location: "New York",
    category: "Finance",
    experience: "Mid-Level",
    type: "Full-Time",
    salary: "$80k - $100k",
    posted: "3 days ago",
    description: "Analyse financial data, build models, and support strategic decisions.",
    responsibilities: [
      "Financial modelling",
      "Monthly reporting",
      "Variance analysis",
      "Collaborate with leadership"
    ],
    requirements: [
      "3+ years finance",
      "Excel proficiency",
      "SQL is a plus",
      "CFA preferred"
    ]
  }
];


// ════════════════════════════════════════
//  SECTION 2: STATE VARIABLES
//  These variables keep track of what's happening on the page.
// ════════════════════════════════════════

let filteredJobs = [...JOBS];  // copy of JOBS, gets updated after filtering
let currentPage  = 1;          // which page of results we're on
const PER_PAGE   = 6;          // how many jobs to show per page
const savedJobs  = new Set();  // stores IDs of jobs the user saved


// ════════════════════════════════════════
//  SECTION 3: FILTER FUNCTION
//  Reads all filter inputs and filters the JOBS array.
//  Called every time a filter changes.
// ════════════════════════════════════════

function applyFilters() {

  // Step 1: Read current values from the filter inputs
  const keyword  = document.getElementById('searchInput').value.toLowerCase();
  const location = document.getElementById('filterLocation').value;
  const category = document.getElementById('filterCategory').value;

  // Get which experience checkboxes are checked
  const expChecked = [
    ...document.querySelectorAll(
      '.checkbox-group input[value="Fresher"], .checkbox-group input[value="Mid-Level"], .checkbox-group input[value="Senior"]'
    )
  ].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

  // Get which job type checkboxes are checked
  const typeChecked = [
    ...document.querySelectorAll(
      '.checkbox-group input[value="Full-Time"], .checkbox-group input[value="Part-Time"], .checkbox-group input[value="Remote"], .checkbox-group input[value="Internship"]'
    )
  ].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

  // Step 2: Filter the JOBS array — keep only jobs that match ALL selected filters
  filteredJobs = JOBS.filter(function(job) {

    // Check keyword: is the search text found in the title, company, or description?
    if (keyword && !`${job.title} ${job.company} ${job.description}`.toLowerCase().includes(keyword)) {
      return false;
    }

    // Check location: does it match the selected location?
    if (location && job.location !== location) {
      return false;
    }

    // Check category: does it match the selected category?
    if (category && job.category !== category) {
      return false;
    }

    // Check experience: is the job's experience level in the checked list?
    if (expChecked.length > 0 && !expChecked.includes(job.experience)) {
      return false;
    }

    // Check job type: is the job's type in the checked list?
    if (typeChecked.length > 0 && !typeChecked.includes(job.type)) {
      return false;
    }

    return true;  // job passed all filters — include it
  });

  // Step 3: Always go back to page 1 after filtering
  currentPage = 1;

  // Step 4: Redraw the page with the new filtered results
  render();
}


// ════════════════════════════════════════
//  SECTION 4: CLEAR FILTERS
//  Resets all filter inputs back to their defaults.
// ════════════════════════════════════════

function clearFilters() {
  document.getElementById('searchInput').value      = '';
  document.getElementById('filterLocation').value  = '';
  document.getElementById('filterCategory').value  = '';

  // Uncheck all checkboxes
  document.querySelectorAll('.checkbox-group input').forEach(function(checkbox) {
    checkbox.checked = false;
  });

  applyFilters();  // re-run filter with empty values (shows all jobs)
  showToast('Filters cleared!');
}


// ════════════════════════════════════════
//  SECTION 5: RENDER FUNCTION
//  Draws the job cards and pagination on screen.
//  Called after every filter change or page change.
// ════════════════════════════════════════

function render() {
  const grid  = document.getElementById('jobsGrid');
  const pagEl = document.getElementById('pagination');

  // Calculate which jobs to show on the current page
  const totalPages = Math.ceil(filteredJobs.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const pageJobs   = filteredJobs.slice(startIndex, startIndex + PER_PAGE);

  // Update the "Showing X jobs" count
  document.getElementById('countDisplay').textContent = filteredJobs.length;

  // ─── Draw job cards ───
  if (filteredJobs.length === 0) {
    // No jobs match — show a message
    grid.innerHTML = `
      <div class="no-results">
        <div style="font-size:2.5rem">🔍</div>
        <p>No jobs found. Try different filters.</p>
      </div>
    `;
  } else {
    // Build HTML for each job on this page and put it in the grid
    grid.innerHTML = pageJobs.map(job => buildCard(job)).join('');
  }

  // ─── Draw pagination buttons ───
  pagEl.innerHTML = '';  // clear old buttons

  if (totalPages > 1) {
    // Previous button
    pagEl.appendChild(
      makePageBtn('← Prev', currentPage === 1, function() { goTo(currentPage - 1); })
    );

    // Number buttons (1, 2, 3 ...)
    for (let i = 1; i <= totalPages; i++) {
      const isActive = (i === currentPage);
      pagEl.appendChild(
        makePageBtn(i, false, function() { goTo(i); }, isActive)
      );
    }

    // Next button
    pagEl.appendChild(
      makePageBtn('Next →', currentPage === totalPages, function() { goTo(currentPage + 1); })
    );
  }
}


// ─── Helper: go to a specific page ───
function goTo(page) {
  currentPage = page;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ─── Helper: create a pagination button element ───
function makePageBtn(label, isDisabled, onClickFn, isActive = false) {
  const btn = document.createElement('button');
  btn.className   = 'page-btn' + (isActive ? ' active' : '');
  btn.textContent = label;
  btn.disabled    = isDisabled;
  btn.onclick     = onClickFn;
  return btn;
}


// ════════════════════════════════════════
//  SECTION 6: BUILD JOB CARD HTML
//  Takes a job object and returns the HTML string for one card.
// ════════════════════════════════════════

function buildCard(job) {

  // Pick the right CSS class for the job type badge colour
  const typeClassMap = {
    'Full-Time':  'type-fulltime',
    'Part-Time':  'type-parttime',
    'Remote':     'type-remote',
    'Internship': 'type-internship'
  };
  const typeClass = typeClassMap[job.type] || 'type-fulltime';

  // Check if user has saved this job
  const isSaved = savedJobs.has(job.id);

  // Return the HTML for this card
  return `
    <div class="job-card">

      <!-- Top row: job title + type badge -->
      <div class="card-top">
        <div>
          <div class="job-title">${job.title}</div>
          <div class="company">🏢 ${job.company} &nbsp;·&nbsp; Posted ${job.posted}</div>
        </div>
        <span class="job-type ${typeClass}">${job.type}</span>
      </div>

      <!-- Tags: location, category, experience -->
      <div class="job-meta">
        <span>📍 ${job.location}</span>
        <span>💼 ${job.category}</span>
        <span>⭐ ${job.experience}</span>
      </div>

      <!-- Short job description -->
      <p class="job-desc">${job.description}</p>

      <!-- Bottom row: salary + buttons -->
      <div class="card-footer">
        <span class="salary">💰 ${job.salary}</span>
        <div class="card-buttons">
          <button class="save-btn ${isSaved ? 'saved' : ''}" onclick="toggleSave(${job.id}, this)">
            ${isSaved ? '❤️ Saved' : '🤍 Save'}
          </button>
          <button class="view-btn" onclick="openModal(${job.id})">View Details</button>
        </div>
      </div>

    </div>
  `;
}


// ════════════════════════════════════════
//  SECTION 7: SAVE / UNSAVE JOB
//  Adds or removes a job from the savedJobs set
//  and updates the button text.
// ════════════════════════════════════════

function toggleSave(id, btn) {
  if (savedJobs.has(id)) {
    // Already saved → unsave it
    savedJobs.delete(id);
    btn.innerHTML = '🤍 Save';
    btn.classList.remove('saved');
    showToast('Job removed from saved.');
  } else {
    // Not saved → save it
    savedJobs.add(id);
    btn.innerHTML = '❤️ Saved';
    btn.classList.add('saved');
    showToast('Job saved!');
  }
}


// ════════════════════════════════════════
//  SECTION 8: MODAL
//  Opens a popup showing full job details.
// ════════════════════════════════════════

function openModal(id) {
  // Find the job in the array by its id
  const job = JOBS.find(function(j) { return j.id === id; });
  if (!job) return;

  // Set the modal title
  document.getElementById('modalTitle').textContent = job.title;

  // Fill in the modal body with full job details
  document.getElementById('modalBody').innerHTML = `

    <p style="color:#555; margin-bottom:14px">🏢 ${job.company}</p>

    <!-- 2x2 grid: location, salary, type, experience -->
    <div class="detail-grid">
      <div class="detail-item">
        <div class="d-label">Location</div>
        <div class="d-val">📍 ${job.location}</div>
      </div>
      <div class="detail-item">
        <div class="d-label">Salary</div>
        <div class="d-val" style="color:#28a745">💰 ${job.salary}</div>
      </div>
      <div class="detail-item">
        <div class="d-label">Job Type</div>
        <div class="d-val">${job.type}</div>
      </div>
      <div class="detail-item">
        <div class="d-label">Experience</div>
        <div class="d-val">${job.experience}</div>
      </div>
    </div>

    <!-- About the role -->
    <div class="modal-section">
      <h4>About the Role</h4>
      <p>${job.description}</p>
    </div>

    <!-- Responsibilities list -->
    <div class="modal-section">
      <h4>Responsibilities</h4>
      <ul>
        ${job.responsibilities.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <!-- Requirements list -->
    <div class="modal-section">
      <h4>Requirements</h4>
      <ul>
        ${job.requirements.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <!-- Apply button -->
    <button class="apply-btn" onclick="showToast('Application submitted! ✅'); closeModal()">
      Apply Now
    </button>
  `;

  // Show the modal
  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';  // stop page from scrolling behind modal
}


// Close modal function
function closeModal() {
  document.getElementById('modalBg').classList.remove('open');
  document.body.style.overflow = '';  // allow page scrolling again
}

// Close modal if user clicks on the dark background
document.getElementById('modalBg').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close modal if user presses the Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});


// ════════════════════════════════════════
//  SECTION 9: TOAST NOTIFICATION
//  Shows a small message at the bottom-right of the screen.
// ════════════════════════════════════════

let toastTimer;  // used to clear the previous toast timer

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');       // make it visible (opacity 1)

  clearTimeout(toastTimer);          // cancel any previous countdown

  // Hide the toast after 2.5 seconds
  toastTimer = setTimeout(function() {
    toast.classList.remove('show');
  }, 2500);
}


// ════════════════════════════════════════
//  SECTION 10: INITIAL LOAD
//  Runs once when the page first loads.
// ════════════════════════════════════════

// Also apply filters when user types in the search box (without clicking Search)
document.getElementById('searchInput').addEventListener('input', applyFilters);

// Show all jobs on first load
applyFilters();
