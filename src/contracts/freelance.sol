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

    mapping(address => string) public identity;

    mapping(string => address) nametoadd;

    mapping(address => string) addtoname;
    event Sell(address _buyer, uint256 _amount);

    constructor(RupeeToken _tokenContract) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = 7400000000000;
    }

    struct Asset {
        uint256 id;
        string date;
        address senderaddress;
        address receiveraddress;
        uint256 amount;
    }

    mapping(uint256 => Asset) public AssetStore;
    uint256 public assetCount = 0;

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

    function getAsset(uint256 _id)
        public
        view
        returns (
            string memory,
            address,
            address,
            uint256
        )
    {
        return (
            AssetStore[_id].date,
            AssetStore[_id].senderaddress,
            AssetStore[_id].receiveraddress,
            AssetStore[_id].amount
        );
    }

    function addidentity(
        string memory name,
        address add,
        string memory id
    ) public {
        nametoadd[name] = add;
        identity[add] = id;
        addtoname[add] = name;
    }

    function calculatetokens(
        uint256 payrate,
        uint256 duration,
        uint256 leaves,
        uint256 leavecost,
        uint256 delayeddays,
        uint256 delaycostperday,
        address from,
        address to,
        string memory _date
    ) public payable returns (uint256) {
        uint256 hourpay;
        uint256 leavepay;
        uint256 delaypay;
        uint256 amount;
        uint256 finalamount;
        hourpay = SafeMath.mul(payrate, duration);
        leavepay = SafeMath.mul(leaves, leavecost);
        delaypay = SafeMath.mul(delayeddays, delaycostperday);
        amount = SafeMath.sub(hourpay, leavepay);
        finalamount = SafeMath.sub(amount, delaypay);
        tokenContract.transfer(from, to, finalamount);
        assetCount++;
        AssetStore[assetCount] = Asset(
            assetCount,
            _date,
            msg.sender,
            to,
            finalamount
        );

        //amount=payrate*duration - leaves * leavecost - delayeddays * delaycostperday;
    }

    function sendtokens(
        address from,
        address to,
        uint256 nooftokens,
        string memory date
    ) public {
        tokenContract.transfer(from, to, nooftokens);
        assetCount++;
        AssetStore[assetCount] = Asset(
            assetCount,
            date,
            msg.sender,
            to,
            nooftokens
        );
    }

    function getidentity(string memory name) public view returns (address) {
        return nametoadd[name];
    }

    function getIdentityType(address add) public view returns (string memory) {
        return identity[add];
    }

    function getnamefromaddress(address add)
        public
        view
        returns (string memory)
    {
        return addtoname[add];
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer2(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    // function endSale() public {
    //     require(msg.sender == admin);
    //     require(
    //         tokenContract.transfer(
    //             admin,
    //             tokenContract.balanceOf(address(this))
    //         )
    //     );

    //     // UPDATE: Let's not destroy the contract here
    //     // Just transfer the balance to the admin
    //     admin.transfer(address(this).balance);
    // }

    function getBalance(address addr) public view returns (uint256) {
        uint256 bal = tokenContract.balanceOf(addr);
        return bal;
    }
}
