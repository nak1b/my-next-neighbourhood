$(function(){

	var $body = $("body");
	var $bgImg = $("#bgImg");
	var $nytimesLinks = $("#ny-times-articles");
	$nytimesLinks.empty();

	function loadData(){
		
		//changing background Image
		var street = $("#street").val();
		var city = $("#city").val();
		//getting street view of provided location
		var getBgImg = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + street + ", " + city;
		//changing the background to the street view image
		$bgImg.attr("src", getBgImg);



		//New-York Times Articles
		var nyTimesApi = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + street + "," + city + "&api-key=f2f07fd942f3c82e33ce50c53629694f:9:71172655";

		$.getJSON(nyTimesApi, function(data){
			//clearing out data in New York Times Coloumn
			$nytimesLinks.empty();

			//appending Heading To Newyork Times
			$("#ny-times-articles").append("<a href='#' class='list-group-item' id='articles-heading'>New York Times Articles</a>");

			//Adding Articles To NY Field
			for(article in data.response.docs)
			{
				console.log(data.response.docs[article]);
				var link = "<a class='list-group-item' href='" + data.response.docs[article].web_url + "'>";
				link +=  "<h4 class='list-group-item-heading'>" + data.response.docs[article].headline.main + "</h4>";
				
				//Not adding the article paragraph if returns null
				if(data.response.docs[article].lead_paragraph  != null)
					link += "<p class='list-group-item-text'>" +  data.response.docs[article].lead_paragraph + "</p>"
				
            	$("#ny-times-articles").append(link);
				
			}
			
		});
		

		//preventing default submission
		return false;
	}

	//loading data on form submission
	$("#form").submit(loadData)

});