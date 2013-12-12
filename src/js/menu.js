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