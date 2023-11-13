import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  
  return (
    <div class="mx-auto max-w-screen-lg h-screen flex justify-center items-center">
      <form action='/room' method="GET">
        <input type="text" placeholder="Username" name="username" 
          class="border py-2 px-4"/>
        <button type="submit" class="border mx-4 py-2 px-4 bg-black text-white">Join</button>

      </form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
