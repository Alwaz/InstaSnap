import { INewPost, INewUser, IUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";

// =====> AUTH APIS
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
      imgUrl: avatarUrl,
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

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw Error;
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw Error;
    }
    return currentUser.documents[0];
  } catch (error) {
    return error;
  }
}

export async function logout() {
  try {
    const session = account.deleteSession("current");
    return session;
  } catch (error) {
    return error;
  }
}

// ====> POST APIS
export const createPost = async (post: INewPost) => {
  try {
    // upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;
    // get the file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    // Convert tags into array (ill be storing em in array)
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // create new post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imgUrl: uploadedFile.$id,
        location: post.location,
        tags,
      }
    );
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    return error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    return error;
  }
};

export const getFilePreview = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    return error;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: "ok" };
  } catch (error) {
    return error;
  }
};
