import { Item } from "../model/item";

let items :Array<Item> = [];

export function getAllItems(): Promise<Array<Item>>{
    // To-do: retrive data from backend and fill customers Array

    return new Promise((resolve,reject)=>{

 

    //(1)Initiate a XMLHTTPRequest
    let http = new XMLHttpRequest();

    //(2)Setting up the callback function
    http.onreadystatechange =function(){
        // console.log(http.readyState);

        if(http.readyState == 4){
            console.log("Items la Awa...!!");
            // console.log(http.responseText);
            // console.log(http.responseXML);
            let dom = $(http.responseText);
            $(dom).find("item").each((index,elm)=>{
                let code = $(elm).find("code").text();
                let des = $(elm).find("des").text();
                let qty = $(elm).find("qty").text();
                let unitprice = $(elm).find("price").text();
                items.push(new Item(code,des,qty,unitprice));
            });
            resolve(items);
        }

    }
    //(3)Open the Request
    http.open('GET','http://localhost:8080/myApp/items',true);

    //(4)If we have to set headers

    //(5)
    http.send();

    // for(let i = 0;i<50;i++){
    //     customers.push(new Customer(`C${i}`,'Shaantha','Uswatakeiyyawa'));
    // }
});
}
