export interface AdminList {
  fullName: string;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber?: any;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: any;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface UserList {
  userid: string;
  username: string;
  email: string;
  phoneNumber: string;
  isActivated: boolean;
  fullName: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface UserData {
  adminList: AdminList[];
  userList: UserList[];
  totalUsers: number;
  adminUser: number;
  userCount: number;
  deactivatedAccount: number;
}
