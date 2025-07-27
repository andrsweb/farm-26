<?php

global $wp_query;
status_header(404);
$wp_query->set_404();
$template = get_404_template();
if (file_exists($template)) {
    include($template);
}
exit();
