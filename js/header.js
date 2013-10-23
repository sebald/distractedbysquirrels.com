(function( document ) {

	var html = document.getElementsByTagName( 'html' )[0];

	// Detect if JavaScript is enabled.
	html.classList.add('js');

	// Detect if SVG is supported.
	if( !!((b='createElementNS') in (a=document) && a[b]('http://www.w3.org/2000/svg','svg').createSVGRect) ){
		html.classList.add('svg');
	} else {
		html.classList.add('no-svg');
	}

})( document );
