<?php
/**
 * Aside categories
 */

$current_parent_category_id = !empty($args['current_parent_category_id']) ? $args['current_parent_category_id'] : 0;

$categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => true,
        'meta_key' => 'category_order',
        'orderby' => 'meta_value_num',
        'order' => 'ASC',
]);

if (empty($categories)) {
    return;
}

$logo_text = get_bloginfo('name');
$logo_url = get_field('logo_url', 'option') ?? THEME_URL . '/assets/img/logo-with-text.png';
$is_home = is_front_page() || is_home();
$is_shop_page = is_page(wc_get_page_id('shop')) || is_search();
?>
<aside class="category-aside">
    <div class="category-aside-inner" data-simplebar>
        <h2><?php _e('Каталог'); ?></h2>
        <div class="category-aside-links">
            <a class="category-aside-link <?php if ($is_shop_page) { ?>active<?php } ?>"
               href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>"><?php _e('Все'); ?></a>
            <?php
            foreach ($categories as $category) {
                if ($category->parent != 0) {
                    continue;
                }

                $class = $category->term_id == $current_parent_category_id ? " active" : "";
                $class = $category->parent == $current_parent_category_id ? " active" : $class;
                $class = $is_shop_page ? "" : $class;
                ?>
                <a class="category-aside-link<?php echo esc_attr($class); ?>"
                   href="<?php echo esc_url(get_term_link($category)) ?>">
                    <?php echo esc_html($category->name); ?>
                </a>
            <?php } ?>
        </div>
    </div>
    <div class="category-aside-footer">
        <?php if (!$is_home) { ?>
            <a href="<?php echo esc_url(home_url()); ?>">
                <img src="<?php echo esc_attr($logo_url); ?>"
                     alt="<?php echo esc_attr($logo_text); ?>"
                     width="36" height="36"
                >
            </a>
        <?php } else { ?>
            <a href="<?php echo esc_url(home_url('/o-magazine/')); ?>">
                <img src="<?php echo esc_attr($logo_url); ?>"
                     alt="<?php echo esc_attr($logo_text); ?>"
                     width="36" height="36"
                >
            </a>
        <?php } ?>
    </div>
</aside>