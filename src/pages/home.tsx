import { useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../common/query-key'
import lottery from '../lottery'
import web3 from '../web3'
import { ContractData } from '../components/contract-data'
import { PickWinner } from '../components/pick-winner'
import { Enter } from '../components/enter'
import { useEffect } from 'react'

export const Home = () => {
	const queryClient = useQueryClient()

	const { data: manager, isLoading: isLoadingManager } = useQuery({
		queryKey: [QUERY_KEY.MANAGER],
		queryFn: async () => await lottery.methods.manager().call(),
	})

	const { data: currentWallet, isLoading: isLoadingCurrentWallet } = useQuery({
		queryKey: [QUERY_KEY.CURRENT_WALLET],
		queryFn: async () => {
			const accounts = await web3.eth.getAccounts()

			return accounts[0]
		},
	})

	const { data: totalBalance, isLoading: isLoadingTotalBalance } = useQuery({
		queryKey: [QUERY_KEY.BALANCE],
		queryFn: async () => await web3.eth.getBalance(lottery.options.address),
	})

	const { data: players, isLoading: isLoadingPlayers } = useQuery({
		queryKey: [QUERY_KEY.PLAYERS],
		queryFn: async () => await lottery.methods.getPlayers().call(),
	})

	useEffect(() => {
		const handleAccountsChanged = async () => {
			await window.ethereum?.request({ method: 'eth_requestAccounts' })

			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.CURRENT_WALLET],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.PLAYERS],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.BALANCE],
			})
		}

		if (window.ethereum && typeof window.ethereum.on === 'function') {
			window.ethereum.on('accountsChanged', handleAccountsChanged)
		}

		return () => {
			if (
				window.ethereum &&
				typeof window.ethereum.removeListener === 'function'
			) {
				window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
			}
		}
	}, [queryClient])

	// Tela de carregamento dos dados
	if (
		isLoadingManager ||
		isLoadingPlayers ||
		isLoadingTotalBalance ||
		isLoadingCurrentWallet
	) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
					<h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
					<p className="text-gray-600 mt-2">Carregando dados do contrato...</p>
				</div>
			</div>
		)
	}

	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						🎰 Lottery Contract
					</h1>
					<p className="text-gray-600">Try your luck and win big!</p>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-6">
					<ContractData
						manager={manager}
						players={players}
						totalBalance={totalBalance}
					/>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-6">
					<Enter />
				</div>

				{manager === currentWallet && (
					<div className="bg-white rounded-lg shadow-lg p-6">
						<PickWinner players={players} />
					</div>
				)}
			</div>
		</main>
	)
}
