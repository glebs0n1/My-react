export interface BankAccount {
  bank: string;
  iban?: string;
  swift?: string;
  address?: string;
}

export interface DonationInfo {
  organizationName?: string;
  organizationCode?: string;
  address?: string;
  email?: string;
  phone?: string;
  banks?: BankAccount[];
  payseraLink?: string;
  paypal?: string;
}
