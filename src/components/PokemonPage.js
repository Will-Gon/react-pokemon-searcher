import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    input: '',
    displayableOne: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(data =>{
      this.setState({ pokemon: data, displayableOne: data })
    })
  }

  handleSearch = (e) => {
    let newPokes = this.filterThruPokemon(e.target.value)
    this.setState({
      input: e.target.value,
      displayableOne: newPokes
    })
  }

  filterThruPokemon = (term) => {
    return this.state.pokemon.filter((poke) => {
      return poke.name.includes(term)
    })
  }

  handleFormSubmission = (target) => {
    const { name, hp, frontUrl, backUrl } = target

    let newPokemon = {
      name: name.value,
      hp: hp.value,
      sprites: {
        front: frontUrl.value,
        back: backUrl.value
      }
    }

    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    })
    .then(res => res.json())
    .then(data => {
      this.setState((prevState) => {
        return {displayableOne: [data, ...prevState.displayableOne], pokemon: [data, ...prevState.pokemon]}
      })
    })
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPoke={this.handleFormSubmission}/>
        <br />
        <Search lookup={this.handleSearch}/>
        <br />
        <PokemonCollection pokemon={this.state.displayableOne}/>
      </Container>
    )
  }
}

export default PokemonPage
