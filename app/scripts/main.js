$(document).ready(function () {

  $.getJSON('/api/devices')
  .done(function(data) {

    var template = $('#mixer-lane').html();

    $.each( data, function( i, item ) {
      item.id = 'device' + i;
      $('#mixer-lanes').append(_.template(template)(item));
    });

    $('input[type="checkbox"]').customInput();

    $('.scrollbar.style2').jScrollPane({
      verticalDragMaxHeight: 36,
      verticalDragMinHeight: 36
    });

  });
});