function swalAlert(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        heightAuto: false,
      })
}
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
