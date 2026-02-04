import { useActionState } from 'react'
import lottery from '../lottery'
import web3 from '../web3'
import { Button } from './ui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@/common/query-key'

interface PickWinner {
	players?: string[]
}

export const PickWinner = ({ players }: PickWinner) => {
	const queryClient = useQueryClient()

	const { mutateAsync: pickWinnerFn } = useMutation({
		mutationFn: async () => {
			const accounts = await web3.eth.getAccounts()

			return await lottery.methods.pickWinner().send({
				from: accounts[0],
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.BALANCE],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.PLAYERS],
			})
		},
	})

	const pickAWinner = async () => {
		try {
			await pickWinnerFn()

			return {
				success: true,
				error: false,
			}
		} catch (err) {
			console.log(err)

			return { error: true, success: false }
		}
	}

	const [responsePickAWinner, submitActionPickAWinner, isPendingPickAWinner] =
		useActionState(pickAWinner, {
			error: false,
			success: false,
		})

	const { data: lastWinner, isLoading: isLoadingLastWinner } = useQuery({
		queryKey: [QUERY_KEY.LAST_WINNER],
		queryFn: async () => await lottery.methods.lastWinner().call(),
		enabled: responsePickAWinner.success,
	})

	return (
		<form action={submitActionPickAWinner} className="flex flex-col gap-4">
			<h4 className="font-medium text-sm">Ready to pick a winner?</h4>
			<Button disabled={isPendingPickAWinner || players?.length === 0}>
				{players?.length === 0 ? 'Wait for players to enter' : 'Pick a winner'}
			</Button>

			{isPendingPickAWinner && <h1>Picking a winner...</h1>}

			{!isPendingPickAWinner &&
				(responsePickAWinner.error || responsePickAWinner.success) && (
					<div>
						{responsePickAWinner.success ? (
							<div className="space-y-2">
								<h1 className="text-green-600 font-semibold">
									🎉 A winner has been picked!
								</h1>
								{isLoadingLastWinner ? (
									<p className="text-sm text-gray-600">Loading winner...</p>
								) : (
									lastWinner && (
										<p className="text-sm text-gray-700">
											Winner:{' '}
											<strong className="font-mono">{lastWinner}</strong>
										</p>
									)
								)}
							</div>
						) : (
							<h1 className="text-red-600 font-semibold">
								An error occurred while picking a winner!
							</h1>
						)}
					</div>
				)}
		</form>
	)
}
