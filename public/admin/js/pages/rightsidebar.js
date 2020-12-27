const changeSetting = theme => {
    const itemsToAffectSelectors = ['.js-exportable', '#product-attributes', '#view-table', '.c_table', '.role-table'];
    itemsToAffectSelectors.forEach(itemSelector => {
        const item = document.querySelector(itemSelector);
        if (item) {
            item.style.transition = 'color 0.35s ease';
            item.style.color = theme === 'theme-dark' ? '#c2bdbd' : '#212529';
        }
    });
};

const configurePanelTheme = (setting, value) => {
    const data = new FormData();
    data.append('_method', 'PATCH');
    data.append('setting', setting);
    data.append('value', value);
    axios.post(void(0), data/*, {
        headers: { 'X-CSRF-TOKEN': document.querySelector(`meta[name="csrf-token"]`).getAttribute('content') }
    }*/).then(({ status }) => {
        if (status === 200 && setting === 'primary_theme') {
            changeSetting(value);
        }
    }).catch(error => {
        console.log(error);
    });
};

changeSetting('theme-dark');