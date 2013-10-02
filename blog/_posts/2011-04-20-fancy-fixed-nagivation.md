---
layout: post
category: javascript
title: "Fancy fixed Navigation"
date: 2011-04-20 12:00:00
---

<div class="heads-up">
	<strong>Heads up!</strong>
	<p>The following content is old and the method discussed is outdated. You should use the <a href="http://getbootstrap.com/javascript/#affix">Affix</a> plugin from Bootstrap instead.</p>
</div>

Last week I redid my work page. It was hard to navigate through the page without a second navigation. So I used the chance to tinker around with jQuery. The goal was to provide an alternative to scrolling through the content. Also, it should be much easier to navigate through the page.

In this post I explain how to create a simple page layout with fixed navigation. jQuery is used to enhance usability of the the navigation even more.This includes animated scrolling, aligning the navigation to sections and a fancy fading effect.

![](/img/blog/2011/fancy-nav/one_page_fixed_nav.png)

### Step 1: Basic HTML ###

First of all we have to create some basic HTML layout to work with. Nothing fancy, just a sidebar and a content area like this:

{% prism markup %}
<div id="wrapper">
	<div id="sidebar">
		<ul id="navigation">
			<li><a id="navfirst" class="current" href="#">First Section</a></li>
			<li><a id="navsecond" href="#">Second Section</a></li>
			<li><a id="navthird" href="#">Third Section</a></li>
			<li><a  id="navtop"href="#">Back to top</a></li>
		</ul>
	</div>
	<div id="content">
		<div class="section" id="first">
			<!--  content goes here -->
		</div>
		<div class="section" id="second">
			<!--  content goes here -->
		</div>
		<div class="section" id="third">
			<!--  content goes here -->
		</div>
	</div>
</div>
{% endprism %}

### Step 2: Adding the CSS ###

Now that we have the basic layout we position the element. Float the content div to the right and fix the position of the navigation list. Don't forget to set a width for the list and the content. Otherwise the content will float over your navigation. The added width should be equal to the parent width. Don't forget that padding is also added to the total width.

{% prism css %}
#wrapper {
    width: 850px;
    margin: 50px auto;
    overflow: hidden;
}
#sidebar ul {
position: fixed;
	width: 180px;
}

#content { float: right; width: 630px; padding: 0 20px 20px; }
{% endprism %}

### Step 3: Aligning the navigation ###

The navigation is sticky already but the distance to the top will never change. This doesn't look good and it could possibly cause some problems. E.g. the navigation can overlap with subsequent content. To prevent this from happening we'll use some jQuery.

{% prism javascript %}
// distance to the window
var navOffset 	= 15;
// navigation is aligned to #content
var minTop = $('#content').offset().top,
	maxTop = $('#content').height()+minTop-$('#navigation').height();
// place navigation
var currentScroll = $(window).scrollTop();
$('#navigation').css({'top' : minTop});
// align navigation after loading
if( currentScroll > minTop && currentScroll < maxTop ) {
	// while scrolling though the content
	$('#navigation').css({'top' : navOffset+'px'});
}
if( currentScroll <= minTop ) {
	// adjust navigation top to content top
	$('#navigation').css({'top' : minTop-currentScroll});
}
if( currentScroll >= maxTop ) {
	// end of content
	$('#navigation').css({'top' : maxTop-currentScroll});
}
{% endprism %}

This code will align the navigation to top edge of the content div and when you start scrolling it will fit the navigation to top edge as long as it is in the browser's viewport (line 14-17). While scrolling though the site the navigation will have a certain distance to the viewport (predetermined by navOffset; line 10-13) and when the end of the content div is reached the navigation will align with the bottom of the content (line 18-21). We have to call the code after the page has loaded and when the scroll event is triggered.

### Step 4: Jump to a section ###

Instead of a simple jump via an HTML anchor we'll use the power of jQuery and scroll smoothly to the anchor.

