<?php
/**
 * Display list of items in checkout page
 */

$cart = WC()->cart;
if (!$cart) {
    return;
}

$cart_items = $cart->get_cart();
$shipping_total = WC()->cart->get_shipping_total();
$price = number_format($cart->get_cart_contents_total(), 0, '.', '');
$total_price = $cart->get_cart_contents_total() + $shipping_total;
$total_price = number_format($total_price, 0, '.', '');
?>
<aside class="order-aside">
    <div class="order-aside-top">
        <img src="<?php echo THEME_URL; ?>/assets/img/bag.svg" width="24" height="24" alt="">
        <h3><?php _e('ВАШ ЗАКАЗ'); ?></h3>
        <img src="<?php echo THEME_URL; ?>/assets/img/bag.svg" width="24" height="24" alt="">
    </div>
    <?php if (0 < count($cart_items)) { ?>
        <div class="order-aside-inner">
            <div class="order-aside-info">
                <div class="order-aside-info-inner">
                    <div class="order-aside-info-item">
                        <div class="aside-info-item-title"><?php _e('Заказ'); ?></div>
                        <div class="aside-info-item-price"><?php echo esc_attr($price); ?> <span>₽</span></div>
                    </div>
                    <div class="order-aside-info-item">
                        <div class="aside-info-item-title"><?php _e('Доставка'); ?>:</div>
                        <div class="aside-info-item-price">
                            <?php if (0 >= $shipping_total) {
                                _e('Бесплатно');
                            } else {
                                echo esc_attr($shipping_total); ?> <span>₽</span>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="order-aside-info-item">
                        <div class="aside-info-item-title"><?php _e('К оплате'); ?>:</div>
                        <div class="aside-info-item-price"><?php echo esc_attr($total_price); ?> <span>₽</span></div>
                    </div>
                </div>
            </div>
            <div class="order-aside-items" data-simplebar>
                <div class="order-aside-items-inner">
                    <?php
                    foreach ($cart_items as $item) {
                        get_template_part('template-parts/components/cards/checkout-card', null, array(
                            'cart_item' => $item
                        ));
                    }
                    ?>
                </div>
            </div>
        </div>
    <?php } else { ?>
        <div class="order-aside-inner">
            <div class="order-aside-info">
                <?php _e('Корзина пуста, выберите товары в '); ?>
                <a href="<?php echo home_url(); ?>"><?php _e('каталоге'); ?></a>
            </div>
        </div>
    <?php } ?>
</aside>