(function() {
	var code   = document.getElementById("code");
	var result = document.getElementById("result");

	var NPer 	= document.getElementById("period");
	var PerCents = document.getElementById("percents");

	var pos = 0, len = 0;

	code.addEventListener('keyup', function(e) {

		if( e.keyCode == 13 ) {			
			result.innerHTML = eval( code.value );
			e.preventDefault();
			return false;
		}
	});

	code.addEventListener('click', function(e) {
		pos = code.selectionStart;
		len = code.selectionEnd - pos;
	});

	var buttons = document.getElementsByTagName('button');

	var btnClick = function(e) {
		var val = code.value;

		var insert = e.target.dataset.formula
						.replace('%', 	 PerCents.value || '%')
						.replace('NPer', NPer.value 	|| 'NPer');

		code.value = [
			val.substr(0, pos),
			insert,
			val.substr(pos+len)
		].join('');
	};

	[].forEach.call(buttons, function( item ) {
		item.addEventListener('click', btnClick);
	});
})();