{% prism javascript %}
//navigation click actions
$('#navfirst').click(function(event) {
	event.preventDefault();
	scrollToID('#first', 500);
});
$('#navsecond').click(function(event) {
	event.preventDefault();
	scrollToID('#second', 500);
});
$('#navthird').click(function(event) {
	event.preventDefault();
	scrollToID('#third', 500);
});
$('#navtop').click(function(event) {
	event.preventDefault();
	$('html, body').animate({scrollTop:0}, 'slow');
});
{% endprism %}

Here is the helper function for the scrolling:

{% prism javascript %}
function scrollToID(id, speed){
	var offSet = 15;
	var targetOffset = $(id).offset().top-offSet;
	$('html,body').animate({scrollTop:targetOffset}, speed);
}
{% endprism %}

### Step 4: Display current position ###

The last thing we have to do is displaying the current position. To do this we fade out every section except the one we are currently in and color the section name in the navigation.


{% prism javascript %}
var fadeSpeed = 300;
// indicator for current position in the document
if(	(winScroll + navOffset) < secondTop ) {
	// current section = first
	$('#navfirst').css({'color' : '#CC0000'});
	$('#navsecond').css({'color' : '#FFFFFF'});
	$('#navthird').css({'color' : '#FFFFFF'});
	// animate
	$('#navfirst').stop().stop().animate({ opacity: 1.0 }, fadeSpeed);
	$('#navsecond').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navthird').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navtop').stop().animate({ opacity: 0.2 }, fadeSpeed);
} else if ( (winScroll + navOffset) < thirdTop && (winScroll <= maxTop) ) {
	// current section = second
	$('#navfirst').css({'color' : '#FFFFFF'});
	$('#navsecond').css({'color' : '#CC0000'});
	$('#navthird').css({'color' : '#FFFFFF'});
	// animate
	$('#navsecond').stop().animate({ opacity: 1.0 }, fadeSpeed);
	$('#navfirst').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navthird').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navtop').stop().animate({ opacity: 0.2 }, fadeSpeed);
} else {
	// current section = third
	$('#navfirst').css({'color' : '#FFFFFF'});
	$('#navsecond').css({'color' : '#FFFFFF'});
	$('#navthird').css({'color' : '#CC0000'});
	// animate
	$('#navthird').stop().animate({ opacity: 1.0 }, fadeSpeed);
	$('#navsecond').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navfirst').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navtop').stop().animate({ opacity: 0.2 }, fadeSpeed);
}
// current section = last section & if end of page is reached
if ($('body').height() <= ($(window).height() + $(window).scrollTop())) {
	// current section = design
	$('#navfirst').css({'color' : '#FFFFFF'});
	$('#navsecond').css({'color' : '#FFFFFF'});
	$('#navthird').css({'color' : '#CC0000'});
	// animate
	$('#navthird').stop().animate({ opacity: 1.0 }, fadeSpeed);
	$('#navsecond').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navfirst').stop().animate({ opacity: 0.2 }, fadeSpeed);
	$('#navtop').stop().animate({ opacity: 0.2 }, fadeSpeed);
}
{% endprism %}

### Step 5: Final touch ###

This step is optional but gives the navigation a nice touch. By adding the following code the navigation items will fade in on hover.

{% prism javascript %}
var hoverSpeed = 200;
// on hover
$('#navigation a').hover(function(e) {
	$(this).hoverFlow(e.type, { opacity: 1.0 }, hoverSpeed);
}, function(e) {
	if( $(this).hasClass('current') || $('html,body').is(':animated') ) return false;
	$(this).hoverFlow(e.type, { opacity: 0.2 }, hoverSpeed);
});
{% endprism %}

Since this would also include the current section we have to filter it. This is done by the current-class, which has to be added and remove when entering or leaving a section. E.g.:

{% prism javascript %}
$('#navfirst').addClass('current');
$('#navsecond').removeClass('current');
$('#navthird').removeClass('current');
{% endprism %}

### Conclusion ###

That's it! If you have any questions or suggestions don't hesitate to post a comment below.
