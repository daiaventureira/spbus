import React, { Component } from "react";
import "./index.scss";
import axios from "axios";
import {
  Marker,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
} from "react-google-maps";

class Mapa extends Component {
  constructor(props) {
    super(props);
    this.autenticaParada = this.autenticaParada.bind(this);
    this.pegaLinha = this.pegaLinha.bind(this);

    this.state = {
      refresh: new Date().toLocaleTimeString(),
      linha: "",
      data: [],
      mapstyle: [
        {
          featureType: "poi",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "transit.station.bus",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.autenticaParada();
  }

  pegaLinha = (e) => {
    this.setState({ linha: e.target.value });
  };
  pegaDados = (e) => {
    this.setState({ data: e.target.value });
  };

  autenticaParada() {
    axios({
      url:
        "https://aiko-estagio-proxy.azurewebsites.net/Login/Autenticar?token=17de5123a0a6a4256b6ef631d0e8348a3a5aece6b36427f41f43b0967131d2ed",
      method: "post",
    })
      .then((response) => {
        console.log(response);
        axios
          .get("https://aiko-estagio-proxy.azurewebsites.net/Parada/Buscar", {
            params: {
              termosBusca: this.state.linha,
            },
          })
          .then((response) => {
            const data = response.data;
            console.log(response);
            this.setState({ data });
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const latLng = [];
    for (let i = 0; i < this.props.latitudeParada.length; i++) {
      latLng.push(
        <Marker
        className="stopBus"
        key={Marker.id}
          icon={{
           
            url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
          }}
          position={{
            lat: this.props.latitudeParada[i],
            lng: this.props.longitudeParada[i],
          }}
        />
      );
    }

    const item = [];
    for (let i = 0; i < this.state.data.length; i++) {
      const data = this.state.data[i];
      item.push(
        <Marker
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scale: 0.01,
          }}
          position={{ lat: data.py, lng: data.px }}
        />
      );
    }
    const GoogleMapDisplay = withGoogleMap((props) => (
      <GoogleMap
        key={props.id}
        defaultCenter={{ lat: -23.5432, lng: -46.6292 }}
        defaultZoom={15}
        defaultOptions={{ styles: this.state.mapstyle }}
      >
        <Marker
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
          position={{ lat: -23.5432, lng: -46.6292 }}
        />

        {item}
        {latLng}
      </GoogleMap>
    ));
    return (
      <div>
        {this.item}
        <div lat={this.latitude}></div>

    <GoogleMapDisplay 
          key={GoogleMap.id}
          containerElement={<div className="map"></div>}
          mapElement={<div className="map" />}
        />
      </div>
    );
  }
}
export default Mapa;
