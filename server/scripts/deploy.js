const Web3 = require('web3')
require('dotenv').config()
const web3 = new Web3(
  'https://eth-goerli.g.alchemy.com/v2/ze9JoGYLUuG5hH_t9nPuLALX2TKCKlDH'
)
const wallet = web3.eth.accounts.wallet.add(process.env.ADMIN_PRIVATEKEY)
const deploy = function (
  _token,
  _projectName,
  _firstRelease,
  _startTime,
  _cliff,
  _totalPeriods,
  _timePerPeriod
) {
  var tokenvestingContract = new web3.eth.Contract([
    {
      inputs: [
        { internalType: 'address', name: '_token', type: 'address' },
        { internalType: 'string', name: '_projectName', type: 'string' },
        { internalType: 'uint256', name: '_firstRelease', type: 'uint256' },
        { internalType: 'uint256', name: '_startTime', type: 'uint256' },
        { internalType: 'uint256', name: '_cliff', type: 'uint256' },
        { internalType: 'uint256', name: '_totalPeriods', type: 'uint256' },
        { internalType: 'uint256', name: '_timePerPeriod', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: '_address',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'AddWhitelistUser',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: '_address',
          type: 'address',
        },
      ],
      name: 'RemoveWhitelistUser',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_startTime',
          type: 'uint256',
        },
      ],
      name: 'SetStartTime',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: '_address',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokensClaimed',
          type: 'uint256',
        },
      ],
      name: 'TokenClaimed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalTokens',
          type: 'uint256',
        },
      ],
      name: 'VestingFunded',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'address', name: '_address', type: 'address' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' },
      ],
      name: 'addWhitelistUser',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'claimTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'cliff',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'firstRelease',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_totalTokens', type: 'uint256' },
      ],
      name: 'fundVesting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'projectName',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
      name: 'removeWhitelistUser',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_startTime', type: 'uint256' },
      ],
      name: 'setStartTime',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'startTime',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'timePerPeriod',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'token',
      outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalPeriods',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalTokens',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'userInfo',
      outputs: [
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'tokensClaimed', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ])
  var tokenvesting = tokenvestingContract
    .deploy({
      data: '0x60806040523480156200001157600080fd5b506040516200231c3803806200231c833981810160405281019062000037919062000495565b620000576200004b6200026d60201b60201c565b6200027560201b60201c565b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff161415620000ca576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000c1906200064c565b60405180910390fd5b61271085111562000112576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200010990620006b2565b60405180910390fd5b6000821162000158576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200014f906200062a565b60405180910390fd5b4284116200019d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000194906200066e565b60405180910390fd5b60008111620001e3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001da9062000690565b60405180910390fd5b86600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600390805190602001906200023c92919062000339565b5084600481905550836005819055508260088190555081600681905550806007819055505050505050505062000a40565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8280546200034790620007b8565b90600052602060002090601f0160209004810192826200036b5760008555620003b7565b82601f106200038657805160ff1916838001178555620003b7565b82800160010185558215620003b7579182015b82811115620003b657825182559160200191906001019062000399565b5b509050620003c69190620003ca565b5090565b5b80821115620003e5576000816000905550600101620003cb565b5090565b600062000400620003fa84620006fd565b620006d4565b9050828152602081018484840111156200041f576200041e62000887565b5b6200042c84828562000782565b509392505050565b600081519050620004458162000a0c565b92915050565b600082601f83011262000463576200046262000882565b5b815162000475848260208601620003e9565b91505092915050565b6000815190506200048f8162000a26565b92915050565b600080600080600080600060e0888a031215620004b757620004b662000891565b5b6000620004c78a828b0162000434565b975050602088015167ffffffffffffffff811115620004eb57620004ea6200088c565b5b620004f98a828b016200044b565b96505060406200050c8a828b016200047e565b95505060606200051f8a828b016200047e565b9450506080620005328a828b016200047e565b93505060a0620005458a828b016200047e565b92505060c0620005588a828b016200047e565b91505092959891949750929550565b60006200057660218362000733565b91506200058382620008a7565b604082019050919050565b60006200059d60188362000733565b9150620005aa82620008f6565b602082019050919050565b6000620005c460298362000733565b9150620005d1826200091f565b604082019050919050565b6000620005eb60228362000733565b9150620005f8826200096e565b604082019050919050565b60006200061260228362000733565b91506200061f82620009bd565b604082019050919050565b60006020820190508181036000830152620006458162000567565b9050919050565b6000602082019050818103600083015262000667816200058e565b9050919050565b600060208201905081810360008301526200068981620005b5565b9050919050565b60006020820190508181036000830152620006ab81620005dc565b9050919050565b60006020820190508181036000830152620006cd8162000603565b9050919050565b6000620006e0620006f3565b9050620006ee8282620007ee565b919050565b6000604051905090565b600067ffffffffffffffff8211156200071b576200071a62000853565b5b620007268262000896565b9050602081019050919050565b600082825260208201905092915050565b6000620007518262000758565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b83811015620007a257808201518184015260208101905062000785565b83811115620007b2576000848401525b50505050565b60006002820490506001821680620007d157607f821691505b60208210811415620007e857620007e762000824565b5b50919050565b620007f98262000896565b810181811067ffffffffffffffff821117156200081b576200081a62000853565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f5f746f74616c506572696f6473206d7573742067726561746572207468616e2060008201527f3000000000000000000000000000000000000000000000000000000000000000602082015250565b7f7a65726f2061646472657373206e6f7420616c6c6f7765640000000000000000600082015250565b7f5f737461727454696d65206d7573742067726561746572207468616e2063757260008201527f72656e742074696d650000000000000000000000000000000000000000000000602082015250565b7f5f74696d65506572506572696f64206d7573742067726561746572207468616e60008201527f2030000000000000000000000000000000000000000000000000000000000000602082015250565b7f5f666972737452656c65617365206d757374206c657373207468616e2031303060008201527f3030000000000000000000000000000000000000000000000000000000000000602082015250565b62000a178162000744565b811462000a2357600080fd5b50565b62000a318162000778565b811462000a3d57600080fd5b50565b6118cc8062000a506000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80637ba8c12d116100a2578063cf0f0e9c11610071578063cf0f0e9c1461025b578063da5db74814610279578063f2fde38b14610297578063fc0c546a146102b3578063fea708f6146102d15761010b565b80637ba8c12d146101e55780637e1c0c09146102015780638da5cb5b1461021f5780639a33e3001461023d5761010b565b806348c54b9d116100de57806348c54b9d14610197578063715018a6146101a157806373913545146101ab57806378e97925146101c75761010b565b806313d033c0146101105780631959a0021461012e57806330cc7ae01461015f5780633e0a322d1461017b575b600080fd5b6101186102ef565b604051610125919061139c565b60405180910390f35b61014860048036038101906101439190610f49565b6102f5565b6040516101569291906113b7565b60405180910390f35b61017960048036038101906101749190610f49565b610319565b005b61019560048036038101906101909190610fe3565b6103ad565b005b61019f610402565b005b6101a96108e3565b005b6101c560048036038101906101c09190610fe3565b6108f7565b005b6101cf610af4565b6040516101dc919061139c565b60405180910390f35b6101ff60048036038101906101fa9190610f76565b610afa565b005b610209610bda565b604051610216919061139c565b60405180910390f35b610227610be0565b60405161023491906111bb565b60405180910390f35b610245610c09565b604051610252919061127a565b60405180910390f35b610263610c97565b604051610270919061139c565b60405180910390f35b610281610c9d565b60405161028e919061139c565b60405180910390f35b6102b160048036038101906102ac9190610f49565b610ca3565b005b6102bb610d27565b6040516102c8919061125f565b60405180910390f35b6102d9610d4d565b6040516102e6919061139c565b60405180910390f35b60085481565b60016020528060005260406000206000915090508060000154908060010154905082565b610321610d53565b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160009055600182016000905550507f54d30f626a5e3247856d9b6d01d9f243288fe16273fa9d14698d07d82f0a5636816040516103a291906111bb565b60405180910390a150565b6103b5610d53565b4281116103c157600080fd5b806005819055507f191dde3e99ae398f28f0457d7346866a4fa04805ac0b57190b944935b5aa7550816040516103f7919061139c565b60405180910390a150565b620f424060095411610449576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104409061129c565b60405180910390fd5b60003390506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506104a960018260010154610dd190919063ffffffff16565b8160000154116104ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e5906112dc565b60405180910390fd5b6005544211610532576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610529906112bc565b60405180910390fd5b600061054960055442610de790919063ffffffff16565b9050600061057a61271061056c6004548660000154610dfd90919063ffffffff16565b610e1390919063ffffffff16565b90506008548210156106f55760008360010154146105cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c49061131c565b60405180910390fd5b6105e4818460010154610dd190919063ffffffff16565b836001018190555061060181600954610de790919063ffffffff16565b600981905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85836040518363ffffffff1660e01b8152600401610664929190611236565b602060405180830381600087803b15801561067e57600080fd5b505af1158015610692573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b69190610fb6565b507fe42df0d9493dfd0d7f69902c895b94c190a53e8c27876a86f45e7c997d9d8f7c84826040516106e8929190611236565b60405180910390a16108dd565b61070a60085483610de790919063ffffffff16565b91506000610736600161072860075486610e1390919063ffffffff16565b610dd190919063ffffffff16565b90506006548111156107485760065490505b6000610761838660000154610de790919063ffffffff16565b905060006107b486600101546107a68661079860065461078a8989610dfd90919063ffffffff16565b610e1390919063ffffffff16565b610dd190919063ffffffff16565b610de790919063ffffffff16565b90506107cd818760010154610dd190919063ffffffff16565b86600101819055506107ea81600954610de790919063ffffffff16565b600981905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb88836040518363ffffffff1660e01b815260040161084d929190611236565b602060405180830381600087803b15801561086757600080fd5b505af115801561087b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089f9190610fb6565b507fe42df0d9493dfd0d7f69902c895b94c190a53e8c27876a86f45e7c997d9d8f7c87826040516108d1929190611236565b60405180910390a15050505b50505050565b6108eb610d53565b6108f56000610e29565b565b6108ff610d53565b80600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b815260040161095d9291906111d6565b60206040518083038186803b15801561097557600080fd5b505afa158015610989573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ad9190611010565b146109ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e49061133c565b60405180910390fd5b610a0281600954610dd190919063ffffffff16565b600981905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610a67939291906111ff565b602060405180830381600087803b158015610a8157600080fd5b505af1158015610a95573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab99190610fb6565b507f3677c9434f5ab443cebe570bd0549adb7149a47c57a250985034f42dbea50e4681604051610ae9919061139c565b60405180910390a150565b60055481565b610b02610d53565b6005544210610b46576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3d9061137c565b60405180910390fd5b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050818160000181905550600081600101819055507f9673b736d6d459e4ac9b04562cda5dc89af4d2805f1f001e4293cb844cd6fbd38383604051610bcd929190611236565b60405180910390a1505050565b60095481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60038054610c16906115c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610c42906115c2565b8015610c8f5780601f10610c6457610100808354040283529160200191610c8f565b820191906000526020600020905b815481529060010190602001808311610c7257829003601f168201915b505050505081565b60075481565b60045481565b610cab610d53565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610d1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d12906112fc565b60405180910390fd5b610d2481610e29565b50565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b610d5b610eed565b73ffffffffffffffffffffffffffffffffffffffff16610d79610be0565b73ffffffffffffffffffffffffffffffffffffffff1614610dcf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dc69061135c565b60405180910390fd5b565b60008183610ddf91906113fc565b905092915050565b60008183610df591906114dd565b905092915050565b60008183610e0b9190611483565b905092915050565b60008183610e219190611452565b905092915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600081359050610f0481611851565b92915050565b600081519050610f1981611868565b92915050565b600081359050610f2e8161187f565b92915050565b600081519050610f438161187f565b92915050565b600060208284031215610f5f57610f5e611681565b5b6000610f6d84828501610ef5565b91505092915050565b60008060408385031215610f8d57610f8c611681565b5b6000610f9b85828601610ef5565b9250506020610fac85828601610f1f565b9150509250929050565b600060208284031215610fcc57610fcb611681565b5b6000610fda84828501610f0a565b91505092915050565b600060208284031215610ff957610ff8611681565b5b600061100784828501610f1f565b91505092915050565b60006020828403121561102657611025611681565b5b600061103484828501610f34565b91505092915050565b61104681611511565b82525050565b61105581611559565b82525050565b6000611066826113e0565b61107081856113eb565b935061108081856020860161158f565b61108981611686565b840191505092915050565b60006110a1601f836113eb565b91506110ac82611697565b602082019050919050565b60006110c4601a836113eb565b91506110cf826116c0565b602082019050919050565b60006110e76023836113eb565b91506110f2826116e9565b604082019050919050565b600061110a6026836113eb565b915061111582611738565b604082019050919050565b600061112d600e836113eb565b915061113882611787565b602082019050919050565b60006111506015836113eb565b915061115b826117b0565b602082019050919050565b60006111736020836113eb565b915061117e826117d9565b602082019050919050565b60006111966029836113eb565b91506111a182611802565b604082019050919050565b6111b58161154f565b82525050565b60006020820190506111d0600083018461103d565b92915050565b60006040820190506111eb600083018561103d565b6111f8602083018461103d565b9392505050565b6000606082019050611214600083018661103d565b611221602083018561103d565b61122e60408301846111ac565b949350505050565b600060408201905061124b600083018561103d565b61125860208301846111ac565b9392505050565b6000602082019050611274600083018461104c565b92915050565b60006020820190508181036000830152611294818461105b565b905092915050565b600060208201905081810360008301526112b581611094565b9050919050565b600060208201905081810360008301526112d5816110b7565b9050919050565b600060208201905081810360008301526112f5816110da565b9050919050565b60006020820190508181036000830152611315816110fd565b9050919050565b6000602082019050818103600083015261133581611120565b9050919050565b6000602082019050818103600083015261135581611143565b9050919050565b6000602082019050818103600083015261137581611166565b9050919050565b6000602082019050818103600083015261139581611189565b9050919050565b60006020820190506113b160008301846111ac565b92915050565b60006040820190506113cc60008301856111ac565b6113d960208301846111ac565b9392505050565b600081519050919050565b600082825260208201905092915050565b60006114078261154f565b91506114128361154f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611447576114466115f4565b5b828201905092915050565b600061145d8261154f565b91506114688361154f565b92508261147857611477611623565b5b828204905092915050565b600061148e8261154f565b91506114998361154f565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156114d2576114d16115f4565b5b828202905092915050565b60006114e88261154f565b91506114f38361154f565b925082821015611506576115056115f4565b5b828203905092915050565b600061151c8261152f565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006115648261156b565b9050919050565b60006115768261157d565b9050919050565b60006115888261152f565b9050919050565b60005b838110156115ad578082015181840152602081019050611592565b838111156115bc576000848401525b50505050565b600060028204905060018216806115da57607f821691505b602082108114156115ee576115ed611652565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f56657374696e6720686173206e6f74206265656e2066756e6465642079657400600082015250565b7f56657374696e67206861736e2774207374617274656420796574000000000000600082015250565b7f416c6c20746f6b656e7320636c61696d6564206f72206e6f742077686974656c60008201527f6973740000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f746f6b656e7320636c61696d6564000000000000000000000000000000000000600082015250565b7f4e6f7420616c6c6f77207370656e6420746f6b656e0000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f56657374696e672068617320737461727465642c2063616e6e6f74206164642060008201527f77686974656c6973740000000000000000000000000000000000000000000000602082015250565b61185a81611511565b811461186557600080fd5b50565b61187181611523565b811461187c57600080fd5b50565b6118888161154f565b811461189357600080fd5b5056fea264697066735822122081756e95e8fead73cb5d3feadea52c5af53bedaa4dda3d83cb4fa645520fab5564736f6c63430008070033',
      arguments: [
        _token,
        _projectName,
        _firstRelease,
        _startTime,
        _cliff,
        _totalPeriods,
        _timePerPeriod,
      ],
    })
    .send(
      {
        from: wallet.address,
        gas: '4700000',
      },
      function (e, contract) {
        console.log(e, contract)
        if (typeof contract.address !== 'undefined') {
          console.log(
            'Contract mined! address: ' +
              contract.address +
              ' transactionHash: ' +
              contract.transactionHash
          )
        }
      }
    )
}

module.exports = deploy
