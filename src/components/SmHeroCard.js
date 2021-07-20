import React from 'react';
import HeroDesc from './HeroDesc';
import HeroStats from './HeroStats';

export default class SmHeroCard extends React.Component {

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

        const { hero, delHeroFromTeam } = this.props;
        const { viewDetails } = this.state;

        return (

            <div className='col-auto'>
                <div className='row'>
                    <div className='col-shadow card-hero rounded-circle p-0'
                        style={{ width: '10rem', height: '10rem', margin: '1rem', backgroundImage: 'url(' + hero.image.url + ')', backgroundSize: 'cover' }}
                        onClick={this.viewHeroDetails}>
                        <div className='card-body rounded m-0 text-center text-white'>
                            <h3 className='card-title-shadow text-uppercase'><strong>{hero.name}</strong></h3>
                        </div>
                    </div>
                    <div className='col-auto text-white mt-3'>
                        {viewDetails ?
                            <HeroDesc hero={hero} />
                            :
                            <HeroStats hero={hero} />
                        }
                        <button className='rounded mt-1 p-1' onClick={() => delHeroFromTeam(hero)}>Remove</button>
                    </div>
                </div>
            </div>

        );

    }

}
