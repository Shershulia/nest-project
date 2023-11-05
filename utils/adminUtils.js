export async function checkIfUserIsAdmin(email, admins) {
    if (email){
        const arrayOfEmails = admins.map(obj => obj.email);
        return arrayOfEmails.includes(email);
    }else return false;

}