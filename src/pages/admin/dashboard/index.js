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
      
      <div className='bg-gray-500 w-full'>
        Barra??
      </div>
      Barra buscar boton crear
      <div className='content-list flex justify-center mt-5'>
        <div className='bg-white w-4/5 shadow-lg rounded-md flex flex-column space-x-5 items-center justify-between'>
          <p className='ml-4'>#id</p>
          <Image 
            height={110} 
            width={110} 
            src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"} 
          />
          <p>Hououmon</p>
          {/* <div>tags</div> */}
          <div className='buttons'>
            <button className='bg-blue-400 text-white rounded-md h-10 w-20 active:bg-blue-600'>Editar</button>
            <button className='ml-2 mr-4 bg-red-400 text-white rounded-md h-10 w-20 active:bg-red-600'>Editar</button>
          </div>
        </div>
      </div>
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
