function checkT(user){
	$.ajax({
		type:"get",
  		url: "https://io.playstation.com/playstation/psn/profile/public/userData?onlineId="+psnid,
		beforeSend: function(req){
			req.setRequestHeader("Referer", "https://www.playstation.com/en-us/my/public-trophies/");
		},
  		success:  function(resp){
			alert(resp);
		}
	});
}

checkT("tilerphy");
