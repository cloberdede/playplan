import { GoogleGenerativeAI } from "@google/generative-ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import PptxGenJS from "pptxgenjs";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, AlignmentType  } from "docx";


const genAI = new GoogleGenerativeAI("AIzaSyDTAIOPj7PPTg57TJg5FJeti7E5hhdJAv8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const button = document.getElementById('send-prompt');
const responseElement = document.getElementById('affichage');
const userPromptInput = document.getElementById('user-prompt');

let generatedActivities = [];


//test API En Bas
button.addEventListener('click', function() {
  const prompt = userPromptInput.value;
  if (prompt) {
    model.generateContent(prompt).then(function(result) {
      const output = result.response.text();
      responseElement.textContent = output;
    }).catch(function(error) {
      responseElement.textContent = 'Error: ' + error.message;
    });
  } else {
    responseElement.textContent = 'Please enter a prompt.';
  }
});



//Vrai projet
const genererButton = document.getElementById('generer');
const responseElementPlanning = document.getElementById('affichagePlanning');

function generateMaterialList() {
  const materials = [
    { id: "checkTubeCarton", name: "Tubes en carton" },
    { id: "checkMaterial2", name: "Material 2" },
    { id: "checkMaterial3", name: "Material 3" },
    { id: "checkMaterial4", name: "Material 4" },
    { id: "checkMaterial5", name: "Material 5" },
    { id: "checkMaterial6", name: "Material 6" },
    { id: "checkMaterial7", name: "Material 7" },
    { id: "checkMaterial8", name: "Material 8" },
    { id: "checkMaterial9", name: "Material 9" }
  ];

  return materials
    .filter(material => document.getElementById(material.id)?.checked)
    .map(material => material.name)
    .join(", ");
}

genererButton.addEventListener('click', async function () {
  const checkboxPlanningHebdo = document.getElementById('sortiePlanningHebdo');

  if (checkboxPlanningHebdo.checked) {
    
    const themeInput = document.getElementById('theme');
    const materialList = generateMaterialList();
    const prefSpe = document.getElementById('preferencesSpe');

    const userPromptInputPlanning = `Génère une liste de noms pour deux activités par demi-journée (soit 4 activités par jour) pour chaque jour de la semaine.
Cela fait un total de 20 activités, y compris celles que je te donne.

Chaque activité doit être unique : aucune répétition.
Les activités doivent être adaptées aux éléments suivants :
Thème de la semaine : ${themeInput.value}
Nombre d’enfants : 12 le matin, 9 l’après-midi
Matériel disponible : ${materialList} + matériel classique de maternelle
Détails spécifiques de la semaine : ${prefSpe.value}
Dans chaque demi-journée, inclure une activité parmi : Éveil par le Conte, Jardinage, Gym.
Respecter cet équilibre :
Première activité : motricité fine
Deuxième activité : motricité globale
Les noms doivent être courts (24 caractères max), engageants et adaptés aux enfants de 1 à 3 ans.
Tonalité : ludique, poétique, évocatrice, qui capte l’attention des enfants et des parents.
Format de sortie strict : [Activité 1], [Activité 2], ..., [Activité 20].
Pas de commentaires, pas de descriptions.
Varier l’ordre des activités à chaque génération pour éviter toute routine prévisible.
`;

    const prompt = userPromptInputPlanning;
    if (prompt) {
      model.generateContent(prompt).then(async function (result) {
        const output = result.response.text();
        responseElementPlanning.textContent = output;
        generatedActivities = output.split(',')
        .map(act => act.trim().replace(/\[|\]/g, ''));

        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        const image = new Image();
        image.src = 'PlanningBlanc.jpg';

        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          ctx.font = "bold 18px Roboto";
          ctx.fillStyle = "rgba(144,113,88,255)";
          const coordinates = [
            { x: 60, y: 670 }, { x: 60, y: 720 }, { x: 60, y: 880 }, { x: 60, y: 940 },
            { x: 350, y: 670 }, { x: 350, y: 720 }, { x: 350, y: 880 }, { x: 350, y: 940 },
            { x: 610, y: 670 }, { x: 610, y: 720 }, { x: 610, y: 880 }, { x: 610, y: 940 },
            { x: 870, y: 670 }, { x: 870, y: 720 }, { x: 870, y: 880 }, { x: 870, y: 940 },
            { x: 1100, y: 670 }, { x: 1100, y: 720 }, { x: 1100, y: 880 }, { x: 1100, y: 940 }
          ];

          generatedActivities.forEach((activity, index) => {
            if (coordinates[index]) {
              ctx.fillText(activity, coordinates[index].x, coordinates[index].y);
            }
          });

          const modifiedImage = canvas.toDataURL("image/jpeg");
          const a = document.createElement("a");
          a.href = modifiedImage;
          a.download = "PlanningModifie.jpg";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);



          //#region Tutoriel équipe
          const activitésFixes = ["Eveil par le Conte", "Gym", "Jardinage"];

          const activitésAvecTutoriel = generatedActivities.filter(act => !activitésFixes.includes(act)).join(', ');
          
          const userPromptInputTutoriel = `In French, generate a tutorial I will give to my staff. 
          This tutorial is meant to help my staff know how to execute one activity with the children in a kindergarten. 
          Write the tutorial for the following activity: ${activitésAvecTutoriel}.  
          Do not under any circumstance write a tutorial for these activities: Eveil par le Conte, Gym, Jardinage. 
          
          The tutorial must strictly follow this exact format:
          
          Titre: XXX  (saut de 2 lignes)  
          
          Objectifs: XXX  (saut de 2 lignes)  
          
          01 Matériel nécessaire:  
          XXX  (saut de 2 lignes)  
          
          02 Déroulement de l’activité:  
                    
          - Introduction (5min) : XXX  
          - Activité (20min) : XXX  
          - Fin (5min) : XXX (saut de 2 lignes)  
          
          03 Conseils pour le bon déroulement de l’activité:  
          - Introduction (5min) : XXX  
          - Activité (20min) : XXX  
          - Fin (5min) : XXX  
          
          Write the tutorial knowing that it will be formatted in Poppins font, size 11, and must fit on a single A4 page.  
          Take into account the number of characters to ensure readability and space efficiency.  
          Use simple, clear, and professional language that is easy for kindergarten teachers to follow.
          Do not under any circumstance talk about anything other than the tutorial, you should never add any comments.`;
                              
              
          const promptTuto = userPromptInputTutoriel;

          
          model.generateContent(promptTuto).then(async function (resultTuto) {        
            const outputTuto = resultTuto.response.text();
        
            // Nettoyage des lignes
            const lines = outputTuto.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        
            // Extraction des sections
            const titleIndex = lines.findIndex(line => line.startsWith("Titre:"));
            const objectivesIndex = lines.findIndex(line => line.startsWith("Objectifs:"));
            const materialsIndex = lines.findIndex(line => line.startsWith("01 Matériel nécessaire:"));
            const stepsIndex = lines.findIndex(line => line.startsWith("02 Déroulement de l’activité:"));
            const adviceIndex = lines.findIndex(line => line.startsWith("03 Conseils pour le bon déroulement de l’activité:"));
        
            const title = titleIndex !== -1 ? lines[titleIndex].replace("Titre: ", "").trim() : "Titre Inconnu";
            const objectives = objectivesIndex !== -1 && materialsIndex !== -1 ? lines.slice(objectivesIndex + 1, materialsIndex).join("\n") : "Non spécifié";
            const materials = materialsIndex !== -1 && stepsIndex !== -1 ? lines.slice(materialsIndex + 1, stepsIndex).join("\n") : "Non spécifié";
            const steps = stepsIndex !== -1 && adviceIndex !== -1 ? lines.slice(stepsIndex + 1, adviceIndex).join("\n") : "Non spécifié";
            const advice = adviceIndex !== -1 ? lines.slice(adviceIndex + 1).join("\n") : "Non spécifié";
        
            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            // Titre
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: title,
                                        bold: true,
                                        size: 34,
                                        font: "Poppins",
                                    }),
                                ],
                            }),
                            new Paragraph({}), // Saut de ligne
        
                            // Objectifs
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Objectifs: ",
                                        bold: true,
                                        size: 22,
                                        font: "Poppins",
                                    }),
                                ],
                            }),
                            ...objectives.split("\n").map(line =>
                                new Paragraph({
                                    children: [new TextRun({ text: line, size: 22, font: "Poppins" })],
                                })
                            ),
                            new Paragraph({}), new Paragraph({}), new Paragraph({}),
                            
                            // Matériel nécessaire
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "01 Matériel nécessaire: ",
                                        bold: true,
                                        size: 22,
                                        font: "Poppins",
                                    }),
                                ],
                            }),
                            ...materials.split("\n").map(line =>
                                new Paragraph({
                                    children: [new TextRun({ text: line, size: 22, font: "Poppins" })],
                                })
                            ),
                            new Paragraph({}), // Saut de ligne
        
                            // Déroulement
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "02 Déroulement de l’activité: ",
                                        bold: true,
                                        size: 22,
                                        font: "Poppins",
                                    }),
                                ],
                            }),
                            ...steps.split("\n").map(line =>
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: line.includes("Introduction") || line.includes("Exécution") || line.includes("Fin")
                                                ? line.split(":")[0] + ":" 
                                                : line,
                                            bold: line.includes("Introduction") || line.includes("Exécution") || line.includes("Fin"),
                                            size: 22,
                                            font: "Poppins",
                                        }),
                                        ...(line.includes(":") ? [new TextRun({ text: " " + line.split(":").slice(1).join(":"), size: 22, font: "Poppins" })] : [])
                                    ],
                                })
                            ),
                            new Paragraph({}), // Saut de ligne
        
                            // Conseils
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "03 Conseils pour le bon déroulement de l’activité:",
                                        bold: true,
                                        size: 22,
                                        font: "Poppins",
                                    }),
                                ],
                            }),
                            ...advice.split("\n").map(line =>
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: line.includes("Introduction") || line.includes("Activité") || line.includes("Fin")
                                                ? line.split(":")[0] + ":" 
                                                : line,
                                            bold: line.includes("Introduction") || line.includes("Activité") || line.includes("Fin"),
                                            size: 22,
                                            font: "Poppins",
                                        }),
                                        ...(line.includes(":") ? [new TextRun({ text: " " + line.split(":").slice(1).join(":"), size: 22, font: "Poppins" })] : [])
                                    ],
                                })
                            ),
                        ],
                    },
                ],
            });
        
            // Générer et télécharger le document Word
            Packer.toBlob(doc).then((blob) => {
                saveAs(blob, "TutorielActivité.docx");
            });
        }).catch(function (error) {
            responseElementPlanning.textContent = 'Error: ' + error.message;
        });
                      
        //#endregion  
                






        

      };

        image.onerror = function() {
          console.error("Error loading the image.");
          responseElementPlanning.textContent = 'Error: Image could not be loaded.';
        };

      }).catch(function (error) {
        responseElementPlanning.textContent = 'Error: ' + error.message;
      });
    } else {
      responseElementPlanning.textContent = 'Please enter a prompt.';
    }
  }


});
