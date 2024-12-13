import { savePet } from './petStorage.js';

const speciesPersonalities = {
   cat: { anger: 3, happiness: 7, sadness: 2 },
   unicorn: { anger: 1, happiness: 9, sadness: 1 },
   dragon: { anger: 8, happiness: 6, sadness: 3 }
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
      const { anger, happiness, sadness } = speciesPersonalities[species];
      document.getElementById("anger").value = anger;
      document.getElementById("happiness").value = happiness;
      document.getElementById("sadness").value = sadness;
   }
}

function createPet() {
   const petName = document.getElementById("petName").value;
   const nickname = document.getElementById("nickname").value;
   const pronouns = document.querySelector("input[name='pronouns']:checked")?.value;
   const species = document.querySelector("input[name='species']:checked")?.value;

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

   window.location.href = "index.html";
}

document.querySelectorAll("input[name='species']").forEach(radio => {
   radio.addEventListener("change", (event) => {
      updatePersonality(event.target.value);
   });
});


document.getElementById("petForm").addEventListener("submit", function(event) {
   event.preventDefault();
   createPet();
});