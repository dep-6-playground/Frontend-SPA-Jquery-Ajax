/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageCustomers from './manage-customers.component.html';
import style from './manage-customers.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { getAllCustomers, saveCustomer } from '../service/customer.service';
import { Customer } from '../model/customer';

$("app-manage-customers").replaceWith('<div id="manage-customers">' + manageCustomers + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);
let dataTable: any = null;

function old_loadAllCustomers(): void {
    getAllCustomers().then(function (customers: Array<Customer>) {
        for (const customer of customers) {
            $('#tbl-customers tbody').append(
                `<tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td><i class="fas fa-trash"></i></td>
                </tr>`
            );
        }
        ($("#tbl-customers") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
        });
    }).catch(function () { });

}

async function loadAllCustomers() {

    let customers = await getAllCustomers();

    if(dataTable){
        ($("#tbl-customers") as any).DataTable().destroy();
        $('#tbl-customers tbody tr').remove();

    }

    for (const customer of customers) {
        $('#tbl-customers tbody').append(
            `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td><i class="fas fa-trash"></i></td>
            </tr>`
        );
    }

    dataTable = ($("#tbl-customers") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false
    });
}

loadAllCustomers();

$('#btn-save').click(async () => {
    let id = <string>$('#txt-id').val();
    let name = <string>$('#txt-name').val();
    let address = <string>$('#txt-address').val();
    try {
        await saveCustomer(new Customer(id, name, address));
        alert("Customer saved!!");
        loadAllCustomers();
    }
    catch (error) {
        alert("Failed!!");
        console.log(error);

    }



});





