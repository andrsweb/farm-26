<button class="open-thank-you-modal"></button>
<div class="modal-wrapper thank-you-modal-wrapper" id="thank-you-modal-wrapper">
    <div class="modal thank-you-modal">
        <div class="modal-inner">
            <img class="check" src="<?php echo THEME_URL; ?>/assets/img/check.svg" alt="">
            <div class="ty-title">
                <?php _e('СПАСИБО!'); ?>
            </div>
            <p><?php _e('Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время'); ?></p>
            <span class="order-num">Н</span>
            <a href="<?php echo esc_url(home_url()); ?>"
               class="button category-button close"><?php _e('ВЕРНУТЬСЯ В МАГАЗИН'); ?></a>
        </div>
    </div>
</div>