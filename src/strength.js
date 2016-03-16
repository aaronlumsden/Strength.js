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
            strengthButtonClass: 'button_strength',
            strengthButtonText: 'Show Password',
            strengthButtonTextToggle: 'Hide Password',
            veryWeekText: 'very week',
            weekText: 'week',
            mediumText: 'medium',
            strongText: 'strong',
            strengthText: 'Strength',
            showPasswordToggle: true
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
            var characters = 0,
                capitalletters = 0,
                loweletters = 0,
                number = 0,
                special = 0,
                self = this,

                upperCase= new RegExp('[A-Z]'),
                lowerCase= new RegExp('[a-z]'),
                numbers = new RegExp('[0-9]'),
                specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

            function GetPercentage(a, b) {
                return ((b / a) * 100);
            }

            function check_strength(thisval,thisid){
                if (thisval.length > 8) { characters = 1; } else { characters = -1; };
                if (thisval.length > 12) { characters = 2; };
                if (thisval.match(upperCase)) { capitalletters = 1} else { capitalletters = 0; };
                if (thisval.match(lowerCase)) { loweletters = 1}  else { loweletters = 0; };
                if (thisval.match(numbers)) { number = 1}  else { number = 0; };
                if (thisval.match(specialchars)) { special = 1}  else { special = 0; };

                var total = characters + capitalletters + loweletters + number + special,
                    totalpercent = GetPercentage(7, total).toFixed(0);

                if (!thisval.length) {total = -1;}

                get_total(total,thisid);
            }

            function get_total(total,thisid){

                var thismeter = $('[data-meter="'+thisid+'"]');
                thismeter.removeClass();
                if (total <= 1) {
                    thismeter.addClass('veryweek').html(self.options.veryWeekText);
                } else if (total == 2 || total == 3){
                    thismeter.addClass('week').html(self.options.weekText);
                } else if(total == 4){
                    thismeter.addClass('medium').html(self.options.mediumText);
                } else {
                    thismeter.addClass('strong').html(self.options.strongText);
                }
            }

            var isShown = false,
                strengthButtonText = this.options.strengthButtonText,
                strengthButtonTextToggle = this.options.strengthButtonTextToggle,
                thisid = this.$elem.attr('id'),
                tpl = '<input style="display:none" class="'+this.options.strengthClass+'" data-password="'+thisid+'" type="text" name="" value="">';

            if (this.options.showPasswordToggle) {
                tpl = tpl + '<a data-password-button="'+thisid+'" href="" class="'+this.options.strengthButtonClass+'">'+this.options.strengthButtonText+'</a>';
            }

            tpl = tpl + '<div class="'+this.options.strengthMeterClass+'">'+this.options.strengthText+': <span data-meter="'+thisid+'">'+this.options.veryWeekText+'</span></div>';

            this.$elem.addClass(this.options.strengthClass).attr('data-password',thisid).after(tpl);

            this.$elem.bind('keyup keydown', function(event) {
                var thisval = $('#'+thisid).val();
                $('input[type="text"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval, thisid);
            });

            $('input[type="text"][data-password="'+thisid+'"]').bind('keyup keydown', function(event) {
                var thisval = $('input[type="text"][data-password="'+thisid+'"]').val();
                $('input[type="password"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval, thisid);
            });

            $(document.body).on('click', '.'+this.options.strengthButtonClass, function(e) {
                e.preventDefault();
                var thisclass = 'hide_'+$(this).attr('class');

                if (isShown) {
                    $('input[type="text"][data-password="'+thisid+'"]').hide();
                    $('input[type="password"][data-password="'+thisid+'"]').show().focus();
                    $('a[data-password-button="'+thisid+'"]').removeClass(thisclass).html(strengthButtonText);
                    isShown = false;
                } else {
                    $('input[type="text"][data-password="'+thisid+'"]').show().focus();
                    $('input[type="password"][data-password="'+thisid+'"]').hide();
                    $('a[data-password-button="'+thisid+'"]').addClass(thisclass).html(strengthButtonTextToggle);
                    isShown = true;
                }
            });
        },

        yourOtherFunction: function(el, options) {
            // some logic
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


