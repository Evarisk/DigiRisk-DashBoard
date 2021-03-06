window.eoxiaJS.digiriskDashboard.duer = {};

window.eoxiaJS.digiriskDashboard.duer.init = function() {
	window.eoxiaJS.digiriskDashboard.duer.event();
};
window.eoxiaJS.digiriskDashboard.duer.event = function() {
	jQuery( document ).on( 'modal-opened', '.duer-modal', window.eoxiaJS.digiriskDashboard.duer.modalOpened );
	jQuery( document ).on( 'change', '.duer-modal-site select', window.eoxiaJS.digiriskDashboard.duer.selectModel );
	jQuery( document ).on( 'modal-opened', '.duer-modal-site', window.eoxiaJS.digiriskDashboard.duer.hideTooltip );
	jQuery( document ).on( 'click', '.duer-modal .button-main', window.eoxiaJS.digiriskDashboard.duer.applyValueToTextarea );
	jQuery( document ).on( 'keyup', '.duer-modal-site .filter-site', window.eoxiaJS.digiriskDashboard.duer.filterSite );
	jQuery( document ).on( 'click', '.close-duer-modal', window.eoxiaJS.digiriskDashboard.duer.closeDUERModal );
	// jQuery( document ).on( 'modal-closed', '.duer-modal-generate', window.eoxiaJS.digiriskDashboard.duer.modalDUERClosed );
};


/**
 * @todo
 * @param  {[type]} event [description]
 * @param  {[type]} data  [description]
 * @return {[type]}       [description]
 */
window.eoxiaJS.digiriskDashboard.duer.modalOpened = function( event, triggeredElement ) {
	jQuery( this ).find( '.modal-content' ).html( '' );

	if ( 'view' !== jQuery( triggeredElement ).data( 'type' ) ) {
		var textareaContent = jQuery( triggeredElement ).closest( '.table-row' ).find( '.textarea-content-' + jQuery( triggeredElement ).data( 'src' ) ).val();
		jQuery( this ).find( '.modal-content' ).html( '<textarea data-to="' + jQuery( triggeredElement ).data( 'src' ) + '" rows="8" style="width: 100%; display: inline-block;"></textarea>' );

		jQuery( '.duer-modal' ).find( 'textarea' ).val( textareaContent );

	} else {
		var content = jQuery( triggeredElement ).closest( '.table-row' ).find( '.text-content-' + jQuery( triggeredElement ).data( 'src' ) ).html();
		jQuery( this ).find( '.modal-content' ).html( '<p></p>' );

		jQuery( '.duer-modal' ).find( 'p' ).html( content );
	}
};

window.eoxiaJS.digiriskDashboard.duer.selectModel = function( event ) {
	var optionSelect = jQuery( 'option:selected', this );
	var id = optionSelect.val();

	jQuery( '.duer-modal-site .list-sites .selected-model label span:first' ).hide();
	jQuery( '.duer-modal-site .list-sites .selected-model input[type="checkbox"]' ).removeAttr( 'disabled' );
	jQuery( '.duer-modal-site .list-sites .selected-model' ).removeClass( 'selected-model' );

	jQuery( '.duer-modal-site .list-sites li[data-id="' + id + '"] label span:first' ).show();
	jQuery( '.duer-modal-site .list-sites li[data-id="' + id + '"] input[type="checkbox"]' ).attr( 'disabled', 'disabled' ).prop( 'checked', false );
	jQuery( '.duer-modal-site .list-sites li[data-id="' + id + '"]' ).addClass( 'selected-model' );
};

window.eoxiaJS.digiriskDashboard.duer.hideTooltip = function ( event ) {
	window.eoxiaJS.tooltip.remove( jQuery( '#duer .table-row:last .wpeo-tooltip-event' ) );
};

/**
 * [description]
 *
 * @since 7.0.0
 *
 * @param  {[type]} triggeredElement [description]
 */
