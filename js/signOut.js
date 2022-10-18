import firbase from 'firebase/app';

export const signOut = async () => {
    try {
        await firbase.auth().signOut();
    } catch(e) {
        throw new Error ('Error while signing out');
    }
}