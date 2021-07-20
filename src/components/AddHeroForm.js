import React, { useDebugValue } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import HeroCard from './HeroCard';
import herosLogos from '../img/herosLogos.png';

export default class AddHeroForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            apiResMess: '',
        }
    }

    onSubmit(values) {
        this.setState({ apiResMess: 'Searching . . .' })
        axios.get(`https://superheroapi.com/api/${this.props.token}/search/${values.name}`
            ,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        )
            .then((res) => {
                if (res.data.error) {
                    this.setState({ apiResMess: res.data.error })
                } else {
                    this.addResults(res.data.results);
                }
            })
            .catch(error => {
                this.setState({ apiResMess: error.message })
                console.log(error.message);
            }
            )

    }

    //Validar input de usuario
    validateInput(values) {
        const errors = {};
        if (!values.name) {
            errors.name = <p className='fw-bold text-center'>Complete hero's name</p>;
        }
        return errors;
    }

    //Completamos salida con respuesta de SuperHero
    addResults = (results) => {

        const { good, bad } = this.props.team;
        let newResults = [];

        //Si los equipos estan vacios, asignamos el array completo
        if (good.length === 0 && bad.length === 0) {

            this.setState({ results: results, apiResMess: ' ' })

        } else {

            //Borramos del array de la respuesta los heroes que ya fueron agregados previamente
            for (let i = 0; i < results.length; i++) {
                if (good.findIndex(g => g.id === results[i].id) < 0 && bad.findIndex(b => b.id === results[i].id) < 0) {
                    newResults.push(results[i]);
                }
            }

            newResults.length === 0 ?

                this.setState({ apiResMess: 'Hero(es) already added!' })

                :

                this.setState({ results: newResults, apiResMess: ' ' })

        }
    }

    //Agregamos propiedad al objeto del heroe para indicar que fue agregado
    setHeroAdded = (hero) => {

        const { good, bad } = this.props.team;

        if (this.state.results.length > 0) {

            if ((hero.biography.alignment === 'good' && good.length < 3) || (hero.biography.alignment === 'bad' && bad.length < 3)) {

                let results = this.state.results;
                let newHero = { ...hero, added: true };
                results[(results.findIndex(r => r.id === hero.id))] = newHero;

                this.setState({ results: results });

            }
        }

    }

    render() {

        const { apiResMess, results } = this.state;
        const { addError, addHeroToTeam, team } = this.props;

        return (

            (team.good.length === 3 && team.bad.length === 3) ?

                <h1 className='mt-5'>Your team is full!</h1>

                :

                <div className='d-flex flex-column justify-content-center text-center'>
                    <h1>Search your heroes by name</h1>

                    <Formik
                        initialValues={{ name: 'Iron man' }}
                        onSubmit={(data, { setSubmitting }) => { this.onSubmit(data); setSubmitting(false); }}
                        validate={data => this.validateInput(data)}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <Field className='rounded m-2 text-center' type="name" name="name" />
                                    <ErrorMessage name="name" component="div" />
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className='rounded m-2' type="submit" disabled={isSubmitting}>Submit
                                    </button>
                                </div>
                                {apiResMess}
                            </Form>

                        )}
                    </Formik>
                    <div>
                        <img className='img-fluid mt-1 w-50 p-0' src={herosLogos} style={{ maxWidth: '20rem' }} alt='SuperHero team picker' />
                    </div>
                    {addError !== ' ' && <div className='alert alert-danger text-center'>{addError}</div>}

                    <div className='container-fluid row justify-content-center'>

                        {results.map(hero => <HeroCard hero={hero} addHeroToTeam={addHeroToTeam} setHeroAdded={this.setHeroAdded} />)}

                    </div>
                </div>

        )

    }

}