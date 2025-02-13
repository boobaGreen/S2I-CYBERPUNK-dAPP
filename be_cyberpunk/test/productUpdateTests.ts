import { expect } from "chai";
import { ethers } from "hardhat";

describe("CyberPunkBoutique - Product Update Tests", function () {
    let CyberPunkBoutique: any;
    let cyberPunkBoutique: any;
    let owner: any;
    let addr1: any;

    beforeEach(async function () {
        CyberPunkBoutique = await ethers.getContractFactory("CyberPunkBoutique");
        [owner, addr1] = await ethers.getSigners();
        cyberPunkBoutique = await CyberPunkBoutique.deploy();
    });

    it("Should update product CID", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.updateProductCid(1, "newCid");
        const product = await cyberPunkBoutique.products(1);
        expect(product.cid).to.equal("newCid");
    });

    it("Should fail to update product CID if product does not exist", async function () {
        await expect(cyberPunkBoutique.updateProductCid(1, "newCid")).to.be.revertedWith("Product does not exist");
    });

    it("Should fail to update product CID if product is not available", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.updateProductCid(1, "newCid")).to.be.revertedWith("Cannot update CID after purchase");
    });

    it("Should update product price", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.updateProductPrice(1, ethers.parseEther("2"));
        const product = await cyberPunkBoutique.products(1);
        expect(product.price).to.equal(ethers.parseEther("2"));
    });

    it("Should fail to update product price if product does not exist", async function () {
        await expect(cyberPunkBoutique.updateProductPrice(1, ethers.parseEther("2"))).to.be.revertedWith("Product does not exist");
    });

    it("Should fail to update product price if product is not available", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.updateProductPrice(1, ethers.parseEther("2"))).to.be.revertedWith("Cannot update price after purchase");
    });

    it("Should update product state from Available to Unavailable", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.updateProductState(1, 3); // ProductState.Unavailable
        const product = await cyberPunkBoutique.products(1);
        expect(product.state).to.equal(3); // ProductState.Unavailable
    });

    it("Should update product state from Unavailable to Available", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.updateProductState(1, 3); // ProductState.Unavailable
        await cyberPunkBoutique.updateProductState(1, 0); // ProductState.Available
        const product = await cyberPunkBoutique.products(1);
        expect(product.state).to.equal(0); // ProductState.Available
    });

    it("Should fail to update product state if state transition is invalid", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.updateProductState(1, 4)).to.be.revertedWith("Invalid state");
    });

    it("Should fail to update product state if product does not exist", async function () {
        await expect(cyberPunkBoutique.updateProductState(1, 3)).to.be.revertedWith("Product does not exist");
    });

    it("Should fail to update product state if product is purchased or shipped", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.updateProductState(1, 3)).to.be.revertedWith("Cannot update state after purchase or shipment");
    });
});