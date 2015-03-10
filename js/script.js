$(function(){

	var $body = $("body");
	var $bgImg = $("#bgImg");
	var $nytimesLinks = $("#ny-times-articles");
	var $wikiLinks = $("#wikipedia-links");

	$nytimesLinks.empty();
	$wikiLinks.empty();

	function loadData(){
		
		//changing background Image
		var street = $("#street").val();
		var city = $("#city").val();
		//getting street view of provided location
		var getBgImg = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + street + ", " + city;
		console.log(getBgImg);
		//changing the background to the street view image
		$bgImg.attr("src", getBgImg);



		//New-York Times Articles
		var nyTimesApi = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + street + "," + city + "&api-key=f2f07fd942f3c82e33ce50c53629694f:9:71172655";

		$.getJSON(nyTimesApi, function(data){
			//console.log(data);
			//clearing out data in New York Times Coloumn
			if(data.response.docs.length > 0)
			{
				console.log(data);
				$nytimesLinks.empty();

				//appending Heading To Newyork Times
				$("#ny-times-articles").append("<a href='#' class='list-group-item' id='articles-heading'>New York Times Articles</a>");

				//Adding Articles To NY Field
				for(var i=0; i < data.response.docs.length && i < 5; i++)
				{
					//console.log(data.response.docs[article]);
					var link = "<a class='list-group-item' href='" + data.response.docs[i].web_url + "'>";
					link +=  "<h4 class='list-group-item-heading'>" + data.response.docs[i].headline.main + "</h4>";
					
					//Not adding the article paragraph if returns null
					if(data.response.docs[i].lead_paragraph  != null)
						link += "<p class='list-group-item-text'>" +  data.response.docs[i].lead_paragraph + "</p>"
					
	            	$("#ny-times-articles").append(link);
				}			
			}
			else
			{
					$nytimesLinks.empty();
					$wikiLinks.empty();
			}
			
		});


		//Wiki Articles
		var wikiApi = "http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=" + city + "&callback=wikiCallback";
		
		$.ajax({
			url: wikiApi,
			dataType: "jsonp",
			success: function(data){

				//add wiki articles
				var articleList = data[1];

				if(articleList.length > 0)
				{
					//empty the wiki link div
					$wikiLinks.empty();

					//append wiki heading
					$("#wikipedia-links").append("<a href='#' class='list-group-item' id='articles-heading'>Wiki Links</a>");
					
					//add wiki articles
					var articleList = data[1];
		            for(var i=0; i<articleList.length && i<5; i++)
		            {
		                var article = "<a class='list-group-item' href='" + data[3][i] + "'>" + data[1][i] + "</a>";
		                $("#wikipedia-links").append(article);
		            }
				}
				else
				{
						$nytimesLinks.empty();
						$wikiLinks.empty();
				}
				

			}
		});

		//preventing default submission
		return false;
	}

	//loading data on form submission
	$("#form").submit(loadData)

});