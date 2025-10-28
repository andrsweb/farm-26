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

/*
 * Redirtect to categories page if opened product page
 */
function redirect_single_product_to_category(): void
{
    if (is_product()) {
        global $post;
        $terms = get_the_terms($post->ID, 'product_cat');
        if (!empty($terms) && !is_wp_error($terms)) {
            $first_term = array_shift($terms);
            $term_link = get_term_link($first_term);
            if (!is_wp_error($term_link)) {
                wp_safe_redirect($term_link);
                exit;
            }
        }
    }
}

add_action('template_redirect', 'redirect_single_product_to_category');

require_once 'template-parts/template-parts.php';

/* ----------------------------------------------
 * Custom order field for WooCommerce product categories
 * ---------------------------------------------- */

/**
 * Add ordering field on Add Category screen
 *
 * @return void
 */
function add_ordering_for_product_categories(): void
{
    ?>
    <div class="form-field term-category-order-wrap">
        <label for="category_order"><?php _e('Порядок вывода категории', 'farm-26'); ?></label>
        <input type="number" name="category_order" id="category_order" value="0" min="0" max="100" step="1"/>
        <p class="description"><?php _e('Число. от 1 до 100', 'farm-26'); ?></p>
    </div>
    <?php
}

add_action('product_cat_add_form_fields', 'add_ordering_for_product_categories');

/**
 * Add ordering fields to Edit category screen
 *
 * @param WP_Term $term Current term object.
 *
 * @return void
 */
function edit_ordering_for_product_categories(WP_Term $term): void
{
    $value = get_term_meta($term->term_id, 'category_order', true);
    if ($value === '') {
        $value = 0;
    }
    ?>
    <tr class="form-field term-category-order-wrap">
        <th scope="row">
            <label for="category_order"><?php _e('Порядок вывода категории', 'farm-26'); ?></label>
        </th>
        <td>
            <input type="number" name="category_order" id="category_order" value="<?php echo esc_attr($value); ?>"
                   min="0" max="100" step="1"/>
            <p class="description"><?php _e('Число. от 1 до 100', 'farm-26'); ?></p>
        </td>
    </tr>
    <?php
}

add_action('product_cat_edit_form_fields', 'edit_ordering_for_product_categories', 10, 1);

/**
 * Save ordering field
 *
 * @param $term_id
 *
 * @return void
 */
function update_category_order($term_id): void
{
    if (isset($_POST['category_order'])) {
        $order = intval($_POST['category_order']);
        update_term_meta($term_id, 'category_order', $order);
    }
}

add_action('created_product_cat', 'update_category_order');
add_action('edited_product_cat', 'update_category_order');

/**
 * Add weight support to product total in order email
 *
 * @param string $html HTML content.
 * @param \WC_Order_Item $item Item object.
 */
function add_weight_support_to_order_email(string $html, WC_Order_Item $item): string
{
    $wc_product = $item->get_product();
    if (!$wc_product) {
        return $html;
    }

    if (!$wc_product->has_weight()) {
        return $html . ' ' . __('шт.');
    }

    $total_weight = $wc_product->get_weight() * $item->get_quantity();

    return $total_weight . ' ' . __('кг');
}

add_filter('woocommerce_email_order_item_quantity', 'add_weight_support_to_order_email', 10, 2);