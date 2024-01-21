// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract OnchainID {
    struct User {
        uint256 id;
        mapping(string => string) attributes; // Key-value pairs of identity attributes
        string kycStatus; // KYC status attribute
    }

    mapping(address => User) private users;
    uint256 private userIdCounter = 1;

    // Register a new user and assign a unique ID
    function registerUser() public {
        require(users[msg.sender].id == 0, "User already registered.");
        users[msg.sender].id = userIdCounter++;
    }

    // Return user ID for given address
    function getUserInfo(address userAddress) public view returns (uint256) {
        return users[userAddress].id;
    }

    // Add or update an identity attribute
    function addOrUpdateAttribute(string memory key, string memory value) public {
        require(users[msg.sender].id != 0, "User not registered.");
        users[msg.sender].attributes[key] = value;
    }

    // Retrieve an identity attribute
    function getAttribute(string memory key) public view returns (string memory) {
        require(users[msg.sender].id != 0, "User not registered.");
        return users[msg.sender].attributes[key];
    }

    // Update KYC status
    function updateKYCStatus(string memory status) public {
        require(users[msg.sender].id != 0, "User not registered.");
        users[msg.sender].kycStatus = status;
    }

    // Get KYC status for a user
    function getKYCStatus(address userAddress) public view returns (string memory) {
        return users[userAddress].kycStatus;
    }
}
