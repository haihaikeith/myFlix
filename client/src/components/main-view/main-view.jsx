class MainView extends React.Component {
  constructor(){
    //call the superclass constructor so react can initialize it
    super();

    // initialize the state to an empty object so we can destructure later
    this.state ={};
  }
    //this overrides render() method of superclass
    //no need to call super() as it does nothing by default
  
    //one of the hooks availabe in a react component
    componentDidMount(){
      axios.get('<my-api-endpoin/movies>')
      .then(response => {
        //assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    render(){
      // if the state isn't initialized, this will throw on runtime before the data is initially loaded
      const { movies } =this.state;

      // before the movies have been loaded
      if (!movies) return <div className="main-view"/>;

      return (
        <div className="main-view">
        { movies.map(movie => {
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        })}
        </div>
      );
    }

}