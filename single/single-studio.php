<?php
/**
 * Single video block
 */

global $post;

?>
    <div class="studio-content">
        <?php
        get_template_part(
            'components/studios/studio',
            '',
            array(
                'studio' => $post,
                'template' => 'full',
            )
        );

        $videos = get_studio_videos($post);
        if (!empty($videos)) {
            get_template_part('components/ordering/ordering', array('order_type' => 'date'));

            get_template_part(
                'components/videos/list',
                '',
                array(
                    'videos' => $videos,
                    'order_by' => 'date',
                )
            );
        }
        ?>

    </div>

<?php
