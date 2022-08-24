import bgColor from './pokeTypes.module.css'

const TagCard = ({ name }) => {
  return (
    <span className={`
      tags text-xs text-center 
      rounded font-exo2 
      font-light bg-blue-200 
      mx-2 ml-0 h-4 w-1/3 
      background-color- ${bgColor[`background-color-${name}`]}`}>
      {name}
    </span>
  )
}

export default TagCard;