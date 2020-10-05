/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {

    var pluginName = 'strength',
        defaults = {
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: 'Show Password',
            strengthButtonTextToggle: 'Hide Password',
            veryWeakLevelText: 'very weak',
            weakLevelText: 'weak',
            mediumLevelText: 'medium',
            strongLevelText: 'strong',
            strengthMeterText: 'Strength'
        };

    function Plugin(element, options) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var characters = 0;
            var capitalletters = 0;
            var loweletters = 0;
            var number = 0;
            var special = 0;

            var upperCase = new RegExp('[A-Z]');
            var lowerCase = new RegExp('[a-z]');
            var numbers = new RegExp('[0-9]');
            var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

            var options = this.options;

            function GetPercentage(a, b) {
                return ((b / a) * 100);
            }

            function check_strength(thisval, thisid) {
                characters = thisval.length > 8 ? 1 : -1;
                capitalletters = thisval.match(upperCase) ? 1 : 0;
                loweletters = thisval.match(lowerCase) ? 1 : 0;
                number = thisval.match(numbers) ? 1 : 0;

                var total = characters + capitalletters + loweletters + number + special;
                var totalpercent = GetPercentage(7, total).toFixed(0);

                if (!thisval.length) {
                    total = -1;
                }

                get_total(total, thisid);
            }

            function get_total(total, thisid) {
                var thismeter = $('div[data-meter="' + thisid + '"]');
                if (total <= 1) {
                    thismeter.removeClass();
                    thismeter.addClass('veryweak').html(options.veryWeakLevelText);
                } else if (total == 2) {
                    thismeter.removeClass();
                    thismeter.addClass('weak').html(options.weakLevelText);
                } else if (total == 3) {
                    thismeter.removeClass();
                    thismeter.addClass('medium').html(options.mediumLevelText);
                } else {
                    thismeter.removeClass();
                    thismeter.addClass('strong').html(options.strongLevelText);
                }

                if (total == -1) {
                    thismeter.removeClass().html(options.strengthMeterText);
                }
            }

            var isShown = false;
            var strengthButtonText = options.strengthButtonText;
            var strengthButtonTextToggle = options.strengthButtonTextToggle;

            thisid = this.$elem.attr('id');

            this.$elem.addClass(options.strengthClass).attr('data-password', thisid)
                .after('<input style="display:none" class="' + this.options.strengthClass + '" data-password="' + thisid + '" type="text" name="" value=""><a data-password-button="' + thisid + '" href="" class="' + this.options.strengthButtonClass + '">' + this.options.strengthButtonText + '</a><div class="' + this.options.strengthMeterClass + '"><div data-meter="' + thisid + '">' + options.strengthMeterText + '</div></div>');

            this.$elem.bind('keyup keydown', function (event) {
                thisval = $('#' + thisid).val();
                $('input[type="text"][data-password="' + thisid + '"]').val(thisval);
                check_strength(thisval, thisid);
            });

            $('input[type="text"][data-password="' + thisid + '"]').bind('keyup keydown', function (event) {
                thisval = $('input[type="text"][data-password="' + thisid + '"]').val();
                console.log(thisval);
                $('input[type="password"][data-password="' + thisid + '"]').val(thisval);
                check_strength(thisval, thisid);
            });

            $(document.body).on('click', '.' + options.strengthButtonClass, function (e) {
                e.preventDefault();

                thisclass = 'hide_' + $(this).attr('class');

                if (isShown) {
                    $('input[type="text"][data-password="' + thisid + '"]').hide();
                    $('input[type="password"][data-password="' + thisid + '"]').show().focus();
                    $('a[data-password-button="' + thisid + '"]').removeClass(thisclass).html(strengthButtonText);
                    isShown = false;
                } else {
                    $('input[type="text"][data-password="' + thisid + '"]').show().focus();
                    $('input[type="password"][data-password="' + thisid + '"]').hide();
                    $('a[data-password-button="' + thisid + '"]').addClass(thisclass).html(strengthButtonTextToggle);
                    isShown = true;
                }
            });
        },
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);


