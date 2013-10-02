---
layout: post
category: php
title: "Adding MtG Tooltips to phpBB3"
date: 2010-06-07 22:24:00
---

A few weeks ago Jacob from [gatheringmagic.com](http://www.gatheringmagic.com/) asked me if I could help him to integrate the [MtG Helper](http://wordpress.org/plugins/wp-mtg-helper/) into his phpBB board. A full integration of the WordPress Plugin would require knowledge about phpBB. Knowledge I really don't have. Therefore this is going to be a basic tutorial rather than a fully functional phpBB plugin. It's a quick manual (or rather a small hack) on how to implement a tooltip into your forum.

### The Tooltip-"Engine" ###

First of all we need a working JavaScript tooltip. For this small project I chose a tiny, tiny code snippet, which provides us with everything we need. It was introduced by [Alen Grakalic](http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery). For our purpose we have to modify the source a little bit. Instead of passing an complete path we only need to pass the card name to the function. Luckily all the card pictures are located in one directory (*www.wizards.com/global/images/magic/general/*).
But we're not done yet. Passing the card name is fine as long the card doesn't have any spaces, commas or primes but most card do have at least some spaces. That's why we have to use a little replace function in order to adjust the image source path.

{% prism javascript %}
var cardname = this.name.replace(/ |%20/g,"_").replace(/,/g,"");
{% endprism %}

The name attribute will later be filled with the card name by the BBCode. As you might see there is no replace function for the primes. This is because *'* is used as a delimiter between strings and source code and the BBCode engine simply ignores text tokens with specials characters. Which is actually a good thing. Otherwise users could possibly exploit this to insert some [XSS](http://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

The last thing to do is to adjust the image source path correctly. I've done this for you already. Download the js file from [here](/img/blog/2010/phpbb3mtg/tooltip.zip).

### Implement the Tooltip-"Engine" in phpBB ###

Copy the tooltip.js inside your theme's template directory. Should be something like: `<phpBB3root>/styles/<theme name>/template/`. After you have done this open the overall_header.html with your HTML-editor of choice (e.g Notepad++) and write these two lines inside the `<header>`:

{% prism markup %}
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script type="text/javascript" src="{T_TEMPLATE_PATH}/tooltip.js"></script>
{% endprism %}

Save the the file and close your editor. If you now refresh your forum you'll see that the source code has not changed. Don't panic! Rather open your Administration Control Panel (ACP), click on the *Styles*-tab and then on *Templates*. You'll see a list of installed board themes. Click on your activated theme's cache (e.g. if you have activated *prosilver* click the cache highlighted below).

![](/img/blog/2010/phpbb3mtg/phpBB_1.png)

![](/img/blog/2010/phpbb3mtg/phpBB_4.png)

Mark all template files and click *Delete marked*. This will erase the cache. If you refresh your browser and look at your source you'll see the altered code.

### Add the BBCode ###

Custom BBCodes are added via the ACP. Click on the *Postings*-tab and then on *BBCodes* to create a new BBCode.

![](/img/blog/2010/phpbb3mtg/phpBB_2.png)

Write into the *BBCode usage* text box:

{% prism markup %}
[card]{SIMPLETEXT}[/card]
{% endprism %}

And into the *HTML replacement* text box:
{% prism markup %}
<a href="" name="{SIMPLETEXT}" class="preview">{SIMPLETEXT}</a>
{% endprism %}

Check *Display on posting page*, click *Submit* and you're done.

If you followed the instructions correctly you can now use the \[card\]-Tags like you would use them with the MtG Helper (Remember: Do not use primes. Just ignore them). I did those steps on a clean and local phpBB installation. Everything worked fine.

![](/img/blog/2010/phpbb3mtg/phpBB_3.png)
