// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract CyberPunkBoutique {
    address public owner;
    uint256 public productCount = 0;

    enum ProductState {
        Available,
        Purchased,
        Shipped,
        Unavailable
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string cid; // Content Identifier for IPFS
        string trackingNumber;
        ProductState state; // New field to indicate the state of the product
    }

    mapping(uint256 => Product) public products;

    event ProductCreated(uint256 id, string name, uint256 price, string cid, ProductState state);
    event ProductPurchased(uint256 id, string name, uint256 price, address buyer, ProductState state);
    event ProductShipped(uint256 id, string trackingNumber, ProductState state);
    event ProductCidUpdated(uint256 id, string newCid);
    event ProductPriceUpdated(uint256 id, uint256 newPrice);
    event ProductStateUpdated(uint256 id, ProductState state);

    constructor() {
        owner = msg.sender;
    }

    function createProduct(string memory _name, uint256 _price, string memory _cid) public {
        require(msg.sender == owner, "Only the owner can create products");
        require(bytes(_name).length > 0, "Product name is required");
        require(_price > 0, "Product price must be greater than zero");
        require(bytes(_cid).length > 0, "Product CID is required");

        productCount++;
        products[productCount] = Product(productCount, _name, _price, _cid, "no shipped", ProductState.Available);

        emit ProductCreated(productCount, _name, _price, _cid, ProductState.Available);
    }

    function purchaseProduct(uint256 _id) public payable {
        Product storage _product = products[_id];

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(_product.state == ProductState.Available, "Product is not available");
        require(msg.value == _product.price, "Incorrect amount sent");

        _product.state = ProductState.Purchased;
        products[_id] = _product;

        payable(owner).transfer(msg.value);

        emit ProductPurchased(_id, _product.name, _product.price, msg.sender, ProductState.Purchased);
    }

    function shipProduct(uint256 _id, string memory _trackingNumber) public {
        require(msg.sender == owner, "Only the owner can mark products as shipped");
        require(bytes(_trackingNumber).length <= 30, "Tracking number exceeds maximum length");

        Product storage _product = products[_id];

        require(_product.state != ProductState.Shipped, "Product has already been shipped");
        require(_product.state == ProductState.Purchased, "Product must be purchased before it can be shipped");

        _product.trackingNumber = _trackingNumber;
        _product.state = ProductState.Shipped;

        emit ProductShipped(_id, _trackingNumber, ProductState.Shipped);
    }

    function updateProductCid(uint256 _id, string memory _newCid) public {
        require(msg.sender == owner, "Only the owner can update the product CID");

        Product storage _product = products[_id];

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(_product.state == ProductState.Available, "Cannot update CID after purchase");
        require(bytes(_newCid).length > 0, "New CID is required");

        _product.cid = _newCid;

        emit ProductCidUpdated(_id, _newCid);
    }

    function updateProductPrice(uint256 _id, uint256 _newPrice) public {
        require(msg.sender == owner, "Only the owner can update the product price");

        Product storage _product = products[_id];

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(_product.state == ProductState.Available, "Cannot update price after purchase");
        require(_newPrice > 0, "New price must be greater than zero");

        _product.price = _newPrice;

        emit ProductPriceUpdated(_id, _newPrice);
    }

    function updateProductState(uint256 _id, uint256 _state) public {
        require(msg.sender == owner, "Only the owner can update product state");

        Product storage _product = products[_id];

        require(_product.id > 0 && _product.id <= productCount, "Product does not exist");
        require(
            _product.state != ProductState.Purchased && _product.state != ProductState.Shipped,
            "Cannot update state after purchase or shipment"
        );
        require(_state < 4, "Invalid state");

        ProductState newState = ProductState(_state);

        require(
            (_product.state == ProductState.Available && newState == ProductState.Unavailable)
                || (_product.state == ProductState.Unavailable && newState == ProductState.Available),
            "Invalid state transition"
        );

        _product.state = newState;

        emit ProductStateUpdated(_id, newState);
    }
}
