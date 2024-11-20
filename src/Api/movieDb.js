

export const register = async (user) => {
    try {    
        const response = await fetch("https://ha-videoclub-api-g1.vercel.app/users");
        if (!response.ok) {
            throw new Error('No funciona');
        }
        const data = await data.json();
        console.log(data)    
    
    } catch (error) {
        console.log(error)
    }
    
}
