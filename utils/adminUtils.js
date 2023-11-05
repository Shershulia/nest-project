export async function checkIfUserIsAdmin(email, admins) {
    const arrayOfEmails = admins.map(obj => obj.email);
    return arrayOfEmails.includes(email);
}