// Initialize EmailJS
(function(){emailjs.init('s-LvedVFqywmbICUm');})();

// Global variables
const username = 'Koheinn';
const userApi = `https://api.github.com/users/${username}`;
const reposApi = `https://api.github.com/users/${username}/repos?per_page=100`;
const languageSkillMap = {
    'PHP': 'PHP', 'JavaScript': 'JavaScript', 'Java': 'Java', 'Kotlin': 'Kotlin',
    'HTML': 'HTML', 'CSS': 'CSS', 'TypeScript': 'TypeScript', 'Python': 'Python',
    'C++': 'C++', 'C#': 'C#', 'Go': 'Go', 'Ruby': 'Ruby', 'Swift': 'Swift',
    'Objective-C': 'Objective-C', 'Shell': 'Shell Scripting', 'Dockerfile': 'Docker',
    'Makefile': 'Make', 'C': 'C', 'Dart': 'Dart', 'Rust': 'Rust'
};

let allRepos = [];
let selectedSkills = new Set();
let repoSearchQuery = "";

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Initialize counters when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-number').forEach(el => {
    statsObserver.observe(el);
});

// GitHub API functions
async function fetchJson(url) {
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Koheinn-Portfolio-App'
        }
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
}

async function loadProfile() {
    try {
        const user = await fetchJson(userApi);
        document.getElementById('avatar').src = user.avatar_url;
        document.getElementById('fullname').textContent = user.name || user.login;
        document.getElementById('bio').textContent = user.bio || 'Full-Stack Developer & Computing Professional';
    } catch (e) {
        console.error('Profile load failed:', e);
        document.getElementById('fullname').textContent = 'Heinn Htet Zan';
        document.getElementById('bio').textContent = 'Full-Stack Developer & Computing Professional';
    }
}

async function loadRepos() {
    try {
        const repos = await fetchJson(reposApi);
        allRepos = repos.filter(repo => !repo.fork); // Filter out forked repos
        
        // Update stats based on GitHub data
        updateGitHubStats(allRepos);
        
        // Extract unique skills from repositories
        const skills = new Set();
        allRepos.forEach(r => {
            if (r.language) skills.add(languageSkillMap[r.language] || r.language);
        });
        
        // Create skill filters
        createSkillFilters([...skills].sort());
        
        // Create skills grid based on GitHub languages
        createSkillsGrid([...skills].sort());
        
        // Render projects
        renderRepos();
    } catch (e) {
        console.error('Repos load failed:', e);
        document.getElementById('repos').innerHTML = '<div class="col-12 text-center"><p>Failed to load repositories.</p></div>';
    }
}

function updateGitHubStats(repos) {
    // Update repository count
    const repoCountEl = document.getElementById('repoCount');
    if (repoCountEl) {
        repoCountEl.dataset.count = repos.length;
    }
    
    // Update language count
    const languages = new Set();
    repos.forEach(repo => {
        if (repo.language) languages.add(repo.language);
    });
    const languageCountEl = document.getElementById('languageCount');
    if (languageCountEl) {
        languageCountEl.dataset.count = languages.size;
    }
}

function createSkillFilters(skills) {
    const container = document.getElementById('projectFilters');
    if (!container) return;
    
    container.innerHTML = '';
    
    skills.forEach(skill => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = skill;
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            if (selectedSkills.has(skill)) {
                selectedSkills.delete(skill);
            } else {
                selectedSkills.add(skill);
            }
            renderRepos();
        });
        container.appendChild(btn);
    });
}

function createSkillsGrid(skills) {
    const container = document.getElementById('skillsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const skillIcons = {
        'JavaScript': 'fab fa-js-square',
        'PHP': 'fab fa-php',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'React': 'fab fa-react',
        'Node.js': 'fab fa-node-js',
        'Git': 'fab fa-git-alt',
        'Docker': 'fab fa-docker',
        'TypeScript': 'fas fa-code',
        'C++': 'fas fa-code',
        'C#': 'fas fa-code',
        'Go': 'fas fa-code',
        'Ruby': 'fas fa-gem',
        'Swift': 'fab fa-swift',
        'Kotlin': 'fas fa-mobile-alt',
        'Shell Scripting': 'fas fa-terminal',
        'Make': 'fas fa-cogs',
        'Dart': 'fas fa-code',
        'Rust': 'fas fa-code'
    };
    
    skills.forEach(skill => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        
        const card = document.createElement('div');
        card.className = 'skill-card animate-on-scroll';
        card.innerHTML = `
            <i class="${skillIcons[skill] || 'fas fa-code'} skill-icon"></i>
            <h5>${skill}</h5>
        `;
        
        col.appendChild(card);
        container.appendChild(col);
        observer.observe(card);
    });
}

