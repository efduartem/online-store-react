import React from 'react';
import * as request from 'superagent';
import { Link } from 'react-router-dom';


const productImage = {
  height:'450px'
}


class ProductShow extends React.Component{

    constructor(){
     super();
     this.state = {
        producto : {}
     };
    }

    componentWillMount(){
      let productIndex = this.props.match.params.index;
      request.get('https://online-store-nextu.firebaseio.com/productos/'+productIndex+'.json')
              .end((err, res)=>{
                if(err || !res.ok){
                  console.log("Error en la peticio: "+err);
                }else{
                  this.setState({ producto : JSON.parse(res.text)});
                }
              })
    }

    render(){

        return(
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-12 col-md-6 text-left">
              <h1>{this.state.producto.nombre}</h1>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="col-sm-8 thumbnail">
              <img src={this.state.producto.img} alt={this.state.producto.nombre} style={productImage}/>
            </div>
            <div className="col-sm-4">
              <p><strong>Precio:</strong> Gs. {this.state.producto.precio}</p>
              <p><strong>Unidades Disponibles:</strong> {this.state.producto.stock}</p>
            </div>
            <div className="col-sm-12">
              <p>
                <Link to={{pathname: '/productList'}} className="btn btn-primary" role="button">Atras</Link>
              </p>
            </div>
          </div>
        </div>

            );
        }
      }

export default ProductShow;
