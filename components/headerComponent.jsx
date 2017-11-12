import React from 'react';
import * as request from 'superagent';
import { NavItem, Glyphicon } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ProductList from './productList.jsx';
import ProductShow from './productShow.jsx';
import ShoppingCart from './shoppingCart.jsx';

const badgeColor = {
  backgroundColor : 'red'
}

class HeaderComponent extends React.Component{

    constructor(){
       super();
    }


    render(){
        return(
          <Router>
            <div className="container">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                      La Bodega
                    </a>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                      <NavItem href="/productList" to="/productList" componentClass={Link} >
                        <Glyphicon glyph="th" />
                      </NavItem>
                      <NavItem href="/shoppingCart" to="/shoppingCart" componentClass={Link}>
                        <Glyphicon glyph="shopping-cart" /><span style={badgeColor} className="badge" id="shoppingCartBadge"></span>
                      </NavItem>
                      <NavItem href="#">
                        <Glyphicon glyph="inbox" />
                      </NavItem>
                      <NavItem href="#">
                        <Glyphicon glyph="log-out" />
                      </NavItem>
                    </ul>
                  </div>
                </div>
              </nav>
              <Route exact path="/" component={ProductList}/>
              <Route path="/productList" component={ProductList}/>
              <Route path="/productShow/:index" component={ProductShow}/>
              <Route path="/shoppingCart" component={ShoppingCart}/>
            </div>
          </Router>
            );
        }
      }

export default HeaderComponent;
