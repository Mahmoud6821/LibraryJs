import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
  const { name, email, membership_date, password, phone, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  const user = await User.create({
    name,
    email,
    membership_date,
    password: hashedPassword,
    phone,
    role,
  });

  if (!user) {
    return res.status(400).json({ message: "Error signingUp" });
  }
  return res.status(200).json({ message: "Sign up complete", user });
};

export const user_login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "invalid Email" });
  }

  const hashedPassword = bcrypt.compareSync(password, user.password);
  if (!hashedPassword) {
    return res.status(400).json({ message: "invalid password" });
  }
  return res.status(200).json({ message: "login Successfull", user });
};

export const update_user = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const { user_id } = req.params;
  const user = await User.findByPk(user_id);

  if (name) user.name = name;
  if (email) {
    //check email valdity
    const isEmailExist = await User.findOne({ where: { email } });

    if (isEmailExist)
      return res.status(400).json({ message: "Email already exists" });
    user.email = email;
  }
  if (phone) {
    //chech phone valdity
    const isPhoneExist = await User.findOne({ where: { phone } });

    if (isPhoneExist)
      return res.status(400).json({ message: "Phone number already exists" });

    user.phone = phone;
  }
  if (password)
    user.password = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
  user.save();
  return res.status(200).json({ message: "User Updated", user });
};

export const delete_user = async (req, res, next) => {
  const { user_id } = req.params;
  const deletedUser = await User.destroy({ where: { user_id } });
  if (!delete_user)
    return res.status(400).json({ message: "Error deleteing user" });

  return res.status(200).json({ message: "User Deleted" });
};
