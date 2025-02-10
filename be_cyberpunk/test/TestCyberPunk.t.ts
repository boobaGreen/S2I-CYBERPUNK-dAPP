import { expect } from "chai";
import { ethers } from "hardhat";


describe("CyberPunkBoutique", function () {
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

    it("Should set the right owner", async function () {
        expect(await cyberPunkBoutique.owner()).to.equal(owner.address);
    });

    it("Should create a new product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        const product = await cyberPunkBoutique.products(1);
        expect(product.name).to.equal("Product1");
        expect(product.price).to.equal(ethers.parseEther("1"));
        expect(product.cid).to.equal("cid1");
        expect(product.purchased).to.be.false;
    });

    it("Should purchase a product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        const product = await cyberPunkBoutique.products(1);
        expect(product.purchased).to.be.true;
    });

    it("Should mark a product as shipped", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await cyberPunkBoutique.shipProduct(1, "tracking123");
        const product = await cyberPunkBoutique.products(1);
        expect(product.shipped).to.be.true;
        expect(product.trackingNumber).to.equal("tracking123");
    });

    it("Should fail if non-owner tries to mark product as shipped", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.connect(addr1).shipProduct(1, "tracking123")).to.be.revertedWith("Only the owner can mark products as shipped");
    });

    it("Should fail to create a product with empty name", async function () {
        await expect(cyberPunkBoutique.createProduct("", ethers.parseEther("1"), "cid1")).to.be.revertedWith("Product name is required");
    });

    it("Should fail to create a product with zero price", async function () {
        await expect(cyberPunkBoutique.createProduct("Product1", 0, "cid1")).to.be.revertedWith("Product price must be greater than zero");
    });

    it("Should fail to create a product with empty CID", async function () {
        await expect(cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "")).to.be.revertedWith("Product CID is required");
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
        await expect(cyberPunkBoutique.connect(addr2).purchaseProduct(1, { value: ethers.parseEther("1") })).to.be.revertedWith("Product already purchased");
    });

    it("Should allow owner to create multiple products", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.createProduct("Product2", ethers.parseEther("2"), "cid2");
        const product1 = await cyberPunkBoutique.products(1);
        const product2 = await cyberPunkBoutique.products(2);
        expect(product1.name).to.equal("Product1");
        expect(product2.name).to.equal("Product2");
    });

    it("Should allow multiple users to purchase different products", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.createProduct("Product2", ethers.parseEther("2"), "cid2");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await cyberPunkBoutique.connect(addr2).purchaseProduct(2, { value: ethers.parseEther("2") });
        const product1 = await cyberPunkBoutique.products(1);
        const product2 = await cyberPunkBoutique.products(2);
        expect(product1.purchased).to.be.true;
        expect(product2.purchased).to.be.true;
    });

    it("Should fail if non-owner tries to create a product", async function () {
        await expect(cyberPunkBoutique.connect(addr1).createProduct("Product1", ethers.parseEther("1"), "cid1")).to.be.revertedWith("Only the owner can create products");
    });

    it("Should fail to ship a non-purchased product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.shipProduct(1, "tracking123")).to.be.revertedWith("Product must be purchased before it can be shipped");
    });

    it("Should fail to ship an already shipped product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await cyberPunkBoutique.shipProduct(1, "tracking123");
        await expect(cyberPunkBoutique.shipProduct(1, "tracking123")).to.be.revertedWith("Product already shipped");
    });

    it("Should emit ProductCreated event", async function () {
        await expect(cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1"))
            .to.emit(cyberPunkBoutique, "ProductCreated")
            .withArgs(1, "Product1", ethers.parseEther("1"), "cid1", false);
    });

    it("Should emit ProductPurchased event", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") }))
            .to.emit(cyberPunkBoutique, "ProductPurchased")
            .withArgs(1, "Product1", ethers.parseEther("1"), addr1.address, true);
    });

    it("Should emit ProductShipped event", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.shipProduct(1, "tracking123"))
            .to.emit(cyberPunkBoutique, "ProductShipped")
            .withArgs(1, "tracking123");
    });
});