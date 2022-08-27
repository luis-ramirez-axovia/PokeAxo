import bgColor from './pokeTypes.module.css'

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
  "shadow": ""
}

const TagCard = ({ name }) => {
  return (
    <span className={`
        tags text-xs text-center
        capitalize 
        rounded font-exo2 
        font-light bg-blue-200 
        mx-2 ml-0 h-4 w-1/3 
        ${types[name]}
      `}>
      {name}
    </span>
  )
}

export default TagCard;