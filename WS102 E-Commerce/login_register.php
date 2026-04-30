<?php


session_start();
require_once "config.php";

if (isset($_POST['register'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $checkEmail = $conn->query("SELECT email FROM users WHERE email = '$email'");
    if ($checkEmail->num_rows > 0) {
        $_SESSION['signup-error'] = "Email already exists.";
        $_SESSION['active-form'] = "register";
    } else {
        $conn->query("INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')");
    }
    header("Location: index.php");
    exit();
}

if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $result = $conn->query("SELECT * FROM users WHERE email = '$email'");
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            
           if  ($user['role'] === 'admin') {
                ?>
                <script>
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userEmail', '<?php echo $user['email']; ?>');
                    localStorage.setItem('userName', '<?php echo $user['name']; ?>');
                    localStorage.setItem('userProfileImg', '<?php echo isset($user['Picture']) && $user['Picture'] ? $user['Picture'] : 'https://via.placeholder.com/150'; ?>');
                    localStorage.setItem('loginTime', new Date().toISOString());
                    window.location.href = 'WS_Ecommerce.html';
                </script>
                <?php
            } else {
                ?>
                <script>
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userEmail', '<?php echo $user['email']; ?>');
                    localStorage.setItem('userName', '<?php echo $user['name']; ?>');
                    localStorage.setItem('userProfileImg', '<?php echo isset($user['Picture']) && $user['Picture'] ? $user['Picture'] : 'https://via.placeholder.com/150'; ?>');
                    localStorage.setItem('loginTime', new Date().toISOString());
                    window.location.href = 'WS_Ecommerce.html';
                </script>
                <?php
             }
             exit(); 
         }
    }
}

$_SESSION['login_error'] = "Invalid email or password.";
$_SESSION['active-form'] = "login";
header("Location: index.php");
exit();
?>
