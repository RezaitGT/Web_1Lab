// Формат данных соответствует https://dummyjson.com/users (часть полей)
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female" | "other";
  email: string;
  phone: string;
  username: string;
  company: { name: string; title: string };
  address: { city: string; country: string };
}

export type UserDraft = Omit<User, "id">;
