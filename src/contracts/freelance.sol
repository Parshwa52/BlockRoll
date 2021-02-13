pragma solidity ^0.5.0;

import "./RupeeToken.sol";

//import "@openzeppelin/contracts/math/SafeMath.sol";

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

import "./SafeMath.sol";

contract freelance {
    address payable admin;
    RupeeToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    address public freeaddress;
    
    mapping (address=>string) public identity;
    
    mapping (string=>address) nametoadd;
    
    
    event Sell(address _buyer, uint256 _amount);

    constructor(RupeeToken _tokenContract) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice=7400000000000;
    }
    
    struct Asset {
        uint id;
        string date;
        address senderaddress;
        address receiveraddress;
        uint amount;
    }
    
    mapping(uint => Asset) public AssetStore;
    uint256 public assetCount= 0;
    
    /*function createAsset(
        string memory _date,
        string memory senderaddress,
        string memory receiveraddress,
        address  _add,
        string memory _amount
        ) public returns(uint256) {
        assetCount++;
        AssetStore[assetCount]= Asset(assetCount,_date, _transactiontype, _username, _add, _amount);
    }*/

    function getAsset(uint _id) view public returns(string memory, address, address , uint)
    {
        return (AssetStore[_id].date, AssetStore[_id].senderaddress, AssetStore[_id].receiveraddress, AssetStore[_id].amount);
    }
    
    
     function addidentity(string memory name,address add,string memory id) public 
    {
        nametoadd[name]=add;
        identity[add]=id;
    }
    
    
    function calculatetokens(uint payrate,uint duration,uint leaves,uint leavecost,uint delayeddays,uint delaycostperday,address to,string memory _date)public payable returns(uint)
    {
        uint hourpay;
        uint leavepay;
        uint delaypay;
        uint amount;
        uint finalamount;
        hourpay=SafeMath.mul(payrate,duration);
        leavepay=SafeMath.mul(leaves,leavecost);
        delaypay=SafeMath.mul(delayeddays,delaycostperday);
        amount=SafeMath.sub(hourpay,leavepay);
        finalamount=SafeMath.sub(amount,delaypay);
        tokenContract.transfer(to,finalamount);
        assetCount++;
        AssetStore[assetCount]= Asset(assetCount,_date,msg.sender,to, finalamount);
        
        
        //amount=payrate*duration - leaves * leavecost - delayeddays * delaycostperday;
    }
    
    function sendtokens(address to,uint nooftokens,string memory date) public
    {
        tokenContract.transfer(to,nooftokens);
        assetCount++;
        AssetStore[assetCount]= Asset(assetCount,date,msg.sender,to, nooftokens);
    }
    
    function getidentity(string memory name) public view returns(address)
    {
        return nametoadd[name];
    }
    
   
    
    
    

   function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    

    function buyTokens(uint256 _numberOfTokens) public payable 
    {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        // UPDATE: Let's not destroy the contract here
        // Just transfer the balance to the admin
        admin.transfer(address(this).balance);
    }
    
    function getBalance(address addr)public view returns(uint)
    {
        uint bal=tokenContract.balanceOf(addr);
        return bal;
    }
}
