$(document).ready(function(){
    $('.delete-tour').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        console.log(id);
        $.ajax({
            type:'DELETE',
            url:'/tour/'+id,
            success: function(response){
                alert('Deleting...');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
    $('.delete-booking').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        console.log(id);
        $.ajax({
            type:'DELETE',
            url:'/profile/mybooking/'+id,
            success: function(response){
                alert('Cancel...');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});