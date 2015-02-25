$(function(){

	var body = $("body");
	var bgImg = $("#bgImg");

	function loadData(){
		
		//changing background Image
		var street = $("#street").val();
		var city = $("#city").val();
		//getting street view of provided location
		var getBgImg = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + street + ", " + city;
		//changing the background to the street view image
		bgImg.attr("src", getBgImg);


		//preventing default submission
		return false;
	}

	//loading data on form submission
	$("#form").submit(loadData)

});