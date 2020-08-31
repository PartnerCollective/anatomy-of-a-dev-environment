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
- [X] 4. Compilation (`webpack`)
- [X] 4.1 SCSS compilation ( `webpack + Nodesass + postcss = /src/styles/theme.scss`)
- [X] 4.2 Javascript ( ES6+) ( `webpack + terser + eslint ( optional typescript / react )`)
- [X] 5.1 `ThemeKit` for local devleopment pushes
- [X] 5.2 Reloading `Browsersync` 
- [ ] 6. Fast setup and project kick off `build a cli once later?`
- [ ] 7. Salient starting points `any startin theme you choose`
- [ ] 8. Build and deploy tools `handle this later once the rest is working`

Right so from that we have a rough set of tools these are not extensive review the [suggested tools](./suggestedtools.md) doc for other options.
This set of requirements may be drastically different to what you require, tweak what you need and revise to only that to start off with, next up we are going to look at my teams requirements. 


## Fitting the puzzle pieces together

[Reference Folder](./examples/webpack-js-css-themekit-browsersync/)

We are gonna start off by creating our base folder at `./examples/leigh-b/` this is the folder that we would commit to git with all the tooling in place along side the theme code. 
This means that any of our team can clone install and carry on or multiple of us can push in along side each other on our own branches. 

# 1. Init ( `git init && npm init`)
This will initialize git and npm ( adding a package.json) 

# 2. Lets create our initial folder structure 

```
/ 
src /
------| styles/
------|------| index.scss
------| scripts/
------|------| index.js
------| theme/
------|------| {... all the shopify folders and sub liquid files required}
```

In the example I have just dropped a copy of debut into my theme folder to get started from, you may have your own starter or favored theme to start from. For the example I have removed the SCSS and JS files out of the assets folder importing them into the compiler. 

This is obviously not what you would do, more often than not you would have a default starting point for theme development, however this show cases how you could take on external code and work on it through a build kit of your preference. 

# 3. Environment variables
There are a few ways to do this but in our case as a team we would prefer to use a `.env` file per user. As we dont want to commit those for security and best practice reasons we will leave a `sample.env` file in the root.

Along with any user specific config this will include our API credentials and theme ID/s which will be used with theme kit and our compilers.

We will continue to wire that up a little later on. 

# 4. Compilers ( Webpack with a number of plugins )

There are task runners and compilers of many forms and varieties. From the well know gulp and grunt orchestrating different compilation steps, this a great and accessible approach and used by many partners. However as I am going to use node to piece most of this together, we have npm cripts at our disposal so we will drop gulp and grunt and just use scripts to tie everything up.

In this case we will be using webpack for both our JS and SCSS compilation. This will allow us to easily split entries to performance tune in the future.
Webpack has a mature and comprehensive plugin ecosystem for example we will probably need some auto prefixing or need the compilation to be aware of the supported browsers that your team works to. 
We can do all of that in one tool which while not the simplest to configure is robust and well tested in industry. 

There are other options like rollup or parcel out there, but for this option we will use webpack and you can adapt as you need. 

