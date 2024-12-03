import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import bcrypt from "bcrypt";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare favoriteStocks: string;

  // Here we create an Instance Method to work with the user's email address before saving it to the database
  // async setEmailToLowerCase() {
  //   this.email = await this.email.toLowerCase();
  // }
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
  }

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
export function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      favoriteStocks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: async (newUserData) => {
          await newUserData.hashPassword();
        },
      },
      modelName: "users",
      sequelize,
    }
  );

  return User;
}
