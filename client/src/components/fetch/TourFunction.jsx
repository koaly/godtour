export default class TourConvert{

	convert_data_tour( data ){
		return { have : false }
	}

	convert_individual_tour( data ){
		var answer = data;
		answer.freeSeat = data.maxSeat - data.currentSeat;
		return answer;
	}

	manage_group_tour_order( data , start , range ){
		console.log("===============> TourConvert.manage_group_tour_order" , data );
		console.log("=====> General information request " , start , range , data.count );
		var answer = [];
		for( let count = 0 ; count < range ; count++){
			if( count + start < data.count ){
				answer.push( this.convert_individual_tour( data.tours[ start + count ] ))
			}
			else{
				break
			}
		}
		return answer;

	}
} 
