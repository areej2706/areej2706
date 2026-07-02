<?php
session_start();
include 'db_connection.php';

// Collect and sanitize form data
$event_id = isset($_POST['event_id']) ? intval($_POST['event_id']) : 0;
$user_name = isset($_POST['user_name']) ? trim($_POST['user_name']) : '';
$user_email = isset($_POST['user_email']) ? trim($_POST['user_email']) : '';
$rsvp_status = isset($_POST['rsvp_status']) ? trim($_POST['rsvp_status']) : '';
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

if ($event_id && $user_name && $user_email && $rsvp_status) {
    $stmt = $conn->prepare("INSERT INTO bookings (event_id, user_id, booking_date, status, rsvp_status, user_name, user_email)
                            VALUES (?, ?, NOW(), 'confirmed', ?, ?, ?)");
    $stmt->bind_param("iisss", $event_id, $user_id, $rsvp_status, $user_name, $user_email);

    if ($stmt->execute()) {
        header("Location: thank_you.php"); // Redirect after success
        exit;
    } else {
        echo "Error: " . $stmt->error;
    }
} else {
    echo "Invalid submission.";
}
?>
