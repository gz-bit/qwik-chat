import { $, QwikSubmitEvent, component$ } from "@builder.io/qwik";
import { useLocation, type RequestHandler } from "@builder.io/qwik-city";
import { useChat } from "../../hooks/useChat";

export const onRequest: RequestHandler = (event) => {
    const url = new URL(event.url)
    const username = url.searchParams.get('username')

    if (!username || username.length < 3) {
        throw event.redirect(302, '/')
    }
} 

export default component$(() => {
    
    const loc = useLocation()
    const url = new URL(loc.url)
    const username = url.searchParams.get('username')!
    const { messages, sendMessage } = useChat(username)
    const submit = $(
        (event: QwikSubmitEvent<HTMLFormElement>, element: HTMLFormElement) => {
            const formData = new FormData(element)
            const text = formData.get('text') as string
            if (text) {
                sendMessage(text)
                element.reset()
            }
            
        }
    )
    return (
        <div class="mx-auto max-w-screen-lg h-screen grid grid-rows-[60px_1fr_80px]">
            <h1 class="text-2xl mx-2">
                You are chatting as <span class="text-blue-800">{username}</span>
            </h1>
            <div class="mx-2 border p-4">
                {messages.map((message) => <p key={message.id} class="mb-4">
                    <span class="text-indigo-500 text-sm">{message.author}</span>
                    <span class="block bg-slate-200 p-2 w-fit rounded-lg">{message.text}</span>
                </p>)}
            </div>
            <form class="flex m-2" preventDefault:submit onSubmit$={submit}>
                <input type="text" placeholder="Your message" name="text" 
                    class="border w-full p-4"
                />
                <button class="border p-4  ml-2  bg-black text-white">Send</button>
            </form>
        </div>
    )
})