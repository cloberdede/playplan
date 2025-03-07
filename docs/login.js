document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire pour effectuer la vérification

    // Récupérer les valeurs du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Mot de passe prédéfini pour la vérification
    const correctPassword = "123";  // Remplace par le mot de passe correct
    const correctEmail = "123@123.fr";  // Remplace par l'email correct (si nécessaire)

    // Vérification du mot de passe et de l'email
    if (email === correctEmail && password === correctPassword) {
        // Si les informations sont correctes, rediriger vers la page protégée
        window.location.href = 'backend.html'; // Remplace par l'URL de la page protégée
    } else {
        // Si incorrect, afficher un message d'erreur
        alert("Identifiants incorrects !");
    }
});
