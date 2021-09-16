export interface Donation {
  donationId: string;
  name: string;
  amount: number;
  message?: string;
  donatedAt: Date | string;
}
