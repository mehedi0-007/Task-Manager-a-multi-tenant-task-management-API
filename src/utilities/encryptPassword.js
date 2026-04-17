import bcrypt from "bcryptjs";

export const hashPass = async (pass)=>{
    const hashedPass = await bcrypt.hash(pass, 10);
    return hashedPass;
}