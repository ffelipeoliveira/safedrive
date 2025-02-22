const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = ethers;

describe("Seguro", function () {
  let seguro;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Seguro = await ethers.getContractFactory("SeguroDidaticoCompleto");
    seguro = await Seguro.deploy();
  });

  describe("Deploy", function () {
    it("Deve definir o endereço correto da seguradora", async function () {
      expect(await seguro.seguradora()).to.equal(owner.address);
    });
  });

  describe("Gestão de Segurados", function () {
    it("Deve cadastrar um novo segurado", async function () {
      await seguro.cadastrarSegurado(
        addr1.address,
        "João Silva",
        "123.456.789-00"
      );
      
      const segurado = await seguro.consultarSegurado(addr1.address);
      expect(segurado.nome).to.equal("João Silva");
      expect(segurado.documento).to.equal("123.456.789-00");
      expect(segurado.ativo).to.equal(true);
    });

    it("Não deve permitir cadastrar segurado duplicado", async function () {
      await seguro.cadastrarSegurado(
        addr1.address,
        "João Silva",
        "123.456.789-00"
      );
      
      await expect(
        seguro.cadastrarSegurado(
          addr1.address,
          "João Silva 2",
          "987.654.321-00"
        )
      ).to.be.revertedWith("Segurado ja cadastrado");
    });
  });

  describe("Gestão de Apólices", function () {
    beforeEach(async function () {
      await seguro.cadastrarSegurado(
        addr1.address,
        "João Silva",
        "123.456.789-00"
      );
    });

    it("Deve criar uma nova apólice", async function () {
      const valorPremio = parseEther("0.1");
      const valorCobertura = parseEther("1.0");
      
      await seguro.criarApolice(
        addr1.address,
        "Vida",
        valorPremio,
        valorCobertura,
        365
      );

      const apolice = await seguro.consultarApoliceBase(0);
      expect(apolice.segurado).to.equal(addr1.address);
      expect(apolice.tipoSeguro).to.equal("Vida");
      expect(apolice.valorPremio).to.equal(valorPremio);
      expect(apolice.valorCobertura).to.equal(valorCobertura);
    });
  });

  describe("Gestão de Pagamentos", function () {
    let idApolice;
    const valorPremio = parseEther("0.1");
    const valorCobertura = parseEther("1.0");

    beforeEach(async function () {
      await seguro.cadastrarSegurado(
        addr1.address,
        "João Silva",
        "123.456.789-00"
      );

      await seguro.criarApolice(
        addr1.address,
        "Vida",
        valorPremio,
        valorCobertura,
        365
      );

      idApolice = 0;
    });

    it("Deve permitir pagamento do prêmio", async function () {
      await seguro.connect(addr1).pagarPremio(idApolice, {
        value: valorPremio
      });

      expect(await seguro.apoliceEstaPaga(idApolice)).to.equal(true);
    });
  });
});