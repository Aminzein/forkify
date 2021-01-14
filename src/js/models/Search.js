export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        try{
            let res = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            res = await res.json();
            this.results = res; 
        }
        catch(error){
            alert(error);
        }
    }
}
