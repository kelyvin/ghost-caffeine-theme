'use strict'

$ ->

  isOpen = location.hash is '#open'

  _animate = ->
    setTimeout(->
      $('.cover').addClass 'animated'
    , 1000)

  _expand = (options)->
    $('main, .cover, .links > li, html').toggleClass 'expanded'
    KelyvinTheme.search.form options.form

  $('#menu-button').click ->
    $('.cover, main, #menu-button, html').toggleClass 'expanded'

  $('.nav-blog > a, #avatar-link').click (event) ->
    if KelyvinTheme.is 'page', 'home'
      event.preventDefault()
      location.hash = if location.hash is '' then '#open' else ''
      return $('#menu-button').trigger 'click' unless KelyvinTheme.is 'device', 'desktop'
      _expand form: 'toggle'

  if (KelyvinTheme.is 'device', 'desktop') and (KelyvinTheme.is 'page', 'home')
    _animate()
    _expand form: 'hide' if !isOpen
