<?php get_header(); ?>

<div class="container">
    <div class="wrapper">
        <div class="content">
            <h2 class="page404__not-found"><?php echo $options_404['page404_not_found'] ?? ''; ?></h2>
            <h4 class="page404__other-page"><?php echo $options_404['page404_other_page'] ?? ''; ?></h4>
        </div>
    </div>
</div>

<?php get_footer(); ?>
