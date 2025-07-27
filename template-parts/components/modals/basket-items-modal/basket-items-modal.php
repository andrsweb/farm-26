<?php
/**
 * Display all products from the cart
 */

$cart = WC()->cart;
if (!$cart) {
    return;
}

if (!$cart->is_empty()) {
    $cart_items = $cart->get_cart();
    $cart_total = $cart->get_cart_total();
    ?>
    <div class="modal-wrapper basket-items-modal-wrapper" id="basket-items-wrapper">
        <div class="modal basket-items-modal">
            <button class="close">
                <img src="<?php echo THEME_URL; ?>/assets/img/close-big.svg" title="<?php _e('Закрыть'); ?>" alt="">
            </button>
            <div class="modal-inner">
                <div class="modal-basket-items" data-simplebar>
                    <div class="modal-basket-items-inner">
                        <?php
                        foreach ($cart_items as $item) {
                            get_template_part('template-parts/components/cards/basket-card', null, array(
                                'cart_item' => $item
                            ));
                        }
                        ?>
                    </div>
                </div>
                <div class="modal-basket-bottom">
                    <div class="modal-basket-total">
                        <div class="modal-basket-total-price">
                            <?php _e('Итого:'); ?> <span><?php echo $cart_total; ?></span><span>₽</span>
                        </div>
                    </div>
                    <button class="button category-button add-to-basket">
                        <?php _e('ОФОРМИТЬ ЗАКАЗ'); ?>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <?php
} else {
    $working_hours_start = get_field('working_hours_start', 'option') ?? '09:00';
    $working_hours_end = get_field('working_hours_end', 'option') ?? '19:30';
    ?>
    <div class="modal-wrapper basket-modal-wrapper" id="empty-basket-modal-wrapper">
        <div class="modal empty-basket-modal">
            <button class="close">
                <img src="<?php echo THEME_URL; ?>/assets/img/close.svg" title="<?php _e('Закрыть'); ?>"
                     alt="<?php _e('Закрыть'); ?>">
            </button>
            <div class="modal-inner">
                <div class="empty-basket-top">
                    <p>
                        <?php echo __('Приём заказов с') . ' ' . esc_attr($working_hours_start) . ' ' . __('до') . ' ' . esc_attr($working_hours_end); ?>
                    </p>
                </div>
                <div class="empty-basket-bottom">
				<span class="empty">
					<?php _e('ВАША КОРЗИНА ПУСТА'); ?>
				</span>
                </div>
            </div>
        </div>
    </div>
    <?php
}