const hre = require("hardhat");

async function main() {
  const OnchainID = await hre.ethers.getContractFactory("OnchainID");
  const onchainID = await OnchainID.deploy();

  console.log("Deploying OnchainID...");
  
  // Try using 'target' property to get the contract address
  console.log("OnchainID deployed to:", onchainID.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
