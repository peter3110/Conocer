$(".button1").click(function(){
  $.ajax({
      url: '{% url "add_user_information" %}',
      type: "GET",
      dataType: "html",
      success:function(response){
        console.log('HOLA!!!!');
        $("html").html(response);
      },
      complete:function(){
      
      },
      error:function (xhr, textStatus, thrownError){
          alert("error doing something");
      }
  });
});

$(".button2").click(function(){
  $.ajax({
    url: '{% url "get_data" %}',
    type: "GET",
    dataType: "json",
    success:function(data){
      console.log(data);
    },
    complete:function(){

    },
    error:function (xhr, textStatus, thrownError){
        alert("error doing something");
    }
  });
    
});