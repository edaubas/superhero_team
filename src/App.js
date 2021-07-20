import React from 'react';
import SigninForm from './components/SigninForm';
import AddHeroForm from './components/AddHeroForm';
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Team from './components/Team';
import NavBar from './components/NavBar';
import logo from './img/logo.png';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      heroToken: '10225889084324149',
      error: ' ',
      team: {
        good: [],
        bad: [],
        stats: {
          combat: 0,
          durability: 0,
          intelligence: 0,
          power: 0,
          speed: 0,
          strength: 0,
        },
        weight: 0,
        height: 0
      }
    }
  }

  // Guardar token   
  signIn = (token) => {
    this.setState({ isSignedIn: true });
    localStorage.setItem('token', token);
  }

  getNumber = (string) => { return string === "null" ? 0 : parseInt(string.replace(/[^0-9]/g, ''), 0) };

  // Borrar heroe del equipo  
  delHeroFromTeam = (hero) => {

    let stats = this.state.team.stats;
    let weight = this.state.team.weight;
    let height = this.state.team.height;

    //  Recalcular stats del equipo
    stats.combat -= this.getNumber(hero.powerstats.combat);
    stats.durability -= this.getNumber(hero.powerstats.durability);
    stats.intelligence -= this.getNumber(hero.powerstats.intelligence);
    stats.power -= this.getNumber(hero.powerstats.power);
    stats.speed -= this.getNumber(hero.powerstats.speed);
    stats.strength -= this.getNumber(hero.powerstats.strength);
    weight -= this.getNumber(hero.appearance.weight[1]);
    height -= this.getNumber(hero.appearance.height[1]);

    if (hero.biography.alignment === 'good') {

      this.setState(prevState => ({
        team: {
          ...prevState.team, good: prevState.team.good.filter(h => h.id !== hero.id), stats: stats, weight: weight, height: height
        }
      }))

    } else {

      this.setState(prevState => ({
        team: {
          ...prevState.team, bad: prevState.team.bad.filter(h => h.id !== hero.id), stats: stats, weight: weight, height: height
        }
      }))

    }

  }

  // Agregar heroe al equipo
  addHeroToTeam = (hero) => {

    let stats = this.state.team.stats;
    let weight = this.state.team.weight;
    let height = this.state.team.height;

    //  Recalcular stats del equipo
    stats.combat += this.getNumber(hero.powerstats.combat);
    stats.durability += this.getNumber(hero.powerstats.durability);
    stats.intelligence += this.getNumber(hero.powerstats.intelligence);
    stats.power += this.getNumber(hero.powerstats.power);
    stats.speed += this.getNumber(hero.powerstats.speed);
    stats.strength += this.getNumber(hero.powerstats.strength);
    weight += this.getNumber(hero.appearance.weight[1]);
    height += this.getNumber(hero.appearance.height[1]);

    if (hero.biography.alignment === 'good') {

      //Equipo completo?
      if (this.state.team.good.length >= 3) {
        let error = 'Good team is full!';
        this.setState({ error: error });

      } else {

        //Actualizar estado con nuevo heroe
        this.setState(prevState => ({
          error: ' ',
          team: {
            ...prevState.team, good: [...prevState.team.good, hero], stats: stats, weight: weight, height: height
          }
        }))
      }
    }
    else {

      //Equipo completo?
      if (this.state.team.bad.length >= 3) {
        let error = 'Bad team is full!';
        this.setState({ error: error });

      } else {

        //Actualizar estado con nuevo heroe
        this.setState(prevState => ({
          error: ' ',
          team: {
            ...prevState.team, bad: [...prevState.team.bad, hero], stats: stats, weight: weight, height: height
          }
        }))
      }
    }

  }

  render() {

    const { heroToken, team, isSignedIn, error } = this.state;
    const logoComp = <img className='img-fluid mt-4 w-50' style={{ maxWidth: '30rem' }} src={logo}  alt='SuperHero team picker' />;

    let token = ''
    //Validamos si se encuentra logueado
    token = isSignedIn && localStorage.getItem('token');

    return (

      token
        ?
        <Router>
          <NavBar />
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/addHero" /> }/>
              <Route exact path="/superhero_team" render={() => <Redirect to="/addHero" /> }/>
              <Route path="/addHero">
                {logoComp} <AddHeroForm token={heroToken} team={team} addHeroToTeam={this.addHeroToTeam} addError={error} />
              </Route>
              <Route path="/team">
                {logoComp} <Team team={team} delHeroFromTeam={this.delHeroFromTeam} />
              </Route>
            </Switch>
          </div>
        </Router>
        :
        <div className='d-flex flex-column align-items-center justify-content-center'>
          {logoComp} <SigninForm isSignedIn={this.signIn} />
        </div>

    )
  }

}

export default App;

