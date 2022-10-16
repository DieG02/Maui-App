export const getInitialLetters = (name:string, lastName:string) => {
    const letters = lastName ? name.slice(0,1) + lastName.slice(0,1) : name.slice(0,1);
    return letters.toUpperCase();
}

export const getInitialLettersBussiness = (name:string) => {
    const separateLet = name.split(" ");
    const letters = separateLet.includes(" ") ?separateLet[0].slice(0,1) + separateLet[separateLet.length-1].slice(0,1):name.slice(0,1);
    return letters.toUpperCase();
}