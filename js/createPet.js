import { savePet } from './petStorage.js';

const speciesPersonalities = {
   cat: { rage: 3, happiness: 7, sadness: 2 },
   unicorn: { rage: 1, happiness: 9, sadness: 1 },
   dragon: { rage: 8, happiness: 6, sadness: 3 }
};

const defaultAttributes = {
   level: 1,
   experience: 0,
   energy: 100, // contrário de sleepiness
   satiation: 100, // contrário de hunger
   excitement: 100, // contrário de boredom
}

function updatePersonality(species) {
   if (species && speciesPersonalities[species]) {
      const { rage, happiness, sadness } = speciesPersonalities[species];
      document.getElementById("rage").innerText = `${rage}/10`;
      document.getElementById("happiness").innerText = `${happiness}/10`;
      document.getElementById("sadness").innerText = `${sadness}/10`;
   }
}

function createPet() {
   const petName = document.getElementById("petName").value;
   const nickname = document.getElementById("nickname").value;
   const pronouns = document.querySelector("input[name='pronouns']:checked")?.value;
   const species = document.getElementById("species").value;

   if (!petName || !nickname || !pronouns || !species) {
      alert("Please fill in all fields.");
      return;
   }

   const personality = speciesPersonalities[species];

   const pet = {
      petName,
      nickname,
      pronouns,
      species,
      personality: personality,
      attributes: defaultAttributes
   }
   savePet(pet)

   console.log("Pet Created:", pet);
   alert(`Pet "${petName}" created successfully!`);
}

document.getElementById("species").addEventListener("change", (event) => {
   updatePersonality(event.target.value);
});

document.getElementById("petForm").addEventListener("submit", function(event) {
   event.preventDefault();
   createPet();
});