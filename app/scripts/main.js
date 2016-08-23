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

    $.each( data, function( i, item ) {
      item.id = 'device' + i;
      item.isFirst = i === 0;
      item.label = item.name.split('@').pop();
      $('#mixer-lanes').append(_.template(template)(item));
    });

    $('input[type="checkbox"]').customInput();

    $('.scrollbar.style2').jScrollPane({
      verticalDragMaxHeight: 36,
      verticalDragMinHeight: 36
    });

  });
});