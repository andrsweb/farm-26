<?php
/**
 * Single video block
 */

global $post;

$video_id = get_field('video_id', $post->ID);
$theme_path = get_template_directory_uri();
$video_tags = get_the_tags($post->ID);
$bunny_library_id = get_field('bunny_library_id', 'option');
?>
    <div class="video_content">
        <?php if (!empty($video_id)) { ?>
            <div class="video_player">
                <iframe src="https://iframe.mediadelivery.net/embed/<?php echo $bunny_library_id . '/' . $video_id; ?>?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                        id="video_frame"
                        frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
            </div>
        <?php } ?>

        <div class="about_video">
            <div class="about_video_top">
                <div class="about_video_top_left">
                    <h1 class="videos_title"><?php the_title(); ?></h1>
                    <?php if (!empty($video_tags)) { ?>
                        <p class="video_tag">
                            <?php foreach ($video_tags as $tag) { ?>
                                <a href="<?php echo get_tag_link($tag->term_id); ?>"><?php echo $tag->name; ?></a>
                            <?php } ?>
                        </p>
                    <?php } ?>
                </div>

                <div class="about_video_top_right">
                    <?php
                    get_template_part(
                        'components/likes/likes',
                        '',
                        array(
                            'video' => $post,
                        )
                    );
                    ?>
                    <a href="https://iframe.mediadelivery.net/play/<?php echo $bunny_library_id . '/' . $video_id; ?>"
                       class="download_video" target="_blank">
                        <span>Скачать</span>
                        <img src="<?php echo esc_attr($theme_path); ?>/assets/src/images/design/download_arrow.svg"
                             alt="">
                    </a>
                </div>
            </div>

            <?php
            $model = get_field('model', $post->ID);
            get_template_part(
                'components/models/model',
                '',
                array(
                    'model' => $model,
                    'template' => 'short',
                )
            );
            ?>

            <div class="video_description">
                <?php the_content(); ?>
            </div>

            <?php
            get_template_part(
                'components/comments/comments',
                '',
                array(
                    'video' => $post,
                )
            );
            ?>
        </div>

    </div>

<?php

get_template_part(
    'components/another-video/list',
    '',
    array(
        'list' => 'same_videos',
        'order_by' => 'date',
    )
);
