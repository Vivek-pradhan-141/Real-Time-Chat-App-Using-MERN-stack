import bcrypt from "bcryptjs";

async function generatePassword(){
    const p1 = "abc";
    const p2 = "acb"
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(p1,salt);
    console.log(hashPassword);

    const isMatch = await bcrypt.compare(p2,hashPassword)
    console.log(isMatch)
}

generatePassword();