// src/types/training.ts

export interface Price {
    service?: string;
    program?: string;
    serive_for?: string;
    price: string;
    duration: string;
  }
  
  export interface TrainingSchool {
    id: number;
    name: string;
    image: string;
    city: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description: string;
    tags: string[];
    prices: Price[];
    whyUs?: string;
    history?: string;
    registrationLink?: string;
  }