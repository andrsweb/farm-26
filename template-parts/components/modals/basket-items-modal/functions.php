<?php

/**
 * Add product to WooCommerce card
 *
 * @return void
 * @throws Exception
 */
function delete_product_from_cart(): void
{
    check_ajax_referer('delete_basket_item_nonce', 'nonce');

    $cart_item_key = $_REQUEST['cart_item_key'] ?? '';
    if (empty($cart_item_key)) {
        wp_send_json_error(['message' => 'Item key is required']);
    }

    if (WC()->cart->remove_cart_item($cart_item_key)) {
        wp_send_json_success(['cart_count' => count(WC()->cart->get_cart())]);
    }

    wp_send_json_error(['message' => 'Cannot remove product from cart']);
}

add_action('wp_ajax_delete_product_from_cart', 'delete_product_from_cart');
add_action('wp_ajax_nopriv_delete_product_from_cart', 'delete_product_from_cart');