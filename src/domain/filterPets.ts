import { Pet } from "../types/Pet";
import { PetCategory, getPetCategory } from "./petCategories";

interface Filters {
  species?: string;
  city?: string;
  age?: string;
  gender?: string;
  size?: string;
  breed?: string;
}

interface FilterParams {
  pets: Pet[];
  searchQuery?: string;
  filters?: Filters;
  category?: PetCategory;
}

export const filterPets = ({
  pets,
  searchQuery = "",
  filters,
  category,
}: FilterParams): Pet[] => {
  return pets.filter((pet) => {
    // Filter by category (dogs/cats/other)
    if (category && getPetCategory(pet) !== category) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !pet.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by other filters
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;
        if (pet[key as keyof Pet] !== value) return false;
      }
    }

    return true;
  });
};