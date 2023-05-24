
import Estatisticas from './Estatisticas';
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

function preencherEstatistica(transacoes : Transacao[]) : void {
 const data = new Estatisticas(transacoes);

 const totalElement = document.querySelector<HTMLElement>("#total span");
 if (totalElement) {
  totalElement.innerText = data.total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
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