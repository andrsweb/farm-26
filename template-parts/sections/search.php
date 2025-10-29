<?php
/**
 * Search section template
 *
 * @package farm26
 */

global $wp_query;

$page = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
if (0 >= $page) {
    $page = 1;
}

$posts_per_page = 12;
$products_total = isset($wp_query->found_posts) ? intval($wp_query->found_posts) : 0;
?>
<section class="category">
    <div class="category-wrapper">
        <?php get_template_part('template-parts/components/categories'); ?>
        <div class="category-content">
            <h1><?php _e('РЕЗУЛЬТАТЫ ПОИСКА:'); ?><span><?php echo get_search_query(); ?></span></h1>
            <div class="category-cards">
                <div class="category-cards-inner">
                    <?php
                    if (have_posts()) {
                        while (have_posts()) {
                            the_post();
                            get_template_part('template-parts/components/cards/category-card/category-card', null, array(
                                    'product' => get_post(),
                            ));
                        }
                    } else {
                        ?>
                        <p><?php _e('По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.'); ?></p>
                        <?php
                    }
                    ?>
                </div>
            </div>
            <?php
            get_template_part('template-parts/components/pagination', null, array(
                    'page' => $page,
                    'total_pages' => ceil($products_total / $posts_per_page),
            ));
            ?>
        </div>
    </div>
</section>