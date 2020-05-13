# RFTB2019 GitHub Finder

The first project in Brad Traversy's [React Front to Back 2019](https://www.udemy.com/share/101XdqAkUadVtQTH4=/) Udemy course.

The master branch is the final completed project from the course.

## This branch I have refactored to take a more hook friendly context approach.

I think Brad at the time of the course tried to substitute lifecycle methods with the closest hooks approximation which is understandable and I see a lot of tutorials and courses doing much the same. Hooks were very new at the time of recording,
however hooks require a completely different approach and thought process really. We need to think in terms of hooks and functions and not lifecycle.

If you're looking at this branch and wondering why in the course we had to use `// eslint-disable-next-line` or thought _this doesn't feel right ignoring the linting rules_, then I urge you to have a read of [this post on overreacted by Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/). It covers a lot more than just `useEffect`

To summarize the issues we faced in the course though, and why we had to use `// eslint-disable-next-line` at all is that all our data fetching methods are in our context state (GitHubState.js) and passed down to all our components via the Provider. The problem with this is that every time we update our context state we create a new function which is a side effect and react tells us that side effects should be in a useEffect. If we include these functions in our useEffect dependency array (as the linter suggests) in `User.js` then each time we fetch data and our reducer runs it updates the context which triggers a re-render (creating a whole set of new functions). The useEffect dependency sees it as a new function and triggers another render which again updates the state when we call the function in our useEffect, which triggers another re-render and so on.... infinite loop of re-rendering.

The solution is not to add an empty array and tell the linter to ignore it (trying to make a componentDidMount out of useEffect), but to think in terms of hooks and functions.

so...

1. Take all our fetching data methods out of GitHubState to keep them pure and not re-create a new function on each render/update [actions.js](https://github.com/bushblade/RFTB2019_GitHub_Finder/blob/refactor/src/context/github/actions.js).
2. return the promise from our data fetching methods.
3. Only pass down our dispatch from our GitHubState Provider (React guarantees that our dispatch returned from useReducer is static and won't change) [GitHubState.js](https://github.com/bushblade/RFTB2019_GitHub_Finder/blob/refactor/src/context/github/GitHubState.js).
4. Import the data fetching method we need in the component we need it, call that function in a component level useEffect and then dipsatch from our component [User.js](https://github.com/bushblade/RFTB2019_GitHub_Finder/blob/refactor/src/components/users/User.js).

This cleans up our app considerably, follows the good advice from the react guidelines/linter, improves the quality and readability of our code and now we are thinking in terms of hooks and functions.

## Updates since course published

Since the course was published, GitHub has [depreciated authentication via URL query parameters](https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api/#authenticating-using-query-parameters)
You can get an access token by following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
For this app we don't need to add any permissions so don't select any in the _scopes_.
**DO NOT SHARE ANY TOKENS THAT HAVE PERMISSIONS**
This would leave your account or repositories vulnerable, depending on permissions set.

On this branch you can see how to use the generated token in [/src/context/github/actions.js](https://github.com/bushblade/RFTB2019_GitHub_Finder/blob/refactor/src/context/github/actions.js)

You'll also need to change up your `.env.local` file to include

```
REACT_APP_GITHUB_TOKEN='token <your_no_permissions_token_here>'
```

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
