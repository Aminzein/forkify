export default class BookMark {
    constructor(){
        this.items = [];
    }

    searchItem(id){
        return this.items.findIndex(el => el.id === id);
    }

    addItem(image , title , url , author , id){
        if(this.searchItem(id) !== -1){
            const item = {
                image ,
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
        localStorage.setItem('bookmark' , JSON.stringify(this.items));
    }

    getItemsFromStorage(){
        let stringItems = localStorage.getItem('bookmark');
        this.items = stringItems.json()
    }
} 