import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'

import { API_POKEMON } from '@constants/utils/apiCalls'
import Title from '@components/title/Title'
import TagCard from '@components/tagCard/TagCard'

export default function Home() {
  const [pokemones, setPokemones] = useState([]);
  useEffect(() => {
    async function fetchData(){
      const response = await fetch(`${API_POKEMON}?offset=0&limit=12`)
      const pokemons = await response.json()
      const promises = []; 
      for (let index = 1; index <= 12; index++){
        promises.push(fetch(`${API_POKEMON}/${index}`).then(resp => resp.json()));
      }
      Promise.all(promises).then(res => {
        setPokemones({ pokemons:pokemons.results, datails:res });
      })
    }
    fetchData();
  }, [])
  
  console.log(pokemones);
  return (
    <div className="py-12 mx-8 text-center test-test">

      <Title />

      <section className='section-order flex mb-10 '>
        <div className='buton-sorprender w-1/2'>
          <button className='bg-[#30a7d7] text-white rounded-sm h-10 px-16'>
            <i className='icon icon_refresh'></i>
            ¡Sorpréndeme!
          </button>
        </div>
        <div className='sort-by w-1/2'>
          Ordenar por
          <select className='bd-[#313131] color-[#313131] text-white'>
            <option>Numero inferior</option>
            <option>Numero superior</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>
      </section>

      <section className='content w-11/12 bg-white mx-auto'>
        <div className='grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4  gap-4'>
            {pokemones.pokemons && pokemones.pokemons.map((item, index) => (
                <div key={index} className='card flex flex-col bg-[#f2f2f2] rounded-md'>
                  <div className='card-image flex-auto self-center  bg-no-repeat bg-center bg-contain' 
                    // style={{'backgroundImage': `url(${pokemones.datails[index].sprites.front_default})`}}
                  >
                      {/* <img 
                        className='tablet:hidden' 
                        src={`${pokemones.datails[index].sprites.front_default}`} 
                      /> */}
                      <img 
                        className='' 
                        src={`${pokemones.datails[index].sprites.other['official-artwork'].front_default}`} 
                      />
                  </div>
                  <div className='card-content flex-auto bg-white '>
                    <span className='text-[#919191] text-xs font-exo2 font-bold'>
                      N.º {pokemones.datails[index].id || '#'}
                    </span>
                    <h5 className='font-exo2 capitalize'>{item.name || ''}</h5>
                    <div className='flex mb-4 mt-2'>
                      {pokemones.datails[index].types.map((type, index) => (
                        <TagCard key={index} name={type.type.name} />
                        ))}
                    </div>
                  </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  )
}
