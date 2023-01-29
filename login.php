<?php
    $email = $_POST['email'];
    $password = $_POST['password'];
    // Vérifiez les informations d'identification avec la base de données
    if (login_is_valid($email, $password)) {
        // Démarrez une session pour l'utilisateur
        session_start();
        $_SESSION['logged_in'] = true;
        $_SESSION['email'] = $email;
        // Redirigez l'utilisateur vers la page protégée
        header("Location: protected.php");
    } else {
        // Affichez un message d'erreur
        echo "Les informations d'identification sont incorrectes.";
    }
?>
