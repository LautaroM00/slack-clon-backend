
export const dateFormatter = (messages) => {
    return messages.map((message) => {
        const date = message.sent_at

        const hours = date.getUTCHours().toString().padStart(2, '0')
        const minutes = date.getUTCMinutes().toString().padStart(2, '0')

        message.sent_at = `${hours}:${minutes}`

        return message
    })
}

