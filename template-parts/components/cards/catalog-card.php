<?php
/**
 * Catalog section template
 *
 * @var $category WP_Term
 *
 * @package farm26
 */
$category = isset($args['category']) ? $args['category'] : null;

if (empty($category)) {
    return;
}
$thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
$image_url = wp_get_attachment_image_url($thumbnail_id, 'medium');
?>
<a href="<?php echo esc_url(get_term_link($category)) ?>" class="catalog-card">
    <div class="catalog-card-inner">
        <div class="catalog-card-image">
            <img src="<?php echo esc_attr($image_url); ?>" alt="<?php echo esc_html($category->name); ?>">
        </div>
        <div class="button catalog-button">
            <?php echo esc_html($category->name); ?>
        </div>
    </div>
</a>