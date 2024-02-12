// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

contract SendValueToAddress{
    constructor() payable {}

    receive()  external payable { }

     

    function SendValue_Send(address payable recipient) external payable {
        bool sent = recipient.send(msg.value);
        require(sent, "send failed");
    }

    // function SendValue_Call(address payable recipient, uint value) external payable {
    //     (bool success, ) = recipient.call{value: value}("");
    //     require(success, "call failed");
    // }

    // function SendValue_Transer(address payable recipient, uint amount ) external payable {
    //     recipient.transfer(amount);
    // }  
}