import React, { useState } from "react";
import { Input, Popover, Radio, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";

function EthereumSwap(props) {
  const { isConnected } = props;
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if(e.target.value && tokenOne.address !== tokenTwo.address){
      setTokenTwoAmount(e.target.value * 1.5); // Demo conversion rate
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    const amount = tokenTwoAmount;
    setTokenTwoAmount(tokenOneAmount);
    setTokenOneAmount(amount);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i){
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setIsOpen(false);
  }

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  function fetchDexSwap(){
    console.log("Ethereum swap initiated");
    message.info("Ethereum swap completed (Demo)");
  }

  return (
    <div className="tradeBox">
      <div className="tradeBoxHeader">
        <h4>Ethereum Swap</h4>
        <Popover
          content={settings}
          title="Settings"
          trigger="click"
          placement="bottomRight"
        >
          <SettingOutlined className="cog" />
        </Popover>
      </div>
      <div className="inputs">
        <Input
          placeholder="0"
          value={tokenOneAmount}
          onChange={changeAmount}
          disabled={!isConnected}
        />
        <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
        <div className="switchButton" onClick={switchTokens}>
          <ArrowDownOutlined className="switchArrow" />
        </div>
        <div className="assetOne" onClick={() => openModal(1)}>
          <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
          {tokenOne.ticker}
          <DownOutlined />
        </div>
        <div className="assetTwo" onClick={() => openModal(2)}>
          <img src={tokenTwo.img} alt="assetTwoLogo" className="assetLogo" />
          {tokenTwo.ticker}
          <DownOutlined />
        </div>
      </div>
      <div className="swapButton" disabled={!isConnected} onClick={fetchDexSwap}>Swap</div>
    </div>
  );
}

export default EthereumSwap;