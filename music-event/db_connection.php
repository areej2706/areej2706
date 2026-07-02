<?php
$servername = "localhost";
$username = "root";
$password = "";   // empty password if default XAMPP setup
$dbname = "event_manager";  // or whatever your DB is called

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
