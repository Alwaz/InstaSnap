import { INewUser, IUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
  const { name, email, password } = user;
  try {
    // Creating new user after auth
    const newAccount = await account.create(ID.unique(), email, password, name);

    // if no account throw error
    if (!newAccount) {
      throw Error;
    }

    const avatarUrl = avatars.getInitials(user?.name);

    // Saving user to db
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.name,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.error("Error occurred while creating user ", error);
    return error;
  }
}

export async function saveUserToDB(user: IUser) {
  try {
    // save user to db
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.error("Something went wrong while saving user to DB: ", error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.error(error);
  }
}
