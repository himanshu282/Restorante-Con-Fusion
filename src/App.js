import Main from './component/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

// import DishDetail from './component/DishdetailComponent';
// import DishDetail from './component/Dish1';
const store = ConfigureStore();
class App extends Component{
  
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main/>
        {/* <Menu dishes={this.state.dishes}/>
        <DishDetail dishes={this.state.dishes}/> */}
        </div>
      </BrowserRouter>
      </Provider>
      
    );
  }
}



export default App;
