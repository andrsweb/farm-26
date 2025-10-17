<?php
/**
 * Template for Pagination
 */

$page = isset($args['page']) ? absint($args['page']) : 1;
if (0 >= $page) {
    $page = 1;
}

$total = isset($args['total_pages']) ? absint($args['total_pages']) : 1;
if ($total <= 1) {
    return;
}

$next_page = $page + 1;
if ($next_page > $total) {
    $next_page = $total;
}

$prev_page = $page - 1;
if (0 >= $prev_page) {
    $prev_page = 1;
}

$next_page_url = get_pagenum_link($next_page);
$prev_page_url = get_pagenum_link($prev_page);
?>
<div class="pagination">
    <?php if ($prev_page < $page) { ?>
        <a href="<?php echo esc_url($prev_page_url); ?>" class="pagination-prev">
            <img src="<?php echo esc_attr(THEME_URL); ?>/assets/img/arrow.svg"
                 alt="<?php _e('Предыдущая страница'); ?>">
        </a>
    <?php } ?>

    <div class="pagination-pages">
        <div class="current-page"><?php echo esc_html($page); ?></div>
        <span>/</span>
        <div class="total-pages"><?php echo esc_html($total); ?></div>
    </div>

    <?php if ($next_page > $page) { ?>
        <a href="<?php echo esc_url($next_page_url); ?>" class="pagination-next">
            <img src="<?php echo esc_attr(THEME_URL); ?>/assets/img/arrow.svg" alt="<?php _e('Следующая страница'); ?>">
        </a>
    <?php } ?>
</div>