window.eoxiaJS.digiriskDashboard.duer.viewInPopup = function( triggeredElement ) {
	return true;
};

/**
 * @todo
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
window.eoxiaJS.digiriskDashboard.duer.applyValueToTextarea = function( event ) {
	var textarea =  jQuery( '.duer-modal' ).find( 'textarea' );
	jQuery( '.wpeo-table .table-row:last .textarea-content-' + textarea.attr( 'data-to' ) ).val( textarea.val() );
};

window.eoxiaJS.digiriskDashboard.duer.filterSite = function( event ) {
	var sites = jQuery( '.duer-modal-site ul.list-sites li.form-element' );
	sites.show();

	for ( var i = 0; i < sites.length; i++ ) {
		if ( jQuery( sites[i] ).text().indexOf( jQuery( this ).val() ) == -1 ) {
			jQuery( sites[i] ).hide();
		}
	}
};

window.eoxiaJS.digiriskDashboard.duer.loadedModalGenerateDuerSuccess = function( triggeredElement, response ) {
	if ( response.data.error_code == undefined ) {
		jQuery( '.duer-modal-generate' ).replaceWith( response.data.view );
		jQuery( '.duer-modal-generate' ).addClass( 'modal-active' );
		window.eoxiaJS.digiriskDashboard.duer.generate( response.data.args );
	} else {
		window.eoxiaJS.tooltip.display( triggeredElement.closest( '.table-row' ).find( '.wpeo-tooltip-event' ) );
	}
};

window.eoxiaJS.digiriskDashboard.duer.generate = function( args ) {
	var data = {
		action: 'digi_dashboard_generate'
	};

	var line = jQuery( '.duer-modal-generate li:not(.completed):first' );

	data.id   = line.data( 'id' );
	data.type = line.data( 'type' );

	if ( args ) {
		data.args = args;
	}

	window.eoxiaJS.request.send( line, data );
}

window.eoxiaJS.digiriskDashboard.duer.generatedSuccess = function( triggeredElement, response ) {
	jQuery( '.duer-modal-generate li:not(.completed):first' ).find( 'img' ).remove();

	jQuery( '.duer-modal-generate li:not(.completed):first' ).append( '<span class="dashicons dashicons-yes"></span>' );
	jQuery( '.duer-modal-generate li:not(.completed):first' ).addClass( 'completed' );

	if ( jQuery( '.duer-modal-generate li:not(.completed):first' ).length > 0 ) {
		window.eoxiaJS.digiriskDashboard.duer.generate( response.data.args );
	} else {
		jQuery( '.duer-modal-generate' ).removeClass( 'no-close modal-force-display' );
	}
};

window.eoxiaJS.digiriskDashboard.duer.generatedError = function( triggeredElement, response ) {
	jQuery( '.duer-modal-generate .notice-error' ).removeClass( 'hidden').find( 'p' ).html( response.data.error_message );
	jQuery( '.duer-modal-generate li' ).find( 'img' ).remove();
	jQuery( '.duer-modal-generate li' ).find( 'span' ).remove();
	jQuery( '.duer-modal-generate li' ).append( '<span class="dashicons dashicons-no"></span>' );
	jQuery( '.duer-modal-generate' ).removeClass( 'no-close modal-force-display' );
};

window.eoxiaJS.digiriskDashboard.duer.reloadedView = function( triggeredElement, response ) {
	jQuery( '.table-duer' ).replaceWith( response.data.view );
};

window.eoxiaJS.digiriskDashboard.duer.openModalSites = function( triggeredElement, response ) {
	jQuery( '.duer-modal-site .modal-content' ).html( response.data.view );
	jQuery( '.duer-modal-site' ).addClass( 'modal-active' );
};

window.eoxiaJS.digiriskDashboard.duer.closeDUERModal = function( event ) {
	eoxiaJS.loader.display( jQuery( '.wpeo-table' ) );
};
