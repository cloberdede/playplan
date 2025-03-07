// Sélection des sliders
const employeesSlider = document.getElementById('employees');
const salarySlider = document.getElementById('salary');
const establishmentsSlider = document.getElementById('establishments');

// Éléments d'affichage des valeurs
const employeesValue = document.getElementById('employees-value');
const salaryValue = document.getElementById('salary-value');
const establishmentsValue = document.getElementById('establishments-value');

// Éléments de résultat
const timeSaved = document.getElementById('time-saved');
const moneySaved = document.getElementById('money-saved');

// Options d'abonnement
const subscriptionBasic = document.getElementById('subscription-basic');
const subscriptionAdvanced = document.getElementById('subscription-advanced');

// Nombre de semaines travaillées par an
const WORK_WEEKS = 47;

// Mise à jour des valeurs affichées
function updateDisplayValues() {
  employeesValue.textContent = employeesSlider.value;
  salaryValue.textContent = formatNumber(salarySlider.value);
  establishmentsValue.textContent = establishmentsSlider.value;
}

// Calcul des économies
function calculateSavings() {
  // Récupérer les valeurs
  const employees = parseInt(employeesSlider.value);
  const salary = parseInt(salarySlider.value);
  const establishments = parseInt(establishmentsSlider.value);
  
  // Temps fixe en heures/semaine (puisque nous avons supprimé ces inputs)
  const currentTime = 8; // Valeur par défaut pour le temps actuel
  const newTime = 3;     // Valeur par défaut avec notre solution
  
  // Calcul des heures économisées
  const hoursPerWeek = (currentTime - newTime) * employees;
  const hoursPerYear = hoursPerWeek * WORK_WEEKS * establishments;
  
  // Calcul du coût horaire
  const hourlyCost = salary / (35 * 4);
  
  // Calcul des économies financières
  const annualSavings = hoursPerYear * hourlyCost;
  
  // Affichage des résultats
  timeSaved.textContent = formatNumber(Math.round(hoursPerYear));
  moneySaved.textContent = formatNumber(Math.round(annualSavings));
}

// Formater les nombres avec séparateur de milliers
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Initialisation
updateDisplayValues();
calculateSavings();

// Écouteurs d'événements pour les sliders
employeesSlider.addEventListener('input', function() {
  updateDisplayValues();
  calculateSavings();
});

salarySlider.addEventListener('input', function() {
  updateDisplayValues();
  calculateSavings();
});

establishmentsSlider.addEventListener('input', function() {
  updateDisplayValues();
  calculateSavings();
});

// Écouteurs d'événements pour les boutons radio d'abonnement
subscriptionBasic.addEventListener('change', calculateSavings);
subscriptionAdvanced.addEventListener('change', calculateSavings);

// Fonction pour gérer l'accordéon si nécessaire (conservation du code original)





