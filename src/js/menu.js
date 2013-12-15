$(document).on('ready', function() {
        setVolume('menuMusic',30);
        playBackgroundMusic('menuMusic');

        $('.button').hover(function(){         
           playSprite('buttonHover');
        },function(){});

        $('.button').click(function(){
            playSprite('buttonClick');
        });

        $('#new_game_btn').on('click', function() {
            $('#main').slideUp();
            $('#game').slideDown();
            loadImages(sources, startGame);

            stopMusic('menuMusic');
        });
        $('#help_btn').on('click', function() {
            $('#main').slideUp();
            $('#help').slideDown();
        });
        $('#glossary_btn').on('click', function() {
            $('#main').slideUp();
            $('#glossary').slideDown();
        });
        $('#settings_btn').on('click', function() {
            $('#main').slideUp();
            $('#settings').slideDown();
        });
        $('#sound_on').on('click', function() {
            $('#sound_on').attr('checked', 'checked');
        });
        $('#sound_off').on('click', function() {
            $('#sound_off').attr('checked', 'checked');
        });
        $('#save_settings').on('click', function() {
            if ($('#sound_on').attr('checked')) {
                setVolume('menuMusic',30);
                playBackgroundMusic('menuMusic');
            }
            if ($('#sound_off').attr("checked")) {
                stopMusic('gameMusic');
                stopMusic('menuMusic');
            }
        });

        $('#exit_btn').on('click', function() {
            closeWindow();
        });
        $('.to_menu').on('click', function() {
            $('#main').slideDown();
            $('#help').slideUp();
            $('#glossary').slideUp();
            $('#settings').slideUp();
        });
        function closeWindow() {
            setTimeout(function(){
                var ww = window.open(window.location, '_self');
                ww.close();
            }, 300);
        }
//    });
});