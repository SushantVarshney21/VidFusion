export interface BreadCrumbsType {
    text:String,
    href?:String,
    onClick?:()=> void
}

export interface UserType {
    email: string;
    name: string;
    uid: string;
    label?: string;
  }