export interface Data {
  userid: string;
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  userAddress: string;
  bankname: string;
  branch: string;
  ifscCode: string;
  accountNumber: string;
  cardType: string;
  remainingBalance: number;
  amountSpent: number;
  cardNumber: string;
  cardStatus: string;
  validity: string;
  isActivated: boolean;
  isVerified: boolean;
  joiningFees: boolean;
  createdAt: Date;
  totalCredit: number;
  role: string;
  bankId: number;
}

export interface UserDetailsModel {
  data: Data;
}
