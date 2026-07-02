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

// Fetch current event details
$stmt = $conn->prepare("SELECT * FROM events WHERE id = ?");
$stmt->bind_param("i", $event_id);
$stmt->execute();
$result = $stmt->get_result();
$event = $result->fetch_assoc();

if (!$event) {
    echo "Event not found.";
    exit;
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $event_date = $_POST['event_date'] ?? '';
    $status = $_POST['status'] ?? 'upcoming';

    $stmt = $conn->prepare("UPDATE events SET title = ?, description = ?, event_date = ?, status = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $title, $description, $event_date, $status, $event_id);

    if ($stmt->execute()) {
        header("Location: dashboard.php?msg=Event+updated");
        exit;
    } else {
        echo "Error updating event.";
    }
}
?>

<h2>Edit Event</h2>
<form method="post">
    <label>Title:</label><br>
    <input type="text" name="title" value="<?= htmlspecialchars($event['title']) ?>" required><br><br>

    <label>Description:</label><br>
    <textarea name="description" required><?= htmlspecialchars($event['description']) ?></textarea><br><br>

    <label>Date:</label><br>
    <input type="date" name="event_date" value="<?= htmlspecialchars($event['event_date']) ?>" required><br><br>

    <label>Status:</label><br>
    <select name="status">
        <option value="upcoming" <?= $event['status'] == 'upcoming' ? 'selected' : '' ?>>Upcoming</option>
        <option value="past" <?= $event['status'] == 'past' ? 'selected' : '' ?>>Past</option>
        <option value="cancelled" <?= $event['status'] == 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
    </select><br><br>

    <button type="submit">Update Event</button>
</form>
