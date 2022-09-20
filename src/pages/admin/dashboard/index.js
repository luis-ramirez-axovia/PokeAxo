import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '@constants/utils/Context'

import { apiUrl, API_POKEMON } from '@constants/utils/apiCalls'
import Title from '@components/title/Title'
import TagCard from '@components/tagCard/TagCard'

import iconRefresh  from '@public/refresh_white.png'
import iconPokeball from '@public/pokeball_white.jpg'
import iconSearch from '@public/search.png'

import en from '@public/locales/en'
import es from '@public/locales/es'
import Link from 'next/link'

export default function Admin({ data, details }) {
  const { variableState, setVariableState } = useAppContext();
  const router = useRouter();

  const locale = router.locale === 'es' ? es : en

  return (
    <div className="py-12 bg-content max-w-[1300px] h-[100vh] mx-auto">
      
      alksfhaklfhaslkfhj

    </div>
  )
}

// export async function getStaticProps() {
//   const getPokemons = async () => {
//     const response = await fetch(`${API_POKEMON}?offset=0&limit=12`)
//     const { results } = await response.json()
//     return results;
//   }
//   const data = await getPokemons();
//   // const details = data.map(async pokemon => await getContent);
//   // const getContent = async (pokemon) => {
//   //   const response = await fetch(pokemon.url)
//   //   return response;
//   // }
//   return {
//     props: {
//       data,
//       // details
//     }
//   }
// }
