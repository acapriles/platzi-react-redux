import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const pokeApi = axios.create({
	baseURL: VITE_API_URL,
});

export default pokeApi;


/* export const getPokemon=()=>{
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((res)=>res.data.results)
        .catch((err)=>console.log(err));
}; */