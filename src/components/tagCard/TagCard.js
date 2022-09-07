
const types = {
  "normal": "background-color-normal",
  "fighting": "background-color-fighting",
  "flying": "background-color-flying",
  "poison": "background-color-poison",
  "ground": "background-color-ground",
  "rock": "background-color-rock",
  "bug": "background-color-bug",
  "ghost": "background-color-ghost",
  "steel": "background-color-steel",
  "fire": "background-color-fire",
  "water": "background-color-water",
  "grass": "background-color-grass",
  "electric": "background-color-electric",
  "psychic": "background-color-psychic",
  "ice": "background-color-ice",
  "dragon": "background-color-dragon",
  "dark": "background-color-dark",
  "fairy": "background-color-fairy",
  "unknown": "",
  "shadow": "",

  "pelea": "background-color-fighting",
  "volador": "background-color-flying",
  "veneno": "background-color-poison",
  "tierra": "background-color-ground",
  "roca": "background-color-rock",
  "bicho": "background-color-bug",
  "fantasma": "background-color-ghost",
  "metal": "background-color-steel",
  "fuego": "background-color-fire",
  "agua": "background-color-water",
  "planta": "background-color-grass",
  "electico": "background-color-electric",
  "psiquico": "background-color-psychic",
  "hielo": "background-color-ice",
  "dragon": "background-color-dragon",
  "oscuro": "background-color-dark",
  "hada": "background-color-fairy",
}

const TagCard = ({ name }) => {
  const fillClass =`
    flex justify-center items-center
    tags text-xs text-center
    capitalize 
    rounded font-exo2 
    font-light bg-blue-200 
    mx-2 ml-0 h-5 w-1/3
    `
    // bg-[${color}]

  return (
    <span className={`
        flex justify-center items-center
        tags text-xs text-center
        capitalize 
        rounded font-exo2 
        font-light bg-blue-200 
        mx-2 ml-0 h-5 w-1/3 
        ${types[name.toLowerCase()]}
      `}>
      {name}
    </span>
  )
}

export default TagCard;