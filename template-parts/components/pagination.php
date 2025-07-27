<?php
/**
 * Template for Pagination
 */

$page = isset($args['page']) ? absint($args['page']) : 1;
if (0 >= $page) {
    $page = 1;
}

$total = isset($args['total_pages']) ? absint($args['total_pages']) : 1;
?>
<div class="pagination">
    <button class="pagination-prev">
        <img src="<?php echo esc_attr(THEME_URL); ?>/assets/img/arrow.svg" alt="<?php _e('Предыдущая страница'); ?>">
    </button>
    <div class="pagination-pages">
        <div class="current-page"><?php echo esc_html($page); ?></div>
        <span>/</span>
        <div class="total-pages"><?php echo esc_html($total); ?>></div>
    </div>
    <button class="pagination-next">
        <img src="<?php echo esc_attr(THEME_URL); ?>/assets/img/arrow.svg" alt="<?php _e('Следующая страница'); ?>">
    </button>
</div>