const { ethers, waffle } = require("hardhat");

const treasuryAbi = require('../artifacts/contracts/Treasury.sol/BegoikoTreasury.json').abi;
const begoAbi = require('../artifacts/contracts/BegoikoERC20.sol/BegoikoERC20Token.json').abi;

async function main() {

    const [deployer] = await ethers.getSigners();

    const provider = waffle.provider;

    const daiAddress = "0xef45e6E3159e9F302D2B85f6E777791d7B7e98d8";
    const begoAddress = "0x6fBEe246b7348F02A04348f160583d3799525001";

    var nonce = await provider.getTransactionCount(deployer.address);
    console.log(nonce);
    var startTIme = new Date().getTime();
    var stakingStartTime = Math.round(startTIme / 1000);

    // Deploy Token
    const _xbego = await ethers.getContractFactory('xBegoToken');
    const xbego = await _xbego.deploy({ nonce: nonce++ });

    const _masterchef = await ethers.getContractFactory('Masterchef');
    const masterchef = await _masterchef.deploy(xbego.address, stakingStartTime, deployer.address, { nonce: nonce++ });

    var tx = await xbego.setContracts(masterchef.address, { nonce: nonce++ });
    await tx.wait();

    const _stakingPool = await ethers.getContractFactory('StakingPool');
    const stakingPool_1 = await _stakingPool.deploy(xbego.address, daiAddress, "1000000000000000", stakingStartTime, deployer.address, { nonce: nonce++ });
    const stakingPool_2 = await _stakingPool.deploy(xbego.address, begoAddress, "100000000", stakingStartTime, deployer.address, { nonce: nonce++ });

    var end = new Date().getTime();

    console.log("deploy ended ", (Number(end) - startTIme) / 1000);
    console.log("XBEGO_ADDRESS: ", xbego.address);
    console.log("MASTERCHEF_ADDRESS: ", masterchef.address);
    console.log("STAKING_POOL_1: ", stakingPool_1.address);
    console.log("STAKING_POOL_2: ", stakingPool_2.address);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
    })