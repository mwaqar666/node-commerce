const dataTable = $('.js-exportable').DataTable({
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
});

const deleteRecord = (recordID, deleteURL) => {
    swal({
        title: 'Are you sure?', icon: 'warning', buttons: {
            confirm: { text: 'Yes', value: true, closeModal: false },
            deny: { text: 'No', value: false, closeModal: true }
        }, dangerMode: true,
        text: 'Are you sure you want to delete this record?',
    }).then(willDelete => {
        if (willDelete) { return axios.delete(deleteURL); }
        throw null;
    }).then(({ status, data }) => {
        if (status === 200) {
            dataTable.row($(`tr[data-record-id="${recordID}"]`)).remove().draw();
            success(data);
        } else {
            throw new Error();
        }
    }).catch(error => {
        if (error) {
            if (error.response.status === 403) {
                swal('Unauthorized', error.response.data, 'error');
            } else {
                swal('Error!', 'Something Went Wrong. Please Try Again!', 'error');
            }
        } else {
            swal.stopLoading(); swal.close();
        }
    });
};

const success = message => {
    swal('Operation Successful', message, 'success');
};