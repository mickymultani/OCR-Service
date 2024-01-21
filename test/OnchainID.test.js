const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OnchainID Contract", function () {
  let OnchainID;
  let onchainID;
  let owner;
  let addr1;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    OnchainID = await ethers.getContractFactory("OnchainID");
    [owner, addr1] = await ethers.getSigners();

    // Deploy a new contract before each test
    onchainID = await OnchainID.deploy();
  });

  describe("User Registration", function () {
    it("Should register a user and assign a unique ID", async function () {
      await onchainID.connect(addr1).registerUser();
      const userId = await onchainID.getUserInfo(addr1.address);
      expect(userId).to.be.above(0);
    });

    it("Should not allow a user to register more than once", async function () {
      await onchainID.connect(addr1).registerUser();
      await expect(onchainID.connect(addr1).registerUser()).to.be.revertedWith("User already registered.");
    });
  });

  describe("Attribute Management", function () {
    beforeEach(async function () {
      // Register a user before each test
      await onchainID.connect(addr1).registerUser();
    });

    it("Should allow a registered user to add an attribute", async function () {
      await onchainID.connect(addr1).addOrUpdateAttribute("email", "test@example.com");
      const email = await onchainID.connect(addr1).getAttribute("email");
      expect(email).to.equal("test@example.com");
    });

    it("Should not allow a non-registered user to add an attribute", async function () {
      await expect(onchainID.connect(owner).addOrUpdateAttribute("email", "owner@example.com")).to.be.revertedWith("User not registered.");
    });

    it("Should allow updating an existing attribute", async function () {
      await onchainID.connect(addr1).addOrUpdateAttribute("email", "test@example.com");
      await onchainID.connect(addr1).addOrUpdateAttribute("email", "updated@example.com");
      const email = await onchainID.connect(addr1).getAttribute("email");
      expect(email).to.equal("updated@example.com");
    });
  });

  describe("KYC (Know Your Customer)", function () {
    it("Should allow setting KYC status for a user", async function () {
      await onchainID.connect(addr1).registerUser();
      await onchainID.connect(addr1).updateKYCStatus("Verified");
      const kycStatus = await onchainID.connect(addr1).getKYCStatus(addr1.address);
      expect(kycStatus).to.equal("Verified");
    });

    it("Should return an empty string for KYC status by default", async function () {
      await onchainID.connect(addr1).registerUser();
      const kycStatus = await onchainID.connect(addr1).getKYCStatus(addr1.address);
      expect(kycStatus).to.equal("");
    });
  });
});
