import { Customer } from "../model/customer";

let customers: Array<Customer> = [];
let loaded = false;


export function getAllCustomers(): Promise<Array<Customer>> {
    // To-do: retrive data from backend and fill customers Array

    return new Promise((resolve, reject) => {

if (!loaded){
       
        //(1)Initiate a XMLHTTPRequest
        let http = new XMLHttpRequest();

        //(2)Setting up the callback function
        http.onreadystatechange = function () {
            // console.log(http.readyState);

            if (http.readyState == 4) {
                console.log("Customers la Awa...!!");
                console.log(http.responseText);

                customers = JSON.parse(http.responseText);
                loaded = true;
                resolve(customers);

                //  console.log(http.responseXML);
                // let dom = $(<any>http.responseXML);
                // $(dom).find("customer").each((index,elm)=>{
                //     let id = $(elm).find("id").text();
                //     let name = $(elm).find("name").text();
                //     let address = $(elm).find("address").text();
                //     customers.push(new Customer(id,name,address));
                // });
                // resolve(customers);
            }

        }
        //(3)Open the Request
        http.open('GET', 'http://localhost:8080/myApp/customers', true);

        //(4)If we have to set headers

        //(5)
        http.send();
    }else{
        // customers who are om this array
        resolve(customers);
    }


        //easy way 
        // $.ajax({
        //     method: "GET",
        //     url:'http://localhost:8080/myApp/customers'
        // }).then((data)=>{
        //     customers = data;
        //     resolve(customers);
        // }).fail(()=>{
        //     reject();
        // });
    });
}

export function saveCustomer(customer: Customer): Promise<void> {
    return new Promise((resolve, reject) => {
        
        let http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if(http.status == 201){
                    customers.push(customer);
                    resolve();
                }else{
                    reject("Something went wrong");
                }
            }
        };

        http.open('POST', 'http://localhost:8080/myApp/customers', true);

        http.setRequestHeader('Content-Type', 'application/json');

        http.send(JSON.stringify(customer));

    });
}

