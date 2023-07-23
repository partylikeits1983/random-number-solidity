// SPDX-License-Identifier: MIT
// Author: Alexander John Lee

pragma solidity ^0.8.19;

import "./OracleGetter.sol";
import "hardhat/console.sol";

contract RandomNumberGenerator is OracleGetter {

    address[] public tokenAddresses;

    constructor(address[] memory _addresses) {
        for (uint i = 0; i < _addresses.length; i++) {
            tokenAddresses.push(_addresses[i]);
        }
    }

    function combinations() internal view returns (uint) {
        return (tokenAddresses.length * (tokenAddresses.length - 1)) / 2;
    }
    
    function getPriceTest(address token0, address token1) external view returns (uint) {
        uint price = getPrice(token0, token1);
        console.log(price);
        return price;
    }

    function getPrices() public view returns (uint[] memory) {
        uint arraySize = combinations();

        uint[] memory prices = new uint[](arraySize*2);

        uint n = 0;

        for (uint i = 0; i < tokenAddresses.length - 1; i++) {
            for (uint j = i + 1; j < tokenAddresses.length; j++) {
                uint pricesWeighted = getPrice(tokenAddresses[i], tokenAddresses[j]);
                uint pricesNow = getCurrentPrice(tokenAddresses[i], tokenAddresses[j]);
                // console.log(price);
                prices[n] = pricesWeighted;
                n++;
                prices[n] = pricesNow;
                n++;
            }
        }
        return prices;
    }

    function hashArray(uint[] memory arr) internal pure returns (bytes32) {
        return keccak256(abi.encode(arr));
    }

    // @dev get pseudo random number in range a, b
    function pseudoRandom(uint a, uint b) external view returns (uint) {
        bytes32 _hash1 = hashArray(getPrices());

        uint blockTimeStamp = block.timestamp;
        uint blockNumber = block.number;
        bytes32 _blockHash = blockhash(blockNumber);

        bytes32 _hash2 = keccak256(abi.encode(_hash1, _blockHash, blockTimeStamp));
        uint randomValue = uint(_hash2);
        return a + randomValue % (b - a + 1);
    }
}