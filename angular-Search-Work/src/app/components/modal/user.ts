export class User{
  key:any;
  email:string;
  hovaten:string;
  ngay_sinh:string
  loaitk:any;
  danh_sach_viec_lam:[];
  gioi_tinh:string;
  constructor(email:string,hovaten:string, gioi_tinh:string,ngay_sinh:string,danh_sach_viec_lam:[],loaitk:any) {
    this.email=email;
    this.hovaten =hovaten;
    this.gioi_tinh =gioi_tinh;
    this.ngay_sinh = ngay_sinh;
    this.danh_sach_viec_lam=danh_sach_viec_lam;
    this.loaitk = loaitk;
  }
}
