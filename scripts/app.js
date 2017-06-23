$(document).ready(function() {
  'use strict';

  var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  var currentColorNum = 8;
  var shareQuote = '';
  var colors = ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', 
                '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', 
                '#FF851B', '#FF4136', '#85144b', '#F012BE', 
                '#B10DC9'];

  function getUniqueColor() {

    var randomNum = 0;
    var isUnique = false;

    while (!isUnique) {
      randomNum = Math.round(Math.random() * colors.length);

      isUnique = true;

      if (randomNum === currentColorNum) {
        isUnique = false;
      }
    }

    currentColorNum = randomNum;

    return colors[randomNum];
  }

  function changeColor() {

    var randomColor = getUniqueColor();

    $('body').animate({
      backgroundColor: randomColor,
      color: randomColor
    }, 2000);

    $('.button').animate({
      backgroundColor: randomColor
    }, 2000);
  }

  function changeText(targetBoxId, targetTextId, text) {

    $(targetBoxId).animate({
        opacity: 0
      }, 1000, function() {
        $(this).animate({
          opacity: 1
        }, 1000);
        $(targetTextId).html(text);
      });
  }

  $('#quote-button').click(function() {

    changeColor();

    $.getJSON(url, function(data) {

      shareQuote = '"' + data.quoteText + '" - ' + data.quoteAuthor;
      
      changeText('#quote-box' ,'#quote', data.quoteText);
      changeText('#quote-author-box' ,'#author', data.quoteAuthor);
    });
  });

  $('#twitter-button').click(function() {

    window.open("https://twitter.com/intent/tweet?text=" + shareQuote);
  });
});