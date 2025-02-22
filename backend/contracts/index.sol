// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SeguroDidaticoCompleto
 * @dev Contrato que combina sistema de seguros com sistema de pagamentos
 */
contract SeguroDidaticoCompleto {
    // ======= PARTE 1: ESTRUTURAS DE DADOS BÁSICAS =======
    
    struct Segurado {
        string nome;
        string documento;
        bool ativo;
        uint256 dataCadastro;
    }

    struct Apolice {
        address segurado;
        string tipoSeguro;
        uint256 valorPremio;
        uint256 valorCobertura;
        uint256 dataInicio;
        uint256 dataFim;
        bool ativa;
    }

    struct Sinistro {
        uint256 idApolice;
        string descricao;
        uint256 valorPedido;
        bool aprovado;
        bool processado;
        uint256 dataPedido;
    }

    // ======= PARTE 2: VARIÁVEIS DE ESTADO =======
    
    mapping(address => Segurado) public segurados;
    mapping(uint256 => Apolice) public apolices;
    mapping(uint256 => Sinistro) public sinistros;
    
    // Novos mappings para controle de pagamentos
    mapping(uint256 => uint256) public pagamentosApolice;
    mapping(uint256 => bool) public premiosPagos;

    uint256 public totalApolices;
    uint256 public totalSinistros;
    address public seguradora;

    // ======= PARTE 3: EVENTOS =======
    
    event SeguradoCadastrado(address indexed segurado, string nome);
    event ApoliceEmitida(uint256 indexed idApolice, address indexed segurado);
    event SinistroCriado(uint256 indexed idSinistro, uint256 indexed idApolice);
    event SinistroProcessado(uint256 indexed idSinistro, bool aprovado);
    event PremioRecebido(uint256 indexed idApolice, uint256 valor);
    event IndenizacaoPaga(uint256 indexed idSinistro, uint256 valor);

    // ======= PARTE 4: CONSTRUTOR =======
    
    constructor() {
        seguradora = msg.sender;
    }

    // ======= PARTE 5: MODIFICADORES =======
    
    modifier apenasSeguradora() {
        require(msg.sender == seguradora, "Apenas a seguradora pode executar esta funcao");
        _;
    }

    modifier apoliceValida(uint256 _idApolice) {
        require(_idApolice < totalApolices, "Apolice nao existe");
        require(apolices[_idApolice].ativa, "Apolice nao esta ativa");
        _;
    }

    // ======= PARTE 6: FUNÇÕES DE GESTÃO DE SEGURADOS E APÓLICES =======

    function cadastrarSegurado(
        address _endereco,
        string memory _nome,
        string memory _documento
    ) external apenasSeguradora {
        require(!segurados[_endereco].ativo, "Segurado ja cadastrado");

        segurados[_endereco] = Segurado({
            nome: _nome,
            documento: _documento,
            ativo: true,
            dataCadastro: block.timestamp
        });

        emit SeguradoCadastrado(_endereco, _nome);
    }

    function criarApolice(
        address _segurado,
        string memory _tipoSeguro,
        uint256 _valorPremio,
        uint256 _valorCobertura,
        uint256 _duracaoDias
    ) external apenasSeguradora returns (uint256) {
        require(segurados[_segurado].ativo, "Segurado nao esta ativo");

        uint256 idApolice = totalApolices++;

        apolices[idApolice] = Apolice({
            segurado: _segurado,
            tipoSeguro: _tipoSeguro,
            valorPremio: _valorPremio,
            valorCobertura: _valorCobertura,
            dataInicio: block.timestamp,
            dataFim: block.timestamp + (_duracaoDias * 1 days),
            ativa: true
        });

        emit ApoliceEmitida(idApolice, _segurado);
        return idApolice;
    }

    // ======= PARTE 7: FUNÇÕES DE GESTÃO DE SINISTROS =======

    function registrarSinistro(
        uint256 _idApolice,
        string memory _descricao,
        uint256 _valorPedido
    ) public apoliceValida(_idApolice) returns (uint256) {
        require(apolices[_idApolice].segurado == msg.sender, "Apenas o segurado pode registrar sinistro");
        require(_valorPedido <= apolices[_idApolice].valorCobertura, "Valor excede cobertura");
        require(premiosPagos[_idApolice], "Premio do seguro nao foi pago");

        uint256 idSinistro = totalSinistros++;

        sinistros[idSinistro] = Sinistro({
            idApolice: _idApolice,
            descricao: _descricao,
            valorPedido: _valorPedido,
            aprovado: false,
            processado: false,
            dataPedido: block.timestamp
        });

        emit SinistroCriado(idSinistro, _idApolice);
        return idSinistro;
    }

    // ======= PARTE 8: FUNÇÕES DE PAGAMENTO =======

    function pagarPremio(uint256 _idApolice) external payable apoliceValida(_idApolice) {
        Apolice storage apolice = apolices[_idApolice];
        
        require(msg.value == apolice.valorPremio, "Valor incorreto do premio");
        require(msg.sender == apolice.segurado, "Apenas o segurado pode pagar o premio");
        require(!premiosPagos[_idApolice], "Premio ja foi pago");
        
        pagamentosApolice[_idApolice] = msg.value;
        premiosPagos[_idApolice] = true;
        
        emit PremioRecebido(_idApolice, msg.value);
    }

    function processarEPagarSinistro(uint256 _idSinistro, bool _aprovado) external apenasSeguradora {
        Sinistro storage sinistro = sinistros[_idSinistro];

        require(!sinistro.processado, "Sinistro ja foi processado");
        require(premiosPagos[sinistro.idApolice], "Premio do seguro nao foi pago");

        address payable seguradoAddress = payable(apolices[sinistro.idApolice].segurado);
        require(seguradoAddress != address(0), "Endereco do segurado invalido");

        if (_aprovado) {
            require(address(this).balance >= sinistro.valorPedido, "Saldo insuficiente");
        }

        sinistro.aprovado = _aprovado;
        sinistro.processado = true;

        emit SinistroProcessado(_idSinistro, _aprovado);

        if (_aprovado) {
            (bool success, ) = seguradoAddress.call{value: sinistro.valorPedido}("");
            require(success, "Falha na transferencia do pagamento");

            emit IndenizacaoPaga(_idSinistro, sinistro.valorPedido);
        }
    }

    // ======= PARTE 9: FUNÇÕES DE CONSULTA E UTILITÁRIAS =======

    function consultarApoliceBase(uint256 _idApolice) external view returns (
        address segurado,
        string memory tipoSeguro,
        uint256 valorPremio,
        uint256 valorCobertura
    ) {
        Apolice storage apolice = apolices[_idApolice];
        return (
            apolice.segurado,
            apolice.tipoSeguro,
            apolice.valorPremio,
            apolice.valorCobertura
        );
    }

    function consultarApoliceStatus(uint256 _idApolice) external view returns (
        uint256 dataInicio,
        uint256 dataFim,
        bool ativa,
        bool paga
    ) {
        Apolice storage apolice = apolices[_idApolice];
        return (
            apolice.dataInicio,
            apolice.dataFim,
            apolice.ativa,
            premiosPagos[_idApolice]
        );
    }

    function consultarSegurado(address _endereco) external view returns (
        string memory nome,
        string memory documento,
        bool ativo,
        uint256 dataCadastro
    ) {
        Segurado storage segurado = segurados[_endereco];
        return (
            segurado.nome,
            segurado.documento,
            segurado.ativo,
            segurado.dataCadastro
        );
    }

    function saldoContrato() external view returns (uint256) {
        return address(this).balance;
    }

    function apoliceEstaPaga(uint256 _idApolice) external view returns (bool) {
        return premiosPagos[_idApolice];
    }

    function retirarFundos(uint256 _valor) external apenasSeguradora {
        require(address(this).balance >= _valor, "Saldo insuficiente");
        payable(seguradora).transfer(_valor);
    }

    receive() external payable {}

    fallback() external payable {}

}