import { Pet } from "../types/Pet";

export type PetCategory = "dogs" | "cats" | "other";

export const getPetCategory = (pet: Pet): PetCategory => {
  const species = pet.species?.toLowerCase() || "";

  if (species.includes("šuo") || species.includes("dog")) {
    return "dogs";
  }

  if (
    species.includes("katė") ||
    species.includes("kate") ||
    species.includes("cat")
  ) {
    return "cats";
  }

  return "other";
};

export const getCategoryLabel = (category: PetCategory): string => {
  const labels: Record<PetCategory, string> = {
    dogs: "Dogs",
    cats: "Cats",
    other: "Other Pets",
  };

  return labels[category];
};