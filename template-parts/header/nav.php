<?php
/**
 * Navigation menus
 *
 * @package farm26
 */

$instagram_url = get_field('instagram_url', 'option') ?: 'https://www.instagram.com/halal_myasnaya_lavka';
$is_home = is_front_page() || is_home();
$logo_text = get_bloginfo('name');
$logo_url = get_field('logo_url', 'option') ?? THEME_URL . '/assets/img/logo-with-text.png';
?>
<nav>
    <ul class="menu">
        <?php if (has_nav_menu('side_menu_catalog')) { ?>
            <li class="menu-item menu-item-has-children">
                <span><?php _e('КАТАЛОГ'); ?></span>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'side_menu_catalog',
                        'container' => 'ul',
                        'menu_class' => 'submenu',
                    )
                );
                ?>
            </li>
        <?php } ?>

        <?php if (has_nav_menu('side_menu_catalog')) { ?>
            <li class="menu-item menu-item-has-children">
                <span><?php _e('ИНФОРМАЦИЯ'); ?></span>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'side_menu_information',
                        'container' => 'ul',
                        'menu_class' => 'submenu',
                    )
                );
                ?>
            </li>
        <?php } ?>

        <?php if (!empty($instagram_url)) { ?>
            <li class="menu-item menu-item-has-children socials-container">
                <ul class="submenu">
                    <li class="menu-item">
                        <a href="<?php echo esc_url($instagram_url); ?>" target="_blank">
                            <img src="<?php echo esc_attr(THEME_URL); ?>/assets/img/instagram.svg"
                                 width="18"
                                 height="18"
                                 alt="<?php echo esc_url($instagram_url); ?>">
                        </a>
                    </li>
                </ul>
            </li>
        <?php } ?>

        <li class="menu-item menu-item-has-children aside-footer">
            <ul class="submenu">
                <li class="menu-item">
                    <?php if (!$is_home) { ?>
                        <a href="<?php echo esc_url(home_url()); ?>">
                            <img src="<?php echo esc_attr($logo_url); ?>"
                                 alt="<?php echo esc_attr($logo_text); ?>">
                        </a>
                    <?php } else { ?>
                        <a href="<?php echo esc_url(home_url('/o-magazine/')); ?>">
                            <img src="<?php echo esc_attr($logo_url); ?>"
                                 alt="<?php echo esc_attr($logo_text); ?>">
                        </a>
                    <?php } ?>
                </li>
            </ul>
        </li>
    </ul>
</nav>
