import { User } from "./user.js";

export const userStore = {
  async find() {
    const users = await User.find().lean();
    return users;
  },

  async findOne(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async add(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async findBy(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteOne(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async delete() {
    await User.deleteMany({});
  },
};
