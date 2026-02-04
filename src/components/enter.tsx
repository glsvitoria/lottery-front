import { useActionState, useState } from 'react'
import lottery from '../lottery'
import web3 from '../web3'
import type { ActionState } from '../types/action-state'
import { masks } from '../utils/masks'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@/common/query-key'

export const Enter = () => {
	const [input, setInput] = useState<string>('')

	const queryClient = useQueryClient()

	const { mutateAsync: enterFn } = useMutation({
		mutationFn: async (value: string) => {
			const accounts = await web3.eth.getAccounts()

			return await lottery.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(value, 'ether'),
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

	const handleSubmit = async (_: ActionState, formData: FormData) => {
		try {
			await enterFn(formData.get('value') as string)

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

	return (
		<form action={submitAction} className="flex flex-col gap-4">
			<div className="flex gap-4 flex-col w-full">
				<Label htmlFor="value">Want to try your luck?</Label>
				<Input
					id="value"
					name="value"
					value={input}
					placeholder="Amount of ether to enter"
					onChange={(e) => {
						const maskedValue = masks.ether(e.target.value)

						setInput(maskedValue)
					}}
				/>
			</div>
			<Button disabled={isPending}>Enter</Button>

			{isPending && <h1>Waiting on transaction success...</h1>}

			{!isPending && (response.error || response.success) && (
				<h1>
					{response.success
						? 'You have been entered!'
						: 'An error occurred while entering!'}
				</h1>
			)}
		</form>
	)
}
