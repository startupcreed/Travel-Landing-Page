# Front End Travel Landing Page
It's been a long time since I get my hands on front end, lately I've been surrounded with javascript and C# which made me forget about front end. So here's a simple landing page I created for fun (still on going). This project is build with NextJS & typescript.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Credit](#credit)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Getting Started](#getting-started)


## 🚨 Overview

### The challenge

- Build out the project to the designs provided
- Implementing card slider for 'top destination' section
- Playing with CSS Layout - The position Property (relative, absolute) to style background 

### Screenshot
![Design overview for Travel Page](./public/header-travlog.png)

### Links
[Live Site URL](https://travlog-landing-page-zeta.vercel.app/)

### Credit
[Figma Web Design & UI kit i used for this project](https://www.figma.com/file/5faP92Sa9LBCqmtwIcvVIk/Landing-Page-UI-Design-in-Figma-(Community)?type=design&t=d4D5mlw01KLHlElv-6)

## ⚙️ My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- CSS Layout The position Property (relative, absolute)
- [Next JS](https://nextjs.org/) - React Framework for Production
- [Typescript](https://www.typescriptlang.org/) 
- [swiper js](https://swiperjs.com/) - JS library to add slider component

### What I learned
I found creating this section and making it responsive was not easy and took a lot of time, but I am quite satisfied with the result
![Travel point section](./public/travel-point-section.png)

### Continued development
Coming soon

### Useful resources
- [UI/UX Design Resources](https://ui8.net/) - This website provide many UI/UX design, some are even free.
- [Build and Deploy a Fully Responsive Modern UI/UX Website | React.js, Next.js 13, Tailwind CSS by JavaScript Mastery](https://www.youtube.com/watch?v=cuzw4vL1z5E&list=PLX3rE0SL_PjHPmNDA1PVfR7_22pzEuW5T&index=13&t=3479s&ab_channel=JavaScriptMastery) 
- [Swiper React Components](https://swiperjs.com/react#styles)
- [Flowbite](https://www.flowbite-react.com/docs/components/carousel)

## Author
Github - [Shabrina Putri](https://github.com/shabrina12)

## 🤸 Getting Started

To run the development server:

```bash
npm run dev
```


## Popup and contact configuration

Set these public values in `.env.local` for development and in Vercel for deployment:

```dotenv
NEXT_PUBLIC_LEAD_POPUP_ENABLED=true
NEXT_PUBLIC_LEAD_POPUP_DELAY_SECONDS=30
NEXT_PUBLIC_PRIMARY_PHONE=9650691672
```

Restart the development server or rebuild after changing these values; Next.js embeds
`NEXT_PUBLIC_*` settings at build time. `lib/siteConfig.ts` provides the shared configuration.
Missing or invalid popup settings default to enabled and 30 seconds. The delay accepts
non-negative seconds within the browser timer limit. Setting enabled to `false` disables
both timed and exit-intent triggers; manual CTA popups remain available. The popup is
shown automatically at most once per tab session, using `sessionStorage` with an in-memory
fallback if storage is blocked. There is no multi-day cooldown or persistent submission gate.

The primary phone accepts exactly 10 digits and defaults to `9650691672` if missing or
invalid. Display text uses those digits; telephone links use `+919650691672`, and WhatsApp
links use `919650691672`, both derived from the same value. All global phone and WhatsApp
links, including legal-page contact text, use this configuration. No active page-specific
number overrides were found. Existing optional SEO-page WhatsApp override support is retained.
