
const hre = require("hardhat");

async function main() {
  
  
    const [Merchant, buyer] = await ethers.getSigners();
    console.log("Merchant Adress", Merchant.address)
    //console.log("Buyer Adress", buyer.address);
    
    const mainContract = await hre.ethers.getContractFactory("One_bit");
    const deployContract = await mainContract.deploy();
 
    console.log("Contract Address:",deployContract.address);
    console.log("Merchant Address",await deployContract.Merchant());
     
    let Merchant_balance=await deployContract.Merchant_balance();
    console.log("Merchant Balance:",Merchant_balance.toString());
    const transaction_setPrice=await deployContract.connect(Merchant).setPrice(4);
    await transaction_setPrice.wait();
   
    let total_cost=await deployContract.connect(Merchant).cal_totalCost(4565644)
    await total_cost.wait();
    let Price=await deployContract.Price();
    console.log(Price.toString());
    //console.log( hre.ethers.utils.formatEther(1000));
    const ether_value = ethers.utils.formatUnits(Price, "ether");
    console.log(ether_value);

    //const lockedAmount = hre.ethers.utils.parseEther(Price);
   // console.log(lockedAmount.toString());
    let Pay_transaction=await deployContract.connect(buyer).Pay({value:Price});
    await Pay_transaction.wait();
    let contract_balance=await deployContract.contractBalance();
    console.log(contract_balance.toString());
    let withdraw_transaction=await deployContract.Withdraw();
    await withdraw_transaction.wait();
    let Merchant_balance1=await deployContract.Merchant_balance();
    console.log("Merchant Balance:",Merchant_balance1.toString());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
