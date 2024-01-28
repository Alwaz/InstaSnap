import { INewUser } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
  const { name, email, password } = user;
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    return newAccount;
  } catch (error) {
    console.error("Error occured while creating user ", error);
    return error;
  }
}
