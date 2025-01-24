const fillAdminModal = function(type) {
	if(type === 'wipe'){
        console.log('fillWipe');
        document.querySelector('#adminModalLabel').innerText = 'Wipe Guest Demo Instances';
		document.querySelector('#admin-prompt').innerText = 'Are you sure you want to delete all Guest Demo user instances from the database?';
		document.querySelector('#admin-form').setAttribute('action', '/admin/wipe');
	}
}