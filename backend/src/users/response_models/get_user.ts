export class GetUserResponseModel {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  imageUrl?: string | null;
}
