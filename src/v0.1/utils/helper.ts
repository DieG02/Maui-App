export const getInitialLetters = (name:string) =>{
    const separator = (fullName:string) => {
        const letters = fullName.split(' ').map(e=>e.slice(0,1).toUpperCase())
        return letters.slice(0,3)
    }

    const letters = name.includes(' ')?separator(name):name.slice(0,1).toUpperCase();
    return letters;
}