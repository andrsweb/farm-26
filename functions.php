<?php
/**
 * farm-26 functions and definitions
 *
 * @package farm-26
 */

define('THEME_PATH', get_template_directory());
define('THEME_URL', get_template_directory_uri());
define('THEME_VERSION', time()); //TODO change to version like 1.0.1

/**
 * Add theme menus
 *
 * @return void
 */
function add_blog_menus(): void
{
    register_nav_menus(
        array(
            'side_menu_catalog' => __('Боковое меню. Каталог.'),
            'side_menu_information' => __('Боковое меню. Информация.'),
        )
    );
}

add_action('after_setup_theme', 'add_blog_menus');

/**
 * Adding theme styles
 *
 * @return void
 */
function add_theme_styles(): void
{
    wp_register_style(
        'farm-26-style',
        THEME_URL . '/assets/css/main.min.css',
        null,
        THEME_VERSION,
        false
    );

    wp_enqueue_style('farm-26-style');

    wp_register_style(
        'farm-26-app-style',
        THEME_URL . '/assets/dist/styles.css',
        null,
        THEME_VERSION,
        false
    );

    wp_enqueue_style('farm-26-app-style');

    wp_register_script(
        'farm-26-script',
        THEME_URL . '/assets/js/main.min.js',
        null,
        THEME_VERSION,
        true
    );

    wp_enqueue_script('farm-26-script');

    wp_register_script(
        'farm-26-app',
        THEME_URL . '/assets/dist/app.js',
        null,
        THEME_VERSION,
        true
    );

    wp_localize_script('farm-26-app', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));

    wp_enqueue_script('farm-26-app');
}

add_action('wp_enqueue_scripts', 'add_theme_styles');

if (function_exists('acf_add_options_page')) {
    $option_page = acf_add_options_page(
        array(
            'page_title' => __('Настройки Halal26'),
            'menu_title' => __('Настройки Halal26'),
            'menu_slug' => 'theme-options',
            'capability' => 'edit_posts',
            'redirect' => false,
        )
    );
}

add_filter('show_admin_bar', '__return_false');

add_image_size('farm-26-product-thumb', 143, 171, true);

add_filter('woocommerce_enqueue_styles', '__return_false');

//TODO Temp solition for stage website
if ('https://halal26.nsukonny.agency' === home_url()) {
    add_filter('wp_get_attachment_url', function ($url) {
        if (strpos($url, 'https://halal26.nsukonny.agency/wp-content/uploads/2025/') !== false) {
            return $url;
        }

        $old_domain = 'https://halal26.nsukonny.agency';
        $new_domain = 'https://halal26.ru';
        return str_replace($old_domain, $new_domain, $url);
    });
}

function redirect_empty_cart(): void
{
    $is_cart = function_exists('is_cart') && is_cart();
    $is_checkout = function_exists('is_checkout') && is_checkout();
    if ($is_cart || $is_checkout) {
        if (WC()->cart->is_empty()) {
            wp_safe_redirect(get_home_url());
            exit;
        }
    }
}

add_action('template_redirect', 'redirect_empty_cart');

//$user = get_user_by_email('nsukonny@gmail.com');
////change user password
//if ($user) {
//    wp_set_password('Kaje73hfdhh6g-3', $user->ID);
//    echo '<pre>---prd-' . print_r( 'user finded', true ) . '</pre>';
//    wp_die();
//}

require_once 'template-parts/template-parts.php';
