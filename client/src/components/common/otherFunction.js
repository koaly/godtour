const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export default function findDiffDay( end , start ){
	const date1 = Date.UTC(	start.getFullYear() 
							, start.getMonth() 
							, start.getDate() );
	const date2 = Date.UTC(	end.getFullYear() 
							, end.getMonth() 
							, end.getDate() );

	return Math.floor( ( date2 - date1) / _MS_PER_DAY );
}
