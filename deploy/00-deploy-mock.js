const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { includes } = require("chai")

const DECIMALS = "8"
const INITIAL_ANSWER = "200000000000"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("Local Network detected. Deploying Mock..")
        await deploy("MockV3Aggregator", {
            from: deployer,
            args: [DECIMALS, INITIAL_ANSWER],
            log: true,
        })
    }
    log("Mock deployed!")
    log("---------------------")
    log(
        "You are deploying to a local network, you'll need a local network running to interact"
    )
    log(
        "Please run `yarn hardhat console` to interact with the deployed smart contracts!"
    )
    log("------------------------------------------------")
}

module.exports.tags = ["all", "mocks"]
