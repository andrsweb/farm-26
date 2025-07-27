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
    echo 'single.php';
//    wp_safe_redirect(home_url('/404'));
//    exit;
}

//get_template_part( 'template-parts/card/card', null, array( 'product' => $wc_product ) );

get_footer();
