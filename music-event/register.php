<?php
// Backend logic at the top
$conn = new mysqli("localhost", "root", "", "event_manager");

if (isset($_POST['register'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $role = $_POST['role'];
  $community_name = $_POST['community'];

  // Check if community exists
  $check = $conn->query("SELECT id FROM communities WHERE name='$community_name'");
  if ($check->num_rows > 0) {
    $row = $check->fetch_assoc();
    $community_id = $row['id'];
  } else {
    $conn->query("INSERT INTO communities (name) VALUES ('$community_name')");
    $community_id = $conn->insert_id;
  }

  // Insert user
  $sql = "INSERT INTO users (name, email, password, role, community_id) 
          VALUES ('$name', '$email', '$password', '$role', '$community_id')";

  if ($conn->query($sql) === TRUE) {
    echo "<p>🎉 You have successfully registered! Redirecting to login page...</p>";
    header("refresh:3; url=login.php"); // Redirect after 3 seconds
    exit;
  }
}
?>

<?php include("header.php"); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Register - Community Event Manager</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #0C1D3C;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .register-box {
      background-color: #162c59;
      padding: 30px 40px;
      border-radius: 10px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .register-box h2 {
      text-align: center;
      margin-bottom: 25px;
    }

    .register-box input,
    .register-box select,
    .register-box button {
      width: 100%;
      padding: 10px 12px;
      margin-bottom: 15px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
    }

    .register-box input,
    .register-box select {
      background-color: #eaeaea;
    }

    .register-box button {
      background-color: #00bfa6;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .register-box button:hover {
      background-color: #00a38c;
    }

    .message {
      text-align: center;
      margin-top: 10px;
      font-size: 14px;
    }

    .link a {
      color: #00e5d2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="register-box">
    <h2>Register</h2>
    <form action="register.php" method="POST">
      <input type="text" name="name" placeholder="Full Name" required>
      <input type="email" name="email" placeholder="Email Address" required>
      <input type="password" name="password" placeholder="Password" required>

      <select name="role" required>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="organizer">Organizer</option>
        <option value="member">Member</option>
      </select>

      <input type="text" name="community" placeholder="Community Name" required>

      <button type="submit" name="register">Register</button>
    </form>

    <?php if (isset($message)) echo "<div class='message'>$message</div>"; ?>

    <div class="link">Already have an account? <a href="login.php">Login here</a></div>

  </div>
</body>
</html>