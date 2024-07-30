export interface User {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  imageUrl?: string | null;
}
export interface VerifyIdTokenResponse {}

export interface ReachOutToUs {
  userName: string;
  email: string;
  message: string;
}

export interface Politician {
  id: string;
  name: string;
  description: string;
  politicalCategory: {
    name: string;
  }[];
  imageUrl: string;
}
