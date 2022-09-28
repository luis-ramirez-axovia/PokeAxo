import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '@constants/utils/Context'

import { apiUrl, API_POKEMON } from '@constants/utils/apiCalls'
import Title from '@components/title/Title'
import TagCard from '@components/tagCard/TagCard'
import Modal from '@components/modal/Modal'

import iconRefresh  from '@public/refresh_white.png'
import iconPokeball from '@public/pokeball_white.jpg'
import iconSearch from '@public/search.png'

import en from '@public/locales/en'
import es from '@public/locales/es'
import Link from 'next/link'

export default function Admin({ data, details }) {
  const { variableState, setVariableState } = useAppContext();
  const [ pokemons, setPokemons ] = useState([]);
  const [isModalOpen, setIsModalOpen] =useState(false)
  const router = useRouter();

  const locale = router.locale === 'es' ? es : en
  
  useEffect(() => {
    async function fetchData(){
      console.log('url', API_POKEMON)
      const response = await fetch(`${API_POKEMON}?_sort=number&_start=0&_limit=12`)
      const pokemons = await response.json()
      console.log("🚀 ~ file: index.js ~ line 31 ~ fetchData ~ pokemons", pokemons)
      setPokemons(pokemons)
    }
    fetchData();
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="py-12 bg-content max-w-[1300px] h-[100vh] mx-auto">
      
      <div className='bg-gray-500 w-full'>
        Barra??
      </div>
      Barra buscar boton crear
      <div className='content-list flex flex-col items-center justify-center mt-5'>
        {pokemons.map(item => (
          <div className='bg-white w-4/5 shadow-lg rounded-md flex flex-column space-x-5 items-center justify-between mt-2'>
            <p className='ml-4'>#{item.number}</p>
            <Image 
              height={110} 
              width={110} 
              src={`${apiUrl}${item.image.url}`} 
            />
            <p>{item.name}</p>
            {/* <div>tags</div> */}
            <div className='buttons'>
              <button onClick={toggleModal} className='bg-blue-400 text-white rounded-md h-10 w-20 active:bg-blue-600'>Editar</button>
              <button className='ml-2 mr-4 bg-red-400 text-white rounded-md h-10 w-20 active:bg-red-600'>Editar</button>
            </div>
          </div>
        ))}
      </div>
        
      {isModalOpen && 
      <Modal show={isModalOpen} onClose={toggleModal} title={'titulo'} />
      }
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
