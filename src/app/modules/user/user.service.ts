import QueryBuilder from "../../builder/QueryBuilder";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const getProfile = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  return user;
};
const allUsers = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(["name", "email"])
    .filter()
    .sort()
    .pagination()
    .fields();

  const meta = await UserQuery.countTotal();
  const data = await UserQuery.modelQuery;

  return {
    meta,
    data,
  };
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
const updateProfile = async (
  email: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate({ email }, payload, { new: true });
  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(id, payload, { new: true });
  return user;
};

export const UserService = {
  allUsers,
  getProfile,
  updateProfile,
  updateUser,
  deleteUser,
};
