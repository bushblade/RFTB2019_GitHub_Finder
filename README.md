# RFTB2019 GitHub Finder

## Deployed [![Netlify Status](https://api.netlify.com/api/v1/badges/2b163611-727d-47b9-9168-ca9b083f8662/deploy-status)](https://app.netlify.com/sites/vigorous-liskov-f8f1c7/deploys) [link to app](https://vigorous-liskov-f8f1c7.netlify.com/)

The first project in Brad Traversy's [React Front to Back 2019](https://www.udemy.com/share/101XdqAkUadVtQTH4=/) Udemy course.

I have created a branch for every lecture in the course so if you're having problems with a specific section of the project you can checkout that branch and compare your code.

Please also consider checking out my [refactor branch](https://github.com/bushblade/RFTB2019_GitHub_Finder/tree/refactor) which takes a more hook friendly approach to using Context if you're not comfortable with `// eslint-disable-next-line` and want to know what's going on there.

For example if you're having problems on **Section 5 lesson 27** then checkout branch **s5-27**

The master branch is the final completed project.

## Some notes before you deploy

For the environment variables we set in the Netlify UI to be used we need to let Netlify run the build which as far as I know only works if you deploy from GitHub.
If we run `npm run` build then `netlify deploy --prod` as per lesson **5-35** we are running the build on our local machine.

Additionally any environment variable we set needs to be prefixed with `REACT_APP_`, even for deploying to Netlify.
`process.env.NODE_ENV` allows us to check the the environment
(**develpment** in dev server and **production** in build).

**You cannot override NODE_ENV manually**

[create-react-app docs for further reading](https://create-react-app.dev/docs/adding-custom-environment-variables/)

> The environment variables only prevent your keys from being shared in your GitHub repo, anyone who inspects the code or looks at the network requests **will see your keys**, they're not private unless the server is making the API requests, not our client side app.
> So this may be something you would want to be aware of going into production with your own projects.
> So even if we do set up continuous deployment from GitHub to Netlify our keys will be available after Netlify runs the build.

### To install and run locally

Clone the repo

```bash
git clone https://github.com/bushblade/RFTB2019_GitHub_Finder.git
```

Change into directory project

```bash
cd RFTB2019_GitHub_Finder
```

install

```bash
npm i
```

Run the dev server

```bash
npm start
```

Build the project

```bash
npm run build
```
