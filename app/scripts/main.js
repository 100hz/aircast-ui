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
      .customInput()
      .change(function() {
        var $el = $(this);
        var connect = $el.prop('checked');

        $.ajax({
          url: '/api/devices/' + item.name + '/connect',
          type: 'PUT',
          data: JSON.stringify({connect: connect}),
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        })
        .done(function (data) {
          $el.prop('checked', data.connected)
          .trigger('updateState');
        });
      })
      .prop('checked', item.connected)
      .trigger('updateState');

      var lastVolume = item.volume;
      lane.find('.scrollbar').jScrollPane({
        verticalDragMaxHeight: 36,
        verticalDragMinHeight: 36
      })
      .on('jsp-scroll-y', function(event, scrollPositionY, isAtTop, isAtBottom){
        var $el = $(this);
        var newVolume = Math.round((1 - $el.data('jsp').getPercentScrolledY()) * 100);
        if (newVolume === lastVolume) {
          return;
        }

        $.ajax({
          url: '/api/devices/' + item.name + '/volume',
          type: 'PUT',
          data: JSON.stringify({volume: newVolume}),
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        })
        .done(function (data) {
          lastVolume = data.volume;
          $el.data('jsp').scrollToPercentY((100 - lastVolume) / 100);
        });

      }).data('jsp').scrollToPercentY((100 - lastVolume) / 100);
    });
  });
});