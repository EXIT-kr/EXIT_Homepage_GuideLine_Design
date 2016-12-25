var github_url = 'https://api.github.com/orgs/EXIT-kr'

$(document).ready(function(){

  $.ajax({
      url: github_url + '/events',
      type: 'GET',
      crossDomain: true,
      success: function (data) {
        var m = moment();

        console.log(m);
        data.forEach(function(event){
          console.log(event);
          
          var actor = event.actor;
          var repo = event.repo;
          var type = event.type;
          var date = event.created_at;

          // 오늘로부터 며칠이 지났는지 알 수 있는 함수
          // Moment.js를 이용한다.
          console.log( moment().diff(moment(date), "days") + "day");

        })
      }
  })

})
