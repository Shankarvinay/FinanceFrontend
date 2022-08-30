export interface UserCardDetails {
  cardNumber: string;
  cardStatus: string;
  isActivated: boolean;
  bankName: string;
  cardType: string;
  remainingAmount: number;
  totalCredits: number;
  initialCredits: number;
  amountSpent: number;
  validity: string;
  savingsAccountNumber: string;
  fullname: string;
}

export interface orderHistory {
  orderId: string;
  userid: string;
  emiInitialDate: Date;
  emiAmount: number;
  amountPaid: number;
  totalAmount: number;
  emiCreatedAt: Date;
  orerCreatedAt: Date;
  remainingBalance: number;
  isEmiCompleted: boolean;
  emiPeriod: number;
  emiNextDate: Date;
  productId: number;
  productName: string;
  transactionId: string;
  productImg: string;
  emiId: string;
}

export interface TransactionHistory {
  transactionId: string;
  userId: string;
  tansactionStatus: string;
  amountPaid: number;
  transactionDate: Date;
  productName: string;
  productId: number;
}

export interface UserDashboardModel {
  userCardDetails: UserCardDetails;
  orderHistory: orderHistory[];
  transactionHistory: TransactionHistory[];
}
