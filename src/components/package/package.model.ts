export class TableData {

  public row: any = 0;
  public  selectedRow = [];
  public i: any;
  public resultFromModel: any;
  public err: any;
  public y: any;

  public headers = [
    "Id",
    "Name",
    "Email",
    "DoB",
    "Mobile",
  ];
  public result =
    [
      {
        id: "1",
        name: "Rohit",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "rtro@gmail.com",
        dob: "19-02-2000",
        mobile: "9422250832",
      },
      {
        id: "2",
        name: "Rahul",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "raja@gmail.com",
        dob: "22-04-1997",
        mobile: "9423130832",
      },
      {
        id: "3",
        name: "Dheere",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "dheere@gmail.com",
        dob: "19-12-2006",
        mobile: "9445660832",
      },
      {
        id: "4",
        name: "Tushar",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "tushar@gmail.com",
        dob: "09-11-2001",
        mobile: "8975130832",
      },
      {
        id: "5",
        name: "Rohit",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "rtro@gmail.com",
        dob: "19-02-2000",
        mobile: "9422250832",
      },
      {
        id: "6",
        name: "Rahul",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "raja@gmail.com",
        dob: "22-04-1997",
        mobile: "9423130832",
      },
      {
        id: "7",
        name: "Dheere",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "dheere@gmail.com",
        dob: "19-12-2006",
        mobile: "9445660832",
      },
      {
        id: "8",
        name: "Tushar",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "tushar@gmail.com",
        dob: "09-11-2001",
        mobile: "8975130832",
      },
      {
        id: "9",
        name: "Rohit",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "rtro@gmail.com",
        dob: "19-02-2000",
        mobile: "9422250832",
      },
      {
        id: "10",
        name: "Rahul",
        // tslint:disable-next-line:object-literal-sort-keys
        email: "raja@gmail.com",
        dob: "22-04-1997",
        mobile: "9423130832",
      },
    ];

    constructor() {
      this.resultFromModel = this.result;
    }

    public checkedRow(event, id) {
      if (event.target.checked) {
        this.selectedRow.push(id);
        this.row = this.selectedRow.length;
      } else {
        this.selectedRow.splice(this.selectedRow.indexOf(id), 1);
        this.row = this.selectedRow.length;
      }
    }

    public removeSel() {
        for (this.i = 0; this.i < this.selectedRow.length; this.i++) {
        this.y = this.resultFromModel.find((x) => x.id === this.selectedRow[this.i]);
        this.resultFromModel.splice(this.resultFromModel.indexOf(this.y), 1);

        }
        this.selectedRow = [];
        this.row = 0;
        if (this.resultFromModel.length === 0) {
          this.err = "No Data Available";
        } else {
          this.err = "";
        }
    }

    public checkAll(ev) {
      this.resultFromModel.forEach( (x) => x.state = ev.target.checked);
      if (ev.target.checked) {
      this.selectedRow = [];
      this.resultFromModel.map((item) => {
        return {
            id: item.id,
        };
    }).forEach((item) => this.selectedRow.push(item));
      this.row = this.selectedRow.length;
    } else {
      this.selectedRow = [];
      this.row = this.selectedRow.length;
    }
    }
}
