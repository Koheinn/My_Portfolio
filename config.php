<?php
// Configuration file for portfolio website
define('SITE_NAME', 'Heinn Htet Zan - Portfolio');
define('SITE_URL', 'https://koheinn.github.io');
define('GITHUB_USERNAME', 'Koheinn');
define('EMAIL', 'heinn2004@gmail.com');
define('LINKEDIN', 'https://www.linkedin.com/in/heinn-htet-zan-040794291');

// Email configuration (if using PHP mail instead of EmailJS)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', EMAIL);
define('SMTP_PASSWORD', ''); // Add your app password here if using PHP mail

// Site settings
define('THEME_DEFAULT', 'light');
define('ITEMS_PER_PAGE', 12);

// Social media links
$social_links = [
    'email' => 'mailto:' . EMAIL,
    'linkedin' => LINKEDIN,
    'github' => 'https://github.com/' . GITHUB_USERNAME
];

// Skills and technologies
$skills = [
    'Frontend' => ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Bootstrap'],
    'Backend' => ['PHP', 'Node.js', 'Python', 'Java', 'C#'],
    'Database' => ['MySQL', 'MongoDB', 'PostgreSQL'],
    'Tools' => ['Git', 'Docker', 'VS Code', 'Figma'],
    'Mobile' => ['React Native', 'Kotlin', 'Swift']
];

// Function to get current year
function getCurrentYear() {
    return date('Y');
}

// Function to format date
function formatDate($date) {
    return date('F j, Y', strtotime($date));
}

// Function to sanitize input
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}
?>