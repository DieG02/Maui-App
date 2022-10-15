export const getInitialLetters = (name:string, lastName:string) => {
    const letters = lastName ? name.slice(0,1) + lastName.slice(0,1) : name.slice(0,1);
    return letters.toUpperCase();
}