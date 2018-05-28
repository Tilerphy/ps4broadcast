var lastTrophies = null;
function checkT(psnid){
	$.ajax({
		type:"get",
  		url: "http://192.168.88.139:26666/t/"+psnid,
  		success:  function(resp){
			if(lastTrophies){
				var message = "";
				var newTrophies = resp["trophies"];
				if(newTrophies["bronze"] != lastTrophies["bronze"]){
					message += "";
				}
				if(newTrophies["gold"] != lastTrophies["gold"]){
					message+= "";
				}

				if(newTrophies["silver"] != lastTrophies["silver"]){
					message += "";
				}

				if(newTrophies["platinum"] != lastTrophies["platinum"]){
					message += "";
				}
			}
			lastTrophies = newTrophies; 
		}
	});
}

setInterval(function(){
	checkT("");
}, 10000);
