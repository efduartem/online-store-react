import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as request from 'superagent';
import HeaderComponent from './headerComponent.jsx'

const cardStyle = {
      position: 'relative',
      display: '-ms-flexbox',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '0',
      wordWrap: 'break-word',
      backgroundColor: '#fff',
      backgroundClip: 'border-box',
      border: '1px solid rgba(0,0,0,.125)',
      borderRadius: '.25rem'
};

const cardImgTop = {
    width: '100%',
    borderTopLeftRadius: 'calc(.25rem - 1px)',
    borderTopRightRadius: 'calc(.25rem - 1px)'
}

const cardBody = {
    MsFlex: '1 1 auto',
    flex: '1 1 auto',
    padding: '1.25rem'
}

const cardTitle = {
    marginBottom: '.75rem'
}

const cardFooter = {
    borderRadius: '0 0 calc(.25rem - 1px) calc(.25rem - 1px)',
    padding: '.75rem 1.25rem',
    backgroundColor: 'rgba(0,0,0,.03)',
    borderTop: '1px solid rgba(0,0,0,.125)'
}

const mb4 = {
    marginBottom: '1.5rem'
}

const cardImg  = {
  objectFit:'scaleDown',
  width: '242px',
  height: '200px'
}

const quantityInput = {
  width:'40px',
  marginLeft:'2%'
}

const showMoreButton = {
  float:'left'
}

const catalogListDiv = {
  overflowY: 'auto',
  height: '75vh'
}

class ProductList extends React.Component{

    constructor(){
     super();
     this.state = {
        productos : [],
        productosFiltrados: [],
        shoppingCart : []
     };

    }

    componentWillMount(){
      request.get('https://online-store-nextu.firebaseio.com/productos.json')
              .end((err, res)=>{
                if(err || !res.ok){
                  console.log("Error en la peticio: "+err);
                }else{
                  this.setState({ productos : JSON.parse(res.text)});
                  this.setState({ productosFiltrados : JSON.parse(res.text)});
                  // console.log("Datos obtenidos correctamente: ", this.state.productos);
                }
              })
    }

    handleChange(event) {
      let filterValue = event.target.value;
      let productos_search = [];
      filterValue.toLowerCase();

      this.state.productos.map( (producto,i) => {
          let precioString = String(producto.precio);
          let stockString = String(producto.stock);

          if(producto.nombre.toLowerCase().indexOf(filterValue)>=0
            || precioString.indexOf(filterValue)>=0
            || stockString.indexOf(filterValue)>=0){
            productos_search.push(producto);
          }
      })

      this.setState({ productosFiltrados : productos_search});

    }

    addProduct(i, event){
      let idProductInput = document.getElementById("producto"+i);
      let inputValue = ReactDOM.findDOMNode(idProductInput).value;
      let shoppingCartItem = {
        producto: this.state.productos[i],
        quantity: inputValue,
        subTotal: (Number(inputValue) * this.state.productos[i].precio)
      }
      var shoppingCart = this.state.shoppingCart;
      shoppingCart.push(shoppingCartItem);
      this.setState({shoppingCart:shoppingCart});
      document.getElementById("shoppingCartBadge").innerHTML = shoppingCart.length;
    }

    render(){
        return(
        <div>
          <div className="row text-center">
            <div className="col-sm-12">
              <div className="col-sm-12 col-md-6 text-left">
                <h1>Catálogo de Productos</h1>
              </div>
              <div className="col-sm-12 col-md-push-3 col-md-3 text-right">
                <div className="col-sm-12 text-left">
                  <h5>Que estas buscando?</h5>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Buscar Producto" onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center" style={catalogListDiv}>
            {this.state.productosFiltrados.map((producto, i) =>
              <div className="col-lg-3 col-md-6" key={i}>
                <div className="thumbnail">
                  <img style={cardImg} src={producto.img} alt=""/>
                  <div className="caption text-left">
                    <h3>{producto.nombre}</h3>
                    <p><strong>Precio:</strong> Gs. {producto.precio}</p>
                    <p><strong>Unidades Disponibles:</strong> {producto.stock}</p>
                    <div className="text-right">
                      <Link to={{pathname: '/productShow/'+producto.index}} className="btn btn-primary" style={showMoreButton} role="button">Ver mas</Link>
                      <a className="btn btn-warning" role="button" onClick={this.addProduct.bind(this, producto.index)}>Añadir</a>
                      <input id={"producto"+producto.index} style={quantityInput} type="number" defaultValue="1"/>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-lg-3 col-md-6" style={mb4}>
              <div style={cardStyle}>
                <img style={cardImgTop} src="http://placehold.it/500x325" alt=""/>
                <div style={cardBody}>
                  <h4 style={cardTitle}>Card title</h4>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
                </div>
                <div style={cardFooter}>
                  <a href="#" className="btn btn-primary">Find Out More!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
            );
        }
      }

export default ProductList;
