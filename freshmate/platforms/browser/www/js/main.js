$(document).ready(function() {
    var page;
    page = $('body').attr('id');
    if (page == 'index') {
        index_page();
    }
});

function index_page() {

        loadGallery(true, 'a.thumbnail');

        //This function disables buttons when needed
        function disableButtons(counter_max, counter_current) {
            $('#show-previous-image, #show-next-image').show();
            if (counter_max == counter_current) {
                $('#show-next-image').hide();
            } else if (counter_current == 1) {
                $('#show-previous-image').hide();
            }
        }

        /**
         *
         * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
         * @param setClickAttr  Sets the attribute for the click handler.
         */

        function loadGallery(setIDs, setClickAttr) {
            var current_image,
                selector,
                counter = 0;

            $('#show-next-image, #show-previous-image').click(function() {
                if ($(this).attr('id') == 'show-previous-image') {
                    current_image--;
                } else {
                    current_image++;
                }

                selector = $('[data-image-id="' + current_image + '"]');
                updateGallery(selector);
            });

            function updateGallery(selector) {
                var $sel = selector;
                current_image = $sel.data('image-id');
                // $('#image-gallery-caption').text($sel.data('caption'));
                $('#image-gallery-title').text($sel.data('title'));
                $('#image-gallery-image').attr('src', $sel.data('image'));
                disableButtons(counter, $sel.data('image-id'));
            }

            if (setIDs == true) {
                $('[data-image-id]').each(function() {
                    counter++;
                    $(this).attr('data-image-id', counter);
                });
            }
            $(setClickAttr).on('click', function() {
                updateGallery($(this));
            });
        }

$('#email').click(function() {
    console.log('tık');
    if (/(.+)@(.+){2,}\.(.+){2,}/.test($('#email-input').val())) {
            // valid
            console.log('doğru');
            $('#email').attr('disabled','disabled');
            $.post("config/mail.php", {
                mail: $('#email-input').val(),
                photoname: $('#image-gallery img').attr('src').split("/").pop()
            },
            function(data) {
               if (data.match("^http")) {
                    console.log(data, "1")
                    $('iframe').attr('src',data);
                    $('#image-gallery-caption').append('<p>Email Gönderildi</p>');
                    setTimeout(function() {
                        $('#email').removeAttr('disabled');
                        $('#email-input').val('');
                        $('#image-gallery-caption p').remove();
                    },2000)
               }
               else {
                    $('#image-gallery-caption').append('<p>'+data+'</p>');
                    setTimeout(function() {
                        $('#email').removeAttr('disabled');
                        $('#email-input').val('');
                        $('#image-gallery-caption p').remove();
                    },2000)
               }
            }
            );
        } else {
            // invalid email
            console.log('hatalı');
            $('#image-gallery-caption').append('<p>Email Adresiniz Hatalı</p>');
            setTimeout(function() {
                        $('#email-input').val('');
                        $('#image-gallery-caption p').remove();
            },2000)
        }
});

};