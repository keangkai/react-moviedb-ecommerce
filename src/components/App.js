import React from "react"
import Navbar from "./Nav"
import SearchInput from "./SearchInput"
import MovieList from "./MovieList"

const PAGE_LIST = 'list';
const PAGE_CART = 'cart';

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      movies: [],
      search: '',
      increase: 0,
      currentMovie: null,
      cart: [],
      page: PAGE_LIST
    }
    this.apiKey = process.env.REACT_APP_API
  }



  handleSubmit = (e) => {
    e.preventDefault()

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results]})
    })
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value})
  }

  handleIncrease = (product) => {
    let newCart = [...this.state.cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    this.setState({ cart: newCart })

  }

  getMovie = (id) => {
    const filterMovie = this.state.movies.filter(movie => movie.id === id)

    const newCurrentMovie = filterMovie.length > 0 ? filterMovie[0] : null

    this.setState({ currentMovie: newCurrentMovie })
  }

  clearMovie = () => {
    this.setState({ currentMovie: null })
  }

  getTotalSum = () => {
    const { cart } = this.state
    if (cart.length >= 3) {
      return cart.reduce(
        (sum, { price, quantity }) => (sum + price * quantity) * 0.1 , 0);
    } else if(cart.length >= 5) {
      return cart.reduce(
        (sum, { price, quantity }) => (sum + price * quantity) * 0., 0);
    } else {
      return cart.reduce(
        (sum, { price, quantity }) => sum + price * quantity, 0);
    }
    
  };

  clearCart = () => {
      this.setState({ cart: [] })
  };

  setQuantity = (product, amount) => {
    const newCart = [...this.state.cart];
    newCart.find(
      (item) => item.name === product.name
    ).quantity = amount;
    this.setState({ cart: newCart })
  };

  removeFromCart = (productToRemove) => {
    console.log('productToRemove', productToRemove)
    console.log('cart', this.state.cart)
    this.setState({ cart: this.state.cart.filter((product) => product !== productToRemove) })
  };

  getCartTotal = () => {
    return this.state.cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  navigateTo = (nextPage) => {
    this.setState({ page: nextPage });
  };


  render(){
    const { cart, page } = this.state
    return (
      <div className="App">
        <Navbar />
        <header style={{ display: 'flex', justifyContent: 'center'}}>
        <button style={{ margin: '1%'}} class="btn waves-effect waves-light" onClick={() => this.navigateTo(PAGE_CART)} name="action">Cart Selected
          ({this.getCartTotal()})
        </button>
        <button style={{ margin: '1%'}} class="btn waves-effect waves-light" onClick={() => this.navigateTo(PAGE_LIST)} name="action">View Movie List
          <i class="material-icons right">send</i>
        </button>
      </header>
      {page === PAGE_LIST && (
        <>
          <SearchInput handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
          <MovieList movies={this.state.movies} handleIncrease={this.handleIncrease} getMovie={this.getMovie}/>
        </>
      )}
      {page === PAGE_CART && (
        <>
        <h1>Cart</h1>
        {cart.length > 0 && (
          <button onClick={this.clearCart}>Clear Cart</button>
        )}
        <div className="products">
          {cart.map((product, idx) => (
            <div className="product" key={idx}>
              <h3>{product.name}</h3>
              <h4>${product.price}</h4>
              <input
                value={product.quantity}
                onChange={(e) =>
                  this.setQuantity(
                    product,
                    parseInt(e.target.value)
                  )
                }
              />
              <img src={`http://image.tmdb.org/t/p/w185${product.image}`} alt="card image" style={{ width: "20%", height: 360 }}/>
              <button onClick={() => this.removeFromCart(product)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      <div>Total Cost: ${this.getTotalSum()}</div>
      </>
      )}
      </div>
    );
  }
}

export default App;
