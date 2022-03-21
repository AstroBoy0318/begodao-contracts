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
    /*var stakingStartTime = Math.round(startTIme / 1000);

    // Deploy Token
    const _xbego = await ethers.getContractFactory('xBegoToken');
    const xbego = await _xbego.deploy({ nonce: nonce++ });

    const _masterchef = await ethers.getContractFactory('Masterchef');
    const masterchef = await _masterchef.deploy(xbego.address, stakingStartTime, deployer.address, { nonce: nonce++ });

    var tx = await xbego.setMasterchef(masterchef.address, { nonce: nonce++ });
    await tx.wait();

    const _stakingPool = await ethers.getContractFactory('StakingPool');
    const stakingPool_1 = await _stakingPool.deploy(xbego.address, daiAddress, "10000000000000", stakingStartTime, deployer.address, { nonce: nonce++ });
    const stakingPool_2 = await _stakingPool.deploy(xbego.address, begoAddress, "10000000", stakingStartTime, deployer.address, { nonce: nonce++ });
    */

    var ReferralContract = await ethers.getContractFactory('Refferal');
    var referralContract = await ReferralContract.deploy({ nonce: nonce++ });

    var RandomGenerator = await ethers.getContractFactory('RandomGenerator');
    var randomGenerator = await RandomGenerator.deploy(["0x007A22900a3B98143368Bd5906f8E17e9867581b", "0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046", "0x0715A7794a1dc8e42615F059dD6e406A6594651A", "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada", "0x9dd18534b8f456557d11B9DDB14dA89b2e52e308", "0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0", "0x92C09849638959196E976289418e5973CC96d645"], { nonce: nonce++ });

    var LotteryContract = await ethers.getContractFactory('Lottery');
    var lotteryContract = await LotteryContract.deploy("0xbf739F95bF8A5E8a9f8Ae0778aA07f872f91c0A3", randomGenerator.address, { nonce: nonce++ });

    var end = new Date().getTime();

    console.log("deploy ended ", (Number(end) - startTIme) / 1000);
    console.log("referral: ", referralContract.address);
    console.log("randomGenerator: ", randomGenerator.address);
    console.log("Lotter: ", lotteryContract.address);
    /*console.log("XBEGO_ADDRESS: ", xbego.address);
    console.log("MASTERCHEF_ADDRESS: ", masterchef.address);
    console.log("STAKING_POOL_1: ", stakingPool_1.address);
    console.log("STAKING_POOL_2: ", stakingPool_2.address);

    await hre.run("verify:verify", {
        address: xbego.address
    });

    await hre.run("verify:verify", {
        address: masterchef.address,
        constructorArguments: [
            xbego.address, stakingStartTime, deployer.address
        ],
    });*/
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
    })