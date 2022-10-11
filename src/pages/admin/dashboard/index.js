import Head from 'next/head';
import Image from 'next/image';
import Pagination from '@components/pagination/Pagination'
import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@constants/utils/Context';

import { apiUrl, API_POKEMON, API_UPLOAD_IMAGE, API_DELETE_IMAGE } from '@constants/utils/apiCalls';
import Modal from '@components/modal/Modal';

export default function Admin({ data, details }) {
  const { variableState, setVariableState } = useAppContext();
  const [isLoad, setIsLoad] = useState(true)
  const [pokemons, setPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  // Paginacion
  const plus = 4;
  const [count, setCount] = useState(0)
  const [pageInit, setPageInit] = useState(0);
  const [pageEnd, setPageEnd] = useState(pageInit+plus)
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter();

  useEffect(() => {
    // if(!variableState){
    //   router.push('/admin/');
    // }
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(`${API_POKEMON}?_sort=number&_start=${pageInit}&_limit=${pageEnd}`);
    const response2 = await fetch(`${API_POKEMON}/count`);
    const pokemons = await response.json();
    const count = await response2.json()
    setCount(count);
    setPokemons(pokemons);
    setIsLoad(false)
  }

  const handleCloseSession = () => {
    console.log('cerrar session')
    setVariableState(null)
    router.push('/admin')
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onCloseModal = () => {
    setEditItem(null);
    toggleModal();
  };
  const OpenEditModal = (item) => {
    setEditItem(item);
    toggleModal();
  };
  const OpenModalCreate = () => {
    setEditItem(null);
    toggleModal();
  }
  const handleDelete = (item) => {
    fetch(`${API_POKEMON}/${item.id}`, {
      method: 'DELETE',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + variableState.jwt,
      },
    }).then(res => {
      fetchData();
    })
  };
  const handleSubmit = (content) => {
    if (editItem) {
      fetch(`${API_POKEMON}/${editItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + variableState.jwt,
        },
        body: JSON.stringify({ name: content.name, number: content.number, types: content.types.map((i) => i.value) }),
      }).then(async res => {
        
        const data = await res.json();
        await insertImage(data, content.image);
        
        onCloseModal();
        fetchData();
      }).catch(err => {
        console.log('error:', err);
      });
    } else {
      fetch(`${API_POKEMON}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + variableState.jwt,
        },
        body: JSON.stringify({ name: content.name, number: content.number, types: content.types.map((i) => i.value) }),
      }).then(async res => {

        const data = await res.json();
        await insertImage(data, content.image);

        onCloseModal();
        fetchData();
      }).catch(err => {
        alert('error:', err);
      });
    }

  };
  const insertImage =async (data, image) => {

    var bodyFormData = new FormData();
    bodyFormData.append("files", image);
    bodyFormData.append("ref", "pokemon-item");
    bodyFormData.append("refId", data.id);
    bodyFormData.append("field", "image");
    
    if(image){
      if((data.image || {}).id || null){
        await fetch(`${API_DELETE_IMAGE}/${data.image.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + variableState.jwt,
          },
        })
      }
      await fetch(`${API_UPLOAD_IMAGE}`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + variableState.jwt,
        },
        body: bodyFormData,
      })
    }
  }

  const changePaginations = () => {

  } 

  return (
    <Fragment>
      {!isLoad ? 
        <div className="py-12 bg-content max-w-[1300px] min-w-[320px] h-[100vh] mx-auto">
          <div className="flex bg-gray-500 w-full h-10 p-5 text-white items-center">
            <div>Pokemon Yei</div>
            <div className='ml-auto'><a onClick={()=> handleCloseSession()} className='hover:text-blue-400 hover:cursor-pointe'>Cerrar Sesion</a></div>
          </div>
          <div className='bg-white w-full md:w-4/5 mx-auto h-full min-w-[320px]'>
            <div className='flex w-full pt-5'>
              <button onClick={() => OpenModalCreate()} className="bg-blue-400 text-white rounded-md ml-auto h-10 w-full lg:w-80 active:bg-blue-600">
                Crear
              </button>
            </div>

            <div className="content-list flex flex-col items-center justify-center my-5">
              {pokemons &&
                pokemons.length > 0 &&
                pokemons.map((item) => (
                  <div key={item.id} className="bg-white w-full shadow-lg rounded-md flex flex-column space-x-5 items-center justify-between mt-2">
                    <p className="ml-4 hidden lg:block">#{item.number}</p>
                    {item.image && item.image.url &&
                      <Image height={110} width={110} src={`${apiUrl}${item.image.url}`} />
                    }
                    <p className='min-w-[150px]'>{item.name}</p>
                    {/* <div>tags</div> */}
                    <div className="buttons flex flex-col sm:flex-row">
                      <button onClick={() => OpenEditModal(item)} className="bg-blue-400 text-white rounded-md h-10 w-20 active:bg-blue-600">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(item)} className="mx-0 sm:ml-2 sm:mr-4 bg-red-400 text-white rounded-md h-10 w-20 active:bg-red-600">
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                <Pagination inicio={pageInit+1} final={pageEnd} total={count} current={currentPage} changePaginations={changePaginations} />
            </div>
          </div>
          {isModalOpen && <Modal show={isModalOpen} handleSubmit={handleSubmit} onClose={onCloseModal} edit={editItem} title={'titulo'} />}
        </div>
        : ''}
    </Fragment>
  );
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
