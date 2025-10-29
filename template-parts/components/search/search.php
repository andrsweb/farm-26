<?php
/**
 * Add search in header
 */

$search_query = get_search_query();
$clear_class = !empty($search_query) ? ' show-clear' : '';
?>
<div class="search-bar">
    <form method="get" action="<?php echo esc_url(home_url('/')); ?>" class="search-bar-form"
          role="search">
        <label for="search-bar-input" class="search-bar-label<?php echo esc_attr($clear_class); ?>">
            <input type="text" class="search-bar-input" id="search-bar-input" name="s"
                   placeholder="<?php _e('Поиск по товарам'); ?>"
                   value="<?php echo esc_html($search_query); ?>"
            >
            <a href="#" class="search-bar-clear"></a>
        </label>
        <button class="search-bar-button" type="submit"><?php _e('Найти'); ?></button>
    </form>
</div>
