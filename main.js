$(document).ready(function(){
    $('#responseCard').css('display', 'none');
    $("#searchBtn").click(function(e){
        e.preventDefault();
        var imdbVal = $("#imdbID").val()
        if(imdbVal == "" || imdbVal== null){
            alert("Please enter Title or IMDB ID!!")
            //alert(typeof(imdbVal))
        }
        else{
            var option = document.querySelector('input[name="radioBtn"]:checked').value;
            if(option == 'Title'){
                var str1 = "http://www.omdbapi.com/?apikey=ed881fa8&t=";
                var str2 = imdbVal;
                var mainUrl = str1.concat(str2);
                MainAjaxCall(mainUrl);
            }
            else if(option == 'Id'){
                var str1 = "http://www.omdbapi.com/?apikey=ed881fa8&i=";
                var str2 = imdbVal;
                var mainUrl = str1.concat(str2);
                MainAjaxCall(mainUrl);
            }

        }
        
    });
});

function MainAjaxCall(mainUrl){
    $.ajax({url: mainUrl, success: function(response){
        // console.log(response);
            $('#responseCard').css('display', 'block');
            
           // console.log(response);
            if(response.Poster != "" || response.Poster != null){
                $('#profilePhoto').html('<img src="' + response.Poster + '" class="img-fluid profileHeight"/>');
            }
            else{
                $('#profilePhoto').html('<img src="/imageAwesome.jpg" class="img-fluid profileHeight"/>');
            }

            $('#title').append(response.Title);
            $('#plot').append(response.Plot);
            
            for(var res in response){
                console.log(res + "-->" +response[res]);
                if(typeof response[res] == "object"){
                    //alert("object found")
                    var ratingResponse = response[res];
                    //alert(ratingResponse)
                    for(var another in ratingResponse){
                        if(ratingResponse.hasOwnProperty(another)){
                            //$('.card').append(res +": " +ratingResponse[another]+ "<br>");

                        }
                                            }
                }

                else{
                        $('.card').append(res +": " +response[res]+ "<br>");
                }

            }

    }});
}


