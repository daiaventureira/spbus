import React, { Component } from "react";
import axios from "axios";
import "./index.scss";
import { Button, Modal } from "react-bootstrap";

class Parada extends Component {
  constructor(props) {
    super(props);
    this.autenticaParada = this.autenticaParada.bind(this);
    this.pegaLinha = this.pegaLinha.bind(this);
    this.pegaParada = this.pegaParada.bind(this);
    this.escondeModal = this.escondeModal.bind(this);
    this.apareceModalParada = this.apareceModalParada.bind(this);

    this.state = {
      linha: "",
      data: [],
      previsao: [],
      apareceModal: false,
    };
  }

  apareceModalParada() {
    return this.setState({ apareceModalParada: true });
  }
  escondeModal() {
    return this.setState({ apareceModal: false });
  }

  pegaLinha = (e) => {
    this.setState({ linha: e.target.value });
  };
  pegaDados = (e) => {
    this.setState({ data: e.target.value });
  };

  autenticaParada(e) {
    e.preventDefault();

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

  pegaParada(cp) {
    axios({
      url:
        "https://aiko-estagio-proxy.azurewebsites.net/Login/Autenticar?token=17de5123a0a6a4256b6ef631d0e8348a3a5aece6b36427f41f43b0967131d2ed",
      method: "post",
    })
      .then((response) => {
        console.log(response);
        axios
          .get("https://aiko-estagio-proxy.azurewebsites.net/Previsao/Parada", {
            params: {
              codigoParada: cp,
            },
          })
          .then((response) => {
            const data = [response.data.p];
            return this.setState({ previsao: data });
          })
          .catch(function (error) {
            console.log(error, "erro");
          });
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ apareceModal: true });
  }

  render() {
    const previsao = [];

    if (this.state.previsao[0]) {
      const previsaoDados = this.state.previsao;

      for (let i = 0; i < previsaoDados.length; i++) {
        for (let j = 0; j < previsaoDados[i].l.length; j++) {
          for (let k = 0; k < previsaoDados[i].l[j].vs.length; k++) {

            const hora = previsaoDados[i].l[j].vs[k].t.split(":");

            const now = new Date();
            const referenceTime = new Date();

            referenceTime.setHours(parseInt(hora[0]));
            referenceTime.setMinutes(parseInt(hora[1]));

            const differenceInMinutes = Math.round(
              (referenceTime - now) / 1000 / 60
            );

            let passaEm = differenceInMinutes;

            if (differenceInMinutes <= 0) {
              passaEm = `há ${-differenceInMinutes}`;
            }

            previsao.push(
              <table>
              <tbody>
                <tr>
                  <td>Horário: {previsaoDados[i].l[j].vs[k].t}</td>
                  <td>Letreiro: {previsaoDados[i].l[j].lt0}</td>
                  <td>Passa em: {passaEm} min</td>
                </tr>
              </tbody>
              </table>
            );
          }
        }
      }
    }
    const itens = [];
    for (let i = 0; i < this.state.data.length; i++) {
      const data = this.state.data[i];
      itens.push(
        <table>
        <tbody className='paradas'>
          <tr className="endereco-parada">
            <td>Parada: {data.np}</td>
            <td>Rua: {data.ed}</td>
            <td>
            <button
              className="btn-horario"
              onClick={this.pegaParada.bind(this, data.cp)}
            >
              horários
            </button>
            <Modal
              className="modal"
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.state.apareceModal}
              onHide={this.escondeModal}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Horários e ônibus que passam nessa parada:
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>{previsao}</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className="btn-voltar"
                  onClick={this.escondeModal}
                >
                  voltar
                </Button>
              </Modal.Footer>
            </Modal>
            </td>
            </tr>
         </tbody>
        </table>
      );
    }

    return (
      <div>
        {this.item}
        <form className="form-parada" onSubmit={this.autenticaParada}>
          <div className="cobre-btn-parada">
            <label>
              <input
                className="procura-parada"
                placeholder="Nome da Parada"
                type="text"
                name="linha"
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

        <div className="paradas">
          <table>
          <tbody>{itens}</tbody>
          </table>
           
        </div>
      </div>
    );
  }
}

export default Parada;
