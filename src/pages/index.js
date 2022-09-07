import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

import { apiUrl, API_POKEMON } from '@constants/utils/apiCalls'
import Title from '@components/title/Title'
import TagCard from '@components/tagCard/TagCard'

import iconRefresh  from '@public/refresh_white.png'
import iconPokeball from '@public/pokeball_white.jpg'
import iconSearch from '@public/search.png'

import en from '@public/locales/en'
import es from '@public/locales/es'
import Link from 'next/link'

export default function Home({ data, details }) {
  console.log('server', data, details);
  const [pokemones, setPokemones] = useState([]);
  const router = useRouter();

  const locale = router.locale === 'es' ? es : en
  // console.log('locals',locale);

  useEffect(() => {
    async function fetchData(){
      const response = await fetch(`${API_POKEMON}?_limit=12`)
      const pokemons = await response.json()
      console.log("🚀 ~ file: index.js ~ line 31 ~ fetchData ~ pokemons", pokemons)
      setPokemones(pokemons)
      // const promises = []; 
      // for (let index = 1; index <= 12; index++){
      //   promises.push(fetch(`${API_POKEMON}/${index}`).then(resp => resp.json()));
      // }
      // Promise.all(promises).then(res => {
      //   setPokemones({ pokemons:pokemons.results, datails:res });
      // })
    }
    fetchData();
  }, [])

  return (
    <div className="py-12 bg-content max-w-[1300px] mx-auto">

        <div className='fixed top-0 right-0 bg-[#414141] h-14 w-20 text-white flex'>
        <Link href="/" locale={router.locale === 'en' ?'es':'en'}>
          <a className='font-exo2 self-center text-lg mx-auto'>{locale.locale}</a>
        </Link>
        </div>

        <Title />
        <section className='bg-[#313131] w-full py-8'>
        <div className='content mx-auto md:w-[85%] max-w-7xl'>
          <div className='flex flex-col lg:flex-row w-[80%] lg:w-auto lg:px-10 mx-auto'>
            <div className='lg:w-1/2 lg: mr-10'>
              <h2 className='text-white text-3xl font-exo2 font-medium'>
                {locale.home.search.text1}
              </h2>
              <div className='mb-4 flex flex-row'>
                <input 
                  type='text'
                  name='search'
                  className='h-12 border-solid border-4 border-[#616161] rounded-md flex-grow' 
                />
                <button className='bg-[#ee6b2f]  items-center h-12 w-24 rounded-md ml-16'>
                  <Image width={25} height={25} src={iconSearch} />
                </button>
              </div>
              <p className='text-white font-exo2 mb-10'>
                {locale.home.search.long_text1}
              </p>
            </div>

            <div className='bg-[#4dad5b] items-center hidden lg:flex rounded-sm pt-3 pb-5 px-4 lg:w-1/2'>
              <h2 className='text-white text-2xl font-exo2 font-medium'>
                {locale.home.search.long_text2}
              </h2>
            </div>
          </div>

          <div className='bg-[#4dad5b] lg:hidden rounded-sm pt-3 pb-5 px-4'>
            <h2 className='text-white text-2xl font-exo2 font-medium'>
              {locale.home.search.long_text2}
            </h2>
          </div>
        
        </div>

        </section>
      <div className='content mx-auto md:w-[85%] max-w-7xl'>

        <section className='pokemons bg-white px-10'>

          <div className='section-buttons flex flex-col mx-auto md:flex-row font-exo2'>
            <div className='buton-sorprender w-full md:flex-1-0-50 md:mb-10 mt-10'>
              <button className='flex items-center bg-[#30a7d7] text-white text-xl place-content-center rounded-md h-10 px-16 w-full md:w-auto float-left'>
                <Image width={20} height={20} src={iconRefresh} />
                {locale.home.interact.button}
              </button>
            </div>
            <div className='sort-by flex w-full md:w-1/3 md:flex-1-0-50 mb-10 mt-10'>
              <div className='select-container relative flex flex-col md:flex-row w-full justify-right'>
                <label className='font-exo2 font-bold text-xl text-center md:text-auto'>
                  {locale.home.interact.text}
                </label>
                <div className='custom-select relative'>
                  <div className='absolute left-4 top-1'>
                    <Image width={30} height={30} src={iconPokeball} />
                  </div>
                  <select className='select-order bg-[#313131] w-full !z-0 text-white text-xl font-exo2 pl-12 pr-3 h-10 rounded-md hover:bg-[#616161] lg:min-w-[250px] md:ml-2'>
                    {locale.home.interact.select.map(text => 
                        <option>{text}</option>
                      )
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4'>
              {pokemones && pokemones.map((item, index) => (
                  <div key={index} className='card flex flex-col justify-center items-center bg-[#f2f2f2] rounded-md'>
                    <div className='card-image flex-auto self-center  bg-no-repeat bg-center bg-contain' 
                    >
                        <Image 
                          className=''
                          height={200}
                          width={200}
                          src={`${apiUrl}${item.image.url}`} 
                        />
                    </div>
                    <div className='card-content flex flex-col w-full bg-white '>
                      <span className='text-[#919191] text-xs text-start font-exo2 font-bold'>
                        N.º {item.number || '#'}
                      </span>
                      <h5 className='font-exo2 capitalize text-start font-bold'>
                        {item.name || ''}
                      </h5>
                      <div className='flex mb-4 mt-2'>
                        {item.types.map((type, index) => (
                          <TagCard key={index} name={type.type} color={type.color} />
                          ))}
                      </div>
                    </div>
                  </div>
              ))}
          </div>
        </section>

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
