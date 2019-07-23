# Instructions

This application was set to auto compress, minify and rename all JS and SCSS files. And will convert or autoprefixer for the browsers below:
* Last 2 versions of each browser
* IE >= 11
* IOS >= 8
* Android >= 5
* Safari >= 10
* Firefox >= 61

### How it works?
You will work inside the src folder with ES6, jQuery and SASS and after running the command on the terminal the application will automatically convert, compress, minify, rename and put on the right folder.

To work with this nodejs that uses gulp and babel you should follow the step-by-step below:

## 1. Install the node modules
After cloning the repository, go to the project folder and run:
```
npm install
```
or
```
yarn install
```

## 2. Start watching the changes
Before start change any folder you should run:
```
gulp watching
```

## If you are making a hotfix
In this case, you can change the file(s) without watching and when you finish you run:
```
gulp build
```

## To publish on FTP
*If you are running WATCH: just need to save and go to skin/frontend/rmsnew/default/[css or js]/new-theme/main.min.[js or css] and upload on the same folder on devsite or livesite.
*If you are running BUILD: go to skin/frontend/rmsnew/default/[css or js]/new-theme/main.min.[js or css] and upload on the same folder on devsite or livesite.

## Check the full browser's list running the command line below:
```
npx browserslist
```

# When developing in SASS
The autoprefixer have some limitation when converting for ie and to guarantee that everything will work well, follow the instructions below:
* Use rgba(255,0,0,.5) instead #ff000080 for transparent colours or use solid colours and add opacity: .5
* When using display grid don't use gird: 100% / 1fr 1fr 1fr auto; Use grid-template-row: 1fr 1fr 1fr auto; and grid-template-column: 100%; grid-gap: 15px; for more information abou grid see https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie
* Do not use top: 50%; left: 50%; transform: translatex(-50%) translateY(-50%); To centralize use flexbox or margin.
* Use separated divs with position: relative and absolute to make an overlay on background images, do not use background: color/gradient, url;