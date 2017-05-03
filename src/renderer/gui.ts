// import * as fs from 'fs';
// import * as path from 'path';
// const Config = require('electron-config');
// const config = new Config();
import * as path from 'path';
import * as fs from 'fs';

var data;
var configPath;

export let run = () => {

    let canvas = document.getElementById("app") as HTMLCanvasElement;
    let stage = cadence.run(canvas);
    var touchService = cadence.TouchEventService.getInstance();
    var main = new Main(stage, touchService);
    cadence.setMain(main);

}

class Main extends cadence.DisplayObjectContainer {
    stage: cadence.DisplayObjectContainer;
    touchEvnetSetvice;
    booksResource: book_type[];
    bookList: BookList;
    booksData;

    constructor(stage: cadence.DisplayObjectContainer, touchEventService: cadence.TouchEventService) {
        super();
        this.stage = stage;
        this.touchEvnetSetvice = touchEventService;
        // this.stage.addEventListener(cadence.TouchEventsType.MOUSEDOWN,() =>{
        //     alert(233);
        // },this)
    }

    createGameScene() {
        var projectUserPick = path.resolve(__dirname, "../../Resources");
        configPath = path.join(projectUserPick, "books.json");

        if (!fs.existsSync(configPath)) {
            alert("该文件夹不是有效路径");
        }
        else {
            let dataContent = fs.readFileSync(configPath, "utf-8");

            try {
                data = JSON.parse(dataContent);
            }
            catch (e) {
                alert("配置文件解析失败！")
            }
            if (data) {
                this.booksData = data;
                this.booksResource = data.books;
                this.bookList = new BookList(data);
                this.bookList.touchEnabled = true;
                this.bookList.x = 0;
                this.stage.addChild(this.bookList);
            }
        }
        // cadence.RES.getRES("books.json", (data) => {
        //     if (data) {
        //         this.booksData = data;
        //         this.booksResource = data.books;
        //         this.bookList = new BookList(data);
        //         this.stage.addChild(this.bookList);
        //     }
        //     else {
        //         console.log("书籍配置文件获取失败");
        //     }
        // console.log(this.booksResource);
        // });


        // var item = new ListItem("校园迷糊大王", "小林尽", "schoolrumble.png");
        // this.stage.addChild(item);
    }

}















type book_type = { "id": string, "name": string, "author": string, "cover": string };

class BookList extends cadence.DisplayObjectContainer {

    itemHeight = 200;
    currentHeightOfItems = -200;
    bookListConfig: book_type[];
    booksData;
    jsonUrl;
    items: ListItem[] = [];

    addButton : cadence.Bitmap;

    constructor(config) {
        super();
        this.booksData = config;
        this.bookListConfig = config.books;
        this.bookListConfig.forEach((book) => {
            // var item = new ListItem(book.name, book.author, book.cover, book.id);
            // item.x = 0;
            // item.y = this.currentHeightOfItems + item.height;
            // this.currentHeightOfItems += item.height + 50;
            // item.deleteButton.touchEnabled = true;
            // item.deleteButton.addEventListener(cadence.TouchEventsType.CLICK,(e : cadence.TouchEventData) =>{
            //     this.deleteBook(item);
            // },item)
            // item.saveButton.touchEnabled = true;
            // item.saveButton.addEventListener(cadence.TouchEventsType.CLICK,()=>{
            //     this.saveFile();
            // },item)

            // this.items.push(item);
            // this.addChild(item);
            this.addnewItem(book.id,book.name,book.author,book.cover);
        });

        
        this.width = 800;
        this.height = this.currentHeightOfItems;
        this.addButton = new cadence.Bitmap();
        this.addButton.touchEnabled = true;
        this.addButton.x = 0;
        this.addButton.y = 100;
        this.addButton.texture = cadence.RES.getRES("add.png",(data)=>{
            this.addButton.texture = data;
        });
        this.addButton.addEventListener(cadence.TouchEventsType.CLICK,()=>{
            this.addBookFile("3","旋风管家","畑健二郎","hayatenogotoku.png");
        },this)
        this.addChild(this.addButton);
        // for (var book of this.bookListConfig) {
        //     var item = new ListItem(book.name, book.author, book.cover);
        //     item.x = 0;
        //     item.y = this.currentHeightOfItems + this.height;
        //     this.items.push(item);
        //     this.addChild(item);
        // }
    }

    saveFile() {
        this.booksData.books = this.bookListConfig;
        let dataContent = JSON.stringify(this.booksData, null, "\t");
        fs.writeFileSync(configPath, dataContent, "utf-8");
        alert("修改成功");
    }

    deleteBook(book: ListItem) {
        var i = 0;
        for (i = 0; i < this.bookListConfig.length; i++) {
            if (this.bookListConfig[i].id == book.id)
                break;
        }
        if (i < this.bookListConfig.length) {
            this.bookListConfig.splice(i, 1);
            this.items.splice(i, 1);
        }
        this.saveFile();
        this.refresh();
        // this.removeChild(book);
        this.resetHeights();
        console.log("删除成功");
    }

    addBookFile(id: string,name: string,author: string,cover: string){
        this.addnewItem(id,name,author,cover);
        var newBook = { "id": id, "name": name, "author": author, "cover": cover };
        this.bookListConfig.push(newBook);
        this.saveFile();
        this.addnewItem(id,name,author,cover);
        this.refresh();
    }

    addnewItem(id: string,name: string,author: string,cover: string){
        var item = new ListItem(name,author,cover,id);
            item.x = 0;
            item.y = this.currentHeightOfItems + item.height;
            this.currentHeightOfItems += item.height + 50;
            item.deleteButton.touchEnabled = true;
            item.deleteButton.addEventListener(cadence.TouchEventsType.CLICK,(e : cadence.TouchEventData) =>{
                this.deleteBook(item);
            },item)
            item.saveButton.touchEnabled = true;
            item.saveButton.addEventListener(cadence.TouchEventsType.CLICK,()=>{
                this.saveFile();
            },item)

            this.items.push(item);
            this.addChild(item);
    }

    refresh(){
        this.booksData = null;
        this.bookListConfig = [];
        this.childArray = [];
        this.items = [];

        let dataContent = fs.readFileSync(configPath, "utf-8");

            try {
                data = JSON.parse(dataContent);
            }
            catch (e) {
                alert("配置文件解析失败！")
            }
            if (data) {
                this.booksData = data;
                this.bookListConfig = data.books;
                this.resetHeights();
                this.bookListConfig.forEach((book) => {
                this.addnewItem(book.id,book.name,book.author,book.cover);
                })
            }
    }

    resetHeights() {
        this.currentHeightOfItems = -200;
        this.items.forEach((item) => {
            item.y = this.currentHeightOfItems + item.height;
            this.currentHeightOfItems += item.height;
        })
        this.height = this.currentHeightOfItems;
    }

    checkItems(bookName : string){
        let i = 0;
        for(i = 0;i < this.bookListConfig.length;i++){
            if(this.bookListConfig[i].name == bookName){
                break;
            }
        }
        this.items = [];
        this.childArray = [];
        this.addnewItem(this.bookListConfig[i].id,this.bookListConfig[i].name,this.bookListConfig[i].author,this.bookListConfig[i].cover);
    }
}