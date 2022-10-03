import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@constants/utils/Context';

import { apiUrl, API_POKEMON } from '@constants/utils/apiCalls';
import Modal from '@components/modal/Modal';

export default function Admin({ data, details }) {
  const { variableState, setVariableState } = useAppContext();
  const [load, setLoad] = useState(0)
  const [pokemons, setPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if(!variableState){
      router.push('/admin/');
    }
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(`${API_POKEMON}?_sort=number&_start=0&_limit=12`);
    const pokemons = await response.json();
    setPokemons(pokemons);
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
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + variableState.jwt,
        },
        body: JSON.stringify({ name: content.name, number: content.number, types: content.types.map((i) => i.value) }),
      }).then(res => {
        onCloseModal();
        fetchData();
      }).catch(err => {
        alert('error:', err);
      });
    } else {
      fetch(`${API_POKEMON}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + variableState.jwt,
        },
        body: JSON.stringify({ name: content.name, number: content.number, types: content.types.map((i) => i.value) }),
      }).then(res => {
        onCloseModal();
        fetchData();
      }).catch(err => {
        alert('error:', err);
      });
    }

    // var bodyFormData = new FormData();
    // bodyFormData.append("files", this.state.dropzoneImage);
    // bodyFormData.append("ref", "formality");
    // bodyFormData.append("refId", res.data.id);
    // bodyFormData.append("field", "file");
    // axios({
    //   method: "post",
    //   url: `${apiUpload}`,
    //   data: bodyFormData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: "Bearer " + this.props.strapiToken,
    //   },
    // })
  };

  return (
    <div className="py-12 bg-content max-w-[1300px] h-[100vh] mx-auto">
      <div className="bg-gray-500 w-full">Barra??</div>
      <button onClick={() => OpenModalCreate()} className="bg-blue-400 text-white rounded-md h-10 w-20 active:bg-blue-600">
        Crear
      </button>
      <div className="content-list flex flex-col items-center justify-center mt-5">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map((item) => (
            <div key={item.id} className="bg-white w-4/5 shadow-lg rounded-md flex flex-column space-x-5 items-center justify-between mt-2">
              <p className="ml-4">#{item.number}</p>
              {item.image && item.image.url &&
                <Image height={110} width={110} src={`${apiUrl}${item.image.url}`} />
              }
              <p>{item.name}</p>
              {/* <div>tags</div> */}
              <div className="buttons">
                <button onClick={() => OpenEditModal(item)} className="bg-blue-400 text-white rounded-md h-10 w-20 active:bg-blue-600">
                  Editar
                </button>
                <button onClick={() => handleDelete(item)} className="ml-2 mr-4 bg-red-400 text-white rounded-md h-10 w-20 active:bg-red-600">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && <Modal show={isModalOpen} handleSubmit={handleSubmit} onClose={onCloseModal} edit={editItem} title={'titulo'} />}
    </div>
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
