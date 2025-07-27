<?php
/**
 * Header template
 *
 * @package Dauri
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<?php
	$wp_title = wp_title( '', false ) ?: get_bloginfo( 'name' );
	if ( ! empty( $wp_title ) ) {
		?>
        <title><?php echo esc_attr( $wp_title ); ?></title>
        <meta name="apple-mobile-web-app-title" content="<?php echo esc_attr( $wp_title ); ?>">
	<?php } ?>

    <link rel="icon" type="image/png" href="<?php echo esc_attr( THEME_URL ); ?>/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/svg+xml" href="<?php echo esc_attr( THEME_URL ); ?>/favicon.svg">
    <link rel="shortcut icon" href="<?php echo esc_attr( THEME_URL ); ?>/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_attr( THEME_URL ); ?>/apple-touch-icon.png">
    <link rel="manifest" href="<?php echo esc_attr( THEME_URL ); ?>/site.webmanifest">

	<?php wp_head(); ?>

</head>