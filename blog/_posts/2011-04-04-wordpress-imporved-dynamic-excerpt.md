---
layout: post
category: wordpress
title: "Wordpress: Improved dynamic Excerpt"
date: 2011-04-04 09:00:00
---

Let's be honest, the default WordPress excerpt function is bad. It is nice to have access to a quick post summary but the only thing you can control is the length, which refers to the first x words of the post's content. But that is not enough if you have limited space. The length will differ widely from word to word. Aside from that the excerpt will almost always cut off mid-sentence, which doesn't look very nice in my opinion (even if there is the good old *\[...\]* at the end).

This post will explain how to display an excerpt, which is not longer than a predetermined length and doesn't cut off in mid-sentence.

### Standard excerpt and dynamic length ###

If you take a look at the [WordPress Codex](http://codex.wordpress.org/Function_Reference/the_excerpt) the standard procedure to change the excerpt length is as follows:

{% prism php %}
function new_excerpt_length($length) {
	return 20;
}
add_filter('excerpt_length', 'new_excerpt_length');
{% endprism %}

But, as already mentioned, words have different lengths. Even if you take an average word length into account, it will fail sometimes. Therefore it is not sufficient to limit the excerpt by word count, if you have limited space. It also doesn't solve the problem with excerpts cutting off in mid-sentence.

I searched for a solution and found a very close solution for the problem. Sadly I cannot find the source anymore. If anyone knows the origin of the following snippet, please post it in the comments.

{% prism php %}
// Variable excerpt length.
function dynamic_excerpt($length) { // Variable excerpt length. Length is set in characters
	global $post;
	$text = $post->post_excerpt;
	if ( '' == $text ) {
		$text = get_the_content('');
		$text = apply_filters('the_content', $text);
		$text = str_replace(']]>', ']]>', $text);
	}
	$text = strip_shortcodes($text); // optional, recommended
	$text = strip_tags($text); // use "$text = strip_tags($text,'<p><a>');"" if you want to keep some tags
	$text = substr($text,0,$length);
	// echo $text; // Use this is if you want a unformatted text block
	echo apply_filters('the_excerpt',$text); // Use this if you want to keep line breaks
}
{% endprism %}

### Improving the function ###

Although you can determine the length exactly with the previous snippets, it has the same problem the code from the WordPress Codex had. It cuts off excerpts in mid-sentence. But it is still a better solution if you want to have the same length every time. So it satisfies at least one of the two requirements.

In order to not cut off in mid-sentence we only have to adjust the code a little bit. After the excerpt got shortened to the desired length, we search for the last occurrence of a dot. PHP doesn't support this. There is only the strrchr-method, which returns the portion after the last dot. Fortunately someone else posted a reverse-strrchr in the php.net-comments.

{% prism php %}
// Returns the portion of haystack which goes until the last occurrence of needle
function reverse_strrchr($haystack, $needle, $trail) {
	return strrpos($haystack, $needle) ? substr($haystack, 0, strrpos($haystack, $needle) + $trail) : false;
}
{% endprism %}

### Final result ###

Just add the following function to the dynamic_excerpt function and it will return an excerpt, which is not longer than the given length and always ends with a complete sentence. Paste the following code to your theme's *functions.php* and you are done.

{% prism php %}
// Variable & intelligent excerpt length.
function print_excerpt($length) { // Max excerpt length. Length is set in characters
	global $post;
	$text = $post->post_excerpt;
	if ( '' == $text ) {
		$text = get_the_content('');
		$text = apply_filters('the_content', $text);
		$text = str_replace(']]>', ']]>', $text);
	}
	$text = strip_shortcodes($text); // optional, recommended
	$text = strip_tags($text); // use ' $text = strip_tags($text,'<p><a>'); ' if you want to keep some tags
	$text = substr($text,0,$length);
	$excerpt = reverse_strrchr($text, '.', 1);
	if( $excerpt ) {
		echo apply_filters('the_excerpt',$excerpt);
	} else {
		echo apply_filters('the_excerpt',$text);
	}
}

// Returns the portion of haystack which goes until the last occurrence of needle
function reverse_strrchr($haystack, $needle, $trail) {
	return strrpos($haystack, $needle) ? substr($haystack, 0, strrpos($haystack, $needle) + $trail) : false;
}
{% endprism %}

Here is an example how to use the function in your theme templates. It will return the excerpt with a maximum length of 50 characters and removes everything after the last sentence within the excerpt.

{% prism php %}
<?php print_excerpt(50); ?>
{% endprism %}
