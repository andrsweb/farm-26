<?php

/**
 * Add product to WooCommerce card
 *
 * @return void
 * @throws Exception
 */
function add_product_to_cart(): void
{
    check_ajax_referer('add_product_to_cart_nonce', 'nonce');

    $product_id = intval($_REQUEST['product_id']);
    $quantity = intval($_REQUEST['quantity']);

    $added = WC()->cart->add_to_cart($product_id, $quantity);

    if ($added) {
        $cart_items = WC()->cart->get_cart();
        ob_start();
        foreach ($cart_items as $item) {
            get_template_part('template-parts/components/cards/basket-card', null, array(
                'cart_item' => $item
            ));
        }
        $items_html = ob_get_clean();
        wp_send_json_success(
            [
                'cart_count' => count($cart_items),
                'items_html' => $items_html,
            ]
        );
    }

    wp_send_json_error(['message' => 'Could not add to cart']);
}

add_action('wp_ajax_add_product_to_cart', 'add_product_to_cart');
add_action('wp_ajax_nopriv_add_product_to_cart', 'add_product_to_cart');