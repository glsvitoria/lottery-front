import web3 from './web3'

const address = '0xeA5eFF33dCe8d8AF84cC25BcB596CCB350F91CC5'

const abi = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		inputs: [],
		name: 'enter',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getPlayers',
		outputs: [
			{ internalType: 'address payable[]', name: '', type: 'address[]' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'lastWinner',
		outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'manager',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'pickWinner',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'players',
		outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
]

interface LotteryMethods {
	enter(): {
		send(options: { from: string; value: string; gas?: string }): Promise<{
			transactionHash: string
			blockHash: string
			blockNumber: number
		}>
	}
	getPlayers(): {
		call(): Promise<string[]>
	}
	lastWinner(): {
		call(): Promise<string>
	}
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
