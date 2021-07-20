import React from "react";

const HeroStats = (props) => (
    <div>
        <p className='m-0'><strong>Combat:</strong> {props.hero.powerstats.combat}</p>
        <p className='m-0'><strong>Durability</strong> {props.hero.powerstats.durability}</p>
        <p className='m-0'><strong>Intelligence:</strong> {props.hero.powerstats.intelligence}</p>
        <p className='m-0'><strong>Power:</strong> {props.hero.powerstats.power}</p>
        <p className='m-0'><strong>Speed:</strong> {props.hero.powerstats.speed}</p>
        <p className='m-0'><strong>Strength:</strong> {props.hero.powerstats.strength}</p>
    </div>
);

export default HeroStats;