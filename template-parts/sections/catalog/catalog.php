<?php
/**
 * Catalog section template
 *
 * @var $current_category WP_Term
 *
 * @package farm26
 */

$current_category = isset($args['category']) ? $args['category'] : null;
if (empty($current_category)) {
    return;
}

$page = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
if (0 >= $page) {
    $page = 1;
}

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

$is_shop_page = is_page(wc_get_page_id('shop'));
$current_parent_category_id = 0 === $current_category->parent ? $current_category->term_id : $current_category->parent;
if (!$is_shop_page) {
    $sub_categories = get_terms([
            'taxonomy' => 'product_cat',
            'hide_empty' => true,
            'parent' => $current_parent_category_id,
    ]);
}

$posts_per_page = 12;
$products_args = array(
        'post_type' => 'product',
        'posts_per_page' => $posts_per_page,
        'paged' => $page,
        'orderby' => 'date',
        'order' => 'DESC',
);

if (!$is_shop_page) {
    $products_args['tax_query'] = array(
            array(
                    'taxonomy' => 'product_cat',
                    'field' => 'term_id',
                    'terms' => $current_category->term_id,
            ),
    );
}

$products = get_posts($products_args);
$products_args['posts_per_page'] = -1;
$products_total = get_posts($products_args);

$logo_text = get_bloginfo('name');
$logo_url = get_field('logo_url', 'option') ?? THEME_URL . '/assets/img/logo-with-text.png';
$is_home = is_front_page() || is_home();
?>
<section class="category">
    <div class="category-wrapper">
        <?php
        get_template_part('template-parts/components/categories', null,
                array('current_parent_category_id' => $current_parent_category_id)
        );
        ?>
        <div class="category-content">
            <?php if (!empty($sub_categories)) { ?>
                <div class="category-filters">
                    <?php foreach ($sub_categories as $sub_category) {
                        $class = $sub_category->term_id == $current_category->term_id ? " active" : "";
                        ?>
                        <a href="<?php echo esc_url(get_term_link($sub_category)); ?>"
                           class="category-filter<?php echo esc_attr($class); ?>">
                            <?php echo esc_html($sub_category->name); ?>
                        </a>
                    <?php } ?>
                </div>
            <?php } ?>
            <h1><?php echo esc_html($current_category->name); ?></h1>
            <div class="category-cards">
                <div class="category-cards-inner">
                    <?php
                    if (!empty($products)) {
                        foreach ($products as $product) {
                            get_template_part('template-parts/components/cards/category-card/category-card', null, array(
                                    'product' => $product,
                            ));
                        }
                    }
                    ?>
                </div>
            </div>
            <?php
            get_template_part('template-parts/components/pagination', null, array(
                    'page' => $page,
                    'total_pages' => ceil(count($products_total) / $posts_per_page),
            ));
            ?>
        </div>
    </div>
</section>