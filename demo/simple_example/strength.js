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
            strengthButtonTextToggle: 'Hide Password'
        };

       // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

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


            var characters = 0;
            var capitalletters = 0;
            var loweletters = 0;
            var number = 0;
            var special = 0;

            var upperCase= new RegExp('[A-Z]');
            var lowerCase= new RegExp('[a-z]');
            var numbers = new RegExp('[0-9]');
            var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');
			
			

			
			
            function GetPercentage(a, b) {
                    return ((b / a) * 100);
                }

                function check_strength(thisval,thisid){
					
                    if (thisval.length > 8) { characters = 1; } else { characters = 0; };
                    if (thisval.match(upperCase)) { capitalletters = 1} else { capitalletters = 0; };
                    if (thisval.match(lowerCase)) { loweletters = 1}  else { loweletters = 0; };
                    if (thisval.match(numbers)) { number = 1}  else { number = 0; };

                    var total = characters + capitalletters + loweletters + number + special;
                    var totalpercent = GetPercentage(7, total).toFixed(0);
					var attributes = new Array(characters, capitalletters, loweletters, number, special);
				
					
					var time = CalcTime(thisval,attributes);

                    get_total(total,thisid,time);
                }

            function get_total(total,thisid,time){

                  var thismeter = $('div[data-meter="'+thisid+'"]');
                    if (total <= 1) {
                   thismeter.removeClass();
                   thismeter.addClass('veryweak').html('very weak');
                } else if (total == 2){
                    thismeter.removeClass();
                   thismeter.addClass('weak').html('weak');
                } else if(total == 3){
                    thismeter.removeClass();
                   thismeter.addClass('medium').html('medium');

                } else {
                     thismeter.removeClass();
                   thismeter.addClass('strong').html('strong');
                }
				$('#time').text(time);
				
				
            }
			
			function CalcTime(n, attr){
			 
			 
			  var speed = 2000000;
			  
			var cslen=0;
			if(attr[1] == 1)
				cslen += 26;
			if(attr[2] == 1)
				cslen += 26;
			if(attr[3] == 1)
				cslen += 10;
			if(attr[4] == 1)
				cslen += 108;

			  var t = Math.pow(cslen,n.length) / speed;
			  var s;
			  
				if (t<60)
				 s=" a minute";
				else
				{
					t /= 60;
					if (t<180)
						s = Math.ceil(t).toString() + " minutes";
					else
					{	
						t /= 60;
						if (t<72)
							s = Math.ceil(t).toString() + " hours";
						else
						{	t /= 24;
						if (t<90)
							s = Math.ceil(t).toString() + " days";

							else
							{	t /= 30;
						if (t<36)
							s = Math.ceil(t).toString() + " months";
						else
						{	t /= 12;
							s = Math.ceil(t).toString() + " years";
						}
							}
							
						}
					}
				}
			 
			  
			  return s;
			}




	
            var isShown = false;
            var strengthButtonText = this.options.strengthButtonText;
            var strengthButtonTextToggle = this.options.strengthButtonTextToggle;


            thisid = this.$elem.attr('id');

            this.$elem.addClass(this.options.strengthClass).attr('data-password',thisid).after('<input style="display:none" class="'+this.options.strengthClass+'" data-password="'+thisid+'" type="text" name="" value=""><a data-password-button="'+thisid+'" href="" class="'+this.options.strengthButtonClass+'">'+this.options.strengthButtonText+'</a><div class="'+this.options.strengthMeterClass+'"><div data-meter="'+thisid+'">Strength</div><p id="time"></p></div>');
            
			 
            this.$elem.bind('keyup keydown', function(event) {
                thisval = $('#'+thisid).val();
                $('input[type="text"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);
                
            });

             $('input[type="text"][data-password="'+thisid+'"]').bind('keyup keydown', function(event) {
                thisval = $('input[type="text"][data-password="'+thisid+'"]').val();
                console.log(thisval);
                $('input[type="password"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);
                
            });



            $(document.body).on('click', '.'+this.options.strengthButtonClass, function(e) {
                e.preventDefault();

               thisclass = 'hide_'+$(this).attr('class');




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


