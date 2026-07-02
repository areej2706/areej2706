<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userName'])) {
    include 'db_connection.php';

    $name = mysqli_real_escape_string($conn, $_POST['userName']);
    $email = mysqli_real_escape_string($conn, $_POST['userEmail']);
    $rsvp = mysqli_real_escape_string($conn, $_POST['rsvpStatus']);
    $event_id = intval($_POST['event_id']);

    // You can set the user_id from session or leave as NULL if guest
    $user_id = isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : 'NULL';
    
    $booking_date = date('Y-m-d H:i:s');
    $status = 'pending'; // or 'confirmed', depends on your system

    $sql = "INSERT INTO bookings (event_id, user_id, booking_date, status, rsvp_status, user_name, user_email)
            VALUES ('$event_id', $user_id, '$booking_date', '$status', '$rsvp', '$name', '$email')";

    if ($conn->query($sql)) {
        echo "<script>alert('RSVP submitted successfully!'); window.location.href = window.location.href;</script>";
    } else {
        echo "<script>alert('Error saving RSVP: " . $conn->error . "');</script>";
    }
}



include 'db_connection.php'; // your DB connection
$sql = "SELECT * FROM events WHERE status = 'active' ORDER BY event_date ASC";
$result = $conn->query($sql);
?>

<?php include("header.php"); ?>


<!DOCTYPE html>
<html>
<head>
    <style>

        body {
            background-color: #0C1D3C;
        }
        .event-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 20px;
            padding: 50px;
            margin-top: 40px;
        }
        .event-card {
            border: 1px solid #ccc;
            border-radius: 12px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .event-card img {
            width: 100%;
            height: 310px;
            object-fit: cover;
        }
        .event-content {
            padding: 15px;
        }
        .event-title {
            font-size: 20px;
            font-weight: bold;
            color: #0c1d3c;
        }
        .event-description {
            margin: 10px 0;
            font-size: 14px;
            color: #0c1d3c;
        }
        .event-meta {
            font-size: 13px;
            color: #555;
            margin-bottom: 10px;
        }
        .event-date {
            color: #007bff;
            font-weight: bold;
            padding-top: 10px;
        }
        .book-btn {
            display: inline-block;
            padding: 8px 15px;
            background: #0099A9;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 10px;
        }

        .popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(12, 29, 60, 0.8); /* semi-transparent dark */
  display: none; /* hidden by default */
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Show popup */
.popup-overlay.active {
  display: flex;
}

/* Popup Form Container */
.popup-form {
  background-color: #1E3A70;
  padding: 30px 25px;
  width: 400px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  color: #fff;
  font-family: Arial, sans-serif;
  position: relative;
}

/* Popup Title */
.popup-form h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #00bfa6;
  text-align: center;
  font-weight: 700;
}

/* Labels */
.popup-form label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 14px;
}

/* Inputs & textarea */
.popup-form input[type="text"],
.popup-form input[type="email"],
.popup-form select,
.popup-form textarea {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 18px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-family: Arial, sans-serif;
  resize: vertical;
  background-color: #294a8f;
  color: #fff;
}

.popup-form textarea {
  min-height: 70px;
  max-height: 120px;
}

/* Buttons */
.popup-form button {
  width: 100%;
  padding: 12px;
  background-color: #00bfa6;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup-form button:hover {
  background-color: #009a87;
}

/* Close Button */
.popup-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #00bfa6;
  cursor: pointer;
  font-weight: bold;
  line-height: 1;
}

.popup-close:hover {
  color: #009a87;
}
    </style>
</head>
<body>

    <div style="margin-top: 150px; font-size: 34px;">    <h2 style="text-align:center;">Upcoming Events</h2>
</div>
    <div class="event-grid">
        <?php while ($row = $result->fetch_assoc()): ?>
            <div class="event-card">
                <img src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['title']) ?>">
                <div class="event-content">
                    <div class="event-title"><?= htmlspecialchars($row['title']) ?></div>
                    <div class="event-description"><?= htmlspecialchars($row['description']) ?></div>
                    <div class="event-meta">
                        <div>📍 <?= htmlspecialchars($row['location']) ?></div>
                        <div class="event-date">📅 <?= date('F j, Y', strtotime($row['event_date'])) ?></div>
                    </div>
<button class="book-btn" data-event-id="<?= $row['id'] ?>">Book Now</button>

                </div>
            </div>
        <?php endwhile; ?>
    </div>

 
    <div id="bookingPopup" class="popup-overlay">
<form class="popup-form" id="bookingForm" method="post" action="submit_booking.php">
  <h3>Book Event</h3>

  <input type="hidden" id="event_id" name="event_id">

  <label for="userName">Name</label>
  <input type="text" id="userName" name="user_name" required>

  <label for="userEmail">Email</label>
  <input type="email" id="userEmail" name="user_email" required>

  <label for="rsvpStatus">Are you attending?</label>
  <select id="rsvpStatus" name="rsvp_status" required>
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
    <option value="Maybe">Maybe</option>
  </select>

  <button type="submit">Submit RSVP</button>
</form>
</div>
</div>

</body>
</html>

<script>
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const eventId = btn.getAttribute('data-event-id');
    document.getElementById('event_id').value = eventId;

    <?php if (isset($_SESSION['name'])): ?>
    document.getElementById('userName').value = "<?= addslashes($_SESSION['name']) ?>";
    <?php endif; ?>
    <?php if (isset($_SESSION['email'])): ?>
    document.getElementById('userEmail').value = "<?= addslashes($_SESSION['email']) ?>";
    <?php endif; ?>

    document.getElementById('bookingPopup').classList.add('active');
  });
});

function closePopup() {
  document.getElementById('bookingPopup').classList.remove('active');
}
</script>



