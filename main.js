$( document ).ready(function() {
      'use strict';
      var diceOne, diceTwo, sum,
      cardsSelected = [],
      $cards = $('.list-inline li'),
      $diceOne = $('.dice-one'),
      $diceTwo = $('.dice-two'),
      $alertMsg = $('.alert-msg');

      function rollDice(){
        $('.roll-button').on('click', function() {
          cardsSelected = [];
          diceOne = Math.floor(Math.random()*6 + 1),
          diceTwo = Math.floor(Math.random()*6 + 1);
          sum = diceOne + diceTwo;
  
          $diceOne.text(diceOne);
          $diceTwo.text(diceTwo);
          $alertMsg.text('');
          $('.cards').addClass('rolled');
          clickCards();
        })
      }

      function clickCards() {
        $cards.on('click', function() {
          if($('.cards').hasClass('rolled')) {
            var $this = $(this),
            cardVal = $this.text(),
            idx = $.inArray(cardVal, cardsSelected);

            $this.unbind('click');

            if (idx == -1) {
              cardsSelected.push(cardVal);
            } else {
              cardsSelected.splice(idx, 1);
            }

            $this.toggleClass('selected');
            
            var cardsSelectedSum = eval(cardsSelected.join('+'));

            if(cardsSelectedSum > sum) {
              $alertMsg.text('Sorry you went over');
            } else if (cardsSelectedSum == sum) {
              if($('.list-inline').children().hasClass('selected')) {
                $('.list-inline').children().unbind('click');
              }
              $alertMsg.text('Excellent! Roll Again');
            }

            if($('.list-inline li.selected').length == $('.list-inline li').length && sum == cardsSelectedSum) {
              $alertMsg.text('You Shut the Box! Congrats');
            }
            
            if($('.list-inline li.selected').length == $('.list-inline li').length && sum !== cardsSelectedSum) {
              $alertMsg.text('Sorry You Lose');
            }

          }
        })
      }

      $('.end-turn').on('click', function() {
        $diceOne.text('Roll');
        $diceTwo.text('Dice');
        $alertMsg.text('');

        $.each(cardsSelected, function(i, val) {
           var currentTurnCards = val;
           $('.list-inline li:contains(' + currentTurnCards + ')').removeClass('selected');
        })
      })

      $('.end-game').on('click', function() {
        cardsSelected = [];
        $diceOne.text('Roll');
        $diceTwo.text('Dice');
        $cards.removeClass('selected');
        $alertMsg.text('');
      })
      rollDice();
    });