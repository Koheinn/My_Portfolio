<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit;
    }
}

// Sanitize input
$name = sanitizeInput($input['name']);
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$message = sanitizeInput($input['message']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Validate message length
if (strlen($message) > 500) {
    http_response_code(400);
    echo json_encode(['error' => 'Message too long (max 500 characters)']);
    exit;
}

// Prepare email
$to = EMAIL;
$subject = 'New Contact Form Submission - ' . SITE_NAME;
$email_body = "
Name: $name
Email: $email
Message: $message
Time: " . date('Y-m-d H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
";

$headers = [
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
if (mail($to, $subject, $email_body, implode("\r\n", $headers))) {
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. Please try again later.'
    ]);
}
?>