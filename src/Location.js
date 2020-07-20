import React from "react";
import Mapa from "./Mapa";
import axios from "axios";

class Location extends React.Component {

  constructor(props) {
    super(props);
    this.autenticaPosicao = this.autenticaPosicao.bind(this);
    this.pegaDados = this.pegaDados.bind(this);
    this.codigoLinha = this.codigoLinha.bind(this);
    this.pegaParada = this.pegaParada.bind(this);
    
    this.state = {
      data: [],
      linha: "",
      lat: null,
      lng: null,
      posLat: []
    };
  }
  componentDidMount() {
    this.autenticaPosicao();
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (err) => this.setState({ errorMessage: err.message })
    );
    }
  posVeiculo(){
    const posLat =[];
    const posLng =[]
    const dado = this.state.data;
    for (let i = 0; i < dado.length; i++) {
        for (let j = 0; j < dado[i].vs.length; j++) {
              posLat.push(dado[i].vs[j].py);
              posLng.push(dado[i].vs[j].px);
        }
      }
      return {
        posLat,
        posLng
      }
}
  pegaDados = (e) => {
    this.setState({ data: e.target.value });
 }

  codigoLinha() {
    const codigoLinha = this.props.codigoLinha;
  }

  pegaParada(e) {
    this.setState({ parada: e.target.value });
  }

  autenticaPosicao() {
    axios({
      method: "post",
      url:
        "https://aiko-estagio-proxy.azurewebsites.net/Login/Autenticar?token=17de5123a0a6a4256b6ef631d0e8348a3a5aece6b36427f41f43b0967131d2ed",
    })
      .then((response) => {
        console.log(response);
        axios
          .get("https://aiko-estagio-proxy.azurewebsites.net/Posicao",)
          .then((response) => {
              const data = response.data.l;
              console.log(response);
              
              this.setState({ data });

          })
          .catch(function (error) {
            console.log(error, "erro meth get");
          });
      })
      .catch(function (error) {
        console.log(error, "erro meth Post");
      });
  }

  renderContent() {
    const latLng = this.posVeiculo();
    if (this.state.errorMessage && !this.state.lat && !this.state.lng) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <Mapa key={Mapa.id} lat={this.state.lat} lng={this.state.lng} latitudeParada={latLng.posLat} longitudeParada={latLng.posLng}/>;
    }
  }
  render() {
    this.posVeiculo();
    const dado = this.state.data;
    const item = [];
    for (let i = 0; i < dado.length; i++) {
        for (let j = 0; j < dado[i].vs.length; j++) {
            item.push(       
            <tbody className="table-body">
              <tr>
                <td>{dado[i].lt0}</td>
                <td>{dado[i].vs[j].py}</td>
                <td>{dado[i].vs[j].px}</td>
              </tr>
            </tbody>
            )
        }
    }  

    return (
      <div>
          <div>{this.renderContent()}</div>
      </div>
    );
  }
}

export default Location;
