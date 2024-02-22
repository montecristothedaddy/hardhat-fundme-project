const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name) ? describe.skip:
describe("FundMe", function () {
    let fundMe;
    let deployer;
    let mockV3Aggregator;
    let signer;
    const sendValue = ethers.parseEther("1"); // "1000000000000000000
    beforeEach(async function () {
        //deploy fundme contract using hardhat deploy
        deployer = (await getNamedAccounts()).deployer;
        //console.log('Deployer address:', deployer)
        await deployments.fixture(["all"]);
        const fundMeDeployment = await deployments.get("FundMe");
        console.log("FundMe deployment address:", fundMeDeployment.address);
        fundMe = await ethers.getContractAt(
            "FundMe",
            fundMeDeployment.address,
            deployer
        );
        // if (!fundMe || !fundMe.address) {
        //     throw new Error("FundMe contract address is null or invalid.");
        // }

        const deploySigner = await ethers.getSigner(deployer);
        mockV3Aggregator = await ethers.getContractFactory(
            "MockV3Aggregator",
            deploySigner
        );
        [signer] = await ethers.getSigners();
    });

    describe("constructor", function () {
        it("sets the aggregator address correctly", async function () {
            const response = await fundMe.priceFeed;
            assert.equal(response, mockV3Aggregator.address);
        });
    });

    describe("fund", function () {
        it("Fails if you don't send enough ETH", async function () {
            //const [signer] = await ethers.getSigners()
            await expect(fundMe.connect(signer).fund()).to.be.revertedWith(
                "You need to spend more ETH!"
            );
        });

        it("updates the amount funded data structure", async function () {
            //const [signer] = await ethers.getSigners()
            await fundMe.connect(signer).fund({ value: sendValue });
            const response = await fundMe
                .connect(signer)
                .getAddressToAmountFunded(deployer);
            assert.equal(sendValue.toString(), response.toString());
        });
        it("Adds funders to an array of funders", async function () {
            //const [signer] = await ethers.getSigners()
            await fundMe.connect(signer).fund({ value: sendValue });
            const funder = await fundMe.connect(signer).getFunder(0);
            assert.equal(funder, deployer);
        });
    });
});
