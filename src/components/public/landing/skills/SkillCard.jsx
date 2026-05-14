import React from 'react'
import { GiStarsStack } from "react-icons/gi";
import ScrollToView from '../animator/ScrollUp'

const SkillCard = ({title,description,Icon,Identifier}) => {
  return (
    <ScrollToView classNames='skill-card' identifier={Identifier}>
      <div className="skill-card-icon">
        {
            Icon ? <Icon size={"30px"}  /> :
            <GiStarsStack size={"30px"} />
        }
      </div>
      <p className="skill-card-title">{title}</p>
      <div className="skill-card-divider"></div>
      {
        description &&
        <p className="skill-card-description">
            {description}<span className='text-primary font-extrabold'>.</span>
        </p>
      }
    </ScrollToView>
  )
}

export default SkillCard
