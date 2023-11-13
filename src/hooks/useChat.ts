import { 
    $, useStore, useSignal, useVisibleTask$,
    type NoSerialize, noSerialize 
} from "@builder.io/qwik"

export const useChat = (username: string) => {

    const store = useStore({messages: [
        {
            id: 1,
            author: 'Admin',
            text: `Welcome ${username}!`
        }
    ]})

    const socket = useSignal<NoSerialize<WebSocket>>()

    useVisibleTask$(({cleanup}) => {
        const ws = new WebSocket('ws://localhost:3000/chat')

        ws.onopen = () => {
            console.log('open :>> ', ws.readyState)
        }
        ws.onmessage = (event) => {
            console.log('event.data :>> ', event.data)
            store.messages.push(JSON.parse(event.data))
        }
        ws.onclose = () => {
            console.log('ws closed')
        }
        cleanup(() => {
            ws.close()
        })
        socket.value = noSerialize(ws)
    })

    const sendMessage = $((text: string) => {

        const newMessage = {
            id: Date.now(),
            author: username,
            text
        }
        store.messages.push(newMessage)
        socket.value?.send(JSON.stringify(newMessage))
    })

    return { 
        username, 
        messages: store.messages,
        sendMessage
    }
}