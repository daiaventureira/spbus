import React, { Component } from "react";
import axios from "axios";

class Linha extends Component {
  constructor(props) {
    super(props);
    this.autentica = this.autentica.bind(this);
    this.pegaLinha = this.pegaLinha.bind(this);

    this.state = {
      linha: "",
      data: [],
    };
  }
  pegaLinha = (e) => {
    this.setState({ linha: e.target.value });
  };
  pegaDados = (e) => {
    this.setState({ data: e.target.value });
  };

  autentica(e) {
    e.preventDefault();

    axios({
      url:
        "https://aiko-estagio-proxy.azurewebsites.net/Login/Autenticar?token=17de5123a0a6a4256b6ef631d0e8348a3a5aece6b36427f41f43b0967131d2ed",
      method: "post",
    })
      .then((response) => {
        console.log(response);
        axios
          .get("https://aiko-estagio-proxy.azurewebsites.net/Linha/Buscar", {
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
    const itens = [];
    const codigoLinha = [];

    for (let i = 0; i < this.state.data.length; i++) {
      const data = this.state.data[i];
      codigoLinha.push(<div>{data.cl}</div>);
      itens.push(
        <tbody className='table-body-linha'>
          <tr className='informacao-linha'>
            <td>Código da Linha: {data.cl}</td>
            <td>Terminal principal: {data.tp}</td>
            <td>Terminal Secundário: {data.ts}</td>
            <td>Sentido: {data.sl}</td>
          </tr>
        </tbody>
      );
    }
    return (
      <div>
        <form className='form-linha' onSubmit={this.autentica}>
            <div className='cobre-btn-linha'>
            <label>
            <input
            className='procura-linha'
              type="text"
              name="linha"
              placeholder='Número da linha'
              onChange={this.pegaLinha}
            />
          </label>
          <button
              className="btn-pesquisar"
              name="submit"
              id="submit"
              type="submit"
            >
              <i className="fa fa-search"></i>
            </button>
            </div>
         
        </form>
        <div className='linha'>
        <table>
          <tbody>{itens}</tbody>
        </table>
        </div>
        
      </div>
    );
  }
}
export default Linha;
