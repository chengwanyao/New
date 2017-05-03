class ListItem extends cadence.DisplayObjectContainer{

    bookCover : cadence.Bitmap;
    coverUrl : string;
    bookName : string;
    author : string;
    id : string;
    saveButton : cadence.Bitmap;
    saveButtonUrl = "save.png";
    deleteButton : cadence.Bitmap;
    deleteButtonUrl = "delete.png";
    bookNameTextField : cadence.TextField;
    autherNameTextField : cadence.TextField;

    constructor(bookName? : string,author? : string,coverUrl? : string,id? : string){
        super();
        this.width = 800;
        this.height = 200;
        this.id = id;
        this.bookCover = new cadence.Bitmap();
        this.saveButton = new cadence.Bitmap();
        this.deleteButton = new cadence.Bitmap();
        this.bookNameTextField = new cadence.TextField();
        this.autherNameTextField = new cadence.TextField();


        this.saveButton.texture = cadence.RES.getRES(this.saveButtonUrl,(data) => {
            this.saveButton.texture = data;
        });
        this.addChild(this.saveButton);

        this.deleteButton.texture = cadence.RES.getRES(this.deleteButtonUrl,(data) => {
            this.deleteButton.texture = data;
        });
        this.addChild(this.deleteButton);

        this.bookCover.x = 20;
        this.saveButton.x = 500;
        this.saveButton.y = (this.height - this.saveButton.height ) / 2;
        this.deleteButton.x = 650;
        this.deleteButton.y = (this.height - this.deleteButton.height ) / 2;

        
        this.bookNameTextField.x = 200;
        this.bookNameTextField.y = 80;
        this.autherNameTextField.x = 400;
        this.autherNameTextField.y = 80;


        if(bookName){
            this.bookName = bookName;
            this.bookNameTextField.text = this.bookName;
        }
        this.addChild(this.bookNameTextField);

        if(author){
            this.author = author;
            this.autherNameTextField.text = this.author;
        }
        this.addChild(this.autherNameTextField);


        if(coverUrl){
            this.coverUrl = coverUrl;
            this.bookCover.texture = cadence.RES.getRES(this.coverUrl,(data)=>{
                this.bookCover.texture = data;
            });
        }
        this.addChild(this.bookCover);

    }
}