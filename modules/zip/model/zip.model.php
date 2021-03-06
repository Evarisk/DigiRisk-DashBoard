<?php
/**
 * Définition des champs d'un zip.
 *
 * @author Evarisk <jimmy@evarisk.com>
 * @since 0.2.0
 * @copyright 2015-2017 Evarisk
 * @package DigiRisk
 */

namespace digirisk_dashboard;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Le modèle du ZIP
 */
class ZIP_Model extends \eoxia\Post_Model {

	/**
	 * Le constructeur
	 *
	 * @since 0.2.0
	 *
	 * @param ZIP_Model $object L'objet zip.
	 */
	public function __construct( $data = null, $req_method = null ) {
		$this->model['list_generation_results'] = array(
			'type'      => 'array',
			'meta_type' => 'multiple',
		);

		$this->schema['path'] = array(
			'since'     => '0.2.0',
			'type'      => 'string',
			'meta_type' => 'single',
			'field'     => '_wpdigi_path',
		);

		$this->schema['model_site_id'] = array(
			'since'     => '0.2.0',
			'type'      => 'integer',
			'meta_type' => 'single',
			'field'     => '_model_site_id',
		);

		parent::__construct( $data, $req_method );
	}
}
