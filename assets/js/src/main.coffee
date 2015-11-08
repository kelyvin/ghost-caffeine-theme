'use strict'

$ ->

  el = KelyvinTheme.app
  el.dataset.page = KelyvinTheme.context()
  el.dataset.device = KelyvinTheme.device()

  KelyvinTheme.readTime()
  FastClick.attach el unless KelyvinTheme.is 'device', 'desktop'

  $('#profile-title').text window.profile_title if window.profile_title
  $('#profile-resume').text window.profile_resume if window.profile_resume

  if KelyvinTheme.is 'device', 'desktop'
    $('a').not('[href*="mailto:"]').click ->
      if this.href.indexOf(location.hostname) is -1
        window.open $(this).attr 'href'
        false

  if KelyvinTheme.is 'page', 'post'
    $('main').readingTime readingTimeTarget: '.post.reading-time > span'
    $('.content').fitVids()

  if KelyvinTheme.is 'page', 'error'
    $('#panic-button').click ->
      s = document.createElement 'script'
      s.setAttribute 'src','https://nthitz.github.io/turndownforwhatjs/tdfw.js'
      document.body.appendChild s
