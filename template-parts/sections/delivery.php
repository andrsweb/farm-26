<section class="delivery">
    <img class="violet-star" src="<?php echo THEME_URL; ?>/assets/img/violet-star.png" alt="">

    <h1><?php the_title(); ?></h1>
    <picture>
        <source srcset="<?php echo THEME_URL; ?>/assets/img/d-left-1920.svg" media="(min-width: 1440px)">
        <source srcset="<?php echo THEME_URL; ?>/assets/img/d-left-1440.svg"
                media="(min-width: 1200px) and (max-width: 1440px)">
        <source srcset="<?php echo THEME_URL; ?>/assets/img/d-mobile-top.svg" media="(max-width: 1200px)">
        <img class="delivery-left" src="<?php echo THEME_URL; ?>/assets/img/d-mobile-top.svg" alt="Delivery image">
    </picture>
    <div class="delivery-wrapper">
        <div class="delivery-center">
            <?php the_content(); ?>
            <div class="link-wrapper">
                <img class="splash1" src="<?php echo THEME_URL; ?>/assets/img/splash1.svg" alt="">
                <img class="splash2" src="<?php echo THEME_URL; ?>/assets/img/splash2.svg" alt="">
                <a class="button category-button"
                   href="<?php echo esc_url(home_url()); ?>"><?php _e('ПЕРЕЙТИ В КАТАЛОГ'); ?></a>
                <img class="wallet" src="<?php echo THEME_URL; ?>/assets/img/wallet.svg" alt="">
            </div>
        </div>
    </div>
    <picture>
        <source srcset="<?php echo THEME_URL; ?>/assets/img/d-right-1920.svg" media="(min-width: 1440px)">
        <source srcset="<?php echo THEME_URL; ?>/assets/img/d-right-1440.svg"
                media="(min-width: 1200px) and (max-width: 1440px)">
        <source srcset="<?php echo THEME_URL; ?>/assets/img/d-mobile-bottom.svg" media="(max-width: 1200px)">
        <img class="delivery-right" src="<?php echo THEME_URL; ?>/assets/img/d-mobile-bottom.svg" alt="Delivery image">
    </picture>
</section>