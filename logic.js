var displayBestMatch = function (score) {

    $.get("/api/friends", function (data) {

        console.log("DATA: " +
        data);
        console.log(score);
        console.log(
            '================================'
        )

        var bestMatch = {
            difference: 100,
            name: "jeff",
            image: "jeff.png"
        };

        var difference = 0;
        for (var i = 0; i < data.length; i++) {

            

            for (var j = 0; j < score.length; j++) {

                difference += Math.abs(score[j] - data[i].scores[j]); 
                console.log(difference);

                if (difference < bestMatch.difference) {
                    bestMatch.difference = difference;
                    bestMatch.name = data[i].name;
                    bestMatch.image = data[i].photo;
                }
            }
        }

        alert(`Your Best Match is: ${bestMatch.name}\n
        With a difference of: ${bestMatch.difference}\n
        Photo: ${bestMatch.image}`);
    })
}

$("#finalize").on("click", function (event) {
    event.preventDefault();

    var newFriend = {};

    var fullName = $('#personalName').val().trim();
    var url = $('#personalPic').val().trim();
    var answers = [$(".custom-select1").val(),
    $(".custom-select2").val(),
    $(".custom-select3").val(),
    $(".custom-select4").val(),
    $(".custom-select5").val(),
    $(".custom-select6").val(),
    $(".custom-select7").val(),
    $(".custom-select8").val(),
    $(".custom-select9").val(),
    $(".custom-select10").val()];

    if (fullName === "" || url === "") {
        alert("Please enter a name or picture.");
    } else {

        newFriend = {
            name: fullName,
            photo: url,
            scores: answers
        }

        console.log(newFriend);

        displayBestMatch(answers);

        $.post({ url: "/api/friends", contentType: 'application/json' }, JSON.stringify(newFriend));

        $('#personalName').val("");
        $('#personalPic').val("");
    }
});