**Want to learn more about webpack?**
you can find the [Webpack docs here](https://webpack.js.org/) however note this is designed for a more common local development flow such as one would use for a modern framework such as React or Vue, we will be using a subset of its full capabilities to work around the Shopify local/online requirements. 

## Webpack Setup
If you are unfamiliar with web pack this may all seem a little bit much but just stick with it I am gonna try explain all the sompilation logic and thinking behind it. As we setup a configuration for the following. 

    ## 4.1 SCSS 
    There are many ways you can compile SCSS from the soft touch tools along side gulp and grunt to using something like webpack.
    To start off we are going to compile just a single theme.css, however with a performance minds set we are going to plan for splitting this into a numbewr of sub files so we can trim backl what is loaded and when. I will talk more about this in the round down section at the end if splitting your files further is of interest. 

    ## 4.2 JS ( ES6 )
    With JS coming on leaps and bounds over the years, we really dont need jQuery so while we will talk about including it for app support. ( and Shopify in some cases come on its 2020) 

    With this in mind we are going to compile modern JS ES6+ into browser compatible JS, if you havent played with ES6 or newer its a great idea to jump on a few trutorials about the grate capabilities it allows you out of the box without libraries. Check out youtube for awesome teardowns on features and the way the JS industry is going. 

    SIDE NOTE: if you are writing in a liquid file `<script> // some code </script>` you will not be able to use all features reliably accross browsers, bare this in mind when choosing where to call scripts and how you handle the context of a pages content and scripts. Possibly use the DOM and specifically extend the `window.X.Y.Z` to surface functions and code for instantiation from liquid. 

OK back into the configuration. 

### Webpack Configuration files

We are going to create three webpack config files.

```
 /
 | --> webpack.common.js        // common config
 | --> webpack.dev.js           // developer config extends common
 | --> webpack.prod.js          // production config extends common
```

These three files allow us to seperate our teams dev experience config from that we want optimized for performance.

### webpack.common.js
Our common file is going to be one of the most crucial webpack config files that we will work with as it will be the source for both our dev and production environments on build. 

This file sets up our base config and entries. Wait hold up what? 
`Entries` are the files that we are going to compile simply listed in an object ( these could be dynamic ), this allows us to take control of what we want to split and will output a compiled file into `/src/theme/assets`.

At its simplest form we are going to just compile an `index.js` and `theme.css` from corresponding files within `/src/scripts` and `/src/styles` respectively.

You can easily extend this to multiple files by adding the corresponding entry, or even typescript if you so chose :)

This file will also set some defaults and tools it will use for compilation. We have a number of concepts here for instance we have the concept of plugins that allow us to manipulate the default handling of webpack extedning it from purely a JS compiler to enable SCSS compilation or other transposition as rerquired. 

**Note:** In this example it includes linters such as ES and style lint, you can remove these if that is your preferred approach. However these are a great way to bring in standards that your team like and maintain them automatically. In the real world this removed those time wastying comments about indentation, spacing or minor css gripes. Use it or remove it it is up to you :)

In the example you can find some placeholder configs for stylelink and eslint. It is always best to build out your rules as a team, have discussions and define what code quality looks like for you. 

## webpack.dev.js
This is the config extends common that is run when you start your dev environment, this will leave niceties like unminified CSS and JS in place along side an inline source map. 

**Note:** this is highly unperformant and care to make sure that a release/production environment is the only one deployed to live must be a focus. 

## webpack.prod.js
This is the config that will minify the output and add any required prefixing. In this example it is wirted up to use, terser to minify JS and OptimizeCss to remove duplicates and output a basic minified set of performant code from your entries. 

## Dev Dependencies
To achieve the example there are a number of dev dependencies you will see added in the `package.json`. I am not going to go into each one but they fall into a couple of categories, plugins for webpack to extend its capabilities, file level support for SCSS, optimization and lint / code standards. This is an example, adjust your kit to your needs and only those needs :)


# Webpack Scripts
Now that we have our files lets create a few node scripts ( `package.json`) to start or run these. 

Two critical scripts, `build:assets` & `watch:assets` will run webpack with our configs:

## watch:assets
`npm run watch:assets` will run our dev webpack config watching for changes to the scss or js files and compiling. This will be used by our main development script `npm run dev`

## build:assets
`npm run build:assets` will create production ready set of assets, this script will be the core of our build & deployment processes. 

# 5. ThemeKit & Live reloading
Now that we have the heavy lifting out of the way our files are compiling and being primed for both dev and production. Lets get the rest of our critical tooling into place. 

[ThemeKit](https://shopify.github.io/themekit/) is Shopify's theme deployment and local connect tooling. It comes in two forms. A CLI for ease of use we will use that in this case. There is also a node package if you need more programatic handling, my team more commonly use this to orchestrate processes. 

You can find out more about [ThemeKit here](https://shopify.github.io/themekit/) 
For this example you will need this installed and running on your CLI. 

To find out more about the node package you can find out more information here [ThemeKit NPM](https://www.npmjs.com/package/@shopify/themekit)

`NOTETOSELF: Possibly use the node module it is more portable and easy to install. `





















