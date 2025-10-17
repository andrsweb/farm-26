<?php
/**
 * Home catalog
 *
 * @package farm26
 */
$wc_categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => true,
        'meta_key' => 'category_order',
        'orderby' => 'meta_value_num',
        'order' => 'ASC',
]);
?>
<section class="hero">
    <div class="container sm">
        <h1><?php _e('Каталог'); ?></h1>
        <?php if (!empty($wc_categories)) { ?>
            <div class="catalog">
                <div class="catalog-inner">
                    <?php
                    foreach ($wc_categories as $category) {
                        if ($category->parent != 0) {
                            continue;
                        }

                        get_template_part('template-parts/components/cards/catalog-card', null, array('category' => $category));
                    }
                    ?>
                </div>
            </div>
        <?php } ?>
    </div>
</section>