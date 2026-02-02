import Web3 from 'web3'

interface EthereumProvider {
	request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
	on?: (event: string, callback: (...args: unknown[]) => void) => void
	removeListener?: (
		event: string,
		callback: (...args: unknown[]) => void
	) => void
	isMetaMask?: boolean
}

declare global {
	interface Window {
		ethereum?: EthereumProvider
	}
}

if (window.ethereum) {
	window.ethereum.request({ method: 'eth_requestAccounts' })
}

const web3 = new Web3(window.ethereum as EthereumProvider)

export default web3
