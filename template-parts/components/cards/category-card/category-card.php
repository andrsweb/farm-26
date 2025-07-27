<?php
/**
 * Category card template
 *
 * @var $args array
 * @var $args ['product'] WP_Post
 *
 * @package farm26
 */
$wp_post = isset($args['product']) ? $args['product'] : null;
if (empty($wp_post)) {
    return;
}

$wc_product = wc_get_product($wp_post->ID);
if (empty($wc_product)) {
    return;
}

$attachment_url = wp_get_attachment_url($wc_product->get_image_id());
$short_description = $wc_product->get_short_description();
?>
<div class="category-card"
     data-product_id="<?php echo esc_attr($wc_product->get_id()); ?>">
    <div class="category-card-inner">
        <div class="category-card-img">
            <img src="<?php echo esc_url($attachment_url); ?>" alt="<?php echo esc_html($wc_product->get_title()); ?>">
        </div>
        <div class="category-card-info">
            <h4><?php echo esc_html($wc_product->get_title()); ?></h4>
            <div class="category-card-desc">
                <div class="category-card-price"><?php echo $wc_product->get_price_html(); ?></div>
                <?php if ($wc_product->has_weight()) { ?>
                    <div class="category-card-weight"><span><?php echo $wc_product->get_weight(); ?></span> кг</div>
                <?php } ?>
                <button class="button category-button desktop call-basket">
                    <span><?php _e('ВЫБРАТЬ'); ?></span>
                </button>
                <button class="button category-button mobile call-basket">
                    <?php echo $wc_product->get_price_html(); ?>
                </button>
            </div>
        </div>
        <div class="category-card-hidden-info">
            <h4><?php echo esc_html($wc_product->get_title()); ?></h4>
            <div class="category-hidden-price"><span><?php echo $wc_product->get_price(); ?></span></div>
            <div class="category-hidden-weight">
                <?php if ($wc_product->has_weight()) { ?>
                    <span><?php echo $wc_product->get_weight(); ?></span> кг
                <?php } else { ?>
                    <span>1</span>
                <?php } ?>
            </div>
            <div class="category-hidden-texts">
                <?php
                if (!empty($short_description)) {
                    echo $short_description . '<br><br>';
                }

                $attrbutes = $wc_product->get_attributes();
                if (!empty($attrbutes)) {
                    foreach ($attrbutes as $attribute) {
                        if ($attribute->get_variation() || !$attribute->get_visible()) {
                            continue;
                        }
                        echo '<p>' . esc_html($attribute->get_name()) . ': ' . esc_html($attribute->get_options()[0]) . '</p>';
                    }
                }
                ?>
            </div>
        </div>
    </div>
</div>