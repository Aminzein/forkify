export default class BookMark {
    constructor(){
        this.items = [];
        this.key = "bookmark";
    }

    isEmpty(){
        return Array.isArray(this.items) && !this.items.length;
    }

    searchItem(id){
        return this.items.findIndex(el => el.id === id);
    }

    addItem(img , title , url , author , id){
        if(this.searchItem(id) === -1){
            const item = {
                img ,
                title ,
                url ,
                author ,
                id
            };
            this.items.push(item);
        }
    }

    deleteItem(id){
        const index = this.searchItem(id);
        if(index !== -1){
            this.items.splice(index , 1);
        }
    }

    saveItemsInStorage(){
        localStorage.setItem(this.key , JSON.stringify(this.items));
    }

    getItemsFromStorage(){
        let stringItems = localStorage.getItem(this.key);
        if(stringItems !== null) this.items = JSON.parse(stringItems);
    }

} 