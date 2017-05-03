import * as path from 'path';
import * as fs from 'fs';

type book_type = { "id": string, "name": string, "author": string, "cover": string };

// class BookList extends cadence.DisplayObjectContainer {

//     itemHeight = 200;
//     currentHeightOfItems = -200;
//     bookListConfig: book_type[];
//     booksData;
//     jsonUrl;
//     items: ListItem[] = [];

//     constructor(config) {
//         super();
//         this.booksData = config;
//         this.bookListConfig = config.books;
//         this.bookListConfig.forEach((book) => {
//             var item = new ListItem(book.name, book.author, book.cover, book.id);
//             item.x = 0;
//             item.y = this.currentHeightOfItems + item.height;
//             this.currentHeightOfItems += item.height + 50;
//             item.deleteButton.touchEnabled = true;
//             // item.deleteButton.addEventListener(cadence.TouchEventsType.CLICK,(e : cadence.TouchEventData) =>{
//             //     var i = 0;
//             //     for(i = 0;i < this.bookListConfig.length;i++){
//             //         if(this.bookListConfig[i].id == item.id)
//             //             break;
//             //     }
//             //     if(i < this.bookListConfig.length){
//             //         this.bookListConfig.splice(i,1);
//             //         this.items.splice(i,1);
//             //     }
//             //     this.removeChild(item);
//             //     this.resetHeights();

//             // },item)

//             this.items.push(item);
//             this.addChild(item);
//         });




//         // for (var book of this.bookListConfig) {
//         //     var item = new ListItem(book.name, book.author, book.cover);
//         //     item.x = 0;
//         //     item.y = this.currentHeightOfItems + this.height;
//         //     this.items.push(item);
//         //     this.addChild(item);
//         // }
//     }

//     saveFile(){
//         this.booksData.books = this.bookListConfig;
//         let dataContent = JSON.stringify(this.booksData, null, "\t");
//         // fs.writeFileSync(configPath, dataContent, "utf-8");
//     }

//     deleteBook(book: ListItem) {
//         var i = 0;
//         for (i = 0; i < this.bookListConfig.length; i++) {
//             if (this.bookListConfig[i].id == book.id)
//                 break;
//         }
//         if (i < this.bookListConfig.length) {
//             this.bookListConfig.splice(i, 1);
//             this.items.splice(i, 1);
//         }
//         this.removeChild(book);
//         this.resetHeights();
//     }

//     resetHeights() {
//         this.currentHeightOfItems = -200;
//         this.items.forEach((item) => {
//             item.y = this.currentHeightOfItems + item.height;
//             this.currentHeightOfItems += item.height;
//         })
//     }
// }