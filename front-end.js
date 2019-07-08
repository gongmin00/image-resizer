

    const btn = $('#btn')
    $(btn).click(function () {
        $.ajax({
            url: './resizer.html'
        }).done(function () {
            const getDimension = $('#input').val()
            console.log(getDimension)
        })
    })
    module.exports=(getDimension) =>{
    return getDimension}

