var github_url = 'https://api.github.com/orgs/EXIT-kr'

$(document).ready(function(){

  $.ajax({
      url: github_url + '/events',
      type: 'GET',
      crossDomain: true,
      success: function (data) {
        var m = moment();

        console.log(m);
        for(var i = 0; i < 20; i++){

          var event = data[i];
          console.log(event);

          var actor = event.actor;
          var repo = event.repo;
          var type = event.type;
          var date = event.created_at;
          var payload = event.payload;
          console.log(repo.name);

          // 오늘로부터 며칠이 지났는지 알 수 있는 함수
          // Moment.js를 이용한다.
          console.log( moment().diff(moment(date), "days") + "day");

          var msg = $('#github_msg').text('');


          switch (type) {
            case "CreateEvent":
              msg.append($('<i/>').attr('class', 'xi-branch xi-x'))
              msg.append($('<a/>').attr('href', actor.url).text(actor.login));

              if(payload.ref_type == "branch"){
                msg.append(' created branch ' + payload.ref + ' at ');
                msg.append($('<a/>').attr('href', repo.url).text(repo.name))
              }
              else if(payload.ref_type == "repository"){
                msg.append(' created repository ' );
                msg.append($('<a/>').attr('href', repo.url).text(repo.name))
              }


              break;
            case "PushEvent":
              msg.append($('<i/>').attr('class', 'xi-log xi-x'))
              msg.append($('<a/>').attr('href', actor.url).text(actor.login));
              msg.append(' pushed to ' + payload.ref + ' at ');
              msg.append($('<a/>').attr('href', repo.url).text(repo.name))


              break;
            default:

          }
      }
    }
  })
});
