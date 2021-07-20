import React from "react";

const HeroDesc = (props) => (
    <div>
        <p className='m-0'><strong>Weight:</strong> {props.hero.appearance.weight[1]}</p>
        <p className='m-0'><strong>Height:</strong> {props.hero.appearance.height[1]}</p>
        <p className='m-0'><strong>Name:</strong> {props.hero.biography['full-name']}</p>
        <p className='m-0'><strong>Alias:</strong> {props.hero.biography.aliases.toString()}</p>
        <p className='m-0'><strong>Eye color:</strong> {props.hero.appearance['eye-color']}</p>
        <p className='m-0'><strong>Hair color:</strong> {props.hero.appearance['hair-color']}</p>
        <p className='m-0'><strong>Work place:</strong> {props.hero.work.base}</p>
    </div>
);

export default HeroDesc;