Svelvix is a starter pack with :

- [SvelteKit](https://svelte.dev)
- [DaisyUI](https://daisyui.com)
- [Convex](https://convex.dev)
- [Better-Auth](https://better-auth.vercel.app)
- [Bits-UI](https://bits-ui.com)
- [Valibot](https://valibot.dev)

# Getting started

1. Clone this repo.
2. Install Convex in your server, with Coolify for example (check [this](https://github.com/coollabsio/coolify/discussions/6257) as the site URL of Convex is not for the moment included in the Coolify template).
3. Create a `.env.local` from the `.env.dist` and fill it
4. Set the environment variable : `bunx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)`
5. Customize your [DaisyUI theme](https://daisyui.com/theme-generator/#theme=eJx1lNtuozAQhl_FQqq0lRrL4yPet3HANKgEI5tou7vqu3eAKAVM7rDnm9M_Y_4Xvbv64ndRhTiE6EZfvOF3F-IpVRc_m7r2_TLi9em0GM4u-RMwhqbw0VWXX7Z8IYwyBgSYppKL1z3N17TZ0jKjxZrmCy2ILKkBk8FV6Effjw8HDouDJkpTJje1DLG9uvj3wRo9sVwIAoLRUh2wWfx7swLL54watakoecTrdQqt5hQSiFCSClYe4nmWRSSQREhBwW7cXFWtWTNLxMESkJYqY3P2WRdQElCKllyvfXp_G6PrHjDIRVJJMD5XB-iz-Mcr0fZN-KmeTSRoRTgKpLfrMJH5hJfYFgjXhlqxKSjdsOGUdiMGYwhoQfm2kDucZ5idmMLqDadK8bXTHxf7tn__yTBPGEpBUEkr5AH7LIGxRGhUdDMxH2OIe3mmZjnOWGdkHlst8nCUBx_Avfbo6vaWcOM6X41zfB79dW1qWt_VeI-rpHamc_jcGVL7z6-DZbajaOcQaz_RMHzOF7Ufxst0nk99aNP0v2F4qn3jbh021bgu-bdiiL7xMeFb-bjffX0DOlJVwQ)
6. Launch `npm run auth:generate` to generate the schema for the [local install](https://convex-better-auth.netlify.app/local-install)

# Usage

## Server side

The App.Locals contains the user if logged, and a ConvexHttpClient with the user token.
You can use them directly in all your load functions and actions.

## Client side

Use :

```svelte
<script lang="ts">
	import { useConvexClient } from 'convex-svelte';

	const client = useConvexClient();
</script>
```

# LLMs

Check the following docs for adding more context to your IDE/LLMs :

- [Svelte](https://svelte.dev/docs/llms)
- [DaisyUI](https://daisyui.com/docs/editor/)
- [Convex](https://docs.convex.dev/ai)
- [Bits-UI](https://bits-ui.com/docs/llms)

# Why ...

To understand these technical choices, here's a simple rule: I want the simplest possible stack to be able to do as much as possible.
When I talk about simplicity, I mean that the final code should ultimately be as simple as possible. LESS CODE = LESS BUGS.
The final result must be the fastest possible application, with minimal client-side Javascript.

Another rule: I limit dependencies as much as possible.
Both the libraries installed in my project and dependencies on external services. For example, using Clerk or an equivalent for authentication means that the day that service is down, I'm down. I only want to be down if my server is down.

Note: I have bad news for you... I am neither a prophet, nor a fortune-teller, nor the wisest person on Earth. Therefore, I do not hold the truth. All of this is just my personal opinion, and I'm not forcing anyone to share it.

## Svelte

Svelte components are much simpler to write than React or Solid.
Svelte's compiler allows me to have very fast components while being less limited than Astro (which I recommend if you're making a "showcase" website; here we're talking more about a web application).

## DaisyUI

I hate Tailwind CSS components with 40 classes. It's hard to maintain because it's unreadable. DaisyUI simplifies all that with a very practical theme system!
I avoid Svelte UI libraries (UI frameworks like Carbon Svelte, SvelteUI, Flowbite Svelte, etc.) because using them makes me dependent on them for the Svelte version I want to use.
If Svelte releases a new major version that requires these libraries to update, I have to wait for their updates before I can use that new version myself. So I avoid them as much as possible.

## Convex

I loved SQL, then I hated SQL.
I loved classic ORMs (Doctrine), then I hated classic ORMs.
I loved Prisma, then I hated Prisma.
Convex, I love you!

Native real-time, everything is just code (very simple and pure code!), the components are great, the limitations force me to think carefully about the architecture... In short: I love Convex.

Of course, you should self-host Convex with Coolify.

## Better-Auth

Do I really need to explain why?

## Bits-UI

I only use Bits-UI to fill in HTML gaps. Can't wait for native comboboxes and date range picker!

## Valibot

Very simple to use, excellent performance, I like their modular vision. Plus, perfectly usable in the Convex functions environment.

## Other things

A few random libraries I recommand you to use @thisux/sveltednd if you need to sort list, Lucide for icons, Gotenberg for generating PDF, ckeditor5 for WYSIWYG, apexcharts, libphonenumber-js, svelte-tel-input, Melt-UI, and all svelte-put packages.
