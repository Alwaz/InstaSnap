export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  accountId: string;
  email: string;
  username?: string;
  name: string;
  imageUrl?: URL;
}
