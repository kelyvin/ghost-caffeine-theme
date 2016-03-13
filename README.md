# Caffeine Theme [![Codeship Status for kelyvin/caffeine-theme](https://codeship.com/projects/2670e310-6805-0133-8838-460d97cd31f0/status?branch=master)](https://codeship.com/projects/114177)

![](http://i.imgur.com/a2uhb1o.jpg)

## Introduction

**Caffeine Theme** is a Material Design inspired Ghost theme. It originally began as a fork of [Uno-Zen](https://github.com/Kikobeats/uno-zen), but has since been drastically changed. Huge thanks to the original creator for the original theme layout and inspiration.

You can check out the theme in action on my official blog [Caffeine Coding](https://www.caffeinecoding.com)

## Theme Features

Because Caffeine Theme draws inspiration from Material design practices, you'll see familiar design patterns throughout the theme, such as cards, several buttons, etc.

Like the original Uno-zen theme that helped provide the skeleton for this project, there may still be some shared similiaries with the original project. However, there are some vast changes as well, especially around the mobile experience and animation logic. The differences include, but are not limited to:

 - A mobile-first driven experience
 - Improved responsiveness for dynamic screen widths (no more hard-refreshing the page)
 - A search and tag overlay that can be used on both the desktop and mobile experience
 - Bigger emphasis on the splash page
 - Smoother animations and style
 - Masonry and scroll reveal support

## Installation

You can install this theme in one of three ways, but the last two options require `git`.

### Option 1
Download the latest release on [Github](https://github.com/kelyvin/caffeine-theme/releases), download the zip, extract the folder, and paste it into your theme folder (`content/themes`) of your Ghost installation

### Option 2
Enter the theme folder (`content/themes`) of your Ghost installation and paste the following command:

```bash
$ git clone https://github.com/kelyvin/caffeine-theme
```

### Option 3
If you have your Ghost blog hosted on git and you want to continuously get the latest updates, you can add this repo as a submodule. Create a `.gitmodules` file in your root Ghost installation and add the following like so:
![](http://i.imgur.com/r6mN5U4.png)


### Add JQuery and other libraries
This theme needs jQuery to work, but jQuery is not provided by the theme. Instead, you need to inject it into the `Blog Footer` in the `Code injection` of your Ghost installation:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

```

In addition, this theme also takes advantage of [Masonry](http://masonry.desandro.com/) to provide a nicer grid layout and [Scroll Reveal](https://scrollrevealjs.org/) for sleek scrolling animations. These are not mandatory and fallbacks are also provided for both. If you would like these feature(s), inject the following code as well.

```
<script type="text/javascript" src="https://npmcdn.com/masonry-layout@4.0/dist/masonry.pkgd.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/scrollreveal.js/3.0.9/scrollreveal.min.js"></script>

```

At the end, it should probably look something like this:
![](http://i.imgur.com/AqE46Sr.png)

## Development and Customization

See in [documentation](https://github.com/kelyvin/caffeine-theme/blob/master/DOCUMENTATION.md).
