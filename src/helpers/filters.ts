function includeFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key].toLowerCase().includes(this.searchTerm)){
        return true
    }
    return false
};

function excludeFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key].includes(this.searchTerm)){
        return false
    };
    return true
};

function matchFilter(this:any, row: {[key:string]:any}){
    if(row[this.Key].match(this.searchTerm)){
        return true
    };
    return false
};

function greaterThanEqualsFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key] >= Number(this.searchTerm)){
        return true
    };
    return false
};

function greaterThanFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key] > Number(this.searchTerm)){
        return true
    };
    return false
};

function lessThanEqualFilter(this:any, row: {[key:string]:any}){
    if(row[this.Key] <= Number(this.searchTerm)){
        return true
    };
    return false
};

function lessThanFilter(this:any, row: {[key:string]:any}){
    if(row[this.Key] < Number(this.searchTerm)){
        return true
    };
    return false
};

function equalsFilter(this:any, row: {[key:string]:any}){
    if(row[this.Key] == Number(this.searchTerm)){
        return true
    };
    return false
};

function notEqualsFilter(this:any, row: {[key:string]:any}){
    if(row[this.Key] != Number(this.searchTerm)){
        return true
    };
    return false
};


const filters = {
    includeFilter,
    excludeFilter,
    matchFilter, 
    greaterThanEqualsFilter,
    greaterThanFilter,
    lessThanEqualFilter,
    lessThanFilter,
    equalsFilter,
    notEqualsFilter,

}

export default filters