import axios from "axios";

export async function fetchUrl(url:string){
    return axios.get(url).then((result) =>{
            return result.data
        }).catch((err) => {
            console.error(err)
        });
};