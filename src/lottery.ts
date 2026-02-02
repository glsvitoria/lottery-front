import web3 from './web3'

const address = '0x16Bd6390d7df87c77b5f0D8a822Bf618a2c8b0a1'

const abi = [
	{
		constant: true,
		inputs: [],
		name: 'manager',
		outputs: [{ name: '', type: 'address' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [],
		name: 'pickWinner',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'getPlayers',
		outputs: [{ name: '', type: 'address[]' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [],
		name: 'enter',
		outputs: [],
		payable: true,
		stateMutability: 'payable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: '', type: 'uint256' }],
		name: 'players',
		outputs: [{ name: '', type: 'address' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
]

interface LotteryMethods {
	manager(): {
		call(): Promise<string>
	}
	pickWinner(): {
		send(options: { from: string; gas?: string }): Promise<{
			transactionHash: string
			blockHash: string
			blockNumber: number
		}>
	}
	getPlayers(): {
		call(): Promise<string[]>
	}
	enter(): {
		send(options: { from: string; value: string; gas?: string }): Promise<{
			transactionHash: string
			blockHash: string
			blockNumber: number
		}>
	}
}

// Tipo do contrato completo
export interface LotteryContract {
	methods: LotteryMethods
	options: {
		address: string
	}
}

const lottery = new web3.eth.Contract(
	abi,
	address
) as unknown as LotteryContract

export default lottery
