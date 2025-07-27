<?php
/**
 * Home template
 *
 * @package FAP404
 */

get_header();

if (404 === get_query_var('pagename') || is_404()) {
    get_template_part('404');

    return;
}

get_template_part('template-parts/sections/home');

get_footer();
