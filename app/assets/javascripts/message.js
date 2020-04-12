$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="message">
          <div class="message__contents">
            <div class="message__contents__sender">
              ${message.user_name}
            </div>
            <div class="message__contents__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__contents">
            <p class="message__contents__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message">
          <div class="message__contents">
            <div class="message__contents__sender">
              ${message.user_name}
            </div>
            <div class="message__contents__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__contents">
            <p class="message__contents__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
      
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});