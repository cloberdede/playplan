const accordionButtons = document.querySelectorAll('.accordion-toggle');
if (accordionButtons.length > 0) {
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Trouver l'élément contenant le contenu de la question
      const content = this.nextElementSibling;

      // Si le contenu est déjà ouvert, on le ferme
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        // Ferme tous les autres contenus
        document.querySelectorAll('.accordion-content').forEach(item => {
          item.style.maxHeight = null;
        });

        // Ouvre la question cliquée
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

