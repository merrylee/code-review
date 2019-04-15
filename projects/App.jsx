import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import './App.css';

const Home = () => <h1>Home</h1>;

const Links = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
    </nav>
);

const Menu = () => (
    <div>
         <h1>Menu</h1>
         <nav>
            <Link to="/menu/food">Food</Link>
            <Link to="/menu/drinks">Drinks</Link>
            <Link to="/menu/sides">Sides</Link>
            <Route
                path="/:page?/:subpage?"
                render={({ match }) => <h1>{match.params.subpage}</h1>} />
        </nav>
    </div>
)

const App = () => (
    <Router>
        <div>
            <Links />
            <Route exact path="/" component={Home} />
            <Route path="/menu" component={Menu} />
        </div>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));