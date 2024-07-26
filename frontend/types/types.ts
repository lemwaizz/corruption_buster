export interface User {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  imageUrl?: string | null;
}
export interface VerifyIdTokenResponse {}
