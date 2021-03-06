<?php
/**
 * Appelle le filtre pour ajouter le bouton "Télécharger le ZIP"
 *
 * @author Evarisk <dev@evarisk.com>
 * @since 0.2.0
 * @copyright 2015-2018 Evarisk
 * @package DigiRisk
 */

namespace digirisk_dashboard;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Gères l'action AJAX de la génération du DUER
 */
class ZIP_Filter extends Identifier_Filter {

	/**
	 * Le constructeur
	 */
	public function __construct() {
		parent::__construct();

		add_filter( 'digi_dashboard_list_duer_single_item_action_end', array( $this, 'callback_list_duer_single_item_action_end' ), 10, 2 );
	}

	/**
	 * Cette méthode permet d'ajouter le bouton "Télécharger le ZIP" dans la liste des DUER
	 *
	 * @since 0.2.0
	 *
	 * @param  string     $content Un contenu vide.
	 * @param  DUER_Model $element L'objet DUER.
	 *
	 * @return string $content Le contenu du bouton "Télécharger le ZIP"
	 */
	public function callback_list_duer_single_item_action_end( $content, $element ) {
		$zip_url = '';

		if ( ! empty( $element->data['zip_path'] ) ) {
			$zip_url = ZIP_Class::g()->get_zip_url( $element->data['zip_path'] );
		}

		ob_start();
		\eoxia\View_Util::exec( 'digirisk_dashboard', 'zip', 'download-button', array( 'zip_url' => $zip_url ) );
		$content .= ob_get_clean();

		return $content;
	}
}

new ZIP_Filter();
