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
$unit = $wc_product->has_weight() ? _('кг') : _('шт');
?>
<div class="order-aside-item">
    <div class="order-aside-item-inner">
        <div class="order-aside-img">
            <img src="<?php echo esc_url($attachment_url); ?>" alt="<?php echo esc_html($title); ?>">
        </div>
        <div class="order-aside-item-info">
            <h4><?php echo esc_html($title); ?></h4>
            <div class="order-aside-item-weight">
                <?php echo esc_html(number_format($in_cart_weight, 2, '.', '')); ?>
                <span class="unit"><?php echo $unit; ?></span>
            </div>
            <div class="order-aside-item-price"><?php echo $line_total ?> <span>₽</span></div>
        </div>
    </div>
</div>