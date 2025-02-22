const express = require('express');
const cors = require('cors');

//const { JsonRpcProvider } = require('ethers');
const { ethers } = require('ethers');
require('dotenv').config();

// config do servidor Express
const app = express();
app.use(express.json());
app.use(cors());

// connect provider do Ethereum
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// mock para evitar chamadas ao ENS
provider.resolveName = async function(name) {
    return name;
};

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function checkNetwork() {
    try {
        
        await provider.ready;

        const network = await provider.getNetwork();
        console.log('Rede conectada:', network.name);

        if (network.name === 'unknown' || network.name !== 'hardhat') {
            console.log('Rede não oferece suporte a ENS, desabilitando.');
            provider.ensAddress = null;
        } else {
            console.log('Rede Hardhat detectada.');
        }
    } catch (error) {
        console.error('Erro ao obter rede:', error);
    }
}

checkNetwork();

// ABI do contrato
const Contrato = require("../artifacts/contracts/index.sol/SeguroDidaticoCompleto.json");
const contractABI = Contrato.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

// instância do contrato
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
module.exports = { contract, provider };

// rotas definidas no arquivo de rotas
const router = require('./routes/seguroRoutes.js');
app.use('/api', router);

// rota para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});