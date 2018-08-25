export function formatDate (time){
	let date_now = Date.now();
	if(new Date(Number(date_now)).toLocaleDateString() === new Date(Number(time)).toLocaleDateString()){
		return new Date(Number(time)).toLocaleTimeString("en-US",{hour:"2-digit", minute:"2-digit"});
	}
	return new Date(Number(time)).toLocaleDateString("en-US", {day : "2-digit", month : "2-digit", year: "2-digit"});
}