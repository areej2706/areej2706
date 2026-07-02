<?php
session_start();
require_once 'db.php';

if (!isset($_SESSION['user_id']) || !in_array($_SESSION['role'], ['admin', 'organizer'])) {
    header('Location: login.php');
    exit;
}

$event_id = $_GET['id'] ?? null;

if (!$event_id) {
    echo "Invalid event ID.";
    exit;
}

// Delete event
$stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
$stmt->bind_param("i", $event_id);

if ($stmt->execute()) {
    header("Location: dashboard.php?msg=Event+deleted");
    exit;
} else {
    echo "Error deleting event.";
}
?>
