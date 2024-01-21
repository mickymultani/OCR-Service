# OCR-Service

## Getting Started

1. **Fork the Repository:** Click the "Fork" button at the top-right corner of this repository to create your own copy.

2. **Or Clone the Repository:** Clone this repository to your local machine using `git clone https://github.com/mickymultani/OCR-Service.git`.

3. **Install Dependencies:** `cd OCR-Service` and then `npm install` to install the required dependencies.

4. **Testing:**

   - Follow the steps outlined in the console to test various functions of the OnchainID contract.


### //console #1 start the hardhat node
 npx hardhat node

### //console #2 deploy the contract to local hardhat network
 npx hardhat run scripts/deploy.js --network localhost

### //console #3 Launch Hardhat console 
 npx hardhat console --network localhost


    //Attach contract instance
    const [signer] = await ethers.getSigners();

    const OnchainID = await ethers.getContractFactory("OnchainID");

    //const onchainID = await OnchainID.attach("deployed_contract_address_here");

    const onchainID = await OnchainID.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // Declare the variables
    let email;
    let userkyc;

    //Register new user
    await onchainID.registerUser();

    //Retrieve user info
    const userInfo = await onchainID.getUserInfo(signer.address);
    console.log(userInfo);

    // Adding a new email attribute
    await onchainID.addOrUpdateAttribute("email", "user@example.com");

    // Retrieve the email attribute and store it in the 'email' variable
    email = await onchainID.getAttribute("email");
    console.log("Email attribute:", email);

    // Updating the email attribute
    await onchainID.addOrUpdateAttribute("email", "new-email@example.com");

    // Retrieve the updated email attribute using the same 'email' variable
    email = await onchainID.getAttribute("email");
    console.log("Updated email attribute:", email);

    // Set KYC status
    await onchainID.updateKYCStatus("KYC Approved");

    // Retrieve and print the KYC status
    userkyc = await onchainID.getKYCStatus(signer.address);
    console.log("KYC Status:", userkyc);

    // Update KYC status
    await onchainID.updateKYCStatus("KYC Not Approved");

    // Retrieve and print the updated KYC status
    userkyc = await onchainID.getKYCStatus(signer.address);
    console.log("Updated KYC Status:", userkyc);

## Contributing

If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request. We welcome contributions!

## License

This project is licensed under the MIT License.