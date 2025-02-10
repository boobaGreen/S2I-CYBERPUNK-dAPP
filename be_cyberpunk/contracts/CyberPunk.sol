// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract CyberPunkBoutique {
    address public owner;
    uint256 public productCount = 0;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string cid; // Content Identifier for IPFS
        bool purchased;
        bool shipped;
        string trackingNumber;
    }

    mapping(uint256 => Product) public products;

    event ProductCreated(uint256 id, string name, uint256 price, string cid, bool purchased);

    event ProductPurchased(uint256 id, string name, uint256 price, address buyer, bool purchased);

    event ProductShipped(uint256 id, string trackingNumber);

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Creates a new product
     * @param _name The name of the product
     * @param _price The price of the product in wei
     * @param _cid The IPFS CID of the product metadata
     */
    function createProduct(string memory _name, uint256 _price, string memory _cid) public {
        require(msg.sender == owner, "Only the owner can create products");
        require(bytes(_name).length > 0, "Product name is required");
        require(_price > 0, "Product price must be greater than zero");
        require(bytes(_cid).length > 0, "Product CID is required");

        productCount++;
        products[productCount] = Product(productCount, _name, _price, _cid, false, false, "");

        emit ProductCreated(productCount, _name, _price, _cid, false);
    }

    /**
     * @notice Purchases a product
     * @param _id The ID of the product to purchase
     */
    function purchaseProduct(uint256 _id) public payable {
        Product storage _product = products[_id];

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(msg.value == _product.price, "Incorrect amount sent");
        require(!_product.purchased, "Product already purchased");

        // Update state before transferring funds
        _product.purchased = true;
        products[_id] = _product;

        payable(owner).transfer(msg.value);

        emit ProductPurchased(_id, _product.name, _product.price, msg.sender, true);
    }

    /**
     * @notice Marks a product as shipped and sets the tracking number
     * @param _id The ID of the product to mark as shipped
     * @param _trackingNumber The tracking number of the shipment
     */
    function shipProduct(uint256 _id, string memory _trackingNumber) public {
        require(msg.sender == owner, "Only the owner can mark products as shipped");

        Product storage _product = products[_id];

        require(_product.purchased, "Product must be purchased before it can be shipped");
        require(!_product.shipped, "Product already shipped");

        _product.shipped = true;
        _product.trackingNumber = _trackingNumber;

        emit ProductShipped(_id, _trackingNumber);
    }
}
