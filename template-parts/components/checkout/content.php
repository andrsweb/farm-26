<?php
/**
 * Checkout page
 */

$shipping_zones = WC_Shipping_Zones::get_zones();
$payment_gateways = WC()->payment_gateways->get_available_payment_gateways();
$terms_page_id = wc_terms_and_conditions_page_id();
?>
<section class="order">
    <div class="order-wrapper">
        <?php get_template_part('template-parts/components/checkout/aside'); ?>
        <div class="order-form">
            <h1><?php _e('ОФОРМЛЕНИЕ ЗАКАЗА'); ?></h1>
            <form name="checkout" method="post"
                  action="<?php echo esc_url(wc_get_checkout_url()); ?>" enctype="multipart/form-data">
                <?php wp_nonce_field('submit_checkout_form_nonce', 'nonce'); ?>

                <fieldset class="checkout_fields">
                    <legend>
                        <?php _e('Детали заказа'); ?>
                    </legend>
                    <label for="username">
                        <input type="text" name="name" id="username" placeholder="<?php _e('Имя Фамилия'); ?>" required>
                        <span><?php _e('*Введите полное имя'); ?></span>
                    </label>
                    <label for="userphone">
                        <input type="tel" name="phone" id="userphone" placeholder="<?php _e('Телефон'); ?>" required>
                        <span><?php _e('*Неккоректный номер'); ?></span>
                    </label>
                    <select name="shipping_zone" id="shipping_zone">
                        <?php foreach ($shipping_zones as $shipping_zone) { ?>
                            <option value="<?php echo esc_attr($shipping_zone['id']); ?>">
                                <?php echo esc_html($shipping_zone['zone_name']) ?>
                            </option>
                        <?php } ?>
                    </select>
                    <label for="useraddress">
                        <input type="text" name="address" id="useraddress" placeholder="<?php _e('Адрес'); ?>" required>
                        <span><?php _e('*Укажите адрес доставки'); ?></span>
                    </label>

                    <textarea name="comment" placeholder="Комментарий к заказу (по желанию)"></textarea>
                </fieldset>
                <fieldset id="shipping_methods_fieldset">
                    <legend>
                        <?php _e('Способ доставки'); ?>
                    </legend>
                </fieldset>
                <fieldset>
                    <legend><?php _e('Способ оплаты'); ?></legend>
                    <?php foreach ($payment_gateways as $gateway_key => $gateway) { ?>
                        <label class="radio-btn" for="<?php echo esc_attr($gateway->id); ?>">
                            <input type="radio" value="<?php echo esc_attr($gateway->id); ?>"
                                    <?php if ($gateway_key === array_key_first($payment_gateways)) { ?>
                                        checked
                                    <?php } ?>
                                   name="payment_method" id="<?php echo esc_attr($gateway->id); ?>">
                            <span></span>
                            <?php echo $gateway->get_title(); ?>
                        </label>
                    <?php } ?>
                </fieldset>
                <div class="button-wrapper">
                    <button type="submit" class="button category-button"
                            disabled="disabled"><?php _e('ПОДТВЕРДИТЬ ЗАКАЗ'); ?></button>
                    <div class="btn-ico">
                        <img src="<?php echo THEME_URL; ?>/assets/img/logo-without-text.webp" alt="">
                    </div>
                </div>

                <div class="form-privacy">
                    <label class="form-checkbox" for="accept_public_offer">
                        <input type="checkbox" name="accept_public_offer" id="accept_public_offer">
                        <span></span>
                        <?php _e('Я согласен с правилами'); ?>
                        <a href="<?php echo esc_url(get_permalink($terms_page_id)); ?>"
                           target="_blank"><?php _e('публичной оферты'); ?></a>
                    </label>
                </div>
            </form>
        </div>
    </div>
</section>