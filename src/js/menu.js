$(document).on('ready', function() {

//    soundManager.onready(function(){
//        createSoundMandager();
//        soundManager.setVolume('menuMusic',100);
//        soundManager.play('menuMusic');

//        myplaySprite('monsterA');

        //soundManager.play('effectSprite');

        setVolume('menuMusic',1);
        playBackgroundMusic('menuMusic');

        $('.button').hover(function(){
//            soundManager.play('');
//            myplaySprite('buttonHover');
//            myplaySprite('buttonHover');
//            sound.play('buttonHover');
           playSprite('buttonHover');
//           playSprite('monsterA');
//            effectSprite.stop();
        },function(){
//			effectSprite.stop();
		});

        $('.button').click(function(){
//            myplaySprite('buttonHover');
            playSprite('buttonClick');
        });

        $('#new_game_btn').on('click', function() {
            $('#main').slideUp();
            $('#game').slideDown();
            loadImages(sources, startGame);
            stopMusic('menuMusic');
//            soundManager.stop('menuMusic');
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