<?php
session_start();
include('db_connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $event_id = (int)$_POST['event_id'];
    $user_name = $conn->real_escape_string($_POST['user_name']);
    $user_email = $conn->real_escape_string($_POST['user_email']);
    $rsvp_status = $conn->real_escape_string($_POST['rsvp_status']);
    $user_id = $_SESSION['user_id'] ?? 0; // If logged in user

    // Insert booking record
    $sql = "INSERT INTO bookings (event_id, user_id, user_name, user_email, rsvp_status, booking_date, status)
            VALUES ($event_id, $user_id, '$user_name', '$user_email', '$rsvp_status', NOW(), 'pending')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION['booking_success'] = "Booking confirmed!";
    } else {
        $_SESSION['booking_error'] = "Error: " . $conn->error;
    }

    header("Location: events_page.php"); // Redirect back to events page
    exit;
}
?>
