import bcrypt from "bcryptjs";

export const hashPass = async (pass) => {
  const hashedPass = await bcrypt.hash(pass, 12);
  return hashedPass;
};

export const comparePass = (pass, user) => {
  return bcrypt.compare(pass, user.password);
};
