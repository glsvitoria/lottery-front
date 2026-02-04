import web3 from '../web3'

export interface ContractDataProps {
	manager?: string
	players?: string[]
	totalBalance?: bigint
}

export const ContractData = ({
	manager,
	players,
	totalBalance,
}: ContractDataProps) => {
	return (
		<div>
			<p>
				This contract is managed by <strong>{manager}</strong>
			</p>
			<p>
				There are currently <strong>{players?.length}</strong> people entered,
				competing to win{' '}
				<strong>{web3.utils.fromWei(totalBalance || 0n, 'ether')}</strong>{' '}
				ether!
			</p>
		</div>
	)
}
