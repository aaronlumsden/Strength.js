/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "strength",
        defaults = {
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            veryWeakText: 'very weak',
            weakTest: /^[a-zA-Z0-9]{6,}$/, // minimum acceptable: min 6 chars, any caps/no-caps/number, no spaces
            weakText: 'weak',
            mediumTest: /^(?=.*\d)(?=.*[a-z])(?!.*\s).{8,}$|^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/, // reasonable: min 8 chars, either caps+no-caps or no-caps+numbers, no spaces
            mediumText: 'medium',
            strongTest: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/, // strong: min 8 chars, caps+no-caps+numbers, no spaces
            strongText: 'strong',
            wrapper: false,
            wrapperClass: 'strength_wrapper',
            showHide: true,
            showHideButtonClass: 'button_showhide',
            showHideButtonText: 'Show Password',
            showHideButtonTextToggle: 'Hide Password'
        };

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var options = this.options;
            var isShown = false;
            var thisid = this.$elem.attr('id');

            console.log(options.mediumTest);
            // check the password against the tests
            function check_strength(thisval,thisid){
                var thismeter = $('div[data-meter="'+thisid+'"]');
                if (thisval.length==0) {
                  thismeter.removeClass().text('strength');
                } else if (thisval.search(options.strongTest)>=0) {
                  thismeter.removeClass().addClass('strong').text(options.strongText);
                } else if (thisval.search(options.mediumTest)>=0) {
                  thismeter.removeClass().addClass('medium').text(options.mediumText);
                } else if (thisval.search(options.weakTest)>=0) {
                  thismeter.removeClass().addClass('weak').text(options.weakText);
                } else {
                  thismeter.removeClass().addClass('veryweak').text(options.veryWeakText);
                }
            }

            // prep password field
            this.$elem.addClass(this.options.strengthClass).attr('data-password',thisid);

            // create wrapper if requested
            if (options.wrapper === true) {
                // does the input even need a wrapper? Does one already exist?
                var parent = this.$elem.parent();
                if (
                    (parent.css('position') === 'relative' || parent.css('position') === 'absolute' )
                    &&
                    parent.width() === this.$elem.width()
                    &&
                    parent.height() === this.$elem.height()
                ) {
                  return;
                }
                // else create one
                var wrapperCSS = {
                  position: 'relative',
                  display: this.$elem.css('display'),
                  verticalAlign: this.$elem.css('verticalAlign'),
                  width: this.$elem.css('width'),
                  height: this.$elem.css('height'),
                  marginTop: this.$elem.css('marginTop'),
                  marginRight: this.$elem.css('marginRight'),
                  marginBottom: this.$elem.css('marginBottom'),
                  marginLeft: this.$elem.css('marginLeft'),
                  fontSize: this.$elem.css('fontSize'),
                  borderRadius: this.$elem.css('borderRadius'),
                  overflow: 'hidden'
                }
                this.$elem.wrap($('<div />').addClass(options.wrapperClass).css(wrapperCSS));
            }

            // create strength meter
            this.$elem.after('\
                <div class="'+options.strengthMeterClass+'">\
                  <div data-meter="'+thisid+'">Strength</div>\
                </div>');

            // create "show/hide" toggle and "text" verion of password field
            if (options.showHide === true) {
                this.$elem.after('\
                    <input style="display:none" class="'+this.$elem.attr('class')+options.strengthClass+'" data-password="'+thisid+'" type="text" name="'+this.$elem.attr('name')+'" placeholder="'+this.$elem.attr('placeholder')+'" value="" disabled="disabled">\
                    <a data-password-button="'+thisid+'" href="" class="'+options.showHideButtonClass+'">'+options.showHideButtonText+'</a>');
            }

            // events to trigger strength meter
            $(document).on('keyup', 'input[data-password="'+thisid+'"]', function(event) {
                thisval = $(this).val();
                $('input[data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);
            });

            // events to trigger show/hide for password field
            if (options.showHide === true) {
                $(document.body).on('click', '.'+options.showHideButtonClass, function(e) {
                    e.preventDefault();
                    var thisid = $(this).data('password-button');
                    var thisclass = 'hide_'+$(this).attr('class');
                    if (isShown) {
                        $('input[type="text"][data-password="'+thisid+'"]').prop('disabled', true).hide();
                        $('input[type="password"][data-password="'+thisid+'"]').prop('disabled', false).show().focus();
                        $('a[data-password-button="'+thisid+'"]').removeClass(thisclass).html(options.showHideButtonText);
                        isShown = false;
                    } else {
                        $('input[type="text"][data-password="'+thisid+'"]').prop('disabled', false).show().focus();
                        $('input[type="password"][data-password="'+thisid+'"]').prop('disabled', true).hide();
                        $('a[data-password-button="'+thisid+'"]').addClass(thisclass).html(options.showHideButtonTextToggle);
                        isShown = true;
                    }
                });
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );