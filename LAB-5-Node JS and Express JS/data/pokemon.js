//Your data modules to make the Axios calls and get the data
const axios = require('axios');

const URL='https://pokeapi.co/api/v2/pokemon';
const re_for_specialcharacter=/[`!@#$%^&*()_+\-=;':"\\|,.<>\/?~]/;

async function getPokemonData(){
    const {data}=await axios.get(URL);
    return data;
}
async function getPokemonDataByID(id){
        try{
            const {data}=await axios.get(URL+'/'+id);
            return data;
        }catch(e){
            throw 'Pokémon Not Found!'
        }
    
}
function validateID(id){
    if(!id)throw 'the id is not passed';
    temp=parseInt(id);
    if(isNaN(temp)) throw 'Invalid URL Parameter';
    if(re_for_specialcharacter.test(id)) throw 'Invalid URL Parameter';
    if(id[0]=='0') throw 'Invalid URL Parameter';
    id=Number(id);
    if(id<0) throw'Invalid URL Parameter';
    return id;
}

const pokemon = async () => {
    let data =await getPokemonData();
    return data;
};


const pokemonById = async (id) => {
    id=validateID(id);
    let data=await getPokemonDataByID(id);
    return data;
};

module.exports = {
    pokemon,
    pokemonById,
    validateID
};