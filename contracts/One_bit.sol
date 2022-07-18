// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract One_bit{
    address payable public Merchant;
    address  public Buyer;
    uint public Price;

   // receive() external payable {
            // React to receiving ether
//}
    ///only Merchant can call this function
    error OnlyMerchant();
    
    
    modifier onlyMerchant(){
        if(msg.sender!=Merchant){
            revert OnlyMerchant();
        }
        _;
    }
    //Initialize Merchant
    constructor () {
       Merchant=payable(msg.sender);
    }
   //set Price
    function setPrice(uint _price) external  onlyMerchant {
         Price=_price *(1 ether);
    }
    //calculating total cost
     function cal_totalCost(uint gasPrice) external {
         Price+=gasPrice;
        
     }

     //transfering Price amount to contract
    function Pay() external payable {
        Buyer=msg.sender;
      
    }
    //get a contract Balance
    function contractBalance() external view returns(uint){
        return address(this).balance;
    }
    //transfer contract balance to merchant account
    function Withdraw() external onlyMerchant{
        Merchant.transfer(Price);
    }
    function Merchant_balance() external  view returns(uint) {
        return Merchant.balance;
    }
    function Buyer_Balance() external view returns(uint){
        return Buyer.balance;
    }
}
