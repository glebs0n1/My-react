const API_URL = "http://localhost:18090/api/pets";

export interface PetPayload {
  name: string;
  description: string;
  category: string;
  city: string;
  age: number;
  gender: string;
  vaccinated: boolean;
}

export const createPet = async (payload: PetPayload) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create pet");
  }

  return res.json();
};

export const getPets = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch pets");
  }
  return res.json();
};