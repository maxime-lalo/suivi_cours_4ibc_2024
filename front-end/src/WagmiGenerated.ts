import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BasicContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const basicContractAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPayableValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'payableValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setPayableValue',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'value',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

export const basicContractAddress =
  '0xDe4166C67C54070f1a0b4D9d60993429c85b3368' as const

export const basicContractConfig = {
  address: basicContractAddress,
  abi: basicContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__
 */
export const useReadBasicContract = /*#__PURE__*/ createUseReadContract({
  abi: basicContractAbi,
  address: basicContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"getPayableValue"`
 */
export const useReadBasicContractGetPayableValue =
  /*#__PURE__*/ createUseReadContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'getPayableValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"getValue"`
 */
export const useReadBasicContractGetValue = /*#__PURE__*/ createUseReadContract(
  {
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'getValue',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"payableValue"`
 */
export const useReadBasicContractPayableValue =
  /*#__PURE__*/ createUseReadContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'payableValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"value"`
 */
export const useReadBasicContractValue = /*#__PURE__*/ createUseReadContract({
  abi: basicContractAbi,
  address: basicContractAddress,
  functionName: 'value',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicContractAbi}__
 */
export const useWriteBasicContract = /*#__PURE__*/ createUseWriteContract({
  abi: basicContractAbi,
  address: basicContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setPayableValue"`
 */
export const useWriteBasicContractSetPayableValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setPayableValue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setValue"`
 */
export const useWriteBasicContractSetValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicContractAbi}__
 */
export const useSimulateBasicContract = /*#__PURE__*/ createUseSimulateContract(
  { abi: basicContractAbi, address: basicContractAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setPayableValue"`
 */
export const useSimulateBasicContractSetPayableValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setPayableValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setValue"`
 */
export const useSimulateBasicContractSetValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setValue',
  })
