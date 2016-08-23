$(document).ready(function () {

  function touchHandler(event) {
    var touches = event.changedTouches,
      first = touches[0],
      type = "";
    switch (event.type) {
    case "touchstart":
      type = "mousedown";
      break;
    case "touchmove":
      type = "mousemove";
      break;
    case "touchend":
      type = "mouseup";
      break;
    default:
      return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //                screenX, screenY, clientX, clientY, ctrlKey, 
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
      first.screenX, first.screenY,
      first.clientX, first.clientY, false,
      false, false, false, 0 /*left*/ , null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }

  function init() {
    $('.widget-volume').on("touchstart", touchHandler);
    $('.widget-volume').on("touchmove", touchHandler);
    $('.widget-volume').on("touchend", touchHandler);
    $('.widget-volume').on("touchcancel", touchHandler);
  }


  $('.widget-volume input').knobRot({
    'classes': ['volume'],
    'dragVertical': false,
    'frameCount': 49,
    'frameWidth': 149,
    'frameHeight': 149,
    'detent': true,
    'detentThreshold': 5,
    'minimumValue': 0,
    'maximumValue': 100,
    'hideInput': true
  });

  $("input[type='checkbox']").customInput();

  init();
});