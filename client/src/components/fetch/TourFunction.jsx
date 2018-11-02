export default class TourConvert{

	convert_data_tour( data ){
		return { have : false }
	}

	convert_individual_tour( data ){
		return {	_v				:	data._v
				,	id				:	data._id
				,	airline			:	data.airline
				,	free_seat		:	data.maxSeat - data.currentSeat
				,	booked_seat		:	data.currentSeat
				,	max_seat		:	data.maxSeat
				,	name			:	data.name
				,	day_duration	:	data.dayDuration
				,	night_duration	:	data.nightDuration
				,	start_booking	:	data.startBooking
				,	last_booking	:	data.endBooking
				,	food			:	data.food
				,	hightlight		:	data.hightlight
				,	rating			:	data.rating
				,	amont_rate		:	data.ratingCount
				,	start_day_trip	:	data.departDate
				,	end_day_trip	:	data.returnDate
				,	destination		:	data.dest
				,	detail			:	data.detail
				,	price			:	data.price
				,	operator_id		:	data.operatorID
				,	operator_name	:	data.operatorName
		}
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
