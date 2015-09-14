(function($){
	var F = $.fancybox,
		Сache = {},
		step_percentage = 15; // in percent
	F.helpers.zoom_control = {
		afterShow: function(defaults, options) {

			if (options.type != 'image')
				return;

			var $fancy_wrap = $(options.wrap),
			    aspect_ratio = $fancy_wrap.width() / $fancy_wrap.height();
			
			$fancy_wrap.on('mousewheel', function(event){ /* zoom */
				event.preventDefault();
				var current_top = parseFloat($fancy_wrap.css('top')),
				    current_left = parseFloat($fancy_wrap.css('left'));
				step_pixels = ($fancy_wrap.width() / 100) * step_percentage;

				if (event.originalEvent.wheelDelta > 0) {
					var new_height = (($fancy_wrap.width() + step_pixels) / aspect_ratio) + $.fancybox.defaults.padding,
						new_width = $fancy_wrap.width() + step_pixels + $.fancybox.defaults.padding,
						new_css_style = {
							width: new_width,
							height: new_height,
							top: current_top - ((new_height - $fancy_wrap.height()) / 2),
							left: current_left - ((new_width - $fancy_wrap.width()) / 2)
						}
					$fancy_wrap.css(new_css_style);
					new_css_style = {
						width: new_width - $.fancybox.opts.padding * 2,
						height: new_height - $.fancybox.opts.padding * 2
					}
					$('.fancybox-inner', $fancy_wrap).css(new_css_style);
				} else {
					var new_height = ($fancy_wrap.width() - step_pixels) / aspect_ratio,
						new_width = $fancy_wrap.width() - step_pixels,
						new_css_style = {
							width: new_width,
							height: new_height,
							top: current_top + (($fancy_wrap.height() - new_height) / 2),
							left: current_left + (($fancy_wrap.width() - new_width) / 2)
						}
					
					if (new_height < 5)
						return;

					$fancy_wrap.css(new_css_style);
					new_css_style = {
						width: new_width - $.fancybox.opts.padding * 2,
						height: new_height - $.fancybox.opts.padding * 2
					}
					$('.fancybox-inner', $fancy_wrap).css(new_css_style);
				}
			});

			$fancy_wrap.on('mousedown', function(event){ /* drag and drop */
				event.preventDefault();
				var down_event = event;

				Cache.click_offset = {
					X: event.clientX - parseFloat($fancy_wrap.css('left')),
					Y: event.clientY - parseFloat($fancy_wrap.css('top'))
				}

				$fancy_wrap.on('mousemove', function(event){
					down_event.stopPropagation();
					var new_css_style = {
							top: event.clientY - Cache.click_offset.Y,
							left: event.clientX - Cache.click_offset.X
						};

					$fancy_wrap.css(new_css_style);
				});

				$fancy_wrap.on('mouseup', function(event){
					$fancy_wrap.off('mousemove');
					$fancy_wrap.off('mouseup');
				});
			});

		},
		onUpdate: function(defaults, fancybox) {
			console.log('uPdata');
		}
	}

})(jQuery)