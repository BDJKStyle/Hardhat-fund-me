const { deployments, getNamedAccounts, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert, expectl } = require("chai")

describe("FundMe", async function () {
    let FundMe
    let deployer
    const valuesent = ethers.utils.parseEther("1")

    developmentChains.includes(network.name)
        ? describe.skip
        : beforeEach(async function () {
              deployer = await getNamedAccounts().deployer
              FundMe = await ethers.getContract("FundMe", deployer)
          })

    it("allows people to fund and withdraw funds", async function () {
        await FundMe.fund({ value: valuesent })
        await FundMe.withdraw()
        const endingBalance = await FundMe.provider.getBalance(FundMe.address)
        assert.equal(endingBalance.toString(), 0)
    })
})
