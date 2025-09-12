<?php

/**
 * Get lists of shipping methods by city
 *
 * @return void
 * @throws Exception
 */
function get_city_shipping_methods(): void
{
    $shipping_zones = WC_Shipping_Zones::get_zones();
    $shipping_zone_id = $_REQUEST['shipping_zone_id'] ?? key($shipping_zones);
    $shipping_methods = $shipping_zones[$shipping_zone_id]['shipping_methods'] ?? [];

    $html = '';
    if (!empty($shipping_methods)) {
        $first_key = array_key_first($shipping_methods);
        foreach ($shipping_methods as $key => $shipping_method) {
            $html .= '<label class="radio-btn" for="' . $shipping_method->id . '">';
            $html .= '<input type="radio" value="' . $shipping_method->id . '"';
            if ($first_key === $key) {
                $html .= ' checked="checked" ';
            }
            $html .= 'name="shipping_method" id="' . $shipping_method->id . '">';
            $html .= '<span></span>';
            $html .= esc_html($shipping_method->get_title());
            $html .= '</label>';
        }
    }

    wp_send_json_success(['html' => $html]);
}

add_action('wp_ajax_get_city_shipping_methods', 'get_city_shipping_methods');
add_action('wp_ajax_nopriv_get_city_shipping_methods', 'get_city_shipping_methods');

/**
 * Complete checkout process and create the order
 *
 * @return void
 */
function submit_checkout_form(): void
{
    check_ajax_referer('submit_checkout_form_nonce', 'nonce');

    $name = sanitize_text_field($_REQUEST['name'] ?? '');
    $tel = sanitize_text_field($_REQUEST['phone'] ?? '');
    $shipping_zone_id = sanitize_text_field($_REQUEST['shipping_zone'] ?? '');
    $shipping_method_id = sanitize_text_field($_REQUEST['shipping_method'] ?? '');
    $payment_method_id = sanitize_text_field($_REQUEST['payment_method'] ?? '');
    $address = sanitize_text_field($_REQUEST['address'] ?? '');
    $comment = sanitize_textarea_field($_REQUEST['comment'] ?? '');

    if (empty($name) || empty($tel) || empty($shipping_zone_id) || empty($shipping_method_id) || empty($payment_method_id)) {
        wp_send_json_error(['message' => __('Пожалуйста, заполните все обязательные поля')]);
        return;
    }

    $cart = WC()->cart;
    if (!$cart || 0 >= $cart->get_cart_contents_count()) {
        wp_send_json_error(['message' => __('Ваша корзина пуста')]);
        return;
    }

    $chosen_shipping_methods = [];
    $shipping_zones = WC_Shipping_Zones::get_zones();
    if (isset($shipping_zones[$shipping_zone_id])) {
        $shipping_methods = $shipping_zones[$shipping_zone_id]['shipping_methods'] ?? [];
        foreach ($shipping_methods as $shipping_method) {
            if ($shipping_method->id === $shipping_method_id) {
                $chosen_shipping_methods[] = $shipping_method->get_rate_id();
                break;
            }
        }
    }
    WC()->session->set('chosen_shipping_methods', $chosen_shipping_methods);
    WC()->session->set('chosen_payment_method', $payment_method_id);

    $order_data = [
        'status' => 'pending',
        'customer_note' => $comment,
        'billing' => [
            'first_name' => $name,
            'phone' => $tel,
            'address_1' => $address,
        ],
        'shipping' => [
            'first_name' => $name,
            'address_1' => $address,
        ],
    ];

    $order = wc_create_order($order_data);
    if (is_wp_error($order)) {
        wp_send_json_error(['message' => __('Не удалось создать заказ, попробуйте ещё раз')]);
        return;
    }
    foreach ($cart->get_cart() as $cart_item) {
        $order->add_product($cart_item['data'], $cart_item['quantity']);
    }
    $order->set_address($order_data['billing'], 'billing');
    $order->set_address($order_data['shipping'], 'shipping');
    $order->set_customer_note($comment);
    $order->calculate_totals();
    $order->update_status('processing');
    WC()->cart->empty_cart();

    wp_send_json_success(
        [
            'message' => __('Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.'),
            'order_id' => $order->get_id(),
            'order_text' => sprintf(__('Номер вашего заказа №%s'), $order->get_id()),
            'redirect' => $order->get_checkout_order_received_url(),
        ]
    );
}

add_action('wp_ajax_submit_checkout_form', 'submit_checkout_form');
add_action('wp_ajax_nopriv_submit_checkout_form', 'submit_checkout_form');