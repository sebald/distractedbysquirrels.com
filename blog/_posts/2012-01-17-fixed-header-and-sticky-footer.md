---
layout: post
category: css
title: "Fixed header & sticky footer"
date: 2012-01-07 14:22:00
---

I am currently developing a small web application for the [department](http://www.imtek.de/cpi/) I am working at. Everything was looking good until I ran into a problem with the layout last week. It bugged me that the footer was placed directly after the content. It just looked wrong. So I googeled to find a way to have a non-fixed footer that stays at the bottom of the window as long as there is enough space. If the windows is to small the footer should be behind the content (so you have to scroll down in order to reach the footer).

Usually an easy task. Set the body width to 100%, add an negative margin, which is the same height as the footer should be and you're done. In my case there was a little detail that smashed my approach: The layout has an fixed header navigation plus a top padding of the body so that the beginning of the content is not hidden beneath the navigation.

### Making your Footer stay put with CSS (w/o fixed header) ###

There are a lot of tutorials, who explain how to accomplish that. After my little research I would say that [this one](http://fortysevenmedia.com/blog/archives/making_your_footer_stay_put_with_css/) from Forty Sevenmedia is the best one. Basically, you set your footer to a specific height and add a negative margin with the same value as the footer height to the content. The last child of for content has to be a `clear:both`. Also with the same height as the footer. Here is a little visualization what it does:

![](/img/blog/2012/sticky-footer/browser.png)

### Footer at bottom with a fixed header ###
If you have an fixed header in your layout the above method does work as long as you don't add an padding to the `body`-element. But you kinda have to, otherwise some content will be hidden under your header.

You could use JavaScript to align the footer the way you want it. But I am not a big fan of using JavaScript for something like this. Especially if the solution could easily be achieved using only CSS. But sticking with the body padding does not work. At least I couldn't find a solution if you want to keep the padding. The good news is: You don't have to. But sometimes it is impossible to see the forest for the trees.

Instead of using the padding to align the content use an additional element with the height set to your former padding value. I chose not to support IE7/8 because the deparment's IT support (which is actually me) forces you to use Chrome or Firefox. This way I was able to use peusdo element. The following example will also use them, but if you have to [support old browsers](http://css-tricks.com/browser-support-pseudo-elements/) use `div`-element instead. Personally, I feel that using `:before` and `:after` is just cleaner (HTML-wise).

### The HTML ###
{% prism markup %}
<header class="navbar navbar-fixed">
    This is the Header
</header>
<div class="content">
    <div class="container">
        <p>Some content.</p>
    </div>
</div>
<footer>
    This is the footer, which will stay at the bottom!
</footer>
{% endprism %}

### The CSS ###
{% prism css %}
html, body {
    height: 100%;
}

header, footer { display:block; text-align: center; }

header { height:30px; background-color:#f5f5f5 }

.navbar-fixed {
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1030;
}

.content {
    position: relative;
    min-height: 100%;
    height: auto !important;
    margin-bottom: -50px;	/* the bottom margin is the negative
    						value of the footer's height */
}

.content:before {
    display: table;
    content: "";
    height: 40px;  /* the value of the header's height */
    zoom: 1;
}

.container:after {
    display: table;
    content: "";
    clear: both;
    height: 50px;
}

footer {
    height: 50px;
    position: relative;
    background-color:#dddddd;
}


footer:before {
    content: ".";
    visibility: hidden;
    display: table;
    height: 0;
    clear: both;
}
{% endprism %}

### Conclusion ###

Sometimes you rack your brain and in the end the solution is just so simple. If you want to see it in action take a loot at the [fiddle](http://jsfiddle.net/distractedBySquirrels/3hYUr/). Here is a example what it could look like (the mentioned application _wip_):

![](/img/blog/2012/sticky-footer/example.png)
