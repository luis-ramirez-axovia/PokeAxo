import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'
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

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      identifier: event.target.username.value,
      password: event.target.password.value
    }

    fetch(`${apiUrl}/auth/local`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then( async (response) => {
      const loginData = await response.json()
      setVariableState(loginData);
      Router.push('/admin/dashboard')
    }).catch((error) => {
      console.log('Problema en login', error);
    })
  }

  return (
    <div className="py-12 bg-content max-w-[1300px] h-[100vh] mx-auto">
      
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleLogin}>
              <p className="text-gray-800 font-medium text-center text-lg font-bold">Login</p>
              <div className="">
                <label className="block text-sm text-gray-00" for="username">Username</label>
                <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="username" name="username" type="text" required="" placeholder="User Name" aria-label="username" />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" for="password">Password</label>
                <input className="w-full px-5  py-1 text-gray-700 bg-gray-200 rounded" id="password" name="password" type="text" required="" placeholder="*******" aria-label="password" />
              </div>
              <div className="mt-4 items-center justify-between">
                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Login</button>
                <a className="pl-2 inline-block right-0 align-baseline  font-bold text-sm text-500 hover:text-blue-800" href="#">
                  Forgot Password?
                </a>
              </div>
              <a className="inline-block right-0 align-baseline font-bold text-sm text-500 hover:text-blue-800" href="#">
                Not registered ?
              </a>
            </form>

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
