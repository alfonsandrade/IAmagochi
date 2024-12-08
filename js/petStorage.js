export function savePet(pet) {
    localStorage.setItem("pet", JSON.stringify(pet));
    console.log("Pet saved!");
}

export function loadPet() {
    const savedPet = localStorage.getItem("pet");
    if (savedPet) {
        const pet = JSON.parse(savedPet);
        console.log("Loaded Pet:", pet);
        return pet;
    } else {
        console.log("No pet found.");
        return null;
    }
}