<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

include('db_connection.php');

$user_id = $_SESSION['user_id'];
$name = $_SESSION['name'];
$role = $_SESSION['role'];
$community_id = $_SESSION['community_id'];

$message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['create_event']) && ($role === 'admin' || $role === 'organizer')) {
    $title = $conn->real_escape_string($_POST['title']);
    $description = $conn->real_escape_string($_POST['description']);
    $event_date = $_POST['event_date'];
    $location = $conn->real_escape_string($_POST['location']);

    $imagePath = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
        $imagePath = $uploadDir . $imageName;

        move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
    }

    $sql = "INSERT INTO events (community_id, created_by, title, description, event_date, location, image, status) 
            VALUES ('$community_id', '$user_id', '$title', '$description', '$event_date', '$location', '$imagePath', 'active')";

    if ($conn->query($sql) === TRUE) {
        $message = "✅ Event created successfully!";
    } else {
        $message = "❌ Error creating event: " . $conn->error;
    }
}
?>

<?php include("header.php"); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard - Community Event Manager</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    body {
      margin-top: 150px;
      font-family: Arial, sans-serif;
      background-color: #0C1D3C;
      color: #fff;
      padding: 30px;
    }

    .dashboard-box {
      background-color: #1E3A70;
      max-width: 900px;
      margin: auto;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
    }

    .card {
      background-color: #00bfa6;
      padding: 15px 20px;
      margin-bottom: 15px;
      border-radius: 8px;
      color: #fff;
    }

    .logout {
      text-align: right;
      margin-bottom: 20px;
    }

    .logout a {
      color: #fff;
      text-decoration: none;
      background: #e74c3c;
      padding: 8px 12px;
      border-radius: 5px;
      font-weight: bold;
    }

    .logout a:hover {
      background: #c0392b;
    }

    .tabs {
      margin-top: 20px;
    }

    .tab-buttons {
      display: flex;
      border-bottom: 2px solid #00bfa6;
      margin-bottom: 30px;
      cursor: pointer;
    }

    .tab-buttons button {
      flex: 1;
      background: #274a8c;
      border: none;
      padding: 15px 0;
      color: #ddd;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .tab-buttons button i {
      margin-right: 8px;
    }

    .tab-buttons button.active,
    .tab-buttons button:hover {
      background: #00bfa6;
      color: #fff;
    }

    .tab-content {
      background: #1E3A70;
      padding: 30px;
      border-radius: 0 10px 10px 10px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      min-height: 400px;
    }

    .tab-pane {
      display: none;
    }

    .tab-pane.active {
      display: block;
    }

    .event-form {
      max-width: 500px;
      margin: 0 auto;
      color: #fff;
      font-family: Arial, sans-serif;
    }

    .event-form label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    .event-form input[type="text"],
    .event-form textarea,
    .event-form input[type="date"],
    .event-form input[type="file"] {
      width: 100%;
      padding: 10px 12px;
      margin-bottom: 20px;
      border-radius: 6px;
      border: none;
      font-size: 16px;
      font-family: Arial, sans-serif;
    }

    .event-form textarea {
      resize: none;
      height: 80px;
      max-height: 100px;
    }

    .event-form button {
      width: 100%;
      padding: 12px;
      background-color: #00bfa6;
      border: none;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .event-form button:hover {
      background-color: #009a87;
    }

    .event-form p.message {
      text-align: center;
      font-size: 16px;
      margin-bottom: 15px;
      color: #0f0;
    }

    ul.event-list {
      list-style: none;
      padding-left: 0;
    }

    ul.event-list li {
      padding: 10px 15px;
      background-color: #274a8c;
      margin-bottom: 10px;
      border-radius: 8px;
    }

    table.bookings-table {
      width: 100%;
      border-collapse: collapse;
      color: #fff;
    }

    table.bookings-table th,
    table.bookings-table td {
      border: 1px solid #00bfa6;
      padding: 10px;
      text-align: left;
    }

    table.bookings-table th {
      background-color: #00bfa6;
      color: #000;
    }
  </style>
</head>
<body>
  <div class="dashboard-box">
    <div class="logout">
      <a href="logout.php">Logout</a>
    </div>

    <h2>Welcome, <?php echo htmlspecialchars($name); ?>!</h2>

    <div class="card">👤 You are logged in as <strong><?php echo ucfirst($role); ?></strong></div>

    <div class="tabs">
      <div class="tab-buttons">
        <?php if ($role === 'admin' || $role === 'organizer'): ?>
          <button class="tab-btn active" data-tab="create-event"><i class="fas fa-calendar-plus"></i>Create Event</button>
          <button class="tab-btn" data-tab="my-events"><i class="fas fa-calendar-check"></i>My Events</button>
        <?php endif; ?>

        <?php if ($role === 'admin'): ?>
          <button class="tab-btn" data-tab="bookings"><i class="fas fa-clipboard-list"></i>Bookings</button>
        <?php endif; ?>

        <?php if ($role === 'member'): ?>
          <button class="tab-btn active" data-tab="my-bookings"><i class="fas fa-ticket-alt"></i>My Bookings</button>
        <?php endif; ?>
      </div>

      <div class="tab-content">

        <!-- CREATE EVENT TAB -->
        <?php if ($role === 'admin' || $role === 'organizer'): ?>
        <div id="create-event" class="tab-pane active">
          <form class="event-form" method="POST" action="" enctype="multipart/form-data">
            <?php if ($message): ?>
              <p class="message"><?php echo htmlspecialchars($message); ?></p>
            <?php endif; ?>

            <label for="title">Event Title</label>
            <input type="text" id="title" name="title" required>

            <label for="description">Event Description (max 100 characters)</label>
            <textarea id="description" name="description" maxlength="100" required></textarea>

            <label for="location">Event Location</label>
            <input type="text" id="location" name="location" required>

            <label for="image">Event Image</label>
            <input type="file" id="image" name="image" accept="image/*">

            <label for="event_date">Event Date</label>
            <input type="date" id="event_date" name="event_date" required>

            <button type="submit" name="create_event">Create Event</button>
          </form>
        </div>
        <?php endif; ?>

        <!-- MY EVENTS TAB -->
        <!-- MY EVENTS TAB -->

<?php
// Before outputting anything:

$editing_event_id = null;
if (isset($_POST['edit_click'])) {
    $editing_event_id = (int)$_POST['edit_click'];
}
if (isset($_POST['cancel_edit'])) {
    $editing_event_id = null;
}
?>



<?php if ($role === 'admin' || $role === 'organizer'): ?>
<div id="my-events" class="tab-pane">
  <h3>Your Events</h3>

  <?php
  // Handle delete request
  if (isset($_POST['delete_event'])) {
      $del_event_id = (int)$_POST['delete_event'];
      // Optional: verify event belongs to user before deleting
      $check_sql = "SELECT * FROM events WHERE id = $del_event_id AND created_by = '$user_id'";
      $check_res = $conn->query($check_sql);
      if ($check_res && $check_res->num_rows > 0) {
          $conn->query("DELETE FROM events WHERE id = $del_event_id");
          echo "<p style='color: #0f0;'>Event deleted successfully.</p>";
      } else {
          echo "<p style='color: red;'>Unauthorized deletion attempt or event not found.</p>";
      }
  }

  // Handle update (edit) request
  if (isset($_POST['edit_event'])) {
      $edit_event_id = (int)$_POST['edit_event'];
      $title = $conn->real_escape_string($_POST['edit_title']);
      $description = $conn->real_escape_string($_POST['edit_description']);
      $location = $conn->real_escape_string($_POST['edit_location']);
      $event_date = $_POST['edit_event_date'];

      // Optional: verify event belongs to user before updating
      $check_sql = "SELECT * FROM events WHERE id = $edit_event_id AND created_by = '$user_id'";
      $check_res = $conn->query($check_sql);
      if ($check_res && $check_res->num_rows > 0) {
          $conn->query("UPDATE events SET title='$title', description='$description', location='$location', event_date='$event_date' WHERE id=$edit_event_id");
          echo "<p style='color: #0f0;'>Event updated successfully.</p>";
      } else {
          echo "<p style='color: red;'>Unauthorized update attempt or event not found.</p>";
      }
  }

  $sql = "SELECT * FROM events WHERE created_by = '$user_id' ORDER BY event_date ASC";
  $result = $conn->query($sql);

  if ($result && $result->num_rows > 0) {
      while ($event = $result->fetch_assoc()) {
          $event_id = $event['id'];

          // Check if this event is being edited
          $is_editing = ($editing_event_id === $event_id);
          if ($is_editing) {
              // Show edit form for this event
              ?>
              <form method="POST" action="" style="margin-bottom: 20px; background: #274a8c; padding: 15px; border-radius: 8px;">
                  <input type="hidden" name="edit_event" value="<?php echo $event_id; ?>">
                  <label><strong>Title:</strong></label><br>
                  <input type="text" name="edit_title" value="<?php echo htmlspecialchars($event['title']); ?>" required style="width: 100%; padding: 8px; margin-bottom: 10px;"><br>

                  <label><strong>Description:</strong></label><br>
                  <textarea name="edit_description" maxlength="100" required style="width: 100%; padding: 8px; margin-bottom: 10px;"><?php echo htmlspecialchars($event['description']); ?></textarea><br>

                  <label><strong>Location:</strong></label><br>
                  <input type="text" name="edit_location" value="<?php echo htmlspecialchars($event['location']); ?>" required style="width: 100%; padding: 8px; margin-bottom: 10px;"><br>

                  <label><strong>Event Date:</strong></label><br>
                  <input type="date" name="edit_event_date" value="<?php echo $event['event_date']; ?>" required style="padding: 8px; margin-bottom: 10px;"><br>

                  <button type="submit" style="background-color: #00bfa6; color: #fff; border: none; padding: 10px 20px; cursor: pointer;">Save</button>
                  <button type="submit" name="cancel_edit" value="1" style="background-color: #e74c3c; color: #fff; border: none; padding: 10px 20px; cursor: pointer; margin-left: 10px;">Cancel</button>
              </form>
              <?php
          } else {
              // Normal view with Edit/Delete buttons
              ?>
              <div style="background: #274a8c; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                  <strong><?php echo htmlspecialchars($event['title']); ?></strong><br>
                  <?php echo htmlspecialchars($event['description']); ?><br>
                  <em><?php echo htmlspecialchars($event['event_date']); ?> at <?php echo htmlspecialchars($event['location']); ?></em><br>
                  
                  <form method="POST" action="" style="margin-top: 10px; display: inline;">
                      <button name="edit_click" value="<?php echo $event_id; ?>" style="background-color: #00bfa6; color: #fff; border: none; padding: 8px 15px; cursor: pointer; border-radius: 5px; margin-right: 10px;">
                        <i class="fas fa-edit"></i> Edit
                      </button>
                  </form>

                  <form method="POST" action="" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this event?');">
                      <button name="delete_event" value="<?php echo $event_id; ?>" style="background-color: #e74c3c; color: #fff; border: none; padding: 8px 15px; cursor: pointer; border-radius: 5px;">
                        <i class="fas fa-trash-alt"></i> Delete
                      </button>
                  </form>
              </div>
              <?php
          }
      }
  } else {
      echo "<p>No events created yet.</p>";
  }
  ?>
</div>
<?php endif; ?>


        <!-- BOOKINGS TAB -->
        <?php if ($role === 'admin'): ?>
        <div id="bookings" class="tab-pane">
          <h3>Event Bookings</h3>
          <!-- your booking logic here -->
        </div>
        <?php endif; ?>

        <!-- MY BOOKINGS TAB FOR MEMBER -->
        <?php if ($role === 'member'): ?>
        <div id="my-bookings" class="tab-pane active">
          <h3>My Bookings</h3>
          <!-- your member bookings logic here -->
        </div>
        <?php endif; ?>

      </div>
    </div>
  </div>

  <script>
    const buttons = document.querySelectorAll(".tab-btn");
    const panes = document.querySelectorAll(".tab-pane");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab");

        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        panes.forEach(pane => {
          pane.classList.remove("active");
          if (pane.id === target) {
            pane.classList.add("active");
          }
        });
      });
    });
  </script>
</body>
</html>
