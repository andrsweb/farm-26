<?php
/**
 * Header template
 *
 * @package Dauri
 */

$logo_text = get_bloginfo('name');
$logo_url = get_field('logo_url', 'option') ?? THEME_URL . '/assets/img/logo-with-text.png';
$is_home = is_front_page() || is_home();
$site_title = get_bloginfo('name');
$phone = get_field('phone_number', 'option') ?? '8 (968) 260-72-72';
$working_hours_start = get_field('working_hours_start', 'option') ?? '09:00';
$working_hours_end = get_field('working_hours_end', 'option') ?? '19:30';
$cart = WC()->cart;
$cart_items_count = $cart ? count(WC()->cart->get_cart()) : 0;
$open_basket_class = 0 >= $cart_items_count ? 'open-empty-basket' : 'open-full-basket';
?>
<header class="header">
    <div class="container">
        <div class="header-wrapper">
            <div class="header-left">
                <?php if (!$is_home) { ?>
                    <a href="<?php echo esc_url(home_url()); ?>" title="<?php _e('Вернуться на главную'); ?>"
                       class="header-logo">
                        <img src="<?php echo esc_attr($logo_url); ?>"
                             alt="<?php echo esc_attr($logo_text); ?>">
                    </a>
                <?php } else { ?>
                    <div class="header-logo">
                        <img src="<?php echo esc_attr($logo_url); ?>"
                             alt="<?php echo esc_attr($logo_text); ?>">
                    </div>
                <?php } ?>
                <a class="header-number" href="tel:<?php echo trim($phone); ?>" title="<?php _e('Позвонить'); ?>">
                    <?php echo esc_attr($phone); ?>
                </a>
            </div>
            <div class="header-right">
                <p>
                    <?php _e('Приём заказов с'); ?>
                    <time datetime="<?php echo esc_attr($working_hours_start); ?>"><?php echo esc_attr($working_hours_start); ?></time>
                    <?php _e('до'); ?>
                    <time datetime="<?php echo esc_attr($working_hours_end); ?>"><?php echo esc_attr($working_hours_end); ?></time>
                </p>
                <div class="header-right-actions">
                    <a href="<?php echo trim($phone); ?>" title="<?php _e('Позвонить'); ?>">
                        <img src="<?php echo esc_attr(THEME_URL); ?>/assets/img/phone.svg" width="18" height="18"
                             alt="<?php echo $phone; ?>">
                    </a>
                    <button class="basket open-basket <?php echo esc_attr($open_basket_class); ?>">
                        <div class="basket-wrapper">
                            <?php if (0 < $cart_items_count) { ?>
                                <span class="basket-count"><?php echo esc_attr($cart_items_count); ?></span>
                            <?php } ?>
                            <!-- Change to 0 and reload page to see another modal when click on basket ICO -->
                            <img src="<?php echo esc_attr(THEME_URL); ?>/assets/img/busket.svg" width="24" height="24"
                                 alt="Векторная темно-синяя корзина">
                        </div>
                    </button>
                    <button class="burger-button" title="<?php _e('Нажмите, чтобы открыть/закрыть меню'); ?>">
                        <div class="burger-button-inner">
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <aside class="hidden-menu" id="hidden-menu" data-simplebar>
        <?php get_template_part('template-parts/header/nav'); ?>
    </aside>
</header>