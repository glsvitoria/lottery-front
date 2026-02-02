import { useActionState, useEffect, useState } from 'react'
import web3 from './web3'
import lottery from './lottery'

interface ActionState {
	success: boolean
	error: boolean
}

function App() {
	const [manager, setManager] = useState<string>('')
	const [players, setPlayers] = useState<string[]>([])
	const [balance, setBalance] = useState<bigint>(0n)
	const [input, setInput] = useState<string>('')

	const handleSubmit = async (_: ActionState, formData: FormData) => {
		try {
			const accounts = await web3.eth.getAccounts()

			await lottery.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(formData.get('value') as string, 'ether'),
			})

			return {
				success: true,
				error: false,
			}
		} catch (err) {
			console.log(err)

			return { error: true, success: false }
		}
	}

	const [response, submitAction, isPending] = useActionState(handleSubmit, {
		error: false,
		success: false,
	})

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const pickAWinner = async (_: ActionState, __: FormData) => {
		try {
			const accounts = await web3.eth.getAccounts()

			await lottery.methods.pickWinner().send({
				from: accounts[0],
			})

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

	useEffect(() => {
		const showContractInformation = async () => {
			const playersIn = await lottery.methods.getPlayers().call()
			setPlayers(playersIn)

			const managerCreated = await lottery.methods.manager().call()
			setManager(managerCreated)

			const totalBalance = await web3.eth.getBalance(lottery.options.address)
			setBalance(totalBalance)
		}

		const showManager = async () => {}

		showContractInformation()
		showManager()
	}, [])

	return (
		<main>
			<h2>Lottery Contract</h2>
			<p>This contract is managed by {manager}</p>
			<p>
				There are currently {players.length} people entered, competing to win{' '}
				{web3.utils.fromWei(balance, 'ether')} ether!
			</p>

			<hr />

			<form action={submitAction}>
				<h4>Want to try your luck?</h4>
				<div>
					<label>Amount of ether to enter</label>
					<input
						name="value"
						value={input}
						onChange={(e) => {
							setInput(e.target.value)
						}}
					/>
				</div>
				<button disabled={isPending}>Enter</button>

				{isPending && <h1>Waiting on transaction success...</h1>}

				{!isPending && (response.error || response.success) && (
					<h1>
						{response.success
							? 'You have been entered!'
							: 'An error occurred while entering!'}
					</h1>
				)}
			</form>

			<hr />

			<form action={submitActionPickAWinner}>
				<h4>Ready to pick a winner?</h4>
				<button disabled={isPendingPickAWinner}>Pick a winner</button>

				{isPendingPickAWinner && <h1>Picking a winner...</h1>}

				{!isPendingPickAWinner &&
					(responsePickAWinner.error || responsePickAWinner.success) && (
						<h1>
							{responsePickAWinner.success
								? 'A winner has been picked!'
								: 'An error occurred while picking a winner!'}
						</h1>
					)}
			</form>

			<hr />
		</main>
	)
}

export default App
