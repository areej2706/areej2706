<?php
session_start();
$conn = new mysqli("localhost", "root", "", "event_manager");

if (isset($_POST['login'])) {
  $email = $_POST['email'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM users WHERE email='$email'";
  $result = $conn->query($sql);

  if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['name'] = $user['name'];
      $_SESSION['role'] = $user['role'];
      $_SESSION['community_id'] = $user['community_id'];

      // Redirect to dashboard (you can create this later)
      header("Location: dashboard.php");
      exit;
    } else {
      $error = "❌ Incorrect password.";
    }
  } else {
    $error = "❌ User not found.";
  }
}
?>

<?php include("header.php"); ?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login - Community Event Manager</title>
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

    .login-box {
      background-color: #162c59;
      padding: 30px 40px;
      border-radius: 10px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .login-box h2 {
      text-align: center;
      margin-bottom: 25px;
    }

    .login-box input,
    .login-box button {
      width: 100%;
      padding: 10px 12px;
      margin-bottom: 15px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
    }

    .login-box input {
      background-color: #eaeaea;
    }

    .login-box button {
      background-color: #00bfa6;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .login-box button:hover {
      background-color: #00a38c;
    }

    .login-box .message {
      text-align: center;
      font-size: 14px;
    }

    .login-box .link {
      text-align: center;
      font-size: 14px;
    }

    .login-box .link a {
      color: #00e5d2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>Login</h2>
    <form action="login.php" method="POST">
      <input type="email" name="email" placeholder="Email Address" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit" name="login">Login</button>
    </form>

    <?php if (isset($error)) echo "<div class='message'>$error</div>"; ?>

    <div class="link">Don't have an account? <a href="register.php">Register</a></div>
  </div>
</body>
</html>
