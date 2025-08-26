<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package woostify
 */

get_header();

if (404 === get_query_var('pagename') || is_404()) {
    get_template_part('404');

    return;
}

if (is_front_page() || is_home()) {
    get_template_part('template-parts/sections/home');
}

if (is_tax('product_cat')) {
    get_template_part('template-parts/sections/catalog/catalog', null, array(
        'category' => get_queried_object(),
    ));
}

if (is_checkout()) {
    get_template_part('template-parts/components/checkout/checkout');
}

get_footer();
