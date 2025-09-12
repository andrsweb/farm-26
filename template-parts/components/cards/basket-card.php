<?php
/**
 * Basket Card Component
 *
 * @var WC_Product_Simple $product
 */

$cart_item = isset($args['cart_item']) ? $args['cart_item'] : null;
if (empty($cart_item)) {
    return;
}

$wc_product = $cart_item['data'] ?? null;
if (empty($wc_product)) {
    return;
}

$attachment_url = wp_get_attachment_url($wc_product->get_image_id());
$title = $wc_product->get_title();
$title = strlen($title) > 44 ? substr($title, 0, 44) . "..." : $title;
$quantity = $cart_item['quantity'] ?? 1;
$line_total = $cart_item['line_total'] ?? 0;
$weight = $wc_product->has_weight() ? $wc_product->get_weight() : 1;
$in_cart_weight = $weight * $quantity;
?>
<div class="modal-basket-item"
     data-product_id="<?php echo esc_attr($wc_product->get_id()); ?>"
     data-quantity="<?php echo esc_attr($quantity); ?>"
     data-weight="<?php echo esc_attr($weight); ?>"
     data-total_weight="<?php echo esc_attr($weight); ?>"
     data-price="<?php echo esc_attr($wc_product->get_price()); ?>"
     data-total_price="<?php echo esc_attr($line_total); ?>"
     data-cart_item_key="<?php echo esc_attr($cart_item['key']); ?>"
>
    <button class="delete" title="<?php _e('Удалить из корзины'); ?>">
        <img src="<?php echo THEME_URL; ?>/assets/img/close-border.svg" width="24" height="24">
    </button>
    <div class="modal-basket-item-img">
        <img src="<?php echo esc_url($attachment_url); ?>" alt="<?php echo esc_html($title); ?>">
    </div>
    <div class="modal-basket-item-info">
        <h4><?php echo esc_html($title); ?></h4>
        <div class="modal-basket-item-desc">
            <div class="modal-basket-item-price">
                <span><?php echo $line_total ?></span>₽
            </div>
        </div>
        <div class="modal-basket-calc">
            <button class="decr">
                <img src="<?php echo THEME_URL; ?>/assets/img/decr.svg" width="24" height="24">
            </button>
            <div class="modal-basket-item-weight">
                <span class="modal-basket-weight-value"><?php echo esc_html(number_format($in_cart_weight, 2, '.', '')); ?></span>
                <span><?php _e('кг'); ?></span>
            </div>
            <button class="incr">
                <img src="<?php echo THEME_URL; ?>/assets/img/incr.svg" width="24" height="24">
            </button>
        </div>
    </div>
</div>