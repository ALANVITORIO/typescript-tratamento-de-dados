
import Estatisticas from './Estatisticas';
import { CountList } from './countBy';
import fetchData from './fetchData';
import normalizarTransacao from './normalizarTransacao';




async function handleData(){
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );
  if (!data) return;
  const transacoes = data.map(normalizarTransacao);
  console.log(transacoes);
  preencherTabela(transacoes);
  preencherEstatistica(transacoes);
}

function preencherLista (lista : CountList, containeirId : string): void{
  const containerElement = document.getElementById(containeirId);
  if (containerElement) {
    Object.keys(lista).forEach((key)=> {
      containerElement.innerHTML += `<p>${key} : ${lista[key]}
       </p>`
    });
  }
}


function preencherEstatistica(transacoes : Transacao[]) : void {
 const data = new Estatisticas(transacoes);
 
  preencherLista(data.pagamento, "pagamento");
  preencherLista(data.status, "status");


  const pagamentoElement = document.getElementById("pagamento");
  if (pagamentoElement) {
    Object.keys(data.pagamento).forEach((key)=> {
      pagamentoElement.innerHTML += `<p>${key} : ${data.pagamento[key]}
       </p>`});
  }


 const totalElement = document.querySelector<HTMLElement>("#total span");
 if (totalElement) {
  totalElement.innerText = data.total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
 }
  const diaElement = document.querySelector<HTMLElement>("#dia span");
  if (diaElement) {
    diaElement.innerText = data.melhordia[0];  
  }
}

function preencherTabela(transacoes : Transacao[]) : void {
  const tabela = document.querySelector("#transacoes tbody");
  if (!tabela) return;



  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
      <tr>
        <td> ${transacao.nome} </td>
        <td> ${transacao.email} </td>
        <td> ${transacao.moeda} </td>
        <td> ${transacao.pagamento} </td>
        <td> ${transacao.status} </td>
      </tr>
    `

   });
}

handleData();