export const validateData=(email,password)=>{
    const isValidEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidPassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isValidEmail) return "Email not valid";
    if (!isValidPassword) return "Password not valid";
    return null;
}