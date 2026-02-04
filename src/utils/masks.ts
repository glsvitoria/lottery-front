export const masks = {
	ether: (value: string) => {
		let masked = value.replace(/[^0-9.]/g, '')

		const parts = masked.split('.')
		if (parts.length > 2) {
			masked = parts[0] + '.' + parts.slice(1).join('')
		}

		if (parts.length === 2 && parts[1].length > 18) {
			masked = parts[0] + '.' + parts[1].slice(0, 18)
		}

		return masked
	},
}
