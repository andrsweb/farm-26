<?php
/**
 * Display order summary info in checkout page
 */

$cart = $attr['cart'] ?? WC()->cart;
if (!$cart) {
    return;
}

$session = WC()->session;
$shipping_total = $session ? $session->get('shipping_total', $cart->get_shipping_total()) : 0;
$price = number_format($cart->get_cart_contents_total(), 0, '.', '');
$total_price = $cart->get_cart_contents_total() + $shipping_total;
$total_price = number_format($total_price, 0, '.', '');
?>
<div class="order-aside-info">
    <div class="order-aside-info-inner">
        <div class="order-aside-info-item">
            <div class="aside-info-item-title"><?php _e('Заказ'); ?></div>
            <div class="aside-info-item-price"><?php echo esc_attr($price); ?> <span>₽</span></div>
        </div>
        <div class="order-aside-info-item">
            <div class="aside-info-item-title"><?php _e('Доставка'); ?>:</div>
            <div class="aside-info-item-price" id="display_shipping_cost">
                <?php if (0 >= $shipping_total) {
                    _e('Бесплатно');
                } else {
                    echo wc_price($shipping_total); ?>
                <?php } ?>
            </div>
        </div>
        <div class="order-aside-info-item">
            <div class="aside-info-item-title"><?php _e('К оплате'); ?>:</div>
            <div class="aside-info-item-price"><?php echo esc_attr($total_price); ?> <span>₽</span></div>
        </div>
    </div>
</div>
