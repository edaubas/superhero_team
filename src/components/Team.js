import React from 'react';
import SmHeroCard from './SmHeroCard';

export default class Team extends React.Component {

    render() {

        const { team, delHeroFromTeam } = this.props;

        let sortStats = Object.keys(team.stats).sort(function (a, b) { return team.stats[b] - team.stats[a] })

        return (

            (team.good.length > 0 || team.bad.length > 0) ?

            <div className='container-fluid mt-4'>
                <div className='row row-cols-auto justify-content-center bg-dark bg-gradient text-white p-3'>
                    <div className='col-auto px-5 h-100 text-center align-self-center '>
                        <h4 className='mx-auto bg-dark rounded p-3'><strong>Team stats</strong></h4>
                        {
                            sortStats.map((stat, i) => {
                                return (
                                    i === 0 ?
                                        <p className='mx-auto'><strong>{stat.charAt(0).toUpperCase() + stat.slice(1)}: {team.stats[stat]}</strong></p>
                                        :
                                        <p className='mx-auto'>{stat.charAt(0).toUpperCase() + stat.slice(1)}: {team.stats[stat]}</p>
                                )
                            }
                            )
                        }
                        <div className='bg-dark rounded p-3'>
                            <p className='mx-auto'>Avg Weight: {Math.round(team.weight / (team.good.length + team.bad.length))} kg</p>
                            <p className='mx-auto'>Avg Height: {Math.round(team.height / (team.good.length + team.bad.length))} cm</p>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='row heroGood bg-gradient justify-content-center rounded'>
                            {team.good.map(hero => <SmHeroCard hero={hero} delHeroFromTeam={delHeroFromTeam} />)}
                        </div>
                        <div className='row heroBad bg-gradient justify-content-center rounded mt-3'>
                            {team.bad.map(hero => <SmHeroCard hero={hero} delHeroFromTeam={delHeroFromTeam} />)}
                        </div>
                    </div>
                </div>
            </div>
            :
            <h1 className='mt-5'>Your team is empty!</h1>
        )
    }
}

