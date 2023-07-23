import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

// import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

describe("Random Number Generator Unit Tests", function () {
  async function deploy() {
    const [deployer, user0, user1] = await ethers.getSigners();

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

    return {
      deployer,
      user0,
      user1,
      random,
      addresses
    };
  }

  describe("Random Number Generator Tests", function () {
    it("Should test sanity", async function () {
      const { random, addresses } = await loadFixture(
        deploy
      );
      console.log("RandomNumberGenerator Address:", random.address);
      const timeStamp = (await ethers.provider.getBlock("latest")).timestamp
      console.log("timestamp", timeStamp);
      const price = await random.getPriceTest(addresses[0], addresses[2]);
      console.log(price);
      });

      it("Should get array of prices", async function () {
        const { random } = await loadFixture(
          deploy
        );
        const prices= await random.getPrices();
        console.log(prices);
        });

        it("Should get random number", async function () {
          const { random } = await loadFixture(
            deploy
          );
          const number = await random.pseudoRandom(0, 4);
          console.log("random number", number);
        }); 

    });
});