<?php
/**
 * Display list of items in checkout page
 */

$cart = WC()->cart;
if (!$cart) {
    return;
}

$cart_items = $cart->get_cart();
?>
<aside class="order-aside">
    <div class="order-aside-top">
        <img src="<?php echo THEME_URL; ?>/assets/img/bag.svg" width="24" height="24" alt="">
        <h3><?php _e('ВАШ ЗАКАЗ'); ?></h3>
        <img src="<?php echo THEME_URL; ?>/assets/img/bag.svg" width="24" height="24" alt="">
    </div>
    <?php if (0 < count($cart_items)) { ?>
        <div class="order-aside-inner">
            <?php get_template_part('template-parts/components/checkout/aside-info'); ?>
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