export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  accountId?: string;
  email: string;
  username?: string;
  name: string;
  imgUrl?: URL;
  bio: string;
}

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