function createRepoCard(repo) {
    const col = document.createElement('div');
    col.className = 'col-lg-6 col-md-6 mb-4';
    
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    
    // Format dates
    const createdDate = new Date(repo.created_at).toLocaleDateString();
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    
    card.innerHTML = `
        <h5>
            <a href="${repo.html_url}" target="_blank" class="project-title">
                <i class="fab fa-github me-2"></i>${repo.name}
            </a>
        </h5>
        ${repo.language ? `<span class="project-lang"><i class="fas fa-code me-1"></i>${languageSkillMap[repo.language] || repo.language}</span>` : ''}
        ${repo.description ? `<p class="mt-3 mb-2">${repo.description}</p>` : ''}
        <div class="d-flex justify-content-between align-items-center mt-3">
            <small class="text-muted">
                <i class="fas fa-calendar me-1"></i>Created: ${createdDate}
            </small>
            ${repo.stargazers_count > 0 ? `<small class="text-muted"><i class="fas fa-star me-1"></i>${repo.stargazers_count}</small>` : ''}
        </div>
    `;
    
    col.appendChild(card);
    observer.observe(card);
    return col;
}

function renderRepos() {
    const container = document.getElementById('repos');
    if (!container) return;
    
    container.innerHTML = '';
    
    let filtered = allRepos;
    
    // Filter by selected skills
    if (selectedSkills.size > 0) {
        filtered = filtered.filter(repo => {
            if (!repo.language) return false;
            const lang = languageSkillMap[repo.language] || repo.language;
            return selectedSkills.has(lang);
        });
    }
    
    // Filter by search query
    if (repoSearchQuery.trim() !== "") {
        const q = repoSearchQuery.trim().toLowerCase();
        filtered = filtered.filter(repo =>
            repo.name.toLowerCase().includes(q) ||
            (repo.description && repo.description.toLowerCase().includes(q))
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>😕 No projects found for selected filters or search.</p></div>';
        return;
    }
    
    // Sort by updated date (most recent first)
    filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    filtered.forEach(repo => {
        container.appendChild(createRepoCard(repo));
    });
}

// Search functionality
const searchInput = document.getElementById('repoSearch');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        repoSearchQuery = e.target.value;
        renderRepos();
    });
}

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMsg').value.trim();
    
    if (!name || !email || !message) {
        showAlert('Please fill in all fields!', 'danger');
        return;
    }
    
    showAlert('Sending message...', 'info');
    
    emailjs.send('service_3p55fij', 'template_x5l4ku3', {
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString(),
        title: 'Portfolio Contact Form'
    }).then(function() {
        showAlert('<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully.', 'success');
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            if (modal) modal.hide();
            document.getElementById('contactForm').reset();
            hideAlert();
        }, 2000);
    }, function(err) {
        console.error('EmailJS send error:', err);
        showAlert('Failed to send message. Please try again later.', 'danger');
    });
});

function showAlert(message, type) {
    const alertBox = document.getElementById('contactAlert');
    if (alertBox) {
        alertBox.className = `alert alert-${type}`;
        alertBox.innerHTML = message;
        alertBox.classList.remove('d-none');
    }
}

function hideAlert() {
    const alertBox = document.getElementById('contactAlert');
    if (alertBox) {
        alertBox.classList.add('d-none');
    }
}

// Reset form when modal opens
const contactModal = document.getElementById('contactModal');
if (contactModal) {
    contactModal.addEventListener('show.bs.modal', function() {
        document.getElementById('contactForm').reset();
        hideAlert();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Load GitHub data
    loadProfile();
    loadRepos();
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.glass-nav');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        }
    });
});