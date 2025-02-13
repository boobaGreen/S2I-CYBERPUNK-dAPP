import { expect } from "chai";
import { ethers } from "hardhat";

describe("CyberPunkBoutique- Owner Tests", function () {
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
        expect(product.state).to.equal(0); // ProductState.Available
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

    it("Should mark a product as shipped", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await cyberPunkBoutique.shipProduct(1, "tracking123");
        const product = await cyberPunkBoutique.products(1);
        expect(product.state).to.equal(2); // ProductState.Shipped
        expect(product.trackingNumber).to.equal("tracking123");
    });

    it("Should fail if non-owner tries to mark product as shipped", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.connect(addr1).shipProduct(1, "tracking123")).to.be.revertedWith("Only the owner can mark products as shipped");
    });

    it("Should fail if tracking number exceeds maximum length", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        const longTrackingNumber = "a".repeat(31);
        await expect(cyberPunkBoutique.shipProduct(1, longTrackingNumber)).to.be.revertedWith("Tracking number exceeds maximum length");
    });

    it("Should fail to ship an already shipped product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await cyberPunkBoutique.shipProduct(1, "tracking123");
        await expect(cyberPunkBoutique.shipProduct(1, "tracking123")).to.be.revertedWith("Product has already been shipped");
    });

    it("Should fail to ship a non-purchased product", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.shipProduct(1, "tracking123")).to.be.revertedWith("Product must be purchased before it can be shipped");
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
        expect(product1.state).to.equal(1); // ProductState.Purchased
        expect(product2.state).to.equal(1); // ProductState.Purchased
    });

    it("Should fail if non-owner tries to create a product", async function () {
        await expect(cyberPunkBoutique.connect(addr1).createProduct("Product1", ethers.parseEther("1"), "cid1")).to.be.revertedWith("Only the owner can create products");
    });

    it("Should update product CID", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.updateProductCid(1, "newCid");
        const product = await cyberPunkBoutique.products(1);
        expect(product.cid).to.equal("newCid");
    });

    it("Should fail to update product CID if not owner", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.connect(addr1).updateProductCid(1, "newCid")).to.be.revertedWith("Only the owner can update the product CID");
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

    it("Should fail to update product price if not owner", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.connect(addr1).updateProductPrice(1, ethers.parseEther("2"))).to.be.revertedWith("Only the owner can update the product price");
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

    it("Should fail to update product state if not owner", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.connect(addr1).updateProductState(1, 3)).to.be.revertedWith("Only the owner can update product state");
    });

    it("Should fail to update product state if product does not exist", async function () {
        await expect(cyberPunkBoutique.updateProductState(1, 3)).to.be.revertedWith("Product does not exist");
    });

    it("Should fail to update product state if product is purchased or shipped", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.updateProductState(1, 3)).to.be.revertedWith("Cannot update state after purchase or shipment");
    });

    it("Should emit ProductCreated event", async function () {
        await expect(cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1"))
            .to.emit(cyberPunkBoutique, "ProductCreated")
            .withArgs(1, "Product1", ethers.parseEther("1"), "cid1", 0); // ProductState.Available
    });

    it("Should emit ProductPurchased event", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await expect(cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") }))
            .to.emit(cyberPunkBoutique, "ProductPurchased")
            .withArgs(1, "Product1", ethers.parseEther("1"), addr1.address, 1); // ProductState.Purchased
    });

    it("Should emit ProductShipped event", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await expect(cyberPunkBoutique.shipProduct(1, "tracking123"))
            .to.emit(cyberPunkBoutique, "ProductShipped")
            .withArgs(1, "tracking123", 2); // ProductState.Shipped
    });
});