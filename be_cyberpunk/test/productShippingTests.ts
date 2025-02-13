import { expect } from "chai";
import { ethers } from "hardhat";

describe("CyberPunkBoutique - Product Shipping Tests", function () {
    let CyberPunkBoutique: any;
    let cyberPunkBoutique: any;
    let owner: any;
    let addr1: any;

    beforeEach(async function () {
        CyberPunkBoutique = await ethers.getContractFactory("CyberPunkBoutique");
        [owner, addr1] = await ethers.getSigners();
        cyberPunkBoutique = await CyberPunkBoutique.deploy();
    });

    it("Should mark a product as shipped", async function () {
        await cyberPunkBoutique.createProduct("Product1", ethers.parseEther("1"), "cid1");
        await cyberPunkBoutique.connect(addr1).purchaseProduct(1, { value: ethers.parseEther("1") });
        await cyberPunkBoutique.shipProduct(1, "tracking123");
        const product = await cyberPunkBoutique.products(1);
        expect(product.state).to.equal(2); // ProductState.Shipped
        expect(product.trackingNumber).to.equal("tracking123");
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
});