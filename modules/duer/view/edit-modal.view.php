<?php
/**
 * La popup qui contient les formulaires ainsi que les informations de la génération du DUER.
 *
 * @author    Evarisk <dev@evarisk.com>
 * @since     0.2.0
 * @copyright 2018 Evarisk.
 * @package   DigiRisk
 */

namespace digirisk_dashboard;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} ?>

<div class="wpeo-modal duer-modal">
	<div class="modal-container">

		<!-- Entête -->
		<div class="modal-header">
			<h2 class="modal-title">{{title}}</h2>
			<div class="modal-close"><i class="fas fa-times"></i></div>
		</div>

		<!-- Corps -->
		<div class="modal-content">
			<p>...</p>
		</div>

		<!-- Footer -->
		<div class="modal-footer">
			<a class="wpeo-button button-grey button-uppercase modal-close"><span>Annuler</span></a>
			<a class="wpeo-button button-main button-uppercase modal-close"><span>Valider</span></a>
		</div>
	</div>
</div>
