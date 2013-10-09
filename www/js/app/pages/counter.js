;(function() {
	var $counterButton1,
		$counterButton2,
		$counter,
		count = 0;

	function onCounterButtonClick() {
		$counter.text(++count);
	}

	new app.domain.PageHandler({
		pageId: 'counter-page',
		onPageBeforeShow: function() {
			$counterButton1 = $('a#counterButton1');
			$counterButton2= $('a#counterButton2');
			$counter = $('span#counter');
			$counter.text(count);

			$counterButton1.bind('click', onCounterButtonClick);
			$counterButton2.bind('vclick', onCounterButtonClick);
		},
		onPageShow: function() {
		},
		onPageHide: function() {
			//$counterButton1.unbind();
			//$counterButton2.unbind();
		}
	}).register();
}());