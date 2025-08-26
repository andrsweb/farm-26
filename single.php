<?php
/**
 * The template for displaying all single posts.
 *
 * @package DAURI
 */
global $post;

get_header();

if (is_tax('product_cat')) {
    get_template_part('template-parts/sections/catalog/catalog', null, array(
        'category' => get_queried_object(),
    ));
} else {
    wp_safe_redirect(home_url('/404'));
    exit;
}

get_footer();
