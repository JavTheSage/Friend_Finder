var displayBestMatch = function (score) {

    $.get("/api/friends", function (data) {

        console.log(data);
        var bestMatch = {
            difference: 50,
            name: "",
            image: ""
        };

        for (var i = 0; i < data.length; i++) {

            var difference = 0;

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

var newFriend = {};

$(".submission").on("click", function (event) {
    event.preventDefault();

    var fullName = $('#inputName').val().trim();
    var url = $('#inputImage').val().trim();
    var answers = [$('#q-1').val(),
    $('#q-2').val(),
    $('#q-3').val(),
    $('#q-4').val(),
    $('#q-5').val(),
    $('#q-6').val(),
    $('#q-7').val(),
    $('#q-8').val(),
    $('#q-9').val(),
    $('#q-10').val()];

    if (fullName === "" || url === "") {
        alert("Name or Photo Field cannot be left blank!");
    } else {
        newFriend = {
            name: fullName,
            photo: url,
            scores: answers
        }

        console.log(newFriend);

        displayBestMatch(answers);

        $.post({ url: "/api/friends", contentType: 'application/json' }, JSON.stringify(newFriend));

        $('#inputName').val("");
        $('#inputImage').val("");
    }
});