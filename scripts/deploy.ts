import { expect } from "chai";
import { ethers } from "hardhat";
const fs = require("fs");

interface ContractAddresses {
  network: string;
  chainID: number;
  owner: string;
  random: string;
}

async function deploy(): Promise<void> {
  const network = await ethers.provider.getNetwork();

  const [owner, otherAccount] = await ethers.getSigners();

  const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
  const LINK = "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f"

  const addresses = [USDT, USDC, WETH, UNI, WBTC, LINK, DAI];

  const RandomNumberGenerator = await ethers.getContractFactory("RandomNumberGenerator");
  const random = await RandomNumberGenerator.deploy(addresses);

  const chainId = Number(network.chainId);
  const networkName = network.name;
  const contractAddresses: ContractAddresses = {
    network: networkName,
    chainID: chainId,
    owner: owner.address,
    random: random.address,
  };

  let existingAddresses: ContractAddresses[] = [];

  try {
    const data = fs.readFileSync("contractAddresses.json", "utf8");
    const parsedData = JSON.parse(data);
    existingAddresses = Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (err) {
    console.error("Error reading contractAddresses.json file:", err);
  }

  const index = existingAddresses.findIndex(
    (addr) => addr.chainID === contractAddresses.chainID
  );

  if (index !== -1) {
    existingAddresses[index] = contractAddresses; 
  } else {
    existingAddresses.push(contractAddresses);
  }

  fs.writeFileSync(
    "contractAddresses.json",
    JSON.stringify(existingAddresses, null, 2)
  );

  console.log("Network: ", contractAddresses.network);
  console.log("Deployer: ", contractAddresses.owner);
  console.log("random address", contractAddresses.random);

}

async function main(): Promise<void> {
  await deploy();
}

main();
