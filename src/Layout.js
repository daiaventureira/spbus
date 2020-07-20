import React, { Component } from "react";
import OlhoVivo from "./OlhoVivo";
import Location from "./Location";
import Parada from "./Parada";
import "./index.scss";

class Layout extends Component {
  render() {
    return (
      <div className="main-div-layout">
        <div className="layout">
          <div className="alinhar">
            <h1 className="titulo">SP Bus</h1>
            <div className="scroll-parada">
              {" "}
              <Parada key={Parada.id} />{" "}
            </div>
            <div className="scroll-linha">
              {" "}
              <OlhoVivo key={OlhoVivo.id}  />
            </div>
          </div>
          <Location key={Location.id} />
        </div>
      </div>
    );
  }
}
export default Layout;
