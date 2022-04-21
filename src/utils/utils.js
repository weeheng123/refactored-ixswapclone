import { ethers } from "ethers";
import IXSTokenABI from "../config/abi/IXSTokenABI.json";
import UniV2RouterABI from "../config/abi/UniswapV2RouterABI.json";

export const ixsAddress = "0x73d7c860998ca3c01ce8c808f5577d94d545d1b4";
export const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const uniV2RouterAddress = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
export const pairAddress = "0xC09bf2B1Bc8725903C509e8CAeef9190857215A8";
export const api = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_INFURA_API
);
export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  var tempAddress;
  if (address) {
    if (address.length > 20) {
      tempAddress =
        address.substr(0, 4) +
        "..." +
        address.substr(address.length - 4, address.length);
    }
  }
  return tempAddress;
};

export const getTokenBalance = async () => {
  try {
    await provider.send("eth_requestAccounts", []);
    const ixsTokenContract = new ethers.Contract(
      ixsAddress,
      IXSTokenABI,
      provider
    );
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    var ixsBalance = await ixsTokenContract.balanceOf(signerAddress);
    var ethBalance = await provider.getBalance(signerAddress);
    ethBalance = ethers.utils.formatEther(ethBalance);
    ixsBalance = ethers.utils.formatEther(ixsBalance);
    return { ethTokenBalance: ethBalance, ixsTokenBalance: ixsBalance };
  } catch (error) {
    console.log(error);
  }
};

export const fetchPairPrice = async () => {
  const contract = new ethers.Contract(
    pairAddress,
    [
      "function getReserves() external view returns(uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
      "function token0() external view returns (address)",
      "function token1() external view returns (address)",
    ],
    api
  );
  const reserves = await contract.getReserves();

  return {
    ethPerIXSPrice: (reserves.reserve1 / reserves.reserve0).toPrecision(6),
    ixsPerETHPrice: (reserves.reserve0 / reserves.reserve1).toPrecision(6),
  };
};

export const addLiquidity = async (ethAmount, ixsAmount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();

    const routerContract = new ethers.Contract(
      uniV2RouterAddress,
      UniV2RouterABI,
      signer
    );

    var ethSlippage = ethAmount * 0.95;
    var ixsSlippage = ixsAmount * 0.95;

    const offChainTXPrediction =
      await routerContract.callStatic.addLiquidityETH(
        ixsAddress,
        ethers.utils.parseEther(ixsAmount),
        ethers.utils.parseEther(ixsSlippage),
        ethers.utils.parseEther(ethSlippage),
        signerAddress,
        Date.now() + 20 * 60000,
        { value: ethers.utils.parseEther(ethAmount) }
      );

    alert(
      "ESTIMATED LP Tokens earned is:" +
        ethers.utils.formatEther(offChainTXPrediction.liquidity)
    );

    await routerContract.addLiquidityETH(
      ixsAddress,
      ethers.utils.parseEther(ixsAmount),
      ethers.utils.parseEther(ixsSlippage),
      ethers.utils.parseEther(ethSlippage),
      signerAddress,
      Date.now() + 20 * 60000,
      { value: ethers.utils.parseEther(ethAmount) }
    );
  } catch (error) {
    const errorObj = error;
    alert(errorObj.message);
    console.log(error);
  }
};
