import { expect } from "chai";
import { ethers } from "hardhat";

describe("CyberPunkBoutique - Event Emission Tests", function () {
    let CyberPunkBoutique: any;
    let cyberPunkBoutique: any;
    let owner: any;
    let addr1: any;

    beforeEach(async function () {
        CyberPunkBoutique = await ethers.getContractFactory("CyberPunkBoutique");
        [owner, addr1] = await ethers.getSigners();
        cyberPunkBoutique = await CyberPunkBoutique.deploy();
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