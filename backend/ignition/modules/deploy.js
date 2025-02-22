const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

async function main() {
  console.log("Iniciando o deploy...");

  const Seguro = await ethers.getContractFactory("SeguroDidaticoCompleto");
  console.log("Fábrica do contrato obtida.");

  const seguro = await Seguro.deploy();
  console.log("Transação de deploy enviada. Aguardando...");

  await seguro.waitForDeployment();
  console.log("Contrato implantado!");

  console.log("Contrato implantado para:", seguro.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});