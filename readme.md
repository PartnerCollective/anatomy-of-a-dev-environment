# Creating the environment "YOU" need

## Some Context to my thoughts.
As shopify partners we have a built in expectation that we should have the tools and flows given to us verbatim to achieve our development goals. No matter if it is building apps, themes or anything else amazing we can dream up. So often this spouts out as "Shopify please give us X tool" when we recieve X it never matches the needs expecation. 

This is unfortunatley the case in all dev communities, oppinionated structures and scaffholding will appease many but it is not neccessarily "What" you need or what will make you are your company more performant. Worst of all some times following an oppinionated flow which is out side of your teams mindset can detrimentally slow or cripple your team. 

With all that as a bit of context and based from a number of years around the edges in a number of agencies and workflows. After multiple iterations, multiple failures, managing developers / engineers at all levels. I have come to stong belief, that a team or agency should build and adopt their tooling. This can be a great opportunity to unify a team and remove knowledge silos surrounding the core tools that are in use from a day to day perspective. 

Now I am not saying go out there and write a language, optimizer etc etc. I am talking about composing a collection made up amazing tools that this phenomenal OSS community has shaped the face of the web with. Tweak them to your needs, understand them and most of all iterate constantly. Learn and watch the industry and adopt salient approaches as a team growing from project to project.

This will all be focused on the theme space, specifically but many of the mindsets extend to apps and other development processs, although they are actually easier in a lot of ways where there are well established frameworks with extensive tooling iterated on by thousands of amazing and clever folk.  

## A sanity check from experience
Never be afraid to abandon something or make a change if something doesnt work for your team, failure is just a step to better processes. Embrace that mindset and you will be happier... I promise. 

# Into the actual purpose for this repo
Before you embark on creating tooling its a good idea to define exactly what you need. Keep your tools simple but as complex as needed to achieve your goal. 

An example based on my current teams needs would be: 

- [ ] 1. GIT baseed the source of truth for code
- [X] 2. theme folder ( `/src/theme` )
- [ ] 3. SCSS compilation & minification
- [ ] 4. Javascript ( ES6+) + React with common copliation and chunking (no jQuery blergh )
- [ ] 5. Live push of theme files reloading of dev preview themes
- [ ] 6. Fast setup and project kick off
- [ ] 7. Salient starting points
- [ ] 8. Build and deploy tools for staging store/s and one or many regional live stores

Right so once you have mapped out your needs its time to have a team discussion and define how you connect all the dots.
Taking that list of needs and using the experience you have at your team disposal, possibly have a bit of a research and hack session surrounding different available tools in the wild.


## Map out the tools to the goals and POC them

- [X] 1. Github
- [X] 2. Repo (`/src/theme`) 
- [X] 3. SCSS compilation ( `webpack + Nodesass + postcss = /src/styles/theme.scss`)
- [X] 4. Javascript ( ES6+) + React with common copliation and chunking (no jQuery blergh )
- [X] 5.1 `ThemeKit` for local devleopment pushes
- [X] 5.2 Reloading `Browsersync` 
- [ ] 6. Fast setup and project kick off `build a cli once later?`
- [ ] 7. Salient starting points `any startin theme you choose`
- [ ] 8. Build and deploy tools `handle this later once the rest is working`

Right so from that we have a rough set of tools these are not extensive review the [suggested tools](./suggestedtools.md) doc for other options.


## Fitting the puzzle pieces together

[Reference Folder](./examples/leigh-b/)

We are gonna start off by creating our base folder and placeholders. 






