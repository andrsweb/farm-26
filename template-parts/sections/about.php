<section class="about">
    <div class="container">
        <div class="about-wrapper">
            <h1><?php the_title(); ?></h1>
            <?php the_content(); ?>
            <div class="link-wrapper">
                <img src="<?php echo THEME_URL; ?>/assets/img/leafes.svg" width="51" height="51" alt="">
                <a class="button category-button"
                   href="<?php echo esc_url(home_url()); ?>"><?php _e('ПЕРЕЙТИ В КАТАЛОГ'); ?></a>
            </div>
            <img class="a-icon" src="<?php echo THEME_URL; ?>/assets/img/halal.svg" width="84" height="84" alt="">
        </div>
    </div>
    <img class="img-left" src="<?php echo THEME_URL; ?>/assets/img/meat-left.png" alt="">
    <img class="img-right" src="<?php echo THEME_URL; ?>/assets/img/meat-right.png" alt="">
</section>
