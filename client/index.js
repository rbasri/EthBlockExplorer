import "./index.scss";

const server = "http://localhost:3042";


document.getElementById("get-balance").addEventListener('click', () => {
    const value = document.getElementById("exchange-address").value;
    if(value === "") {
      document.getElementById("balance").innerHTML = 0;
      return;
    }
  
    fetch(`${server}/balance/${value}`).then((response) => {
      return response.json();
    }).then(( balance ) => {
      document.getElementById("balance").innerHTML = balance.mybalance;
    });

});
  
document.getElementById("get-latest-block").addEventListener('click', () => {

  fetch(`${server}/latest-block`).then((response) => {
    return response.json();
  }).then(( {block} ) => {
    document.getElementById("latest-block").innerHTML = `<br>
      Transaction Hash----->${block.hash} <br>
      Block Number----->${block.number} <br>
      Miner----->${block.miner} <br>
      Transcation Count:----->${block.transactions.length}
      `;
  });
});

document.getElementById("get-gas-estimate").addEventListener('click', () => {

  fetch(`${server}/gas-estimate`).then((response) => {
    return response.json();
  }).then(( estimate ) => {
    document.getElementById("gas-estimate").innerHTML = `<br>
      Gas estimate based on last block: ${estimate.result} gwei
      `;
  });
});