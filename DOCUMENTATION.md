# Development

## Understanding scenario

The code for the theme is divided into 3 main sections: static files (as HTML and images), CSS and JS. Check out the directory structure below:

```
.
├── LICENSE.md
├── README.md
├── assets
│   ├── css
│   │   └── kelyvin-ghost-theme.css # the production css
│   ├── fonts
│   ├── img # favicons and cover image
│   ├── js
│   │   ├── src
│   │   │   ├── __init.js
│   │   │   ├── cover.js
│   │   │   ├── main.js
│   │   │   └── search.js
│   │   └── kelyvin-ghost-theme.js # the production js
│   └── scss
│   │   ├── components # specific stuff
│   │   │   ├── _aside.scss
│   │   │   ├── _loading.scss
│   │   │   ├── _media-queries.scss
│   │   │   ├── _page-error.scss
│   │   │   ├── _pagination.scss
│   │   │   ├── _post.scss
│   │   │   └── _search.scss
│   │   ├── modules # basic stuff
│   │   │   ├── _buttons.scss
│   │   │   ├── _effects.scss
│   │   │   ├── _fonts.scss
│   │   │   ├── _forms.scss
│   │   │   ├── _global.scss
│   │   │   ├── _grid.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _reset.scss
│   │   │   └── _variables.scss
│   │   └── kelyvin-ghost-theme.scss # main file to create the CSS
|   └── vendor # frontend dependencies
├── bower.json
├── default.hbs
├── error.hbs
├── gulpfile.js
├── index.hbs
├── node_modules
├── package.json
├── partials # different partials view
│   ├── aside.hbs
│   ├── comments.hbs
│   ├── footer.hbs
│   ├── google-analytics.hbs
│   ├── links.hbs
│   ├── meta.hbs
│   ├── pagination.hbs
│   ├── search.hbs
│   └── social.hbs
├── post.hbs
└── tag.hbs
```

Putting the files in context:

- The JS inside `assets/js/src` is compiled into `assets/js/kelyvin-ghost-theme.js`
- The SCSS (we use [SASS](http://sass-lang.com/)) files inside `assets/scss` are compiled into `assets/css/kelyvin-ghost-theme.css`
- We have some static files like `post.hbs`, `tag.hbs`, `default.hbs`, `index.hbs`... the partials views inside `assets/partials` are used in these views.

To bundle, minify, and compile the stylesheets and js files, we use [Gulp](http://gulpjs.com/), check `gulpfile.js` for the build tasks.

## First Steps

For local development you need to have a locally running Ghost server, like this:

```bash
npm start

Migrations: Up to date at version 004
Ghost is running in development...
Listening on 127.0.0.1:2368
Url configured as: http://localhost:2368
Ctrl+C to shut down
```

Note that my local Ghost is running in the port `2368`.

With your local Ghost running, open another terminal and enter in the folder `content/themes` of your local Ghost and clone the theme repository and install the dependencies for local development:

```bash
$ git clone https://github.com/kelyvin/kelyvin-ghost-theme && cd kelyvin-ghost-theme && npm install && bower install
```

Then run the `gulp` command in the theme terminal. This should set you up for a development scenario, and looks like this:

![](http://i.imgur.com/Gf4gPR2.png)

With the `gulp` command you are automatically launching the task to compile the assets and reload the server when your assets change. To do this, we use [BrowserSync](http://www.browsersync.io). It is set up as middleware between the theme and Ghost. You can connect different devices and try the responsive of the website as well.

You need to use the same port as your Ghost server for proxying. If your Ghost server is in a different port than `2368` you need to modify `gulpfile.js` and put the correct port.

## Customization

### Google Analytics

Go to Ghost Admin panel → `Code Injection` → `Blog Header` and add:

```html
<script>
var ga_id = 'UA-YOUR_ID_HERE';
</script>
```

### Comments

Go to Ghost Admin panel → `Code Injection` → `Blog Header` and add:

```html
<script>
var disqus_shortname = 'YOUR_DISQUS_SHORTCUT_HERE';
</script>
```

### Sidebar title

By default, the title that you see in the open page of your blog is extracted from your blog settings (Admin panel → Blog Title).

If you want to customize it, you can do it:

Go to Ghost Admin panel → `Code Injection` → `Blog Header` and add:

```html
<script>
var profile_title = 'Kelyvin Theme';
</script>
```

### Sidebar subtitle

The purpose of the subtitle is describe your bio in a quick phrase. This will be shown in the mobile/tablet version instead of the bio.

Go to Ghost Admin panel → `Code Injection` → `Blog Header` and add:

```html
<script>
var profile_resume ='Software Engineer';
</script>
```

### Colors

Edit the file `assets/scss/modules/_variables.scss`. Remember that is necessary compile the build to load the new style, so keep running your gulp process in background.

### Social Networks

Edit the file `partials/social.hbs`.

### Links

Go to Ghost Admin panel → `Navigation` and add/edit items.

"Blog" link is always included by default, so you don't need to add it manually.

### Favicon

Create your favicons with [Favicon Generator](http://realfavicongenerator.net/) and puts it in `assets/img`.

### Cover

Go to Ghost Admin panel → General → `Blog Cover`

### Cover Filter

The linear gradient of the cover filter is based in `$cover-primary` and `$cover-secondary` colors. If you want to adapt the filter for your cover, check [background-filter](https://github.com/kelyvin/kelyvin-ghost-theme/blob/master/assets/scss/modules/_mixins.scss#L11) mixin.

### Custom static pages

Check the [page part](http://themes.ghost.org/docs/page-context) in the Ghost Official Documentation.

### Multiaccount support

You can enable the multiaccount support editing [posts.hbs](https://github.com/kelyvin/kelyvin-ghost-theme/blob/master/post.hbs#L11-L13) code commented inside the meta post information.

## Preparing for production

When you consider that the development is done and you want to deploy a new version, package your code using `gulp build` command, that will minify and concatenate all the necessary code.
