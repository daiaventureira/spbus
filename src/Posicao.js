// import React, { Component } from "react";
// import axios from "axios";
// import Map from './Map';

// class Posicao extends Component {
//   constructor() {
//     super();
//     this.autenticaPosicao = this.autenticaPosicao.bind(this);
//     this.pegaDados = this.pegaDados.bind(this);

//     this.state={
//         data:[]
//     }
//   }

//   pegaDados = (e) => {
//      this.setState({ data: e.target.value });
//   };
  
//   componentDidMount(){
//       this.autenticaPosicao();
//   }

//   autenticaPosicao() {
//     axios({
//       method: "post",
//       url:
//         "https://aiko-estagio-proxy.azurewebsites.net/Login/Autenticar?token=17de5123a0a6a4256b6ef631d0e8348a3a5aece6b36427f41f43b0967131d2e",
//     })
//       .then((response) => {
//         console.log(response);
//         axios
//           .get("https://aiko-estagio-proxy.azurewebsites.net/Posicao",)
//           .then((response) => {
//               const data = response.data.l;
//               console.log(response);
              
//               this.setState({ data });

//           })
//           .catch(function (error) {
//             console.log(error, "erro meth get");
//           });
//       })
//       .catch(function (error) {
//         console.log(error, "erro meth Post");
//       });
//   }
//   render() {

//     const dado = this.state.data;

//     const item = [];
//     for (let i = 0; i < dado.length; i++) {

//         for (let j = 0; j < dado[i].vs.length; j++) {
//             item.push(       
//             <tbody className="table-body">
//               <tr>
//                 <td>{dado[i].lt0}</td>
//                 <td>{dado[i].vs[j].py}</td>
//                 <td>{dado[i].vs[j].px}</td>
//               </tr>
//             </tbody>
//             )
//             console.log('esses dados aqui',dado[i].lt0,dado[i].vs[j].py, dado[i].vs[j].px)
//         }
//       }  
//     return (
//     <div>
//         <div>{item}</div>
//     </div>
        
//     );
//   }
// }
// export default Posicao;
