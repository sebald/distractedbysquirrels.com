---
layout: post
category: wordpress
title: "WordPress: Rearrange category order"
date: 2011-10-21 09:52:00
---

Just recently I ran into a problem with the category order. The oldest category was "New Publications". So dividing the items based on their category and then looping over them would always put items from the "New Publications"-category at the end of the page, which is rather unpleasant. Wordpress sadly has no option to rearrange the order of categories (at least I couldn't find it).

###Snippet###
Here is the snippet that solves the problem:

{% prism php %}
$categories = get_terms('books_category');

for( $i=0; $i<sizeof($categories); $i++ ){
  if ( $categories[$i]-&gt;name == 'New Publications' ) :
    $latest = array($categories[$i]);
    unset($categories[$i]);
  endif;
}

if( isset($latest) )
  array_splice( $categories, 0, 0, $latest );
{% endprism %}

###What it does###
After querying for the categories (line 1) it loops through all categories until it (hopefully) finds the desired category. If the category was found it is saved into a new variable and removed from the category array (line 2-8). Line 11 inserts the category again at the beginning of the array. Now you can iterate through the categories and display your items and the new publications will always be the first displayed category.
