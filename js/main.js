/**
 *	Distracted by Squirrrels (2nd Edition)
 *  MIT license http://www.opensource.org/licenses/mit-license.php/
 *
 *	@author		Sebastian Sebald
 *	@version	v1.0.0
 *
 */
(function( window, document ) {
	'use strict';

	// Add an eventListener to the window. Fallback for older IE.
	// -------------------------
	window.on = function ( el, type, fn ) {
		if( el.addEventListener ) {
			el.addEventListener( type, fn );
		} else {
			el.attachEvent( 'on'+type, fn );
		}
	};


	// Responsive Navigation
	// -------------------------
	var menuElement = document.getElementById('menu'),
		menuLinkElement = document.getElementById('js-menu-toggle');

	on( menuLinkElement, 'click', function ( e ) {
		e.preventDefault();
		menuElement.classList.toggle('js-is-open');
	});

})( window, document );
