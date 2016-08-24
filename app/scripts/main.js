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
      row.append(_.template(template)(item)); 
    });

    $('input[type="checkbox"]').customInput();

    $('.scrollbar.style2').jScrollPane({
      verticalDragMaxHeight: 36,
      verticalDragMinHeight: 36
    });

  });
});