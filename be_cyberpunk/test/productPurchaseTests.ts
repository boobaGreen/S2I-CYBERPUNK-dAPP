import { expect } from "chai";
import { ethers } from "hardhat";

describe("CyberPunkBoutique - Product Purchase Tests", function () {
    let CyberPunkBoutique: any;
    let cyberPunkBoutique: any;
    let owner: any;
    let addr1: any;
    let addr2: any;

    beforeEach(async function () {
        CyberPunkBoutique = await ethers.getContractFactory("CyberPunkBoutique");
        [owner, addr1, addr2] = await ethers.getSigners();
        cyberPunkBoutique = await CyberPunkBoutique.deploy();
    });

    it("Should purchase a product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        const product = await cyberPunkBoutique.products(1);
        expect(product.state).to.equal(1); // ProductState.Purchased
    });

    it("Should fail to purchase a non-existent product", async function () {
        await expect(cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") })).to.be.revertedWith("Product does not exist");
    });

    it("Should fail to purchase a product with incorrect price", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("0.5") })).to.be.revertedWith("Incorrect amount sent");
    });

    it("Should fail to purchase an already purchased product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.connect(addr2).purchaseProduct(1, { value: ethers.parseEther("1") })).to.be.revertedWith("Product is not available");
    });

    it("Should allow multiple users to purchase different products", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.createProduct("Product2", ethers.parseEther("2"), "cid2");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await cyberPunkBoutique.connect(addr2).purchaseProduct(2, { value: ethers.parseEther("2") });
        const product1 = await cyberPunkBoutique.products(1);
        const product2 = await cyberPunkBoutique.products(2);
        expect(product1.state).to.equal(1); // ProductState.Purchased
        expect(product2.state).to.equal(1); // ProductState.Purchased
    });
});