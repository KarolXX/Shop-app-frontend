import './App.scss';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// product view
import Products from './components/Products';

// category view
import Categories from './components/Categories';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/products" style={{ color: "white" }}>Products</Link></li>
            <li><Link to="/categories" style={{ color: "white" }}>Categories</Link></li>
          </ul>
        </nav>
        <Route path="/products" component={Products}></Route>
        <Route path="/categories" component={Categories}></Route>
      </div>
    </Router >
  )
}

export default App;
