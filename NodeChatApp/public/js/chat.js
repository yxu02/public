const socket = io();
let params;

//client browser could be old firefox, ie, or mobile browse, which might not support "=>"
socket.on("connect", function() {
  params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
});

socket.on('updateUserList', function(users){
  var ol = $('<ol></ol>');
  users.forEach(function (user) {
    var li = $('<li></li>').text(user);
    ol.append(li);
  });
  $('#users').html(ol);
});

socket.on("disconnect", function() {
  console.log("server disconnected");
});

socket.on("newMessageEvent", function(msg) {
  // console.log("new message from server: ", msg);
  //moment().valueOf() doesn't exist on client side

  var template = jQuery('#message-template').html();
  var timeStamp = moment(msg.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: msg.from,
    text: msg.text,
    createdAt: timeStamp
  });
  jQuery('#message').append(html)
});

socket.on('newLocationMessage', function (msg) {
  //get html part of the template
  var template = jQuery('#location-message-template').html();
  var timeStamp = moment(msg.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: msg.from,
    text: msg.text,
    createdAt: timeStamp
  });
  jQuery("#message").append(html);
});

var messageForm = jQuery("[name=message]");
jQuery("#message-form").on("submit", function(event) {
  event.preventDefault();

  socket.emit(
    "createMessageEvent",
    {
      from: "User",
      text: messageForm.val(),
      params
    },
    function() {
      messageForm.val('');
    }
  );
});

var locationButton = jQuery("#message-location");
locationButton.on("click", function(event) {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by the browser!");
  }

  locationButton.prop('disabled', true).text('Send location...');
  navigator.geolocation.getCurrentPosition(
    //when succeed:
    function(location) {
      // console.log(location);
      socket.emit("shareLocation", {
        params,
        from: "User",
        text: { lat: location.coords.latitude, lon: location.coords.longitude }
      }, function () {
        locationButton.prop('disabled', false).text('Send location');
      });
    },
    //when fail:
    function(err) {
      return alert("User is not willing to share location!");
    }
  );
});
