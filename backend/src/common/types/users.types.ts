export type UserExists = {
  password: string;
  userId: number;
};

export type UserPayload = {
  userId: number;
  iat: number;
  exp: number;
};

export type User = {
  userId: number;
  email: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  avatar: string | null;
  role_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
};
