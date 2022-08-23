// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { API_POKEMON } from "@constants/utils/apiCalls"

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

const getPokemons = () => {
  return fetch(API_POKEMON).then((response) => {
    response.json()
  }).then(data => data)
}

const getPokeInfo = async () => {
  const list = await getPokemons();
  console.log("🚀 ~ file: apiPokemon.js ~ line 17 ~ getPokeInfo ~ list", list)
  return { pokemons: list}
}

export default getPokeInfo;