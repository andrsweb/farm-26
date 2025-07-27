<div class="modal-wrapper add-to-basket-modal-wrapper" id="add-to-basket-modal-wrapper">
    <div class="modal add-to-basket-modal">
        <button class="close">
            <img src="<?php echo THEME_URL; ?>/assets/img/close-border.svg" title="Закрыть" alt="">
        </button>
        <div class="modal-inner">
            <div class="modal-basket-img">
                <img src="<?php echo THEME_URL; ?>/assets/img/meat.jpg" alt="<?php _e('Сочная говядина'); ?>">
            </div>
            <div class="modal-basket-actions">
                <div class="modal-basket-desc">
                    <h3>Сочная говядина</h3>
                    <div class="modal-basket-texts">
                        <p>Энергетическая ценность : 53 ккал/100г.</p>
                    </div>
                    <div class="modal-basket-calc-wrapper">
                        <div class="modal-basket-price"><span class="item-price">295.5</span><span>₽</span></div>
                        <div class="modal-basket-weight"><span class="item-weight">0.55</span><span>кг</span></div>
                        <div class="modal-price-calc">
                            <button class="decr" title="Уменьшить">
                                <img src="<?php echo THEME_URL; ?>/assets/img/decr.svg" width="24" height="24" alt="">
                            </button>
                            <span class="calc-value">0.55</span> кг
                            <button class="incr" title="Увеличить">
                                <img src="<?php echo THEME_URL; ?>/assets/img/incr.svg" width="24" height="24" alt="">
                            </button>
                        </div>
                    </div>
                </div>
                <form action="" name="add_to_basket_form" method="post">
                    <?php wp_nonce_field('add_product_to_cart_nonce', 'nonce'); ?>
                    <input type="hidden" name="product_id" value="1">
                    <input type="hidden" name="price" value="1">
                    <input type="hidden" name="weight" value="1">
                    <input type="hidden" name="quantity" value="1">
                    <button class="button category-button add-to-basket">
                        <?php _e('ДОБАВИТЬ В КОРЗИНУ'); ?>
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>