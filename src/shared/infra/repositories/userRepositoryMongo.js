import { User } from "../../domain/entities/user.js";
import { GENRES } from "../../domain/enums/genresEnum.js";
import { MongoClient } from "mongodb";
import { enviroments } from "../enviroments.js";

export class UserRepositoryMongo {
  constructor() {
    this.uri = enviroments.connectStr;
    this.client = new MongoClient(this.uri);
    this.db = client.db(enviroments.db_name);
    this.usersCollection = db.collection("users");
  }

  async createUser(user) {
    const newUser = this.usersCollection.insertOne({
      userId: user.userId,
      name: user.name,
      email: user.email,
      favoriteGenres: user.favoriteGenres,
      favoriteBook: user.favoriteBook,
    });

    return newUser;
  }

  async getUser(id) {
    const user = this.usersCollection.findOne({ userId: id });

    if (user) {
      return new User(
        user.userId,
        user.name,
        user.email,
        user.favoriteGenres,
        user.favoriteBook
      );
    }
    return null;
  }

  async deleteUser(id) {
    const user = this.usersCollection.deleteOne({ userId: id });

    if (user) {
      return new User(
        user.userId,
        user.name,
        user.email,
        user.favoriteGenres,
        user.favoriteBook
      );
    }
    return null;
  }

  async updateUser(
    userId,
    newName = null,
    newEmail = null,
    newFavoriteGenres = null,
    newFavoriteBook = null
  ) {
    const uri = enviroments.connectStr;
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(enviroments.db_name);
      const usersCollection = db.collection("users");

      const updateFields = {};
      if (newName) updateFields.name = newName;
      if (newEmail) updateFields.email = newEmail;
      if (newFavoriteGenres) updateFields.favoriteGenres = newFavoriteGenres;
      if (newFavoriteBook) updateFields.favoriteBook = newFavoriteBook;

      if (Object.keys(updateFields).length === 0) {
        return null; // No fields to update
      }

      const updatedUser = await usersCollection.findOneAndUpdate(
        { userId: userId },
        { $set: updateFields },
        { returnDocument: "after" }
      );

      return updatedUser.value;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    } finally {
      await client.close();
    }
  }
}
