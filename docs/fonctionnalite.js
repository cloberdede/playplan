document.addEventListener('DOMContentLoaded', function() {
  // Récupérer tous les boutons et sections
  const buttons = document.querySelectorAll('[id^="btn-fonctionnalite-"]');
  const sections = document.querySelectorAll('.feature-section');
  
  // Fonction pour activer un bouton et changer le texte en blanc
  function activateButton(buttonId) {
    // Désactiver tous les boutons et réinitialiser leur couleur de texte
    buttons.forEach(btn => {
      btn.classList.remove('active-button');
      btn.querySelector('p').classList.remove('text-white'); // Retirer la classe "text-white" des autres boutons
    });
    
    // Activer le bouton spécifié et changer la couleur du texte en blanc
    const button = document.getElementById(buttonId);
    button.classList.add('active-button');
    button.querySelector('p').classList.add('text-white'); // Ajouter la classe "text-white" au texte du bouton cliqué
  }
  
  // Navigation au clic
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
      
      activateButton(this.id); // Activer le bouton lors du clic
    });
  });
  
  // Observer les sections pour le défilement
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const buttonId = 'btn-' + sectionId;
        activateButton(buttonId); // Activer le bouton lorsque la section est visible
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px', // Ajuster la marge pour détecter quand la section est réellement visible
    threshold: 0
  });
  
  // Observer chaque section
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Activer le premier bouton par défaut si nécessaire
  activateButton('btn-fonctionnalite-1');
});
