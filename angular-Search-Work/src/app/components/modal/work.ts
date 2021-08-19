export class Work{
  key:string|any;
  tencv:string;
  luong:string;
  nhatuyendung:string;
  diachi:string;
  ngaylv:string;
  motacv:string;
  soluong:string;
  loaicv:string;
  status:string;

  constructor(tencv:string, luong:string, nhatuyendung:string,diachi:string,ngaylv:string,motacv:string,soluong:string,loaicv:string,status:string) {
    this.tencv = tencv;
    this.luong = luong;
    this.nhatuyendung = nhatuyendung;
    this.diachi =diachi;
    this.ngaylv =ngaylv;
    this.motacv =motacv;
    this.soluong = soluong;
    this.loaicv =loaicv;
    this.status=status;
  }

}
