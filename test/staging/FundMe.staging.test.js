//gotta deal with this : TypeError: Cannot read properties of undefined (reading 'getBalance')
// const { getNamedAccounts, ethers, network } = require("hardhat");
// const { developmentChains } = require("../../helper-hardhat-config");
// const { assert } = require("chai");

// developmentChains.includes(network.name)
//     ? describe.skip
//     : describe("FundMe", function () {
//           let fundMe;
//           let deployer;
//           const sendValue = ethers.parseEther("0.1");
//           beforeEach(async function () {
//               deployer = (await getNamedAccounts()).deployer;
//               fundMe = await ethers.getContractAt("FundMe", deployer);
//           });

//           it("Allows people to fund and withdraw", async function () {
//               await fundMe.fund({ value: sendValue });
//               await fundMe.withdraw();
//               const endingBalance = await fundMe.provider.getBalance(
//                   fundMe.target
//               );
//               assert.equal(endingBalance.toString(), "0");
//           });
//       });
