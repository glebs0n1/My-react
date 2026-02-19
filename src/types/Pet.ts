import { DonationInfo } from "./DonationInfo";

export interface Pet {
  id: string | number; 
  slug: string;

  name: string;
  image: string;
  images: string[];

  species?: string;
  breed?: string;
  age?: string;
  gender?: string;
  size?: string;
  city?: string;

  description?: string;
  traits?: string[];

  sterilized?: boolean;
  vaccinated?: boolean;
  chipped?: boolean;

  medicalInfo: string[];

  source:
    | "lese"
    | "beglobis"
    | "linksmosiospedutes"
    | "mazasdraugas"
    | "penktakoja"
    | "grinda";

  profileUrl?: string;
  donationInfo?: DonationInfo;
}