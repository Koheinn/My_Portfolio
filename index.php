<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heinn Htet Zan - Modern Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top glass-nav">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#home">
                <span class="text-gradient">Koheinn</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#skills">Skills</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section d-flex align-items-center min-vh-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="hero-content animate-on-scroll">
                        <h1 class="display-4 fw-bold mb-3">
                            <span class="wave">👋</span> Hi, I'm 
                            <span class="text-gradient" id="fullname">Loading...</span>
                        </h1>
                        <p class="lead mb-4" id="bio">Loading bio...</p>
                        <div class="hero-buttons">
                            <a href="#projects" class="btn btn-primary btn-lg me-3 floating-btn">
                                <i class="fas fa-code me-2"></i>View Projects
                            </a>
                            <button class="btn btn-outline-primary btn-lg" data-bs-toggle="modal" data-bs-target="#contactModal">
                                <i class="fas fa-envelope me-2"></i>Contact Me
                            </button>
                        </div>
                        <div class="social-links mt-4">
                            <a href="mailto:heinn2004@gmail.com" class="social-link">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/heinn-htet-zan-040794291" target="_blank" class="social-link">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/Koheinn" target="_blank" class="social-link">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="hero-image text-center">
                        <div class="profile-container">
                            <img id="avatar" src="" alt="Profile" class="profile-img">
                            <div class="floating-elements">
                                <div class="floating-icon" style="--delay: 0s"><i class="fab fa-js"></i></div>
                                <div class="floating-icon" style="--delay: 1s"><i class="fab fa-php"></i></div>
                                <div class="floating-icon" style="--delay: 2s"><i class="fab fa-react"></i></div>
                                <div class="floating-icon" style="--delay: 3s"><i class="fab fa-python"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll-indicator">
            <div class="scroll-arrow"></div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mb-5">
                    <h2 class="section-title">About Me</h2>
                    <div class="section-divider"></div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="about-content animate-on-scroll">
                        <h3 class="mb-4">Computing Professional & Full-Stack Developer</h3>
                        <p class="mb-4">I am a dedicated computing professional with NCC Level 3, 4, and 5 Diplomas in Computing, and I've enhanced my skills through AI Engineering and Data Science courses from 365 Data Science, as well as full-stack web development training—including PHP Laravel, JavaScript, React, Node.js, Express, Redux, TypeScript, and cross-platform development—at Fairway Institute.</p>
                        <p class="mb-4">🌟 Passionate about technology and continuous learning!</p>
                        <div class="stats-row">
                            <div class="stat-item">
                                <h4 class="stat-number" id="repoCount" data-count="0">0</h4>
                                <p>GitHub Repositories</p>
                            </div>
                            <div class="stat-item">
                                <h4 class="stat-number" id="languageCount" data-count="0">0</h4>
                                <p>Programming Languages</p>
                            </div>
                            <div class="stat-item">
                                <h4 class="stat-number" data-count="3">0</h4>
                                <p>Years of Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-image animate-on-scroll">
                        <div class="image-container">
                            <div class="tech-orbit">
                                <div class="orbit-item" style="--i: 1"><i class="fab fa-html5"></i></div>
                                <div class="orbit-item" style="--i: 2"><i class="fab fa-css3-alt"></i></div>
                                <div class="orbit-item" style="--i: 3"><i class="fab fa-js"></i></div>
                                <div class="orbit-item" style="--i: 4"><i class="fab fa-php"></i></div>
                                <div class="orbit-item" style="--i: 5"><i class="fab fa-python"></i></div>
                                <div class="orbit-item" style="--i: 6"><i class="fab fa-react"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-5 bg-section">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mb-5">
                    <h2 class="section-title">Skills & Technologies</h2>
                    <div class="section-divider"></div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-12">
                    <div class="filter-buttons text-center">
                        <button class="filter-btn active" data-filter="all">All Skills</button>
                        <div id="skillFilters" class="d-inline"></div>
                    </div>
                </div>
            </div>
            <div class="row" id="skillsGrid">
                <!-- Skills will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mb-5">
                    <h2 class="section-title">My Projects</h2>
                    <div class="section-divider"></div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-lg-6">
                    <div class="project-filters">
                        <div id="projectFilters" class="filter-grid"></div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="search-box">
                        <input type="text" id="repoSearch" class="form-control" placeholder="🔍 Search projects...">
                    </div>
                </div>
            </div>
            <div class="row" id="repos">
                <div class="col-12 text-center">
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>Loading projects...</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-5 bg-section">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mb-5">
                    <h2 class="section-title">Get In Touch</h2>
                    <div class="section-divider"></div>
                    <p class="lead">Let's work together on your next project</p>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="contact-info text-center mb-5">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="contact-item">
                                    <a href="mailto:heinn2004@gmail.com" class="text-decoration-none">
                                        <div class="contact-icon">
                                            <i class="fas fa-envelope"></i>
                                        </div>
                                        <h5>Email</h5>
                                        <p>heinn2004@gmail.com</p>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="contact-item">
                                    <a href="https://www.linkedin.com/in/heinn-htet-zan-040794291" target="_blank" class="text-decoration-none">
                                        <div class="contact-icon">
                                            <i class="fab fa-linkedin"></i>
                                        </div>
                                        <h5>LinkedIn</h5>
                                        <p>Connect with me</p>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="contact-item">
                                    <a href="https://github.com/Koheinn" target="_blank" class="text-decoration-none">
                                        <div class="contact-icon">
                                            <i class="fab fa-github"></i>
                                        </div>
                                        <h5>GitHub</h5>
                                        <p>View my code</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#contactModal">
                            <i class="fas fa-paper-plane me-2"></i>Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 text-center">
        <div class="container">
            <p class="mb-0">
                <span class="emoji">🚀</span>
                &copy; <span id="year"></span> Koheinn. All rights reserved.
                <span class="emoji">💜</span>
            </p>
        </div>
    </footer>

    <!-- Contact Modal -->
    <div class="modal fade" id="contactModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content glass-modal">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        <span class="emoji">📬</span> Contact Me
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form id="contactForm">
                    <div class="modal-body">
                        <div id="contactAlert" class="alert d-none"></div>
                        <div class="mb-3">
                            <label for="contactName" class="form-label">
                                <i class="fas fa-user me-2"></i>Name
                            </label>
                            <input type="text" class="form-control" id="contactName" required maxlength="50">
                        </div>
                        <div class="mb-3">
                            <label for="contactEmail" class="form-label">
                                <i class="fas fa-envelope me-2"></i>Email
                            </label>
                            <input type="email" class="form-control" id="contactEmail" required maxlength="80">
                        </div>
                        <div class="mb-3">
                            <label for="contactMsg" class="form-label">
                                <i class="fas fa-comment-dots me-2"></i>Message
                            </label>
                            <textarea class="form-control" id="contactMsg" rows="4" required maxlength="500"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane me-2"></i>Send
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>