
export class Video{
    _id:string;
    name:string;
    mpd:string;
    thumbnail:string;

    constructor(json:any){
        this.thumbnail = json.thumbnail;
        this.mpd = json.mpd;
        this.name = json.name;
        this._id = json._id;
    }

    fillFormData(data: FormData) {
        data.append("name", this.name);
        data.append("_id", this._id);
        data.append("thumbnail", this.thumbnail);
        data.append("mpd", this.mpd);
        return data;
    }

    toFormData() {
        return this.fillFormData(new FormData());
    }
}