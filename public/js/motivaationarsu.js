$(document).ready(function () {

    var normalScale = 1.6;
    var socket = io();

    var handleIncomingMotivation = function (payload) {
        var sentence           = payload.sentence;
        var currentMotivations = payload.currentMotivations;

        $('#counter').text('Narsuismejä: ' + currentMotivations);

        if (typeof sentence !== 'undefined') {
            responsiveVoice.speak(sentence, 'Romanian Male');

            $('#motivationBtn').prop('disabled', true);

            $('#mouth').show();

            $('#bubble-content').text(sentence);

            $('#bubble-content').transition({
                opacity: 100,
                scale: 2,
                complete: function () {

                    $('#bubble-content').transition({
                        delay: 700,
                        opacity: 0
                    }).transition({
                        scale: 1,
                        complete: function () {
                            $('#motivationBtn').prop('disabled', false);
                        }
                    });

                }
            }, 'ease')

            $.fx.speeds._default = 200;

            $('#mouth').transition({ scale: [1, 1.5] }).transition({ scale: [1, 0.5] }).transition({ scale: [1, 1.5] }).transition({ scale: [1, 0] });

            $.fx.speeds._default = 300;
        }
    };

    socket.on('new_motivate', handleIncomingMotivation);
    socket.on('motivate', handleIncomingMotivation);

    socket.on('motivator_state_change', function (payload) {
        var currentUserCount = payload.currentMotivators;

        $('#online-users').text('Online narsuers: ' + currentUserCount);
    });

    var sentences = ['Loistoveto!', 'Nappiin meni!', 'Jaksaa vielä!', 'Hyvä!', 'JESS!!!', 'Pelimiehen liike!',
        'Ässäsuoritus', 'Ei huolia!', 'Ohhoh!', 'Napakymppi!', 'Kunnialla kotiin!', 'Sairaat setit!',
    'Viis kautta viis', 'Vautsi vau!', 'JIHUU!!!', 'Tuhatta ja sataa!!!', 'Jummijammi!'];


    $('.iris').xeyes();
    $('#mouth').transition({ scale: [1, 0] });

    $('#motivationBtn').click(function () {
        var sentence = sentences[Math.floor(Math.random() * sentences.length)];
        socket.emit('new_motivate', { sentence: sentence });
    });

    $('#nose').click(function(){
        $('#honk').get(0).play();

        var oldNormal = normalScale;

        normalScale += 0.05;

        $('#narsunaama').transition({ scale: [oldNormal, oldNormal + 0.05] }).transition({ scale: [normalScale, normalScale] });
    });
});

