
import React from 'react';
import HeroDesc from './HeroDesc';
import HeroStats from './HeroStats';


export default class HeroCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewDetails: false
        }
    }

    viewHeroDetails = () => {
        this.setState({ viewDetails: this.state.viewDetails ? false : true });
    }

    render() {

        const { hero, addHeroToTeam, setHeroAdded } = this.props;
        const { viewDetails } = this.state;

        return (

            <div
                className={'card-hero rounded p-0 bg-gradient ' + (hero.biography.alignment === 'good' ? 'heroGood' : 'heroBad')}
                style={{ maxWidth: '10rem', margin: '1rem' }}>
                <div
                    className='rounded-top m-0'
                    style={{ height: '12rem', backgroundImage: 'url(' + hero.image.url + ')', backgroundSize: 'cover' }}
                    onClick={this.viewHeroDetails}></div>
                <div className='card-header text-center text-white p-1 m-0' onClick={this.viewHeroDetails}>
                    <h5 className='card-title text-uppercase p-0 m-0'><strong>{hero.name}</strong></h5>
                </div>
                <div className='card-body text-center text-white m-0 p-2' onClick={this.viewHeroDetails}>
                    {viewDetails ?
                        <HeroDesc hero={hero} />
                        :
                        <HeroStats hero={hero} />
                    }
                </div>
                <div className='card-footer bg-transparent border-0 text-center'>
                    {!hero.added ?
                        <button className='rounded mx-auto' onClick={() => { addHeroToTeam(hero); setHeroAdded(hero) }}>Add</button>
                        :
                        <h2 className='text-white mx-auto'>Added!</h2>}
                </div>
            </div>

        );

    }

}
