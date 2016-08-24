$(document).ready(function () {

  // Body Wrap
  var screenHeight = $(window).height();
  $('.body_wrap').css('min-height', screenHeight);
  $(window).resize(function() {
    screenHeight = $(window).height();
    $('.body_wrap').css('min-height', screenHeight);
  });

  $.getJSON('/api/devices')
  .done(function(data) {

    var template = $('#mixer-lane').html();

    var row = null;

    $.each( data, function( i, item ) {

      if (i % 4 === 0) {
        row = $('<div class="row"/>');
        $('#mixer-lanes').append(row);
      }

      item.id = 'device' + i;
      item.isFirst = i === 0;
      item.label = item.name.split('@').pop();

      var lane = $(_.template(template)(item));
      lane.appendTo(row);

      lane.find(':checkbox')
      .iCheck({
        labelHover: false,
        cursor: true
      })
      .on('ifToggled', function(event){
        var $el = $(this);
        var connect = $el.is(':checked');
        $.ajax({
          url: '/api/devices/' + item.name + '/connect',
          type: 'PUT',
          data: JSON.stringify({connect: connect}),
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        })
        .done(function (data) {
          $el.iCheck(data.connected === true ? 'check' : 'uncheck');
        });
      })
      .iCheck(item.connected === true ? 'check' : 'uncheck');

      var scrollbar = lane.find('.scrollbar').get(0);

      noUiSlider.create(scrollbar, {
        start: 100 - item.volume,
        step: 1,
        orientation: 'vertical',
        connect: 'lower',
        range: {
          'min': 0,
          'max': 100
        }
      });
      scrollbar.noUiSlider.on('change', function(){
        $.ajax({
          url: '/api/devices/' + item.name + '/volume',
          type: 'PUT',
          data: JSON.stringify({volume: 100 - scrollbar.noUiSlider.get()}),
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        })
        .done(function (data) {
          scrollbar.noUiSlider.set(100 - data.volume);
        });
      });
    });
  });
});