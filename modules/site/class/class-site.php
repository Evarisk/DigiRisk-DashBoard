<?php
/**
 * La classe des sites.
 *
 * @package DigiRisk_Dashboard
 *
 * @since 0.2.0
 */

namespace digirisk_dashboard;

defined( 'ABSPATH' ) || exit;

/**
 * Class site class.
 */
class Class_Site extends \eoxia\Singleton_Util {

	/**
	 * Le constructeur
	 *
	 * @since 0.1.0
	 */
	protected function construct() {}

	public function display() {
		$sites = get_option( \eoxia\Config_Util::$init['digirisk_dashboard']->site->site_key, array() );
		global $wpdb;

		if ( ! empty( $sites ) ) {
			foreach( $sites as $id => &$site ) {
				$site['last_duer'] = DUER_Class::g()->get( array(
					'meta_key'       => '_model_site_id',
					'meta_value'     => $id,
					'posts_per_page' => 1,
				), true );

				$parse_url = parse_url( $site['url'] );

				$full_url = $parse_url['path'] . '/';

				$results = $wpdb->get_var(
					$wpdb->prepare( "SELECT blog_id FROM {$wpdb->blogs} WHERE path = %s", $full_url ) );

				$site['blog_id'] = $results;
			}
		}

		unset( $site );

		\eoxia\View_Util::exec( 'digirisk_dashboard', 'site', 'main', array(
			'childs_site' => $sites,
		) );
	}

	/**
	 * Affiches le formulaire pour ajouter un site.
	 *
	 * @since 0.2.0
	 */
	public function display_edit() {
		$site = array(
			'title'         => '',
			'url'           => '',
			'unique_key'    => '',
			'auth_user'     => '',
			'auth_password' => '',
		);

		\eoxia\View_Util::exec( 'digirisk_dashboard', 'site', 'main-edit', array(
			'edit_site' => $site,
		) );
	}
}

Class_Site::g();
