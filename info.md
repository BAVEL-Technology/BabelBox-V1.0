# Views & Handlebars
## Script & Style Sections
/utils/helpers -> section()

You can include a script section or style section inside handlebars templates
section locations are named and defined in views/layouts/main.handlebars
```
{{{_sections.script}}}
```
and they render what is located in a view with:
```
{{#section 'script'}}
  <script>
    console.log('Welcome to BABELbox!')
  </script>
{{/section}}
```

## Referencing the scope of each loops
If you passed data to a view, say users (an array) and portalId you can go through
users and call user parameters with 'this' or nothing:
```
{{#each users}}
  <li>{{this.name}}</li> works!
  <li>{{name}}</li> also works!
  <li>{{portalId}}</li> wont work!
{{/each}}
```
This is because the each loop is scoped with what was passed to it now, but you
can get access to whatever you passed the view in the first place with `@root.`:
```
{{#each users}}
  <li>{{this.name}}</li> works!
  <li>{{name}}</li> also works!
  <li>{{@root.portalId}}</li> now it works too!
{{/each}}
```

## If statements in handlebars
I realized that `{{#if 1 != 2}}` won't work. #if expects only 1 argument. So there is a helper
/utils/helpers -> ?() that will evaluate a statement and return true or false.
```
{{#if (q 1 '!=' 2)}} //returns true because 1 does not equal 2
```

Also there is an `{{#unless}}` in handlebars that renders html UNLESS true. use `?` in the same way

## Partials and passing data into them
You can access a partial inside the partials folder with `{{> path/from/partials}}`.
So if you want to access a partial inside 'liarliar', `{{> liarliar/partial}}`

You can also pass data into a partial. The partial does have access to data passed to the view,
but this can be helpful to offer easy params for partials.

Currently you can get access to the nav partial and pass it tinyLogo and centerText
to show the tinyLogo in the upper left hand corner, or show the game title in the center
```
{{> nav tinyLogo=true centerText=false}}
```

# Front End Javascript
## Organization
I put all the liar liar specific code in /public/js/liarliar/index.js

I created a wrapper for working with our api in /public/js/api/index.js. It makes
it pretty easy to CRUD the data.

```javascript
const bb = require('./api/index')
```
### Create
Call the `create()` method and pass in the model, and then parameters. It returns a promise
resolved with the api call response.
```javascript
let newUser = await bb.create('user', {name: 'Steve', portal_id: portal.id}) //create user 'Steve'
```

### Read
Call the `read()` method and pass in the model, and then parameters. It returns a promise
resolved with the api call response. Whenever you pass in 'id' as a parameter, it
assumes you are looking for a model with that id.
```javascript
let user = await bb.read('user', {id: 5}) //return user 5
```

### Update
Call the `update()` method and pass in the model, and then parameters. It returns a promise
resolved with the api call response. Whenever you pass in 'id' as a parameter, it
assumes you are looking for a model with that id.
```javascript
let user = await bb.update('user', {id: 5, name: 'Dustin'}) //change user 5 name to 'Dustin'
```

### Delete
Call the `delete()` method and pass in the model, and then parameters. It returns a promise
resolved with the api call response. Whenever you pass in 'id' as a parameter, it
assumes you are looking for a model with that id.
```javascript
let user = await bb.delete('user', {id: 5}) //delete user 5
```

# Browserify
You cannot use require in javascript included in the browser. So browserify helps with that.
I downloaded it globally `npm i browserify -g`.

Then when I want to take my index.js file and
make bundle all the requires into the one fial I can run
`browserify /path/to/index.js -0 /path/to/output.js`.

You can see the bundled version in /public/js/liarliar/liarliar.js. Browserify also adds some code
that takes all the newer ES syntax and turns it back down into earlier JS for older browsers.

# Tailwind CSS
## CLI & Config
I downloaded tailwind so we can customize it if we want. You can update configuration in
tailwind.config.js.

We can add css to style.css, then when we want to publish the css to the front end we can use
tailwind's cli: `npx tailwindcss-cli@latest build public/css/style.css  -o public/css/tailwind.css`

We can even organize our css by game and use scss or something like it and `@import` the files

## Media Queries in Tailwind
By default styles are working on small screens, but if you don't add any media queries you default to
that small screen style. So the following div would be blue no matter what screen
```
<div class="bg-blue-400"></div>
```
If you want the div to be blue on small screens, green on medium, and red on large:
```
<div class="bg-blue-400 md:bg-green-400 lg:bg-red-400"></div>"
```

# Twemoji
I used twemoji for some cool and quick logos. If you include an emoji inside the html twemoji's cdn
will parse the emoji into an img of the twitter emoij.

# Travis CI
Travis is failing firstly because it is running npm test and build, and we haven't clarified
what npm test and build should do. I don't know if we even want to deal with testing, but
if we set up the linter we can have Travis just run npm lint and then it will fail only if
the pull request breaks linter rules.

# Testing out what I've got so far
Check your .env file, then run `npm start` then seed questions with `npm questions`
