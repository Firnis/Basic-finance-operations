
// Helpers

function coefFromPercent(percent) {
	return 1 + (percent / 100);
}

function timeValue( percent, period ) {
	return Math.pow( coefFromPercent(percent), period);
}

function PVpercent( fv, pv, period ) {
	return perCents( Math.pow( fv / pv, 1 / period ) );
}

function perCents( coef ) {
	return 100 * (coef - 1);
}

function genArray(len) {
	return (new Array(len)).join(' ').split(' ');
}

function getSum( len, callback ) {
	return genArray( len ).reduce( function(sum, value, index) {
		return sum + callback( index );
	}, 0);
}

function FVperiod(percent, period) {
	return getSum( period, function( periodIndex ) {
		return timeValue(percent, periodIndex);
	} );
}

function PVperiod(percent, period) {
	return getSum( period, function( periodIndex ) {
		return (1 / timeValue(percent, periodIndex + 1));
	} );
}

// Finance functions

function FV( percent, period, pmt, pv ) {
	pmt = pmt || 0;
	pv 	= pv  || 0;

	return (pmt * FVperiod( percent, period )) + ( pv * timeValue(percent, period) );
}

function PV( percent, period, pmt, fv ) {
	pmt = pmt || 0;
	fv 	= fv  || 0;

	return (pmt * PVperiod( percent, period )) + ( fv / timeValue(percent, period) );
}

function PMT( percent, period, pv, fv ) {
	pv = pv || 0;
	fv = fv || 0;

	return (pv / PVperiod( percent, period )) + (fv / FVperiod( percent, period ));
}

function EAR( percent, period ) {
	return perCents( timeValue( percent / period, period ) );
}
