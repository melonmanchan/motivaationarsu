$(document).ready(function () {

    var normalScale = 1.6;
    var socket = io();

    var handleIncomingMotivation = function (payload) {
        $('#counter').text('Narsuismejä: ' + payload.currentMotivations);
    };

    socket.on('new_motivate', handleIncomingMotivation);
    socket.on('motivate', handleIncomingMotivation);

    var lauseet = ["Loistoveto!", "Nappiin meni!", "Jaksaa vielä!", "Hyvä!", "JESS!!!", "Pelimiehen liike!",
        "Ässäsuoritus", "Ei huolia!", "Ohhoh!", "Napakymppi!", "Kunnialla kotiin!", "Sairaat setit!",
    "Viis kautta viis", "Vautsi vau!", "JIHUU!!!", "Tuhatta ja sataa!!!", "Jummijammi!"];


    $('.iris').xeyes();
    $('#mouth').transition({ scale: [1, 0] });

    $("#motivationBtn").click(function () {
        socket.emit('new_motivate');
        var lause = lauseet[Math.floor(Math.random() * lauseet.length)];

        responsiveVoice.speak(lause, "Romanian Male");

        $(this).prop("disabled", true);

        $("#mouth").show();

        $("#bubble-content").text(lause);

        $("#bubble-content").transition({
            opacity: 100,
            scale: 2,
            complete: function () {

                $("#bubble-content").transition({
                    delay: 700,
                    opacity: 0
                }).transition({
                    scale: 1,
                    complete: function () {
                        $("#motivationBtn").prop("disabled", false);
                    }
                });

            }
        }, 'ease')

        $.fx.speeds._default = 200;

        $('#mouth').transition({ scale: [1, 1.5] }).transition({ scale: [1, 0.5] }).transition({ scale: [1, 1.5] }).transition({ scale: [1, 0] });

        $.fx.speeds._default = 300;
    });

    $("#nose").click(function(){
        $("#honk").get(0).play();

        var oldNormal = normalScale;

        normalScale += 0.05;

        $("#narsunaama").transition({ scale: [oldNormal, oldNormal + 0.05] }).transition({ scale: [normalScale, normalScale] });
    });

});

