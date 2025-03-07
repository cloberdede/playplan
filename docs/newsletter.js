document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('email-form');
    const formulaireContent = document.getElementById('formulaire-content');
    const remerciementContent = document.getElementById('remerciement-content');
    
    emailForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const emailInput = document.getElementById('email');
      const emailValue = emailInput.value.trim();
      
      // Vérification simple de l'email
      if (emailValue && emailValue.includes('@') && emailValue.includes('.')) {
        // Cacher le formulaire et afficher le message de remerciement
        formulaireContent.classList.add('hidden');
        remerciementContent.classList.remove('hidden');
        
        // Ici, vous pourriez ajouter du code pour envoyer l'email au serveur
        // Par exemple : fetch('/api/send-case-study', { method: 'POST', body: JSON.stringify({ email: emailValue }) })
      } else {
        // Indiquer une erreur si l'email n'est pas valide
        emailInput.classList.add('ring-2', 'ring-red-500');
        
        // Remettre le style normal après 2 secondes
        setTimeout(function() {
          emailInput.classList.remove('ring-2', 'ring-red-500');
        }, 2000);
      }
    });
  });