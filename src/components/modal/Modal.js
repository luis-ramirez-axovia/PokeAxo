import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { apiUrl } from '@constants/utils/apiCalls';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, edit = null, title = null, handleSubmit }) => {
  const [content, setContent] = useState({
    name: null,
    number: null,
    types: null,
    image: null,
  });

  useEffect(() => {
    if (edit) {
      setContent({
        name: edit.name,
        number: edit.number,
        types: edit.types.map((item) => ({ value: item.id, label: item.type })),
        image: null,
      });
    }
  }, []);

  const options = [
    { value: 1, label: ';dato' },
    { value: 2, label: ';dato2' },
  ];
  const changeName = (e) => {
    setContent({...content, name: e.target.value })
  }
  const changeNumber = (e) => {
      setContent({...content, number: e.target.value})
  }
  const changeTypes = (e) => {
      setContent({...content, types: e})
  }
  const changeImage = (e) => {
      setContent({...content, image: e.target.files[0]})
  }

  return (
    <div className="py-12 bg-black bg-opacity-75 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Agregar / Editar Pokemon</h1>
          <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Pokemon Name
          </label>
          <input
            id="name"
            name="name"
            value={content.name}
            onChange={(e) => changeName(e)}
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="name"
          />
          <label htmlFor="number" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Pokedex Number
          </label>
          <div className="relative mb-5 mt-2">
            <input
              id="number"
              name="number"
              onChange={(e) => changeNumber(e)}
              value={content.number}
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="XX"
            />
          </div>
          <label htmlFor="types" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Tipos
          </label>
          <div className="relative mb-5 mt-2">
            <Select id="types" name="types" options={options} value={content.types} onChange={e => changeTypes(e)} isMulti />
          </div>
          <label htmlFor="image" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Image
          </label>
          <div className="relative mb-5 mt-2">
            {edit && edit.image && edit.image.url && (
              <a href={apiUrl + edit.image.url} target="_blank" className="text-blue-600 hover:text-blue-800">
                Actual: {apiUrl + edit.image.url}
              </a>
            )}
            <input id="image" name="image" type="file" onChange={e => changeImage(e)} className="mb-8 text-gray-600 focus:outline-none font-normal w-full flex items-center pl-3 text-sm" />
          </div>
          <div className="flex items-center justify-start w-full">
            <button onClick={() => handleSubmit(content)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
              Submit
            </button>
            <button
              onClick={onClose}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    // <div className="w-full flex justify-center py-12" id="button">
    //     <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm" onclick="modalHandler(true)">Open Modal</button>
    // </div>
  );
};

export default Modal;
