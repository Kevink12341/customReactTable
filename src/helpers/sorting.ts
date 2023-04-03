function mySortFunction(data:Array<any>, searchKey:any, direction?:string ): Array<any> {
    // sorting for Objects
    // current methods string | number | mixed sort
    if(typeof(data[0]) === "object"){
        let searchKeyType = sortingHelper(data,searchKey)
        if(searchKeyType === "string" && direction === "asc"){
            data.sort((a,b)=>{a=a[searchKey], b=b[searchKey]; return sortStringAscending(a, b)})
        };
        if(searchKeyType === "string" && direction === "desc"){
            data.sort((a,b)=>{a=a[searchKey], b=b[searchKey]; return sortStringDescending(a, b)})
        };
        if(searchKeyType === "number" && direction === "asc"){
            data.sort((a,b) => {a=a[searchKey], b=b[searchKey]; return sortNumberAscending(a,b)})
        };
        if(searchKeyType === "number" && direction === "desc"){
            data.sort((a,b) => {a=a[searchKey], b=b[searchKey]; return sortNumberDescending(a,b)})
        };
        if(searchKeyType === "mixed" && direction === "asc"){
            data.sort((a,b) => {a=a[searchKey]!= undefined ? a[searchKey]: "", b=b[searchKey] != undefined ? b[searchKey]: ""; return sortMixedTypeAscending(a,b)})
        };   
        if(searchKeyType === "mixed" && direction === "desc"){
            data.sort((a,b) => {a=a[searchKey]!= undefined ? a[searchKey]: "", b=b[searchKey] != undefined ? b[searchKey]: ""; return sortMixedTypeDescending(a,b)})
        };
    };
        return data
    };

function sortingHelper(data: Array<any>, searchKey: "string"):string{
    // probably needs a rewrite for bigger datasets.
    let datatype = ""
    for(let i = 1 ; i< data.length ; i++) {
        if(typeof(data[i][searchKey]) != typeof(data[i-1][searchKey])){
            datatype = "mixed"
            break
        }
        else{
            datatype =  typeof(data[i][searchKey])
        };
    };

    return datatype
};

//string sort
function sortStringAscending(a:string,b:string){
    const aString = a.toLowerCase();
    const bString = b.toLowerCase();
    return aString < bString ? -1 : 1
};
function sortStringDescending(a:string, b:string){
    const aString = a.toLowerCase();
    const bString = b.toLowerCase();
    return aString > bString ? -1 : 1
};

//number sort
function sortNumberAscending(a:number, b:number){
    return a-b
};
function sortNumberDescending(a:number, b:number){
    return b-a
};

//converting mix sort
function sortMixedTypeAscending(a:any, b:any){
    const mixedA = a.toLocaleString() != undefined || null ? a.toLocaleString().toLowerCase() : "";
    const mixedB = b.toLocaleString() != undefined || null ? b.toLocaleString().toLowerCase() : "";
    return mixedA < mixedB ? -1 : 1
};
function sortMixedTypeDescending(a:any, b:any){
    const mixedA = a.toLocaleString() != undefined ? a.toLocaleString().toLowerCase() : "";
    const mixedB = b.toLocaleString() != undefined ? b.toLocaleString().toLowerCase() : "";
    return mixedA > mixedB ? -1 : 1
};

export default mySortFunction