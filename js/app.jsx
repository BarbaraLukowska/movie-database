import React from 'react';
import ReactDOM from 'react-dom';
import "../scss/style.scss";

document.addEventListener('DOMContentLoaded', function(){

  class Header extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        text: "Welcome to movies base!"
      }
    }
    componentDidMount() {
      this.timerId = setTimeout( () =>{
        this.setState({text: "Looking for movie info? Get it from the base!"})
      }, 3000)
    }
    componentWillUnmount() {
      clearTimeout(this.timerId);
    }
    render(){
      return <header>
          <h1>{this.state.text}</h1>
        </header>
    }
  }

  class MovieInfo extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: true,
        info: {}
      }
    }

    componentWillReceiveProps(props) {
      console.log('componentWillReceiveProps: ', props.title)
      if (props.title === null) {
        return null;
      }
      fetch('http://www.omdbapi.com/?t=' + props.title).then( resp =>{
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Błąd sieci");
        }
      }).then( info => {
        console.log('JSON: ', info);
        this.setState({loading: false, info: info})
      }).catch( (err) => {
          this.setState({title: "ERROR!"})
        });
    }

    render(){
      if (this.state.loading) {
        return null;
      } else {
        const details = <div className="movie-info">
            <div className="image">
              <img src={this.state.info.Poster}></img>
            </div>
            <div className="details">
              <h3>{this.state.info.Title}</h3>
              <ul>
                <li><span>Year: </span>{this.state.info.Year}</li>
                <li><span>Genre: </span> {this.state.info.Genre}</li>
                <li><span>Runtime: </span>{this.state.info.Runtime}</li>
                <li><span>Director: </span>{this.state.info.Director}</li>
                <li><span>Actors: </span>{this.state.info.Actors}</li>
                <li><span>Description: </span>{this.state.info.Plot}</li>
                <li><span>Awards: </span>{this.state.info.Awards}</li>
                <li><span>IMDb rating: </span>{this.state.info.imdbRating}</li>
              </ul>
            </div>
          </div>
        return details
      }
    }
  }

  class SearchMovies extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        title: this.props.title
      }
    }
    handleClick = (e) => {
      e.preventDefault();
      console.log('kliknięty');
      console.log('Input value: ', this.input.value);
      this.setState({title: this.input.value});
    }

    render(){
        return <div className="container">
              <Header/>
              <form className="search-form">
                <div className="inputs">
                  <input type="text" name="search" ref={ (input) => {
                      return this.input = input;
                    } } placeholder="Find your favourite movies"></input>
                  <button onClick={this.handleClick}></button>
                </div>
              </form>
              <MovieInfo title={this.state.title}/>
            </div>
        }
  }

  class App extends React.Component {
    render(){
      return <SearchMovies/>
    }
  }
  ReactDOM.render(
      <App/>,
      document.getElementById('app')
  );
});
