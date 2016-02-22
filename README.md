# Caffeine Theme [![Codeship Status for kelyvin/caffeine-theme](https://codeship.com/projects/2670e310-6805-0133-8838-460d97cd31f0/status?branch=master)](https://codeship.com/projects/114177)

---

## Introduction

**Caffeine Theme** is a fork of [Uno-Zen for Ghost by Kikobeats v2.5.7](https://github.com/Kikobeats/uno-zen). Huge thanks to the original creator for the original theme layout.

## What's Different

The main difference between the caffeine-theme and uno-zen is that there are major improvements to the mobile experience and animation logic.

 - Better mobile experience
 - Improved responsiveness for dynamic screen widths (no more hard-refreshing the page)
 - Replace dynamic search field with a search and tag overlay that can be used on both the desktop and mobile experience
 - Bigger emphasis on the cover page
 - Styling tweaks

## Installation

Please ensure that `git` is installed on your machine.

### Original approach
Enter the theme folder (`content/themes`) of your Ghost installation and paste the following command:

```bash
$ git clone https://github.com/kelyvin/caffeine-theme
```

**NOTE:** This theme needs jQuery to work, but jQuery is not provided by the theme. Instead, you need to inject it into the `Blog Footer` in the `Code injection` of your Ghost installation:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
```

It should look like this:
![](https://camo.githubusercontent.com/f600498109f9b8e7d15fadd28b51c75b1f585d0f/687474703a2f2f692e696d6775722e636f6d2f4b365a595933752e706e67)

In addition, this theme also takes advantage of [Masonry](http://masonry.desandro.com/) to provide a nicer grid layout. This is not mandatory as a fallback is also provided. If you would like this feature, inject the following code as well.

```
<script src="https://npmcdn.com/masonry-layout@4.0/dist/masonry.pkgd.min.js"></script>
```

### Alternative approach
Add this repo as a submodule.

## Development and Customization

See in [documentation](https://github.com/kelyvin/caffeine-theme/blob/master/DOCUMENTATION.md).