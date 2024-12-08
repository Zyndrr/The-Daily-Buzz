import { Schema, model, Document, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  password: string;
  menuName: string;
  drinks: Array<ObjectId>;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  menuName: { type: String, required: true, default: "Default Menu" },
  drinks: [{ type: Schema.Types.ObjectId, required: true, ref: "Drink" }], //when intializing a new user we will also initialize an empty array for drinks.
});

userSchema.pre<IUser>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
